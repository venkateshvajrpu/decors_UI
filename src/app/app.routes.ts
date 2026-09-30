import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent) },
  { path: 'services', loadComponent: () => import('./pages/services/services.component').then((m) => m.ServicesComponent) },
  { path: 'decor', loadComponent: () => import('./pages/decor/decor.component').then((m) => m.DecorComponent) },
  { path: 'packages', loadComponent: () => import('./pages/packages/packages.component').then((m) => m.PackagesComponent) },
  { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component').then((m) => m.GalleryComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent) },
  // Explicit /404 so a real 404.html is emitted for static hosts; ** catches everything else client-side.
  { path: '404', loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent) },
];
