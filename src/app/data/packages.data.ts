import type { DecorPackage } from '../models';

// TODO(client): confirm tiers, starting prices and exact inclusions.
export const PACKAGES: DecorPackage[] = [
  {
    id: 'silver',
    name: 'Silver',
    teluguName: 'సిల్వర్',
    tagline: 'Essential décor for intimate functions',
    priceFrom: 25000, // TODO(client): starting price
    suitedFor: ['Gruhapravesam', 'Seemantham', 'Birthday'],
    inclusions: [
      'Stage backdrop (10 ft)',
      'Entrance floral décor',
      'Basic lighting',
      'Guest seating for up to 100',
      'Rangoli & thoranam',
    ],
    exclusions: ['Fresh flower mandapam', 'LED wall', 'DJ / live band'],
  },
  {
    id: 'gold',
    name: 'Gold',
    teluguName: 'గోల్డ్',
    tagline: 'Complete décor for weddings & receptions',
    priceFrom: 60000, // TODO(client): starting price
    popular: true,
    suitedFor: ['Marriage', 'Reception', 'Engagement'],
    inclusions: [
      'Designer stage & backdrop',
      'Fresh flower mandapam',
      'Entrance & walkway décor',
      'Uplighting & fairy lights',
      'PA system & mic',
      'Guest seating for up to 300',
    ],
    exclusions: ['LED video wall', 'Live streaming'],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    teluguName: 'ప్లాటినం',
    tagline: 'Premium end-to-end décor & production',
    priceFrom: 125000, // TODO(client): starting price
    suitedFor: ['Marriage', 'Reception', 'Corporate Event'],
    inclusions: [
      'Themed designer stage',
      'Premium floral mandapam & walls',
      'LED video wall & AV',
      'Chandeliers & effect lighting',
      'DJ / live band setup',
      'Cold fire & photo booth',
      'Dedicated décor manager',
    ],
  },
  {
    id: 'half-saree-special',
    name: 'Half-Saree Special',
    teluguName: 'హాఫ్ శారీ స్పెషల్',
    tagline: 'Themed bundle for the Ritu Kala Samskara ceremony',
    priceFrom: 35000, // TODO(client): starting price
    suitedFor: ['Half-Saree Function'],
    inclusions: [
      'Themed floral stage',
      'Custom name board',
      'Decorated ceremonial seat',
      'Photo booth with props',
      'Lighting & rangoli',
    ],
  },
];
