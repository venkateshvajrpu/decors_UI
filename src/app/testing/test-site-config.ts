import { SiteConfig } from '../config/site.config';

/** Deterministic config for unit tests — never use production values here. */
export const TEST_SITE_CONFIG: SiteConfig = {
  name: 'Test Decors',
  tagline: 'Test tagline',
  businessType: 'events',
  enquiryNoun: 'event decoration',
  whatsappSubject: 'Test enquiry',
  phone: '+91 12345 67890',
  whatsapp: '911234567890',
  email: 'test@example.test',
  address: { line1: '1 Test Street', city: 'Visakhapatnam', state: 'Andhra Pradesh', pincode: '530001' },
  mapEmbedUrl: 'https://maps.example.test/embed',
  mapLink: 'https://maps.example.test',
  hours: [
    { days: 'Monday – Saturday', open: '8:00 AM', close: '9:00 PM' },
    { days: 'Sunday', open: '12:00 PM', close: '12:00 AM' },
  ],
  socials: [{ platform: 'instagram', url: 'https://instagram.com/test' }],
  serviceAreas: ['Visakhapatnam', 'Vizianagaram'],
  siteUrl: 'https://test.example',
  defaultOgImage: 'images/og.jpg',
  establishedYear: 2001,
};
