import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconName } from '../../../models';

/**
 * Inline SVG icon set (no icon fonts). Decorative by default (aria-hidden);
 * pass `label` to expose it to assistive tech as an image.
 */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-hidden]': 'label() ? null : "true"',
    '[attr.role]': 'label() ? "img" : null',
    '[attr.aria-label]': 'label() || null',
    '[style.--icon-size]': 'size()',
  },
})
export class IconComponent {
  readonly name = input.required<IconName>();
  /** CSS length, e.g. '1em' or '1.5rem'. */
  readonly size = input('1em');
  readonly label = input<string>('');
}
