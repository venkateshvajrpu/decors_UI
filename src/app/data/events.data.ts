import type { EventService } from '../models';

// TODO(client): confirm event types, starting prices and replace images under public/images/services/.
export const EVENTS: EventService[] = [
  {
    id: 'marriage',
    title: 'Marriage / Muhurtham',
    teluguTitle: 'పెళ్ళి / ముహూర్తం',
    eventType: 'Marriage',
    description:
      'Complete muhurtham décor — mandapam, stage, entrance, florals and lighting, styled to your tradition and colours.',
    features: ['Full mandapam & stage', 'Fresh flower décor', 'Entrance & walkway', 'Lighting & seating'],
    inclusions: ['Mandapam & pillars', 'Bride/groom garlands', 'Kalasham & ritual setup', 'PA & lighting', 'Guest seating & carpet'],
    priceFrom: 75000, // TODO(client): starting price
    image: 'images/services/marriage.webp',
    icon: 'wedding',
  },
  {
    id: 'reception',
    title: 'Reception & Sangeet',
    teluguTitle: 'రిసెప్షన్ & సంగీత్',
    eventType: 'Reception',
    description: 'Glamorous reception stages and sangeet setups with LED walls, ring backdrops and effect lighting.',
    features: ['Designer stage backdrop', 'Couple sofa & props', 'DJ & LED wall', 'Mood lighting'],
    inclusions: ['Ring / panel backdrop', 'Stage sofa & carpet', 'Uplighting & par cans', 'DJ setup on request', 'Photo area'],
    priceFrom: 45000, // TODO(client): starting price
    image: 'images/services/reception.webp',
    icon: 'stage',
  },
  {
    id: 'half-saree',
    title: 'Half-Saree Function (Ritu Kala Samskara)',
    teluguTitle: 'హాఫ్ శారీ వేడుక',
    eventType: 'Half-Saree Function',
    description: 'Vibrant themed décor for the half-saree ceremony — floral stages, name boards and photo corners.',
    features: ['Themed floral stage', 'Custom name board', 'Photo booth', 'Traditional setup'],
    inclusions: ['Floral / shimmer backdrop', 'Decorated seat', 'Name board & props', 'Lighting', 'Rangoli & thoranam'],
    priceFrom: 30000, // TODO(client): starting price
    image: 'images/services/half-saree.webp',
    icon: 'flower',
  },
  {
    id: 'engagement',
    title: 'Engagement / Nischitartham',
    teluguTitle: 'నిశ్చితార్థం',
    eventType: 'Engagement',
    description: 'Elegant engagement décor with ring backdrops, floral stages and ceremonial ritual setups.',
    features: ['Ring backdrop', 'Floral stage', 'Ritual table setup', 'Welcome décor'],
    inclusions: ['Backdrop & stage', 'Ring exchange table', 'Kalasham setup', 'Entrance florals', 'Lighting'],
    priceFrom: 30000, // TODO(client): starting price
    image: 'images/services/engagement.webp',
    icon: 'ring',
  },
  {
    id: 'seemantham',
    title: 'Seemantham (Baby Shower)',
    teluguTitle: 'సీమంతం',
    eventType: 'Seemantham',
    description: 'Warm, traditional seemantham décor with floral swings, palapitcha setup and pastel themes.',
    features: ['Floral swing / seat', 'Palapitcha setup', 'Pastel theme', 'Photo corner'],
    inclusions: ['Decorated swing or seat', 'Backdrop & florals', 'Palapitcha arrangement', 'Name board', 'Lighting'],
    priceFrom: 25000, // TODO(client): starting price
    image: 'images/services/seemantham.webp',
    icon: 'garland',
  },
  {
    id: 'barasala',
    title: 'Barasala & First Birthday',
    teluguTitle: 'బారసాల & మొదటి పుట్టినరోజు',
    eventType: 'Barasala',
    description: 'Cheerful naming-ceremony and first-birthday décor with themed backdrops, balloons and cradle setups.',
    features: ['Themed backdrop', 'Cradle décor', 'Balloon styling', 'Photo booth'],
    inclusions: ['Theme backdrop', 'Decorated cradle', 'Balloon arch', 'Name board', 'Photo area'],
    priceFrom: 20000, // TODO(client): starting price
    image: 'images/services/barasala.webp',
    icon: 'cake',
  },
  {
    id: 'gruhapravesam',
    title: 'Gruhapravesam / Housewarming',
    teluguTitle: 'గృహప్రవేశం',
    eventType: 'Gruhapravesam',
    description: 'Auspicious housewarming décor with mango-leaf thoranam, muggu, kalasham and entrance florals.',
    features: ['Entrance florals', 'Thoranam & muggu', 'Kalasham setup', 'Pooja arrangement'],
    inclusions: ['Door & gate florals', 'Mango-leaf thoranam', 'Rangoli / muggu', 'Kalasham & pooja setup', 'Lamps'],
    priceFrom: 15000, // TODO(client): starting price
    image: 'images/services/gruhapravesam.webp',
    icon: 'home',
  },
  {
    id: 'birthday-anniversary',
    title: 'Birthday & Anniversary',
    teluguTitle: 'పుట్టినరోజు & వార్షికోత్సవం',
    eventType: 'Birthday',
    description: 'Fun and elegant party décor for birthdays and anniversaries — balloons, backdrops and lighting.',
    features: ['Custom theme backdrop', 'Balloon décor', 'Cake table', 'Mood lighting'],
    inclusions: ['Theme backdrop', 'Balloon styling', 'Decorated cake table', 'Props & name board', 'Lighting'],
    priceFrom: 12000, // TODO(client): starting price
    image: 'images/services/birthday.webp',
    icon: 'sparkler',
  },
  {
    id: 'corporate',
    title: 'Corporate Events & Inaugurations',
    teluguTitle: 'కార్పొరేట్ కార్యక్రమాలు',
    eventType: 'Corporate Event',
    description: 'Professional stages, branding backdrops, ribbon-cutting and AV for launches, conferences and openings.',
    features: ['Branded stage & backdrop', 'AV & LED screens', 'Ribbon-cutting setup', 'Seating & branding'],
    inclusions: ['Stage & branded backdrop', 'PA & LED screen', 'Podium & ribbon setup', 'Delegate seating', 'Lighting'],
    priceFrom: 40000, // TODO(client): starting price
    image: 'images/services/corporate.webp',
    icon: 'briefcase',
  },
  {
    id: 'temple-pandals',
    title: 'Temple & Festival Pandals',
    teluguTitle: 'ఆలయ & పండుగ పందిళ్లు',
    eventType: 'Temple / Festival Pandal',
    description: 'Devotional pandals, stages and lighting for temple utsavams, festivals and community functions.',
    features: ['Pandal & stage', 'Deity backdrop', 'Festive lighting', 'Sound system'],
    inclusions: ['Pandal / shamiana', 'Decorated stage & backdrop', 'Festive lighting', 'PA system', 'Seating'],
    // priceFrom omitted — on request
    image: 'images/services/temple-pandals.webp',
    icon: 'festival',
  },
];
