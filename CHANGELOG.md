# Changelog

[npm history](https://www.npmjs.com/package/eslint-plugin-rxjs-angular-x?activeTab=versions)

## v0.1.1 (2025-12-30)

### Features

- Support `plugin.meta.namespace` ([#20](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/pull/20)) ([510d75d](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/commit/510d75d1a515ac81f9cc7e3809bc617540d139cb))

## v0.1.0 (2025-11-26)

### Fixes

- Add compatibility with eslint's `defineConfig()` ([#16](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/pull/16)) ([e0ac67e](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/commit/e0ac67e781f348cba406c38a725496dfeb9d5b14))
- README has been updated with a more detailed migration guide, and another config example.

## v0.0.3 (2025-03-15)

### Features

- The URL for each rule now aligns with the installed version of this plugin, instead of latest main. ([11c7a09](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/commit/11c7a09c574a7423ce54f6952177609aa835e8a3))

### Fixes

- Remove accidental dependency on markdownlint-cli2. ([cabd9da](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/commit/cabd9dac8b21b54a1bfe519ae6a84ac3028088b0))

## v0.0.2 (2025-02-24)

### Features

- `prefer-composition` and `prefer-takeuntil`: add `superClass` option. ([#3](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x)) ([6dd8003](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/commit/6dd8003d6d5c10ed70adf9806484e7b26bc9dee9))

## v0.0.1 (2025-01-27)

Initial prerelease version.

### Breaking Changes

- `eslint` ^8.57.0 || 9.0.0 is required
- `typescript-eslint` ^8 is required
- TypeScript >=4.8.4 is required
- `tslib` ^2.1.0 is required
- Node.js ^18.18.0 || ^20.9.0 || >= 21.1.0 is required

### Chores

- drop dependency `eslint-etc`
- drop dependency `requireindex`
- drop dependency `tsutils` and `tsutils-etc`, add dependency `ts-api-utils`
- add `rxjs` >= 7.2.0 as optional peer dependency
- add `requiresTypeChecking` to `meta.docs` of relevant rules
- switch from mocha to vitest
