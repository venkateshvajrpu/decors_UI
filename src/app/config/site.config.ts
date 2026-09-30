import { InjectionToken } from '@angular/core';

/**
 * ★ SINGLE PLACE TO REBRAND ★
 * Every business-specific value on the site comes from here. Templates and
 * services inject `SITE_CONFIG`; nothing is hard-coded elsewhere.
 * Also update `src/styles/tokens.css` (palette) and `public/images/**` per client.
 */

export type SocialPlatform = 'instagram' | 'facebook' | 'youtube';

export interface OpeningHours {
  days: string;
  open: string;
  close: string;
}

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  legalName?: string;
  /** Drives the LocalBusiness JSON-LD `@type` in SeoService. */
  businessType: 'events';
  /** Generic noun for the offering, used in WhatsApp / mailto copy so it stays rebrandable. */
  enquiryNoun: string;
  /** Default subject line for mailto links. */
  whatsappSubject: string;
  /** Display format, e.g. "+91 99999 99999". Used for `tel:` after stripping spaces. */
  phone: string;
  /** Digits only, country code included, e.g. "919999999999". Used for wa.me links. */
  whatsapp: string;
  email: string;
  address: Address;
  /** Google Maps embed iframe `src`. */
  mapEmbedUrl: string;
  /** Google Maps share link for "Get directions". */
  mapLink: string;
  hours: OpeningHours[];
  socials: SocialLink[];
  serviceAreas: string[];
  /** Canonical origin without trailing slash, e.g. "https://example.com". */
  siteUrl: string;
  /** Path under public/, used for Open Graph when a page has no image. */
  defaultOgImage: string;
  establishedYear?: number;
}

export const SITE_CONFIG = new InjectionToken<SiteConfig>('SITE_CONFIG');

export const siteConfig: SiteConfig = {
  name: 'Dileep Lighting & Sounds',
  tagline: 'Lighting, sound & decoration for every celebration',
  legalName: 'Dileep Lighting & Sounds',
  businessType: 'events',
  enquiryNoun: 'lighting, sound & decoration',
  whatsappSubject: 'Lighting, sound & decor enquiry',
  // Proprietor: R. Rajendra Rao · Contact: R. Dileep Kumar
  phone: '+91 79893 45350',
  whatsapp: '917989345350',
  email: 'rdk12526@gmail.com',
  address: {
    line1: 'Pineapple Colony, Near Ramalayam Street',
    line2: 'Srikrishnapuram',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    pincode: '530040',
  },
  // TODO(client): Google Maps embed URL (Share → Embed a map → copy the iframe src)
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60866.3!2d83.28!3d17.74!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVisakhapatnam!5e0!3m2!1sen!2sin!4v1700000000000',
  // TODO(client): Google Maps share link
  mapLink: 'https://maps.google.com/?q=Pineapple+Colony+Srikrishnapuram+Visakhapatnam',
  // TODO(client): confirm opening hours
  hours: [
    { days: 'Monday – Sunday', open: '9:00 AM', close: '9:00 PM' },
  ],
  // TODO(client): add real social profile links (none listed yet)
  socials: [],
  serviceAreas: [
    'Visakhapatnam',
    'Simhachalam',
    'Kommadhi',
    'Madhurawada',
    'Gajuwaka',
    'Anakapalli',
    'Vizianagaram',
  ],
  // TODO(client): production domain, no trailing slash
  siteUrl: 'https://dileep-decors-suppliers.onrender.com',
  defaultOgImage: 'images/og-default.jpg',
  // TODO(client): year the business started (omitted until confirmed)
};
