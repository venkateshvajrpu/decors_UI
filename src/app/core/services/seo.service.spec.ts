import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SITE_CONFIG } from '../../config/site.config';
import { TEST_SITE_CONFIG } from '../../testing/test-site-config';
import { SeoService, toOpeningHours } from './seo.service';

describe('SeoService', () => {
  let seo: SeoService;
  let doc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SITE_CONFIG, useValue: TEST_SITE_CONFIG }],
    });
    seo = TestBed.inject(SeoService);
    doc = TestBed.inject(DOCUMENT);
  });

  afterEach(() => {
    doc.head.querySelector('link[rel="canonical"]')?.remove();
    doc.head.querySelector('script[type="application/ld+json"]')?.remove();
  });

  it('formats the title with the brand suffix', () => {
    seo.setPage({ title: 'Menu', description: 'd', path: 'menu' });
    expect(doc.title).toBe('Menu | Test Decors');
  });

  it('uses brand + tagline when the page title is empty (home)', () => {
    seo.setPage({ title: '', description: 'd', path: '' });
    expect(doc.title).toBe('Test Decors — Test tagline');
  });

  it('sets description, Open Graph and canonical', () => {
    seo.setPage({ title: 'Menu', description: 'Menu desc', path: '/menu' });
    expect(doc.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Menu desc');
    expect(doc.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe('https://test.example/menu');
    expect(doc.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe('https://test.example/images/og.jpg');
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://test.example/menu');
  });

  it('updates rather than duplicates canonical on repeat calls', () => {
    seo.setPage({ title: 'A', description: 'd', path: 'a' });
    seo.setPage({ title: 'B', description: 'd', path: 'b' });
    expect(doc.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://test.example/b');
  });

  it('emits LocalBusiness JSON-LD from SITE_CONFIG', () => {
    seo.setPage({ title: 'Home', description: 'd', path: '' });
    const scripts = doc.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBe(1);
    const ld = JSON.parse(scripts[0].textContent ?? '{}');
    expect(ld['@type']).toContain('LocalBusiness');
    expect(ld.name).toBe('Test Decors');
    expect(ld.telephone).toBe('+911234567890');
    expect(ld.address.addressLocality).toBe('Visakhapatnam');
    expect(ld.openingHours).toEqual(['Mo-Sa 08:00-21:00', 'Su 12:00-00:00']);
    expect(ld.areaServed.map((a: { name: string }) => a.name)).toEqual(['Visakhapatnam', 'Vizianagaram']);
    expect(ld.foundingDate).toBe('2001');
  });
});

describe('toOpeningHours', () => {
  it('converts a day range and 12h times', () => {
    expect(toOpeningHours({ days: 'Monday - Friday', open: '9 AM', close: '6:30 PM' })).toBe('Mo-Fr 09:00-18:30');
  });

  it('returns empty string for unparseable input', () => {
    expect(toOpeningHours({ days: 'Weekdays', open: '9 AM', close: '6 PM' })).toBe('');
    expect(toOpeningHours({ days: 'Monday', open: 'morning', close: '6 PM' })).toBe('');
  });
});

describe('SeoService noindex', () => {
  it('adds robots noindex and clears it on the next setPage', () => {
    TestBed.configureTestingModule({ providers: [{ provide: SITE_CONFIG, useValue: TEST_SITE_CONFIG }] });
    const seo = TestBed.inject(SeoService);
    const doc = TestBed.inject(DOCUMENT);
    seo.setNoIndex();
    expect(doc.querySelector('meta[name="robots"]')?.getAttribute('content')).toContain('noindex');
    seo.setPage({ title: 'Home', description: 'd', path: '' });
    expect(doc.querySelector('meta[name="robots"]')).toBeNull();
    doc.head.querySelector('link[rel="canonical"]')?.remove();
    doc.head.querySelector('script[type="application/ld+json"]')?.remove();
  });
});
