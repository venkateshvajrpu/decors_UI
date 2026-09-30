import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, computed, input, output, signal, viewChild } from '@angular/core';
import { GalleryImage } from '../../../models';
import { IconComponent } from '../icon/icon.component';

/**
 * Minimal gallery viewer on a native <dialog> (focus trap, Esc and backdrop
 * handled by the platform). Parent calls `open(index)`.
 */
@Component({
  selector: 'app-image-lightbox',
  imports: [NgOptimizedImage, IconComponent],
  templateUrl: './image-lightbox.component.html',
  styleUrl: './image-lightbox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(keydown)': 'onKeydown($event)',
    '(click)': 'onBackdropClick($event)',
  },
})
export class ImageLightboxComponent {
  readonly images = input.required<GalleryImage[]>();
  readonly closed = output<void>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly index = signal(0);
  protected readonly isOpen = signal(false);
  protected readonly current = computed(() => this.images()[this.index()]);
  protected readonly count = computed(() => this.images().length);

  open(index: number): void {
    this.index.set(Math.max(0, Math.min(index, this.count() - 1)));
    this.isOpen.set(true);
    const dialog = this.dialog().nativeElement;
    if (typeof dialog.showModal === 'function' && !dialog.open) dialog.showModal();
  }

  close(): void {
    const dialog = this.dialog().nativeElement;
    if (dialog.open) dialog.close();
    else this.onDialogClose();
  }

  next(): void {
    this.index.update((i) => (i + 1) % this.count());
  }

  prev(): void {
    this.index.update((i) => (i - 1 + this.count()) % this.count());
  }

  protected onDialogClose(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.closed.emit();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') this.next();
    else if (event.key === 'ArrowLeft') this.prev();
  }

  /** Close when the backdrop (the dialog element itself) is clicked. */
  protected onBackdropClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.close();
  }
}
