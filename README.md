# eslint-plugin-rxjs-angular-x

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/blob/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/eslint-plugin-rxjs-angular-x.svg)](https://www.npmjs.com/package/eslint-plugin-rxjs-angular-x)

This ESLint plugin is intended to prevent issues with combined use of [RxJS](https://rxjs.dev) and [Angular](https://angular.dev).

There is no recommended configuration for this package, as all of the rules are opinionated.

## Migrating from `eslint-plugin-rxjs-angular`

This project is a fork of [`eslint-plugin-rxjs-angular`](https://github.com/cartant/eslint-plugin-rxjs-angular)
initially started to support the new ESLint flat config format.

- The old `.eslintrc` format is not supported.
  - If you need to continue using this old format, use the original `eslint-plugin-rxjs` or a different fork.

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

<!-- begin auto-generated rules list -->

💭 Requires [type information](https://typescript-eslint.io/linting/typed-linting).

| Name                                                   | Description                                                                                                                                         | 💭 |
| :----------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :- |
| [prefer-async-pipe](docs/rules/prefer-async-pipe.md)   | Disallow the calling of `subscribe` within Angular components.                                                                                      | 💭 |
| [prefer-composition](docs/rules/prefer-composition.md) | Disallow `subscribe` calls that are not composed within Angular components (and, optionally, within services, directives, and pipes).               | 💭 |
| [prefer-takeuntil](docs/rules/prefer-takeuntil.md)     | Disallow `subscribe` calls without an accompanying `takeUntil` within Angular components (and, optionally, within services, directives, and pipes). | 💭 |

<!-- end auto-generated rules list -->

## Examples

```mjs
// eslint.json.mjs

import rxjsAngularX from "eslint-plugin-rxjs-angular-x";

export default [
  {
    files: ["**/*.ts"],
    plugins: {
      "rxjs-angular-x": rxjsAngularX,
    },
    rules: {
      "rxjs-angular-x/prefer-takeuntil": [
        "error",
        {
          checkComplete: false,
          checkDecorators: ["Component", "Directive", "Injectable"],
          alias: ["takeUntilDestroyed"],
          checkDestroy: false,
        },
      ],
    },
  }
]
```
