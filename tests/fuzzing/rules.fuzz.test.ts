/**
 * @file Verifies that rules do not crash when parsing arbitrary input.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fc, test } from '@fast-check/vitest';
import { Linter } from 'eslint';
import { parser as tseslintParser } from 'typescript-eslint';
import rxjsAngularX from '../../src/index';

const tsconfigRootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const fuzzFilename = path.join(tsconfigRootDir, 'file.ts');
const allRules = Object.fromEntries(
  Object.keys(rxjsAngularX.rules).map((rule) => [`rxjs-angular-x/${rule}`, 'error'] as const),
);

const linter = new Linter();

// Similar to rule-tester.ts setup.
const linterConfig = {
  plugins: { 'rxjs-angular-x': rxjsAngularX },
  rules: allRules,
  languageOptions: {
    parser: tseslintParser,
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.ts*'],
        defaultProject: 'tsconfig.json',
      },
      tsconfigRootDir,
    },
  },
};

test.prop([
  fc.string({ unit: 'grapheme-ascii' }),
])('rules do not throw on arbitrary ASCII text', code => {
  linter.verify(code, linterConfig, fuzzFilename);
});

test.prop([
  fc.string({ unit: 'grapheme' }),
])('rules do not throw on arbitrary Unicode text', code => {
  linter.verify(code, linterConfig, fuzzFilename);
});
