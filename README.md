# eslint-plugin-rxjs-angular-x

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/blob/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/eslint-plugin-rxjs-angular-x.svg)](https://www.npmjs.com/package/eslint-plugin-rxjs-angular-x)

This ESLint plugin is intended to prevent issues with combined use of [RxJS](https://rxjs.dev) and [Angular](https://angular.dev).

There is no recommended configuration for this package, as all of the rules are opinionated.

## Migrating from `eslint-plugin-rxjs-angular`

This project is a fork of [`eslint-plugin-rxjs-angular`](https://github.com/cartant/eslint-plugin-rxjs-angular)
initially started to support the new ESLint flat config format.

A complete description of all changes are documented in the [CHANGELOG](CHANGELOG.md) file.

## Install

See [typescript-eslint's Getting Started](https://typescript-eslint.io/getting-started) for a full ESLint setup guide.

Then enable the desired rules in your `eslint.config.mjs` and enable typed linting:

```js
// @ts-check
import tseslint from 'typescript-eslint';
import rxjsAngularX from 'eslint-plugin-rxjs-angular-x';

export default tseslint.config({
    extends: [
        ...tseslint.configs.recommended,
    ],
    languageOptions: {
        parserOptions: {
            projectService: true,
        },
    },
    plugins: {
        'rxjs-angular-x': rxjsAngularX,
    },
    rules: {
        'rxjs-angular-x/prefer-async-pipe': 'error',
    },
});
```

The above example uses `typescript-eslint`'s built-in config to set up the TypeScript parser for us.
Enabling `projectService` then turns on typed linting.
See [Linting with Type Information](https://typescript-eslint.io/getting-started/typed-linting/) for details.

## Rules

The package includes the following rules:

| Rule | Description | Recommended |
| --- | --- | --- |
| [`prefer-async-pipe`](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/blob/main/docs/rules/prefer-async-pipe.md) | Forbids the calling of `subscribe` within Angular components. | No |
| [`prefer-composition`](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/blob/main/docs/rules/prefer-composition.md) | Forbids `subscribe` calls that are not composed within Angular components (and, optionally, within services, directives, and pipes). | No |
| [`prefer-takeuntil`](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/blob/main/docs/rules/prefer-takeuntil.md) | Forbids Calling `subscribe` without an accompanying `takeUntil`. | No |
