import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { EventService } from '../../../models';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-service-card',
  imports: [NgOptimizedImage, IconComponent],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
  private readonly wa = inject(WhatsappService);

  readonly service = input.required<EventService>();
  /** Compact variant for the home-page preview grid. */
  readonly compact = input(false);
  /** Heading level so the card fits the page outline (h2 directly under a page h1, h3 under a section h2). */
  readonly headingLevel = input<2 | 3>(3);

  protected readonly whatsappHref = computed(() => this.wa.forService(this.service()));
  protected readonly features = computed(() =>
    this.compact() ? this.service().features.slice(0, 2) : this.service().features,
  );
}
