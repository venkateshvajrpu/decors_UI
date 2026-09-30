import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { OpeningHours, SITE_CONFIG } from '../../config/site.config';
import { EVENTS } from '../../data';

export interface SeoPage {
  /** Page title without the brand suffix. Empty string = brand name only (home). */
  title: string;
  description: string;
  /** Route path, e.g. '' for home or 'menu'. Leading slash optional. */
  path: string;
  /** Path under public/ overriding the default OG image. */
  image?: string;
}

const JSON_LD_ID = 'ld-local-business';

const DAY_ABBR: Record<string, string> = {
  monday: 'Mo',
  tuesday: 'Tu',
  wednesday: 'We',
  thursday: 'Th',
  friday: 'Fr',
  saturday: 'Sa',
  sunday: 'Su',
};

/**
 * Sets per-page <title>, meta description, Open Graph / Twitter tags, canonical
 * link and the LocalBusiness JSON-LD. Everything derives from SITE_CONFIG so a
 * rebrand never touches this file. Runs during prerender, so the output HTML
 * carries all tags.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly config = inject(SITE_CONFIG);

  setPage(page: SeoPage): void {
    const { config } = this;
    const fullTitle = page.title ? `${page.title} | ${config.name}` : `${config.name} — ${config.tagline}`;
    const url = this.absoluteUrl(page.path);
    const image = this.absoluteUrl(page.image ?? config.defaultOgImage);

    this.titleService.setTitle(fullTitle);
    this.meta.removeTag('name="robots"');
    this.meta.updateTag({ name: 'description', content: page.description });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: config.name });
    this.meta.updateTag({ property: 'og:locale', content: 'en_IN' });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
    this.setJsonLd();
  }

  /** Mark the current page (e.g. 404) as not indexable. Cleared by the next setPage(). */
  setNoIndex(): void {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }

  /** Joins SITE_CONFIG.siteUrl with a path; '' → origin with trailing slash. */
  absoluteUrl(path: string): string {
    const clean = path.replace(/^\/+/, '');
    return `${this.config.siteUrl}/${clean}`;
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(): void {
    const head = this.document.head;
    let script = head.querySelector<HTMLScriptElement>(`script#${JSON_LD_ID}`);
    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.id = JSON_LD_ID;
      head.appendChild(script);
    }
    script.textContent = JSON.stringify(this.localBusinessJsonLd());
  }

  private localBusinessJsonLd(): Record<string, unknown> {
    const { config } = this;
    return {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'EventPlanner'],
      '@id': `${config.siteUrl}/#business`,
      name: config.name,
      legalName: config.legalName ?? config.name,
      description: config.tagline,
      url: `${config.siteUrl}/`,
      image: this.absoluteUrl(config.defaultOgImage),
      telephone: config.phone.replace(/\s+/g, ''),
      email: config.email,
      makesOffer: EVENTS.map((event) => ({
        '@type': 'Offer',
        ...(event.priceFrom ? { price: event.priceFrom, priceCurrency: 'INR' } : {}),
        itemOffered: { '@type': 'Service', name: event.title, serviceType: event.eventType },
      })),
      address: {
        '@type': 'PostalAddress',
        streetAddress: [config.address.line1, config.address.line2].filter(Boolean).join(', '),
        addressLocality: config.address.city,
        addressRegion: config.address.state,
        postalCode: config.address.pincode,
        addressCountry: 'IN',
      },
      areaServed: config.serviceAreas.map((name) => ({ '@type': 'City', name })),
      openingHours: config.hours.map(toOpeningHours).filter(Boolean),
      sameAs: config.socials.map((s) => s.url),
      ...(config.establishedYear ? { foundingDate: String(config.establishedYear) } : {}),
    };
  }
}

/** "Monday – Saturday", "8:00 AM", "9:00 PM" → "Mo-Sa 08:00-21:00". Returns '' if unparseable. */
export function toOpeningHours(hours: OpeningHours): string {
  const days = hours.days
    .toLowerCase()
    .split(/\s*[–-]\s*/)
    .map((d) => DAY_ABBR[d.trim()])
    .filter((d): d is string => Boolean(d));
  if (days.length === 0) return '';
  const open = to24h(hours.open);
  const close = to24h(hours.close);
  if (!open || !close) return '';
  return `${days.join('-')} ${open}-${close}`;
}

function to24h(time: string): string {
  const match = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i.exec(time.trim());
  if (!match) return '';
  let hour = Number(match[1]);
  const minute = match[2] ?? '00';
  const period = match[3]?.toLowerCase();
  if (period === 'pm' && hour < 12) hour += 12;
  if (period === 'am' && hour === 12) hour = 0;
  return `${String(hour).padStart(2, '0')}:${minute}`;
}
