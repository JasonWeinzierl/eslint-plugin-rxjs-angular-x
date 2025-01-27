import { ESLintUtils } from "@typescript-eslint/experimental-utils";

export const ruleCreator = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/JasonWeinzierl/eslint-plugin-rxjs-angular-x/tree/main/docs/rules/${name}.md`
);
