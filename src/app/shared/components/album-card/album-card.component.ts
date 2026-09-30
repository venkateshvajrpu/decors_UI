import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { GalleryImage } from '../../../models';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-album-card',
  imports: [NgOptimizedImage, IconComponent],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumCardComponent {
  /** First photo of the album, used as the cover. */
  readonly cover = input.required<GalleryImage>();
  /** Number of photos in the album. */
  readonly count = input.required<number>();
  /** Heading level so the card fits the page outline. */
  readonly headingLevel = input<2 | 3>(3);

  /** Emitted when the card is activated — the page opens the lightbox. */
  readonly opened = output<void>();
}
