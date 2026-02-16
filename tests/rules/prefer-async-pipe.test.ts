import { stripIndent } from 'common-tags';
import { preferAsyncPipeRule } from '../../src/rules/prefer-async-pipe';
import { fromFixture } from '../etc';
import { ruleTester } from '../rule-tester';

ruleTester({ types: true }).run('prefer-async-pipe', preferAsyncPipeRule, {
  valid: [
    {
      name: 'async pipe',
      code: stripIndent`
        import { of } from "rxjs";
        @Component({
          selector: "some-component",
          template: "<span>{{ something | async }}</span>"
        })
        class SomeComponent {
          something = of("foo");
        }
      `,
    },
  ],
  invalid: [
    fromFixture(
      'subscribe',
      stripIndent`
        import { of } from "rxjs";
        @Component({
          selector: "some-component",
          template: "<span>{{ something }}</span>"
        })
        class SomeComponent implements OnInit {
          something: string;
          ngOnInit() {
            of("foo").subscribe(value => this.something = value);
                      ~~~~~~~~~ [forbidden]
          }
        }
      `,
    ),
  ],
});
