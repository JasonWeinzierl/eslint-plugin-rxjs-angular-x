# Disallow the calling of `subscribe` within Angular components (`rxjs-angular-x/prefer-async-pipe`)

💭 This rule requires [type information](https://typescript-eslint.io/linting/typed-linting).

<!-- end auto-generated rule header -->

This rule effects failures if explicit calls to `subscribe` are made within a component. Instead, use a child component to which a value is passed by using the async pipe in the parent component's template.

## Further reading

- [Connecting Components with Reactive Forms](https://ncjamieson.com/connecting-components-with-reactive-forms/)
