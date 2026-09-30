import type { IconName } from './icon.model';

export type CatalogueTag = 'popular' | 'premium' | 'signature' | 'new' | 'seasonal';

export interface CatalogueItem {
  name: string;
  teluguName?: string;
  description: string;
  tags?: CatalogueTag[];
  /** Pricing unit, e.g. "per day", "per piece", "per 100 guests". */
  unit?: string;
  /** Optional path under public/, e.g. `images/catalogue/mandap-flowers.webp`. */
  image?: string;
}

export interface CatalogueCategory {
  /** URL-safe id, also used for the category filter and image file names. */
  id: string;
  title: string;
  teluguTitle?: string;
  description: string;
  icon: IconName;
  items: CatalogueItem[];
}
