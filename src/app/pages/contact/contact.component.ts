import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SITE_CONFIG } from '../../config/site.config';
import { RevealOnScrollDirective } from '../../core/directives/reveal-on-scroll.directive';
import { SeoService } from '../../core/services/seo.service';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { IconComponent, SectionHeadingComponent } from '../../shared';

@Component({
  selector: 'app-contact',
  imports: [RevealOnScrollDirective, IconComponent, SectionHeadingComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly config = inject(SITE_CONFIG);
  protected readonly wa = inject(WhatsappService);

  /** The embed URL comes from our own config, not user input, so trusting it is safe. */
  protected readonly mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.config.mapEmbedUrl);

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Contact',
      description: `Contact ${this.config.name} in ${this.config.address.city} on WhatsApp, phone or email for an event decoration quote. Address, opening hours and map.`,
      path: 'contact',
    });
  }
}
