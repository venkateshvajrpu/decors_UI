import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SITE_CONFIG } from '../../../config/site.config';
import { TEST_SITE_CONFIG } from '../../../testing/test-site-config';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: SITE_CONFIG, useValue: TEST_SITE_CONFIG }],
    });
  });

  async function setup() {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const toggle = el.querySelector<HTMLButtonElement>('.nav__toggle')!;
    const panel = el.querySelector<HTMLElement>('#mobile-nav')!;
    return { fixture, el, toggle, panel };
  }

  afterEach(() => document.body.classList.remove('nav-open'));

  it('renders the brand name and WhatsApp CTA from SITE_CONFIG', async () => {
    const { el } = await setup();
    expect(el.querySelector('.nav__name')?.textContent).toBe('Test Decors');
    expect(el.querySelector<HTMLAnchorElement>('.nav__cta')?.href).toContain('wa.me/911234567890');
  });

  it('opens and closes the mobile panel with correct ARIA state and body lock', async () => {
    const { fixture, toggle, panel } = await setup();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hasAttribute('inert')).toBe(true);

    toggle.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(panel.classList.contains('is-open')).toBe(true);
    expect(panel.hasAttribute('inert')).toBe(false);
    expect(document.body.classList.contains('nav-open')).toBe(true);

    toggle.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.body.classList.contains('nav-open')).toBe(false);
  });

  it('closes on Escape and returns focus to the toggle', async () => {
    const { fixture, toggle } = await setup();
    toggle.click();
    await fixture.whenStable();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
  });

  it('traps Tab within toggle + panel while open', async () => {
    const { fixture, el, toggle, panel } = await setup();
    toggle.click();
    await fixture.whenStable();
    await new Promise((r) => queueMicrotask(() => r(null)));
    const focusables = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    const last = focusables[focusables.length - 1];
    last.focus();
    const tab = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    el.querySelector('.nav')!.dispatchEvent(tab);
    expect(tab.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(toggle);
  });
});
