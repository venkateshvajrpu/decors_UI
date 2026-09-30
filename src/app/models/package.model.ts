export interface DecorPackage {
  id: string;
  /** e.g. 'Silver' | 'Gold' | 'Platinum' | 'Muhurtham Special'. */
  name: string;
  teluguName?: string;
  tagline: string;
  /** Starting price in ₹; omit for "on request". */
  priceFrom?: number;
  popular?: boolean;
  /** Event types this tier suits. */
  suitedFor: string[];
  inclusions: string[];
  exclusions?: string[];
}
