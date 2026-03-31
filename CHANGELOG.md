# Changelog

[npm history](https://www.npmjs.com/package/eslint-plugin-rxjs-angular-x?activeTab=versions)

## v1.0.1 (2026-03-30)

### Fixes

- Support TypeScript 6 ([#39](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/pull/39)) ([6478ab9](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/commit/6478ab9bdce6e18e52e9a99c84b4ac064ad23d33))
- **prefer-takeuntil**: allow aliases that don't accept subjects ([#40](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/pull/40)) ([f7fa531](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/commit/f7fa531a1c78e72471ea1f38c47d01e16ce9954a))

## v1.0.0 (2026-02-16)

### Breaking Changes

- ESLint v10 is required ([#30](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/pull/30)) ([2698833](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/commit/2698833ad3ffeac7cc63478ba6469c9040845bc6))
- Node.js ^20.19.0 || ^22.13.0 || >=24 is required; Node.js v18 is no longer supported
- ESM is required; CommonJS is no longer supported

### Chores

- `@typescript-eslint/utils` ^8.56.0 is required
- `ts-api-utils` ^2.4.0 is required
- `common-tags` is no longer required
- `docs` folder is no longer published to npm

### Summarized Changes from `eslint-plugin-rxjs-angular`

Since this is the first non-v0 release, the following re-states relevant pre-release changes after forking `eslint-plugin-rxjs-angular`:

#### Breaking Changes

- The namespace for this forked plugin is `rxjs-angular-x`
- TypeScript >=4.8.4 <6.0.0 is required
- `tslib` ^2.1.0 is required

#### Features

- `prefer-composition` and `prefer-takeuntil`: add `superClass` option. ([#3](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x)) ([6dd8003](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/commit/6dd8003d6d5c10ed70adf9806484e7b26bc9dee9))
- Support `plugin.meta.namespace` ([#20](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/pull/20)) ([510d75d](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/commit/510d75d1a515ac81f9cc7e3809bc617540d139cb))

#### Chores

- The following dependencies are no longer required:
  - `eslint-etc`
  - `requireindex`
  - `tsutils`
  - `tsutils-etc`
- Add `requiresTypeChecking` to `meta.docs` of relevant rules
- The URL for each rule now aligns with the installed version of this plugin, instead of latest main. ([11c7a09](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/commit/11c7a09c574a7423ce54f6952177609aa835e8a3))
- Add names to rule tests ([#29](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/pull/29)) ([ef2dbaa](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/commit/ef2dbaa79fca8b100c27603f385edb01876cadc7))

---

## v0.1.2 (2026-02-16)

### Chores

- Upper bound on peer dependencies ([42b2e85](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/commit/42b2e8528f514e20c128dbc2ab8504de33300a9d))
  - `rxjs` ^7.2.0 (previously was >=7.2.0)
  - `typescript` >=4.8.4 <6.0.0 (previously was >=4.8.4)
- Add names to rule tests ([#29](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/pull/29)) ([ef2dbaa](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/commit/ef2dbaa79fca8b100c27603f385edb01876cadc7))
- Add OpenSSF Scorecard ([f4887ab](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/commit/f4887ab91cc5954f4261ab9640c9aade1d67672d))

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
