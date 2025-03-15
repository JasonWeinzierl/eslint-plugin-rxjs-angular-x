import { ESLintUtils, TSESLint } from '@typescript-eslint/utils';
import { version } from '../package.json';

export interface RxjsAngularXRuleDocs {
  description: string;
  recommended?: TSESLint.RuleRecommendation | TSESLint.RuleRecommendationAcrossConfigs<unknown[]>;
  requiresTypeChecking?: boolean;
}

const REPO_URL = 'https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x';

export const ruleCreator = ESLintUtils.RuleCreator<RxjsAngularXRuleDocs>(
  (name) =>
    `${REPO_URL}/blob/v${version}/docs/rules/${name}.md`,
);
