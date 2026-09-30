/** Data-driven album key (see GALLERY_ALBUMS in gallery.data.ts). */
export type GalleryCategory = string;

export interface GalleryImage {
  /** Path under public/, e.g. `images/gallery/marriage-mvp/mandap.webp`. */
  src: string;
  alt: string;
  /** Album id this photo belongs to — the primary grouping for the gallery. */
  album: string;
  /** Legacy flat-filter key; kept so the current gallery filter compiles until the album UI lands. */
  category: GalleryCategory;
  /** Human-readable event type, e.g. "Marriage", "Half-Saree Function". */
  eventType: string;
  /** Optional venue name. */
  venue?: string;
  width: number;
  height: number;
}
