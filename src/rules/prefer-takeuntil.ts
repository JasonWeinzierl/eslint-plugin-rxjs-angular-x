import {
  TSESTree as es,
  TSESLint,
} from '@typescript-eslint/utils';
import { stripIndent } from 'common-tags';
import {
  getTypeServices,
  isCallExpression,
  isIdentifier,
  isMemberExpression,
  isThisExpression,
} from '../etc';
import { ruleCreator } from '../utils';

const messages = {
  noDestroy: '`ngOnDestroy` is not implemented.',
  noTakeUntil:
    'Forbids calling `subscribe` without an accompanying `takeUntil`.',
  notCalled: '`{{name}}.{{method}}()` not called.',
  notDeclared: 'Subject `{{name}}` not a class property.',
} as const;
type MessageIds = keyof typeof messages;

const defaultOptions: readonly {
  alias?: string[];
  checkComplete?: boolean;
  checkDecorators?: string[];
  checkDestroy?: boolean;
}[] = [];

export const preferTakeuntilRule = ruleCreator({
  defaultOptions,
  meta: {
    docs: {
      description:
        'Disallow `subscribe` calls without an accompanying `takeUntil` within Angular components (and, optionally, within services, directives, and pipes).',
      requiresTypeChecking: true,
    },
    fixable: undefined,
    hasSuggestions: false,
    messages,
    schema: [
      {
        properties: {
          alias: { type: 'array', items: { type: 'string' }, description: 'An optional array of operator names that alias for `takeUntil`.' },
          checkComplete: { type: 'boolean', description: 'Check for `complete` calls.' },
          checkDecorators: { type: 'array', items: { type: 'string' }, description: 'An optional array of decorator names to check.' },
          checkDestroy: { type: 'boolean', description: 'Check for `Subject`-based `ngOnDestroy`.' },
        },
        type: 'object',
        description: stripIndent`
        An optional object with optional \`alias\`, \`checkComplete\`, \`checkDecorators\` and \`checkDestroy\` properties.
        The \`alias\` property is an array containing the names of operators that aliases for \`takeUntil\`.
        The \`checkComplete\` property is a boolean that determines whether or not \`complete\` must be called after \`next\`.
        The \`checkDecorators\` property is an array containing the names of the decorators that determine whether or not a class is checked.
        The \`checkDestroy\` property is a boolean that determines whether or not a \`Subject\`-based \`ngOnDestroy\` must be implemented.
      `,
      },
    ],
    type: 'problem',
  },
  name: 'prefer-takeuntil',
  create: (context) => {
    const { couldBeObservable } = getTypeServices(context);

    // If an alias is specified, check for the subject-based destroy only if
    // it's explicitly configured. It's extremely unlikely a subject-based
    // destroy mechanism will be used in conjunction with an alias.

    const [config = {}] = context.options;
    const {
      alias = [],
      checkComplete = false,
      checkDecorators = ['Component'],
      checkDestroy = alias.length === 0,
    } = config;

    interface Entry {
      classDeclaration: es.ClassDeclaration;
      propertyDefinitions: es.PropertyDefinition[];
      completeCallExpressions: es.CallExpression[];
      hasDecorator: boolean;
      nextCallExpressions: es.CallExpression[];
      ngOnDestroyDefinition?: es.MethodDefinition;
      subscribeCallExpressions: es.CallExpression[];
      subscribeCallExpressionsToNames: Map<es.CallExpression, Set<string>>;
    }
    const entries: Entry[] = [];

    function checkEntry(entry: Entry) {
      const { subscribeCallExpressions } = entry;
      subscribeCallExpressions.forEach((callExpression) => {
        const { callee } = callExpression;
        if (!isMemberExpression(callee)) {
          return;
        }
        const { object } = callee;
        if (!couldBeObservable(object)) {
          return;
        }
        checkSubscribe(callExpression, entry);
      });

      if (checkDestroy) {
        checkNgOnDestroy(entry);
      }
    }

    function checkNgOnDestroy(entry: Entry) {
      const {
        classDeclaration,
        completeCallExpressions,
        nextCallExpressions,
        ngOnDestroyDefinition,
        subscribeCallExpressionsToNames,
      } = entry;
      if (subscribeCallExpressionsToNames.size === 0) {
        return;
      }

      if (!ngOnDestroyDefinition) {
        context.report({
          messageId: 'noDestroy',
          node: classDeclaration.id ?? classDeclaration,
        });
        return;
      }

      // If a subscription to a .pipe() has at least one takeUntil that has no
      // failures, the subscribe call is fine. Callers should be able to use
      // secondary takUntil operators. However, there must be at least one
      // takeUntil operator that conforms to the pattern that this rule
      // enforces.

      interface Check {
        descriptors: TSESLint.ReportDescriptor<MessageIds>[];
        report: boolean;
      }
      const namesToChecks = new Map<string, Check>();

      const names = new Set<string>();
      subscribeCallExpressionsToNames.forEach((value) => {
        value.forEach((name) => names.add(name));
      });
      names.forEach((name) => {
        const check: Check = {
          descriptors: [],
          report: false,
        };
        namesToChecks.set(name, check);

        if (!checkSubjectProperty(name, entry)) {
          check.descriptors.push({
            data: { name },
            messageId: 'notDeclared',
            node: classDeclaration.id ?? classDeclaration,
          });
        }
        if (!checkSubjectCall(name, nextCallExpressions)) {
          check.descriptors.push({
            data: { method: 'next', name },
            messageId: 'notCalled',
            node: ngOnDestroyDefinition.key,
          });
        }
        if (checkComplete && !checkSubjectCall(name, completeCallExpressions)) {
          check.descriptors.push({
            data: { method: 'complete', name },
            messageId: 'notCalled',
            node: ngOnDestroyDefinition.key,
          });
        }
      });

      subscribeCallExpressionsToNames.forEach((names) => {
        const report = [...names].every(
          /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
          (name) => namesToChecks.get(name)!.descriptors.length > 0,
        );
        if (report) {
          names.forEach(
            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            (name) => (namesToChecks.get(name)!.report = true),
          );
        }
      });
      namesToChecks.forEach((check) => {
        if (check.report) {
          check.descriptors.forEach((descriptor) => {
            context.report(descriptor);
          });
        }
      });
    }

    function checkOperator(callExpression: es.CallExpression) {
      const { callee } = callExpression;
      if (!isIdentifier(callee)) {
        return { found: false };
      }
      if (callee.name === 'takeUntil' || alias.includes(callee.name)) {
        const [arg] = callExpression.arguments;
        if (arg) {
          if (
            isMemberExpression(arg)
            && isThisExpression(arg.object)
            && isIdentifier(arg.property)
          ) {
            return { found: true, name: arg.property.name };
          } else if (arg && isIdentifier(arg)) {
            return { found: true, name: arg.name };
          }
        }
        if (!checkDestroy) {
          return { found: true };
        }
      }
      return { found: false };
    }

    function checkSubjectCall(
      name: string,
      callExpressions: es.CallExpression[],
    ) {
      const callExpression = callExpressions.find(
        ({ callee }) =>
          (isMemberExpression(callee)
            && isIdentifier(callee.object)
            && callee.object.name === name)
          || (isMemberExpression(callee)
            && isMemberExpression(callee.object)
            && isThisExpression(callee.object.object)
            && isIdentifier(callee.object.property)
            && callee.object.property.name === name),
      );
      return Boolean(callExpression);
    }

    function checkSubjectProperty(name: string, entry: Entry) {
      const { propertyDefinitions } = entry;
      const propertyDefinition = propertyDefinitions.find(
        (propertyDefinition) => 'name' in propertyDefinition.key && propertyDefinition.key.name === name,
      );
      return Boolean(propertyDefinition);
    }

    function checkSubscribe(callExpression: es.CallExpression, entry: Entry) {
      const { subscribeCallExpressionsToNames } = entry;
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      const names = subscribeCallExpressionsToNames.get(callExpression)!;
      let takeUntilFound = false;

      const { callee } = callExpression;
      if (!isMemberExpression(callee)) {
        return;
      }
      const { object, property } = callee;

      if (
        isCallExpression(object)
        && isMemberExpression(object.callee)
        && isIdentifier(object.callee.property)
        && object.callee.property.name === 'pipe'
      ) {
        const operators = object.arguments;
        operators.forEach((operator) => {
          if (isCallExpression(operator)) {
            const { found, name } = checkOperator(operator);
            takeUntilFound = takeUntilFound || found;
            if (name) {
              names.add(name);
            }
          }
        });
      }

      if (!takeUntilFound) {
        context.report({
          messageId: 'noTakeUntil',
          node: property,
        });
      }
    }

    function getEntry() {
      const { length, [length - 1]: entry } = entries;
      return entry;
    }

    function hasDecorator(node: es.ClassDeclaration) {
      const { decorators } = node;
      return (
        decorators?.some((decorator) => {
          const { expression } = decorator;
          if (!isCallExpression(expression)) {
            return false;
          }
          if (!isIdentifier(expression.callee)) {
            return false;
          }
          const { name } = expression.callee;
          return checkDecorators.some((check: string) => name === check);
        })
      );
    }

    return {
      'CallExpression[callee.property.name=\'subscribe\']': (
        node: es.CallExpression,
      ) => {
        const entry = getEntry();
        if (entry?.hasDecorator) {
          entry.subscribeCallExpressions.push(node);
          entry.subscribeCallExpressionsToNames.set(node, new Set<string>());
        }
      },
      'ClassDeclaration': (node: es.ClassDeclaration) => {
        entries.push({
          classDeclaration: node,
          propertyDefinitions: [],
          completeCallExpressions: [],
          nextCallExpressions: [],
          hasDecorator: hasDecorator(node),
          subscribeCallExpressions: [],
          subscribeCallExpressionsToNames: new Map<
            es.CallExpression,
            Set<string>
          >(),
        });
      },
      'ClassDeclaration:exit': (_node: es.ClassDeclaration) => {
        const entry = entries.pop();
        if (entry?.hasDecorator) {
          checkEntry(entry);
        }
      },
      'PropertyDefinition': (node: es.PropertyDefinition) => {
        const entry = getEntry();
        if (entry?.hasDecorator) {
          entry.propertyDefinitions.push(node);
        }
      },
      'MethodDefinition[key.name=\'ngOnDestroy\'][kind=\'method\']': (
        node: es.MethodDefinition,
      ) => {
        const entry = getEntry();
        if (entry?.hasDecorator) {
          entry.ngOnDestroyDefinition = node;
        }
      },
      'MethodDefinition[key.name=\'ngOnDestroy\'][kind=\'method\'] CallExpression[callee.property.name=\'next\']':
        (node: es.CallExpression) => {
          const entry = getEntry();
          if (entry?.hasDecorator) {
            entry.nextCallExpressions.push(node);
          }
        },
      'MethodDefinition[key.name=\'ngOnDestroy\'][kind=\'method\'] CallExpression[callee.property.name=\'complete\']':
        (node: es.CallExpression) => {
          const entry = getEntry();
          if (entry?.hasDecorator) {
            entry.completeCallExpressions.push(node);
          }
        },
    };
  },
});
