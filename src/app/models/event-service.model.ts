import type { IconName } from './icon.model';

export interface EventService {
  id: string;
  title: string;
  teluguTitle?: string;
  /** Short label such as "Marriage", "Reception". Used in WhatsApp prefills. */
  eventType: string;
  description: string;
  /** Headline selling points shown on the card. */
  features: string[];
  /** What the decor setup covers for this event. */
  inclusions: string[];
  /** Starting price in ₹; omit for "on request". */
  priceFrom?: number;
  /** Path under public/, e.g. `images/services/marriage.webp`. */
  image: string;
  icon: IconName;
}
