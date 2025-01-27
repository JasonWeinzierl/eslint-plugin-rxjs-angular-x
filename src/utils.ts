import { ESLintUtils, TSESLint } from '@typescript-eslint/utils';

export interface RxjsAngularXRuleDocs {
  description: string;
  recommended?: TSESLint.RuleRecommendation | TSESLint.RuleRecommendationAcrossConfigs<unknown[]>;
  requiresTypeChecking?: boolean;
}

export const ruleCreator = ESLintUtils.RuleCreator<RxjsAngularXRuleDocs>(
  (name) =>
    `https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/tree/main/docs/rules/${name}.md`,
);
