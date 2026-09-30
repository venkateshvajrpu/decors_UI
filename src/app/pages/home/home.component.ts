import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../config/site.config';
import { RevealOnScrollDirective } from '../../core/directives/reveal-on-scroll.directive';
import { SeoService } from '../../core/services/seo.service';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { CATALOGUE, EVENTS, TESTIMONIALS, WHY_US } from '../../data';
import {
  CtaBannerComponent,
  IconComponent,
  SectionHeadingComponent,
  ServiceCardComponent,
  TestimonialCardComponent,
} from '../../shared';

@Component({
  selector: 'app-home',
  imports: [
    NgOptimizedImage,
    RouterLink,
    RevealOnScrollDirective,
    IconComponent,
    SectionHeadingComponent,
    ServiceCardComponent,
    TestimonialCardComponent,
    CtaBannerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly seo = inject(SeoService);
  protected readonly config = inject(SITE_CONFIG);
  protected readonly wa = inject(WhatsappService);

  protected readonly whyUs = WHY_US;
  protected readonly featuredCategories = CATALOGUE.slice(0, 4);
  protected readonly services = EVENTS.slice(0, 4);
  protected readonly testimonials = TESTIMONIALS.slice(0, 3);

  ngOnInit(): void {
    this.seo.setPage({
      title: '',
      description: `${this.config.name} — wedding & event decoration in ${this.config.address.city}. Flowers, mandapam, stage, lighting, sound and furniture for marriages, receptions, half-saree functions, housewarmings and corporate events.`,
      path: '',
    });
  }
}
