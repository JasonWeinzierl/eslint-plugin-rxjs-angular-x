# Disallow `subscribe` calls that are not composed within Angular components (and, optionally, within services, directives, and pipes) (`rxjs-angular-x/prefer-composition`)

💭 This rule requires [type information](https://typescript-eslint.io/linting/typed-linting).

<!-- end auto-generated rule header -->

This rule effects failures if `subscribe` calls are made with a component and the returned subscription is not composed into a subscription that is unsubscribed when the component is destroyed.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "some-component",
  template: "<span>{{ value }}</span>"
})
export class SomeComponent implements OnInit {
  value: string;
  // ...
  ngOnInit() {
    this.values.subscribe(value => this.value = value);
  }
}
```

Examples of **correct** code for this rule:

```ts
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "some-component",
  template: "<span>{{ value }}</span>"
})
export class SomeComponent implements OnInit, OnDestroy {
  value: string;
  private subscription = new Subscription();
  // ...
  ngOnInit() {
    this.subscription.add(this.values.subscribe(value => this.value = value));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

## Options

<!-- begin auto-generated rule options list -->

| Name              | Description                                    | Type     |
| :---------------- | :--------------------------------------------- | :------- |
| `checkDecorators` | An optional array of decorator names to check. | String[] |

<!-- end auto-generated rule options list -->

This rule accepts a single option which is an object with a `checkDecorators` property which is an array containing the names of the decorators that determine whether or not a class is checked. By default, `checkDecorators` is `["Component"]`.

```json
{
  "rxjs-angular/prefer-composition": [
    "error",
    { "checkDecorators": ["Component"] }
  ]
}
```

## Further reading

- [Composing Subscriptions](https://ncjamieson.com/composing-subscriptions/)
