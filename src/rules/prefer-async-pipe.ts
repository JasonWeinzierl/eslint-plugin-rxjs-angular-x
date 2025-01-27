import { TSESTree as es } from '@typescript-eslint/utils';
import { getTypeServices } from '../etc';
import { ruleCreator } from '../utils';

export const preferAsyncPipeRule = ruleCreator({
  defaultOptions: [],
  meta: {
    docs: {
      description:
        'Disallow the calling of `subscribe` within Angular components.',
      requiresTypeChecking: true,
    },
    fixable: undefined,
    hasSuggestions: false,
    messages: {
      forbidden:
        'Calling `subscribe` in a component is forbidden; use an `async` pipe instead.',
    },
    schema: [],
    type: 'problem',
  },
  name: 'prefer-async-pipe',
  create: (context) => {
    const { couldBeObservable } = getTypeServices(context);
    const componentMap = new WeakMap<es.Node, void>();
    return {
      [`CallExpression > MemberExpression[property.name="subscribe"]`]: (
        memberExpression: es.MemberExpression,
      ) => {
        let parent: es.Node | undefined = memberExpression.parent;
        while (parent) {
          if (
            componentMap.has(parent)
            && couldBeObservable(memberExpression.object)
          ) {
            context.report({
              messageId: 'forbidden',
              node: memberExpression.property,
            });
            return;
          }
          parent = parent.parent;
        }
      },
      [`ClassDeclaration > Decorator[expression.callee.name="Component"]`]: (
        node: es.Node,
      ) => {
        const classDeclaration = node.parent as es.ClassDeclaration;
        componentMap.set(classDeclaration);
      },
    };
  },
});
