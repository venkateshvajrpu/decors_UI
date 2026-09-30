import { TestBed } from '@angular/core/testing';
import { SITE_CONFIG } from '../../config/site.config';
import { CatalogueCategory, EventService } from '../../models';
import { TEST_SITE_CONFIG } from '../../testing/test-site-config';
import { WhatsappService } from './whatsapp.service';

describe('WhatsappService', () => {
  let wa: WhatsappService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SITE_CONFIG, useValue: TEST_SITE_CONFIG }],
    });
    wa = TestBed.inject(WhatsappService);
  });

  it('builds a bare wa.me link from the config number', () => {
    expect(wa.link()).toBe('https://wa.me/911234567890');
  });

  it('URL-encodes the prefilled message', () => {
    expect(wa.link('Hi & hello?')).toBe('https://wa.me/911234567890?text=Hi%20%26%20hello%3F');
  });

  it('general() mentions the brand and city', () => {
    const decoded = decodeURIComponent(wa.general());
    expect(decoded).toContain('Test Decors');
    expect(decoded).toContain('Visakhapatnam');
  });

  it('forCatalogue() and forService() reference the item', () => {
    const category = { id: 'flowers', title: 'Flower Decoration', description: '', icon: 'flower', items: [] } satisfies CatalogueCategory;
    const service = {
      id: 'marriage',
      title: 'Marriage / Muhurtham',
      eventType: 'Marriage',
      description: '',
      features: [],
      inclusions: [],
      image: '',
      icon: 'wedding',
    } satisfies EventService;
    expect(decodeURIComponent(wa.forCatalogue(category))).toContain('"Flower Decoration"');
    expect(decodeURIComponent(wa.forService(service))).toContain('Marriage décor');
  });

  it('telHref() strips whitespace; mailtoHref() encodes the subject', () => {
    expect(wa.telHref()).toBe('tel:+911234567890');
    expect(wa.mailtoHref('Wedding quote')).toBe('mailto:test@example.test?subject=Wedding%20quote');
  });

  it('whatsappDisplay() formats an Indian number for reading', () => {
    expect(wa.whatsappDisplay()).toBe('+91 12345 67890');
  });
});
