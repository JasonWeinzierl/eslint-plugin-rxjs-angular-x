# eslint-plugin-rxjs-angular-x

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/blob/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/eslint-plugin-rxjs-angular-x.svg)](https://www.npmjs.com/package/eslint-plugin-rxjs-angular-x)

This ESLint plugin is intended to prevent issues with combined use of [RxJS](https://rxjs.dev) and [Angular](https://angular.dev).

There is no recommended configuration for this package, as all of the rules are opinionated.

## Installation Guide (Flat Configuration)

See [typescript-eslint's Getting Started](https://typescript-eslint.io/getting-started) for a full ESLint setup guide.

1. Install `eslint-plugin-rxjs-angular-x` using your preferred package manager.
2. Enable typed linting.
    - See [Linting with Type Information](https://typescript-eslint.io/getting-started/typed-linting/) for more information.
3. Import this plugin into your config. Add any desired rules to your `eslint.config.mjs`.

```diff
// @ts-check
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
+import rxjsAngularX from 'eslint-plugin-rxjs-angular-x';

export default defineConfig({
    extends: [
        ...tseslint.configs.recommended,
    ],
    languageOptions: {
        parserOptions: {
            projectService: true,
        },
    },
    plugins: {
+       'rxjs-angular-x': rxjsAngularX,
    },
    rules: {
+       'rxjs-angular-x/prefer-async-pipe': 'error',
    },
});
```

### Examples

The following is another example, with options:

```js
// @ts-check
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import rxjsAngularX from 'eslint-plugin-rxjs-angular-x';

export default defineConfig({
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
        'rxjs-angular-x/prefer-takeuntil': [
            'error',
            {
                checkComplete: true,
                checkDecorators: ["Component", "Directive", "Injectable"],
                alias: ["takeUntilDestroyed"],
                checkDestroy: false,
            },
        ],
    },
});
```

## Migration Guide from `eslint-plugin-rxjs-angular`

> [!TIP]
> A complete description of all changes are documented in the [CHANGELOG](CHANGELOG.md) file.

This project started as a fork of [`eslint-plugin-rxjs-angular`](https://github.com/cartant/eslint-plugin-rxjs-angular)
but is still compatible with the eslintrc configuration format.

> [!WARNING]
> Users are highly encouraged to upgrade to ESLint's flat configuration format.
> See: [https://eslint.org/docs/v9.x/use/configure/migration-guide]

1. Install `eslint-plugin-rxjs-angular-x` using your preferred package manager.
2. Replace the `rxjs-angular` plugin in your `plugins` block:

    ```diff
    plugins: [
    -   "rxjs-angular",
    +   "rxjs-angular-x",
    ]
    ```

3. In your `rules` block, replace the namespace `rxjs-angular` with `rxjs-angular-x` for all rules:

    ```diff
    -   "rxjs-angular/prefer-async-pipe": "error",
    +   "rxjs-angular-x/prefer-async-pipe": "error",
    ```

    - Note: if your project has inline comments (e.g. `eslint-disable-next-line`) referencing `rxjs-angular` rules, you must update the namespace there too.

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
