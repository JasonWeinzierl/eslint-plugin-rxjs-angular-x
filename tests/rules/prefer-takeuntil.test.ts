import { stripIndent } from 'common-tags';
import { preferTakeuntilRule } from '../../src/rules/prefer-takeuntil';
import { fromFixture } from '../etc';
import { ruleTester } from '../rule-tester';

ruleTester({ types: true }).run('prefer-takeuntil', preferTakeuntilRule, {
  valid: [
    {
      code: stripIndent`
        // correct component
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "correct-component"
        })
        class CorrectComponent implements OnDestroy {
          private destroy = new Subject<void>();
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              takeUntil(this.destroy)
            ).subscribe();
          }
          ngOnDestroy() {
            this.destroy.next();
            this.destroy.complete();
          }
        }
      `,
    },
    {
      code: stripIndent`
        // correct component, not last
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { map, switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "correct-component"
        })
        class CorrectComponent implements OnDestroy {
          private destroy = new Subject<void>();
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              takeUntil(this.destroy),
              map(value => value)
            ).subscribe();
          }
          ngOnDestroy() {
            this.destroy.next();
            this.destroy.complete();
          }
        }
      `,
    },
    {
      code: stripIndent`
        // destructured component
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "destructured-component"
        })
        class DestructuredComponent implements OnDestroy {
          private destroy = new Subject<void>();
          someMethod() {
            const { destroy } = this;
            o.pipe(
              switchMap(_ => o),
              takeUntil(destroy)
            ).subscribe();
          }
          ngOnDestroy() {
            const { destroy } = this;
            destroy.next();
            destroy.complete();
          }
        }
      `,
    },
    {
      code: stripIndent`
        // secondary takeuntil component
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "secondary-takeuntil-component"
        })
        class SecondaryTakeUntilComponent implements OnDestroy {
          private destroy = new Subject<void>();
          someMethod() {
            o.pipe(
              takeUntil(o),
              switchMap(_ => o),
              takeUntil(this.destroy)
            ).subscribe();
          }
          ngOnDestroy() {
            this.destroy.next();
            this.destroy.complete();
          }
        }
      `,
    },
    {
      code: stripIndent`
        // not components
        import { of } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        class SomeClass {
          someMethod() {
            o.pipe(switchMap(_ => o)).subscribe();
            o.pipe(switchMap(_ => o), takeUntil(o)).subscribe();
          }
        }

        function someFunction() {
          o.pipe(switchMap(_ => o)).subscribe();
          o.pipe(switchMap(_ => o), takeUntil(o)).subscribe();
        }

        @Injectable()
        class NoTakeUntilService {
          someMethod() {
            o.pipe(
              switchMap(_ => o)
            ).subscribe();
          }
        }

        @Pipe({
          name: 'some-pipe',
        })
        class NoTakeUntilPipe {
          someMethod() {
            o.pipe(
              switchMap(_ => o)
            ).subscribe();
          }
        }

        @Directive({
          selector: 'some-directive'
        })
        class NoTakeUntilDirective {
          someMethod() {
            o.pipe(
              switchMap(_ => o)
            ).subscribe();
          }
        }
      `,
    },
    {
      code: stripIndent`
        // no destroy only takeuntil
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "only-takeuntil"
        })
        class CorrectComponent {
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              takeUntil(NEVER)
            ).subscribe();
          }
        }
      `,
      options: [{ checkDestroy: false }],
    },
    {
      code: stripIndent`
        // with alias
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");
        const someAlias = takeUntil;

        @Component({
          selector: "component-with-alias"
        })
        class CorrectComponent implements OnDestroy {
          private destroy = new Subject<void>();
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              someAlias(this.destroy)
            ).subscribe();
          }
          ngOnDestroy() {
            this.destroy.next();
            this.destroy.complete();
          }
        }
      `,
      options: [{ alias: ['someAlias'] }],
    },
    {
      code: stripIndent`
        // decorators with takeuntil
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "correct-component"
        })
        class CorrectComponent implements OnDestroy {
          private destroy = new Subject<void>();
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              takeUntil(this.destroy)
            ).subscribe();
          }
          ngOnDestroy() {
            this.destroy.next();
            this.destroy.complete();
          }
        }

        @Injectable()
        class CorrectService implements OnDestroy {
          private destroy = new Subject<void>();
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              takeUntil(this.destroy)
            ).subscribe();
          }
          ngOnDestroy() {
            this.destroy.next();
            this.destroy.complete();
          }
        }

        @Pipe({
          name: 'controlByName',
        })
        class CorrectPipe implements OnDestroy {
          private destroy = new Subject<void>();
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              takeUntil(this.destroy)
            ).subscribe();
          }
          ngOnDestroy() {
            this.destroy.next();
            this.destroy.complete();
          }
        }

        @Directive({
          selector: 'my-directive'
        })
        class CorrectDirective implements OnDestroy {
          private destroy = new Subject<void>();
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              takeUntil(this.destroy)
            ).subscribe();
          }
          ngOnDestroy() {
            this.destroy.next();
            this.destroy.complete();
          }
        }
      `,
      options: [
        {
          checkDecorators: ['Component', 'Pipe', 'Injectable', 'Directive'],
        },
      ],
    },
    {
      code: stripIndent`
        // https://github.com/cartant/rxjs-tslint-rules/issues/115
        import { Component } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");
        const someAlias = (cmp) => takeUntil(cmp.destroy);

        @Component({
          selector: "component-with-alias"
        })
        class CorrectComponent implements OnDestroy {
          private destroy = new Subject<void>();
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              someAlias(this)
            ).subscribe();
          }
          ngOnDestroy() {
            this.destroy.next();
            this.destroy.complete();
          }
        }
      `,
      options: [
        {
          alias: ['someAlias'],
          checkDestroy: false,
        },
      ],
    },
    {
      code: stripIndent`
        // https://github.com/cartant/eslint-plugin-rxjs-angular/issues/5
        import { Component } from "@angular/core";
        import { of } from "rxjs";
        import { switchMap, take } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "component-with-alias"
        })
        class CorrectComponent implements OnDestroy {
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              take(1)
            ).subscribe();
          }
        }
      `,
      options: [
        {
          alias: ['take'],
          checkDestroy: false,
        },
      ],
    },
    {
      code: stripIndent`
        // extends superClass
        // https://github.com/cartant/eslint-plugin-rxjs-angular/issues/1
        import { Component, Directive, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Directive()
        abstract class BaseComponent implements OnDestroy {
          private readonly destroySubject = new Subject<void>();
          protected readonly destroy = this.destroySubject.asObservable();

          ngOnDestroy() {
            this.destroySubject.next();
            this.destroySubject.complete();
          }
        }

        @Component({
          selector: "component-with-super-class"
        })
        class CorrectComponent extends BaseComponent {
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              takeUntil(this.destroy)
            ).subscribe();
          }
        }
      `,
      options: [
        {
          superClass: ['BaseComponent'],
          checkComplete: true,
        },
      ],
    },
    {
      code: stripIndent`
        // extends superClass and implements OnDestroy
        // https://github.com/cartant/eslint-plugin-rxjs-angular/issues/1
        import { Component, Directive, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Directive()
        abstract class BaseComponent implements OnDestroy {
          private readonly destroySubject = new Subject<void>();
          protected readonly destroy = this.destroySubject.asObservable();

          ngOnDestroy() {
            this.destroySubject.next();
            this.destroySubject.complete();
          }
        }

        @Component({
          selector: "component-with-super-class-and-destroy"
        })
        class CorrectDestroyComponent extends BaseComponent implements OnDestroy {
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              takeUntil(this.destroy)
            ).subscribe();
          }

          override ngOnDestroy(): void {
            super.ngOnDestroy()
          }
        }
      `,
      options: [
        {
          superClass: ['BaseComponent'],
          checkComplete: true,
        },
      ],
    },
  ],
  invalid: [
    fromFixture(
      stripIndent`
        // no pipe component
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "no-pipe-component"
        })
        class NoPipeComponent {
          private destroy = new Subject<void>();
          someMethod() {
            const { destroy } = this;
            o.subscribe();
              ~~~~~~~~~ [noTakeUntil]
          }
          ngOnDestroy() {
            this.destroy.next();
            this.destroy.complete();
          }
        }
      `,
      { options: [{ checkComplete: true }] },
    ),
    fromFixture(
      stripIndent`
        // no takeuntil component
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "no-takeuntil-component"
        })
        class NoTakeUntilComponent {
          private destroy = new Subject<void>();
          someMethod() {
            const { destroy } = this;
            o.pipe(
              switchMap(_ => o)
            ).subscribe();
              ~~~~~~~~~ [noTakeUntil]
          }
          ngOnDestroy() {
            this.destroy.next();
            this.destroy.complete();
          }
        }
      `,
      { options: [{ checkComplete: true }] },
    ),
    fromFixture(
      stripIndent`
        // no subject component
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "no-subject-component"
        })
        class NoSubjectComponent implements OnDestroy {
              ~~~~~~~~~~~~~~~~~~ [notDeclared { "name": "o" }]
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              takeUntil(o)
            ).subscribe();
          }
          ngOnDestroy() {
          ~~~~~~~~~~~ [notCalled { "method": "next", "name": "o" }]
          ~~~~~~~~~~~ [notCalled { "method": "complete", "name": "o" }]
          }
        }
      `,
      { options: [{ checkComplete: true }] },
    ),
    fromFixture(
      stripIndent`
        // no destroy component
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "no-destroy-component"
        })
        class NoDestroyComponent {
              ~~~~~~~~~~~~~~~~~~ [noDestroy]
          private destroy = new Subject<void>();
          someMethod() {
            const { destroy } = this;
            o.pipe(
              switchMap(_ => o),
              takeUntil(destroy)
            ).subscribe();
          }
        }
      `,
      { options: [{ checkComplete: true }] },
    ),
    fromFixture(
      stripIndent`
        // no next component
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "no-next-component"
        })
        class NoNextComponent implements OnDestroy {
          private destroy = new Subject<void>();
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              takeUntil(this.destroy)
            ).subscribe();
          }
          ngOnDestroy() {
          ~~~~~~~~~~~ [notCalled { "method": "next", "name": "destroy" }]
            this.destroy.complete();
          }
        }
      `,
      { options: [{ checkComplete: true }] },
    ),
    fromFixture(
      stripIndent`
        // no complete component
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "no-complete-component"
        })
        class NoCompleteComponent implements OnDestroy {
          private destroy = new Subject<void>();
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              takeUntil(this.destroy)
            ).subscribe();
          }
          ngOnDestroy() {
          ~~~~~~~~~~~ [notCalled { "method": "complete", "name": "destroy" }]
            this.destroy.next();
          }
        }
      `,
      { options: [{ checkComplete: true }] },
    ),
    fromFixture(
      stripIndent`
        // no destroy and no takeuntil component
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "no-takeuntil-component"
        })
        class NoTakeUntilComponent {
              ~~~~~~~~~~~~~~~~~~~~ [noDestroy]
          someMethod() {
            o.pipe(
              switchMap(_ => o)
            ).subscribe();
              ~~~~~~~~~ [noTakeUntil]
          }
        }
      `,
      { options: [{ checkComplete: true }] },
    ),
    fromFixture(
      stripIndent`
        // without alias
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");
        const someAlias = takeUntil;

        @Component({
          selector: "component-without-alias"
        })
        class NoTakeUntilComponent {
          private destroy = new Subject<void>();
          someMethod() {
            o.pipe(
              switchMap(_ => o)
            ).subscribe();
              ~~~~~~~~~ [noTakeUntil]
          }
          ngOnDestroy() {
            this.destroy.next();
            this.destroy.complete();
          }
        }
      `,
      { options: [{ alias: ['someAlias'] }] },
    ),
    fromFixture(
      stripIndent`
        // decorators without takeuntil
        import { Component, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "no-next-component"
        })
        class NoTakeUntilComponent {
              ~~~~~~~~~~~~~~~~~~~~ [noDestroy]
          someMethod() {
            o.pipe(
              switchMap(_ => o)
            ).subscribe();
              ~~~~~~~~~ [noTakeUntil]
          }
        }

        @Injectable()
        class NoTakeUntilService {
              ~~~~~~~~~~~~~~~~~~ [noDestroy]
          someMethod() {
            o.pipe(
              switchMap(_ => o)
            ).subscribe();
              ~~~~~~~~~ [noTakeUntil]
          }
        }

        @Pipe({
          name: 'controlByName',
        })
        class NoTakeUntilPipe {
              ~~~~~~~~~~~~~~~ [noDestroy]
          someMethod() {
            o.pipe(
              switchMap(_ => o)
            ).subscribe();
              ~~~~~~~~~ [noTakeUntil]
          }
        }

        @Directive({
          selector: 'my-directive'
        })
        class NoTakeUntilDirective {
              ~~~~~~~~~~~~~~~~~~~~ [noDestroy]
          someMethod() {
            o.pipe(
              switchMap(_ => o)
            ).subscribe();
              ~~~~~~~~~ [noTakeUntil]
          }
        }
      `,
      {
        options: [
          {
            checkDecorators: ['Component', 'Pipe', 'Injectable', 'Directive'],
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        // extends superClass and implements OnDestroy, missing super.ngOnDestroy()
        // https://github.com/cartant/eslint-plugin-rxjs-angular/issues/1
        import { Component, Directive, OnDestroy } from "@angular/core";
        import { of, Subject } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Directive()
        abstract class BaseComponent implements OnDestroy {
          private readonly destroySubject = new Subject<void>();
          protected readonly destroy = this.destroySubject.asObservable();

          ngOnDestroy() {
            this.destroySubject.next();
            this.destroySubject.complete();
          }
        }

        @Component({
          selector: "missing-super-call"
        })
        class MissingSuperCallComponent extends BaseComponent implements OnDestroy {
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              takeUntil(this.destroy)
            ).subscribe();
          }

          override ngOnDestroy(): void {
                   ~~~~~~~~~~~ [notCalled { "method": "ngOnDestroy", "name": "super" }]
          }
        }
      `,
      {
        options: [
          {
            superClass: ['BaseComponent'],
            checkComplete: true,
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        // Calls super.ngOnDestroy() w/o extending base class
        // https://github.com/cartant/eslint-plugin-rxjs-angular/issues/1
        import { Component, OnDestroy } from "@angular/core";
        import { of } from "rxjs";
        import { switchMap, takeUntil } from "rxjs/operators";

        const o = of("o");

        @Component({
          selector: "missing-base"
        })
        class MissingBaseComponent extends SomeClass implements OnDestroy {
              ~~~~~~~~~~~~~~~~~~~~ [notDeclared { "name": "destroy" }]
          someMethod() {
            o.pipe(
              switchMap(_ => o),
              takeUntil(this.destroy)
            ).subscribe();
          }

          override ngOnDestroy(): void {
                   ~~~~~~~~~~~ [notCalled { "method": "next", "name": "destroy" }]
                   ~~~~~~~~~~~ [notCalled { "method": "complete", "name": "destroy" }]
            super.ngOnDestroy()
          }
        }
      `,
      {
        options: [
          {
            superClass: ['BaseComponent'],
            checkComplete: true,
          },
        ],
      },
    ),
  ],
});
