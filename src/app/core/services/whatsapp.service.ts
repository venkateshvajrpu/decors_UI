import { Injectable, inject } from '@angular/core';
import { SITE_CONFIG } from '../../config/site.config';
import { CatalogueCategory, DecorPackage, EventService } from '../../models';

/**
 * Builds every outbound contact link (WhatsApp / tel: / mailto:) from SITE_CONFIG.
 * Templates never assemble these strings themselves.
 */
@Injectable({ providedIn: 'root' })
export class WhatsappService {
  private readonly config = inject(SITE_CONFIG);

  /** wa.me deep link, optionally with a prefilled message. */
  link(message?: string): string {
    const base = `https://wa.me/${this.config.whatsapp}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  }

  general(): string {
    return this.link(
      `Hi ${this.config.name}, I'd like to enquire about ${this.config.enquiryNoun} for an event in ${this.config.address.city}.`,
    );
  }

  forCatalogue(category: CatalogueCategory): string {
    return this.link(
      `Hi ${this.config.name}, I'd like a quote for "${category.title}". Event date, venue and guest count: `,
    );
  }

  forService(service: EventService): string {
    return this.link(
      `Hi ${this.config.name}, I'd like to enquire about ${service.eventType} décor. Event date, venue and guest count: `,
    );
  }

  forPackage(pkg: DecorPackage): string {
    return this.link(
      `Hi ${this.config.name}, I'd like to enquire about the "${pkg.name}" package. Event date, venue and guest count: `,
    );
  }

  customQuote(): string {
    return this.link(
      `Hi ${this.config.name}, I'd like help planning custom ${this.config.enquiryNoun}. Event date, venue and guest count: `,
    );
  }

  /** Human-readable WhatsApp number, e.g. "+91 99999 99999" (falls back to +digits). */
  whatsappDisplay(): string {
    const digits = this.config.whatsapp.replace(/\D/g, '');
    const m = /^(91)(\d{5})(\d{5})$/.exec(digits);
    return m ? `+${m[1]} ${m[2]} ${m[3]}` : `+${digits}`;
  }

  telHref(): string {
    return `tel:${this.config.phone.replace(/\s+/g, '')}`;
  }

  mailtoHref(subject = this.config.whatsappSubject): string {
    return `mailto:${this.config.email}?subject=${encodeURIComponent(subject)}`;
  }
}
