import { ChangeDetectionStrategy, Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { SITE_CONFIG } from '../../config/site.config';
import { RevealOnScrollDirective } from '../../core/directives/reveal-on-scroll.directive';
import { SeoService } from '../../core/services/seo.service';
import { GALLERY } from '../../data';
import { GalleryImage } from '../../models';
import { AlbumCardComponent, CtaBannerComponent, ImageLightboxComponent, SectionHeadingComponent } from '../../shared';

interface Album {
  id: string;
  cover: GalleryImage;
  images: GalleryImage[];
}

/** Group the flat photo list into albums, preserving data order. */
function groupAlbums(images: readonly GalleryImage[]): Album[] {
  const map = new Map<string, Album>();
  for (const image of images) {
    const existing = map.get(image.album);
    if (existing) existing.images.push(image);
    else map.set(image.album, { id: image.album, cover: image, images: [image] });
  }
  return [...map.values()];
}

@Component({
  selector: 'app-gallery',
  imports: [RevealOnScrollDirective, SectionHeadingComponent, AlbumCardComponent, ImageLightboxComponent, CtaBannerComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit {
  private readonly seo = inject(SeoService);
  protected readonly config = inject(SITE_CONFIG);
  private readonly lightbox = viewChild.required(ImageLightboxComponent);

  protected readonly albums = groupAlbums(GALLERY);
  /** Photos currently loaded into the lightbox (the selected album). */
  protected readonly lightboxImages = signal<GalleryImage[]>([]);

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Gallery',
      description: `Photos from ${this.config.name} events in ${this.config.address.city}: weddings, receptions, half-saree functions, housewarmings and more — grouped by event.`,
      path: 'gallery',
    });
  }

  protected openAlbum(album: Album): void {
    this.lightboxImages.set(album.images);
    this.lightbox().open(0);
  }
}
