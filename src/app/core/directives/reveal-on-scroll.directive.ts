import { DOCUMENT, DestroyRef, Directive, ElementRef, Renderer2, afterNextRender, inject } from '@angular/core';

/**
 * Adds `.reveal` (hidden state) in the browser only, then `.is-visible` once the
 * element enters the viewport. Prerendered HTML never carries `.reveal`, so the
 * page is fully readable without JavaScript. No-ops under prefers-reduced-motion
 * or when IntersectionObserver is unavailable.
 *
 * Usage: <section appReveal> … </section>
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealOnScrollDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // afterNextRender only runs in the browser, after hydration.
    afterNextRender(() => this.observe());
  }

  private observe(): void {
    const view = this.document.defaultView;
    if (!view || typeof view.IntersectionObserver === 'undefined') return;
    if (view.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const host = this.el.nativeElement;
    this.renderer.addClass(host, 'reveal');

    const observer = new view.IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.renderer.addClass(host, 'is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(host);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
