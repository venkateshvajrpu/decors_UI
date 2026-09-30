/** Primary navigation. Shared by navbar and footer quick links. */
export interface NavLink {
  path: string;
  label: string;
  exact?: boolean;
}

export const NAV_LINKS: readonly NavLink[] = [
  { path: '/', label: 'Home', exact: true },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/decor', label: 'Decor' },
  { path: '/packages', label: 'Packages' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];
