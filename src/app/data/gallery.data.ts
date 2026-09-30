import type { GalleryImage } from '../models';

// TODO(client): replace with real event photos under public/images/gallery/<album>/ (keep width/height accurate).
export const GALLERY: GalleryImage[] = [
  // Album: Marriage — Kalyana Mandapam
  { src: 'images/gallery/marriage-kalyanamandapam/mandap.webp', alt: 'Fresh-flower wedding mandapam with marigold and rose décor', album: 'marriage-kalyanamandapam', category: 'marriage', eventType: 'Marriage', venue: 'Kalyana Mandapam, MVP Colony', width: 1200, height: 800 },
  { src: 'images/gallery/marriage-kalyanamandapam/entrance.webp', alt: 'Floral welcome archway at the wedding entrance', album: 'marriage-kalyanamandapam', category: 'marriage', eventType: 'Marriage', venue: 'Kalyana Mandapam, MVP Colony', width: 800, height: 1000 },
  { src: 'images/gallery/marriage-kalyanamandapam/stage.webp', alt: 'Decorated muhurtham stage with kalasham and pillars', album: 'marriage-kalyanamandapam', category: 'marriage', eventType: 'Marriage', venue: 'Kalyana Mandapam, MVP Colony', width: 1200, height: 800 },

  // Album: Reception — Beach Road
  { src: 'images/gallery/reception-beachroad/ring-backdrop.webp', alt: 'Reception ring backdrop with drapes and uplighting', album: 'reception-beachroad', category: 'reception', eventType: 'Reception', venue: 'Banquet Hall, Beach Road', width: 1200, height: 800 },
  { src: 'images/gallery/reception-beachroad/couple-sofa.webp', alt: 'Couple sofa on a floral reception stage', album: 'reception-beachroad', category: 'reception', eventType: 'Reception', venue: 'Banquet Hall, Beach Road', width: 1200, height: 800 },

  // Album: Half-Saree Function — Madhurawada
  { src: 'images/gallery/half-saree-madhurawada/stage.webp', alt: 'Themed floral stage for a half-saree function', album: 'half-saree-madhurawada', category: 'half-saree', eventType: 'Half-Saree Function', venue: 'Community Hall, Madhurawada', width: 1200, height: 800 },
  { src: 'images/gallery/half-saree-madhurawada/name-board.webp', alt: 'Custom name board and photo corner with props', album: 'half-saree-madhurawada', category: 'half-saree', eventType: 'Half-Saree Function', venue: 'Community Hall, Madhurawada', width: 800, height: 1000 },

  // Album: Engagement — Gajuwaka
  { src: 'images/gallery/engagement-gajuwaka/backdrop.webp', alt: 'Engagement stage with floral backdrop and ring table', album: 'engagement-gajuwaka', category: 'engagement', eventType: 'Engagement', venue: 'Function Hall, Gajuwaka', width: 1200, height: 800 },
  { src: 'images/gallery/engagement-gajuwaka/entrance.webp', alt: 'Decorated entrance florals for an engagement', album: 'engagement-gajuwaka', category: 'engagement', eventType: 'Engagement', venue: 'Function Hall, Gajuwaka', width: 1200, height: 800 },

  // Album: Seemantham — Seethammadhara
  { src: 'images/gallery/seemantham-seethammadhara/swing.webp', alt: 'Floral swing setup for a seemantham ceremony', album: 'seemantham-seethammadhara', category: 'seemantham', eventType: 'Seemantham', venue: 'Residence, Seethammadhara', width: 800, height: 1000 },
  { src: 'images/gallery/seemantham-seethammadhara/backdrop.webp', alt: 'Pastel floral backdrop for a baby shower', album: 'seemantham-seethammadhara', category: 'seemantham', eventType: 'Seemantham', venue: 'Residence, Seethammadhara', width: 1200, height: 800 },

  // Album: Gruhapravesam — Anakapalli
  { src: 'images/gallery/gruhapravesam-anakapalli/door.webp', alt: 'Housewarming door décor with mango-leaf thoranam', album: 'gruhapravesam-anakapalli', category: 'gruhapravesam', eventType: 'Gruhapravesam', venue: 'Residence, Anakapalli', width: 1200, height: 800 },
  { src: 'images/gallery/gruhapravesam-anakapalli/muggu.webp', alt: 'Colourful muggu rangoli at the entrance', album: 'gruhapravesam-anakapalli', category: 'gruhapravesam', eventType: 'Gruhapravesam', venue: 'Residence, Anakapalli', width: 800, height: 1000 },

  // Album: Corporate Inauguration — Rushikonda
  { src: 'images/gallery/corporate-rushikonda/stage.webp', alt: 'Branded corporate stage with LED screen', album: 'corporate-rushikonda', category: 'corporate', eventType: 'Corporate Event', venue: 'IT Park, Rushikonda', width: 1200, height: 800 },
  { src: 'images/gallery/corporate-rushikonda/ribbon.webp', alt: 'Ribbon-cutting setup for an office inauguration', album: 'corporate-rushikonda', category: 'corporate', eventType: 'Corporate Event', venue: 'IT Park, Rushikonda', width: 1200, height: 800 },

  // Album: Temple Pandal — Simhachalam
  { src: 'images/gallery/temple-pandal-simhachalam/pandal.webp', alt: 'Festive temple pandal with lighting and drapes', album: 'temple-pandal-simhachalam', category: 'temple', eventType: 'Temple / Festival Pandal', venue: 'Simhachalam', width: 1200, height: 800 },
  { src: 'images/gallery/temple-pandal-simhachalam/stage.webp', alt: 'Decorated deity stage for a temple utsavam', album: 'temple-pandal-simhachalam', category: 'temple', eventType: 'Temple / Festival Pandal', venue: 'Simhachalam', width: 1200, height: 800 },
];
