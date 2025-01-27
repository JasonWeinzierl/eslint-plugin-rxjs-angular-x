import { name, version } from '../package.json';
import { preferAsyncPipeRule } from './rules/prefer-async-pipe';
import { preferCompositionRule } from './rules/prefer-composition';
import { preferTakeuntilRule } from './rules/prefer-takeuntil';

const rxjsAngularX = {
  meta: { name, version },
  rules: {
    'prefer-async-pipe': preferAsyncPipeRule,
    'prefer-composition': preferCompositionRule,
    'prefer-takeuntil': preferTakeuntilRule,
  },
};

export default rxjsAngularX;
