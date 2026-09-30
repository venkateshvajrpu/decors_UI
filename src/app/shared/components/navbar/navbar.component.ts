import { DOCUMENT, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Renderer2, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { SITE_CONFIG } from '../../../config/site.config';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { NAV_LINKS } from '../../nav-links';
import { IconComponent } from '../icon/icon.component';

const FOCUSABLE = 'a[href], button:not([disabled])';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscape()',
    '(keydown)': 'onPanelKeydown($event)',
  },
})
export class NavbarComponent {
  protected readonly config = inject(SITE_CONFIG);
  protected readonly wa = inject(WhatsappService);
  protected readonly links = NAV_LINKS;

  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly router = inject(Router);

  private readonly toggleButton = viewChild.required<ElementRef<HTMLButtonElement>>('toggleBtn');
  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  protected readonly isOpen = signal(false);

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => this.close(false));
    inject(DestroyRef).onDestroy(() => this.renderer.removeClass(this.document.body, 'nav-open'));
  }

  protected toggle(): void {
    if (this.isOpen()) this.close();
    else this.openMenu();
  }

  protected onEscape(): void {
    if (this.isOpen()) this.close();
  }

  /** Keep Tab / Shift+Tab inside the panel (plus the toggle button) while open. */
  protected onPanelKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab' || !this.isOpen()) return;
    const focusables = [
      this.toggleButton().nativeElement,
      ...Array.from(this.panel().nativeElement.querySelectorAll<HTMLElement>(FOCUSABLE)),
    ];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = this.document.activeElement;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private openMenu(): void {
    this.isOpen.set(true);
    this.renderer.addClass(this.document.body, 'nav-open');
    // Focus the first link once the panel is rendered.
    queueMicrotask(() => this.panel().nativeElement.querySelector<HTMLElement>(FOCUSABLE)?.focus());
  }

  private close(restoreFocus = true): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.renderer.removeClass(this.document.body, 'nav-open');
    if (restoreFocus) this.toggleButton().nativeElement.focus();
  }
}
