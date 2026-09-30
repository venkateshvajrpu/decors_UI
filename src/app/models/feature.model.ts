import type { IconName } from './icon.model';

/** Generic icon + title + text block (why-us points, process steps, standards, team roles). */
export interface Feature {
  icon: IconName;
  title: string;
  text: string;
  teluguTitle?: string;
}
