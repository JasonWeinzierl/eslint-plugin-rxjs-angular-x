import { ESLintUtils, TSESLint, TSESTree } from '@typescript-eslint/utils';
import { couldBeType as tsutilsEtcCouldBeType } from './could-be-type';

export function getTypeServices<
  TMessageIds extends string,
  TOptions extends readonly unknown[],
>(context: TSESLint.RuleContext<TMessageIds, Readonly<TOptions>>) {
  const services = ESLintUtils.getParserServices(context);
  const { program, getTypeAtLocation } = services;
  const typeChecker = program.getTypeChecker();

  const couldBeType = (
    node: TSESTree.Node,
    name: string | RegExp,
    qualified?: { name: RegExp },
  ): boolean => {
    const type = getTypeAtLocation(node);
    return tsutilsEtcCouldBeType(
      type,
      name,
      qualified ? { ...qualified, typeChecker } : undefined,
    );
  };

  return {
    couldBeObservable: (node: TSESTree.Node) => couldBeType(node, 'Observable'),
    couldBeSubscription: (node: TSESTree.Node) => couldBeType(node, 'Subscription'),
  };
}
