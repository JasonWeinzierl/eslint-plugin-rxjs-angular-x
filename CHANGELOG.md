# Changelog

## Unreleased

Initial release.

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
