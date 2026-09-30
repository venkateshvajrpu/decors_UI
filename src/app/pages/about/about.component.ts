import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { SITE_CONFIG } from '../../config/site.config';
import { RevealOnScrollDirective } from '../../core/directives/reveal-on-scroll.directive';
import { SeoService } from '../../core/services/seo.service';
import { WHY_US, TEAM } from '../../data';
import { CtaBannerComponent, IconComponent, SectionHeadingComponent } from '../../shared';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, RevealOnScrollDirective, IconComponent, SectionHeadingComponent, CtaBannerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  private readonly seo = inject(SeoService);
  protected readonly config = inject(SITE_CONFIG);

  protected readonly standards = WHY_US;
  protected readonly team = TEAM;
  protected readonly yearsServing = this.config.establishedYear ? new Date().getFullYear() - this.config.establishedYear : null;

  ngOnInit(): void {
    this.seo.setPage({
      title: 'About',
      description: `About ${this.config.name}: a family-run wedding & event decoration business in ${this.config.address.city}, styling functions across ${this.config.serviceAreas.slice(0, 3).join(', ')} and beyond.`,
      path: 'about',
    });
  }
}
