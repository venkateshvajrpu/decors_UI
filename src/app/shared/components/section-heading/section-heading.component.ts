import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-start]': 'align() === "start"',
    '[class.is-on-dark]': 'tone() === "on-dark"',
  },
})
export class SectionHeadingComponent {
  readonly title = input.required<string>();
  readonly eyebrow = input<string>('');
  readonly teluguTitle = input<string>('');
  readonly level = input<1 | 2 | 3>(2);
  readonly align = input<'center' | 'start'>('center');
  readonly tone = input<'default' | 'on-dark'>('default');
}
