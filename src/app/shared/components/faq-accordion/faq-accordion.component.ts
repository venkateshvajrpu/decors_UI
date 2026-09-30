import { ChangeDetectionStrategy, Component, ElementRef, inject, input, linkedSignal } from '@angular/core';
import { Faq } from '../../../models';
import { IconComponent } from '../icon/icon.component';

let nextId = 0;

@Component({
  selector: 'app-faq-accordion',
  imports: [IconComponent],
  templateUrl: './faq-accordion.component.html',
  styleUrl: './faq-accordion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqAccordionComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly faqs = input.required<Faq[]>();
  /** Only one panel open at a time. */
  readonly singleOpen = input(true);
  /** Index opened initially; null for all collapsed. */
  readonly initialOpen = input<number | null>(0);

  protected readonly uid = `faq-${nextId++}`;
  /** Open indices; resets whenever `initialOpen` changes. */
  protected readonly open = linkedSignal<ReadonlySet<number>>(() => {
    const initial = this.initialOpen();
    return new Set(initial === null ? [] : [initial]);
  });

  protected isOpen(index: number): boolean {
    return this.open().has(index);
  }

  protected toggle(index: number): void {
    this.open.update((current) => {
      const next = new Set(this.singleOpen() ? [] : current);
      if (current.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  /** Arrow keys / Home / End move focus between question buttons. */
  protected onKeydown(event: KeyboardEvent, index: number): void {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const buttons = Array.from(this.host.nativeElement.querySelectorAll<HTMLButtonElement>('.faq__trigger'));
    const last = buttons.length - 1;
    const target =
      event.key === 'ArrowDown' ? Math.min(index + 1, last)
      : event.key === 'ArrowUp' ? Math.max(index - 1, 0)
      : event.key === 'Home' ? 0
      : last;
    buttons[target]?.focus();
  }
}
