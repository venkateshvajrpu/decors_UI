import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RevealOnScrollDirective } from './reveal-on-scroll.directive';

@Component({
  imports: [RevealOnScrollDirective],
  template: '<section appReveal>content</section>',
})
class HostComponent {}

type IoCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

describe('RevealOnScrollDirective', () => {
  let callbacks: IoCallback[];
  const originalIo = window.IntersectionObserver;
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    callbacks = [];
    class FakeIo {
      constructor(cb: IoCallback) {
        callbacks.push(cb);
      }
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
    }
    window.IntersectionObserver = FakeIo as unknown as typeof IntersectionObserver;
    window.matchMedia = vi.fn().mockReturnValue({ matches: false } as MediaQueryList);
  });

  afterEach(() => {
    window.IntersectionObserver = originalIo;
    window.matchMedia = originalMatchMedia;
  });

  async function render(): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement.querySelector('section') as HTMLElement;
  }

  it('adds .reveal in the browser and .is-visible on intersection', async () => {
    const section = await render();
    expect(section.classList.contains('reveal')).toBe(true);
    expect(section.classList.contains('is-visible')).toBe(false);
    callbacks[0]([{ isIntersecting: true }]);
    expect(section.classList.contains('is-visible')).toBe(true);
  });

  it('no-ops under prefers-reduced-motion', async () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true } as MediaQueryList);
    const section = await render();
    expect(section.classList.contains('reveal')).toBe(false);
    expect(callbacks.length).toBe(0);
  });

  it('no-ops when IntersectionObserver is unavailable', async () => {
    window.IntersectionObserver = undefined as unknown as typeof IntersectionObserver;
    const section = await render();
    expect(section.classList.contains('reveal')).toBe(false);
  });
});
