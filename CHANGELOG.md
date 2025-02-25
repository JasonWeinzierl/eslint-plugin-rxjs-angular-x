# Changelog

[npm history](https://www.npmjs.com/package/eslint-plugin-rxjs-angular-x?activeTab=versions)

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
