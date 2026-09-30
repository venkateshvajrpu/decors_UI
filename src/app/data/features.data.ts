import type { Feature } from '../models';

// TODO(client): adjust the "why choose us" points to match real strengths.
export const WHY_US: Feature[] = [
  { icon: 'speaker', title: 'Own lighting & sound gear', teluguTitle: 'మా స్వంత లైటింగ్ & సౌండ్', text: 'DJ consoles, fly (line-array) sound, stage lighting and LED — all our own, ready for any size event.' },
  { icon: 'truck', title: 'Everything under one roof', text: 'Lighting, sound, stage, pandals, flowers, balloon décor and generators — supplied and set up by one team.' },
  { icon: 'bulb', title: 'Power backup included', text: 'Silent generators on standby so the lights and music never stop, even on open grounds.' },
  { icon: 'clock', title: 'On-time setup', teluguTitle: 'సమయపాలన', text: 'Muhurtham timings are sacred. We plan backwards so everything is ready before guests arrive.' },
  { icon: 'palette', title: 'Styled to your theme', text: 'Every function is set up to your colours, theme and budget — no cookie-cutter setups.' },
];

// TODO(client): confirm the booking process.
export const HOW_IT_WORKS: Feature[] = [
  { icon: 'pin', title: 'Site visit', text: 'We visit your venue, understand the function and note space, power and access.' },
  { icon: 'palette', title: 'Design & mockup', text: 'We share a theme, décor plan and a mockup with transparent pricing.' },
  { icon: 'whatsapp', title: 'Confirm with advance', text: 'Lock the date with a small advance once the design and quote are approved.' },
  { icon: 'sparkler', title: 'Setup day', text: 'Our team arrives early and sets up flowers, stage, lighting and seating on time.' },
  { icon: 'truck', title: 'Teardown & pickup', text: 'After the function we dismantle and clear everything, leaving the venue clean.' },
];

// TODO(client): confirm roles / add photos.
export const TEAM: Feature[] = [
  { icon: 'star', title: 'R. Rajendra Rao — Proprietor', text: 'Leads the business and every event, making sure each function is set up right.' },
  { icon: 'speaker', title: 'R. Dileep Kumar — Sound & Lighting', text: 'Handles DJ, fly sound and stage lighting so every moment is seen and heard clearly.' },
  { icon: 'palette', title: 'Decoration Team', text: 'Sets up stage, pandals, flowers and balloon décor to your theme.' },
];
