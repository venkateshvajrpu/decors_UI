import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SITE_CONFIG } from '../../config/site.config';
import { RevealOnScrollDirective } from '../../core/directives/reveal-on-scroll.directive';
import { SeoService } from '../../core/services/seo.service';
import { PACKAGES } from '../../data';
import { CtaBannerComponent, PackageCardComponent, SectionHeadingComponent } from '../../shared';

@Component({
  selector: 'app-packages',
  imports: [RevealOnScrollDirective, SectionHeadingComponent, PackageCardComponent, CtaBannerComponent],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly config = inject(SITE_CONFIG);

  protected readonly packages = PACKAGES;

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Packages',
      description: `Decoration packages in ${this.config.address.city} — Silver, Gold and Platinum tiers plus event-specific bundles for weddings, receptions and functions. Transparent starting prices.`,
      path: 'packages',
    });
  }
}
