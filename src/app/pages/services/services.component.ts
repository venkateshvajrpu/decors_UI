import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SITE_CONFIG } from '../../config/site.config';
import { RevealOnScrollDirective } from '../../core/directives/reveal-on-scroll.directive';
import { SeoService } from '../../core/services/seo.service';
import { FAQS, HOW_IT_WORKS, EVENTS } from '../../data';
import { CtaBannerComponent, FaqAccordionComponent, IconComponent, SectionHeadingComponent, ServiceCardComponent } from '../../shared';

@Component({
  selector: 'app-services',
  imports: [RevealOnScrollDirective, IconComponent, SectionHeadingComponent, ServiceCardComponent, FaqAccordionComponent, CtaBannerComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly config = inject(SITE_CONFIG);

  protected readonly services = EVENTS;
  protected readonly steps = HOW_IT_WORKS;
  protected readonly faqs = FAQS;

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Services',
      description: `Event decoration in ${this.config.address.city} for marriages, receptions, half-saree functions, engagements, seemantham, barasala, gruhapravesam, birthdays, corporate events and temple pandals.`,
      path: 'services',
    });
  }
}
