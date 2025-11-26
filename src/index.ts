import type { TSESLint } from '@typescript-eslint/utils';
import type { ESLint, Rule } from 'eslint';
import { name, version } from '../package.json';
import { preferAsyncPipeRule } from './rules/prefer-async-pipe';
import { preferCompositionRule } from './rules/prefer-composition';
import { preferTakeuntilRule } from './rules/prefer-takeuntil';

const allRules = {
  'prefer-async-pipe': preferAsyncPipeRule,
  'prefer-composition': preferCompositionRule,
  'prefer-takeuntil': preferTakeuntilRule,
} satisfies TSESLint.FlatConfig.Plugin['rules'];

const rxjsAngularX = {
  meta: { name, version },
  /** Compatibility with `defineConfig` until https://github.com/typescript-eslint/typescript-eslint/issues/11543 is addressed. */
  rules: allRules as { [K in keyof typeof allRules]: (typeof allRules)[K] & Rule.RuleModule },
} satisfies ESLint.Plugin;

export default rxjsAngularX;
