import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { DecorPackage } from '../../../models';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-package-card',
  imports: [IconComponent],
  templateUrl: './package-card.component.html',
  styleUrl: './package-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageCardComponent {
  private readonly wa = inject(WhatsappService);

  readonly package = input.required<DecorPackage>();
  /** Heading level so the card fits the page outline (h2 directly under a page h1, h3 under a section h2). */
  readonly headingLevel = input<2 | 3>(3);

  protected readonly whatsappHref = computed(() => this.wa.forPackage(this.package()));
}
