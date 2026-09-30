import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';
import { SITE_CONFIG } from '../../config/site.config';
import { RevealOnScrollDirective } from '../../core/directives/reveal-on-scroll.directive';
import { SeoService } from '../../core/services/seo.service';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { CATALOGUE } from '../../data';
import { IconComponent, CatalogueItemCardComponent, SectionHeadingComponent } from '../../shared';

const ALL = 'all';

@Component({
  selector: 'app-decor',
  imports: [RevealOnScrollDirective, IconComponent, SectionHeadingComponent, CatalogueItemCardComponent],
  templateUrl: './decor.component.html',
  styleUrl: './decor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecorComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);
  protected readonly config = inject(SITE_CONFIG);
  protected readonly wa = inject(WhatsappService);

  /** Bound from `?category=` by withComponentInputBinding(). */
  readonly category = input<string>();

  protected readonly categories = CATALOGUE;
  protected readonly all = ALL;

  protected readonly active = linkedSignal(() => {
    const requested = this.category();
    return requested && CATALOGUE.some((c) => c.id === requested) ? requested : ALL;
  });

  protected readonly visible = computed(() =>
    this.active() === ALL ? CATALOGUE : CATALOGUE.filter((c) => c.id === this.active()),
  );

  protected readonly totalItems = CATALOGUE.reduce((n, c) => n + c.items.length, 0);

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Decor',
      description: `Decoration & event-supplies catalogue in ${this.config.address.city}: flower decoration, backdrops & stage, lighting, sound & AV, mandapam & structures, furniture, traditional items and entertainment.`,
      path: 'decor',
    });
  }

  protected select(id: string): void {
    this.active.set(id);
    void this.router.navigate([], {
      queryParams: { category: id === ALL ? null : id },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
