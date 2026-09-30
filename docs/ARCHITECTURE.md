# Architecture

Technical architecture of the wedding & event decoration website. Read this before adding or changing any structural piece.

---

## 1. System Overview

```
┌──────────────────────────────────────────────────────────────┐
│                         Build time                           │
│                                                              │
│  site.config.ts ─┐                                           │
│  data/*.data.ts ─┼─▶ Angular standalone app ─▶ @angular/ssr  │
│  models/*.ts    ─┘        (OnPush, signals)     prerender    │
│                                                     │        │
│                                                     ▼        │
│                                   dist/<app>/browser/        │
│                                   ├── index.html             │
│                                   ├── about/index.html       │
│                                   ├── menu/index.html        │
│                                   ├── services/index.html    │
│                                   ├── gallery/index.html     │
│                                   ├── contact/index.html     │
│                                   ├── 404.html               │
│                                   ├── robots.txt sitemap.xml │
│                                   └── *.js *.css images/     │
└──────────────────────────────────────────────────────────────┘
                                │
                                ▼
                 Static host (Netlify / Vercel / GitHub Pages / S3)
                                │
                                ▼
              Browser: hydrates prerendered HTML, then SPA routing
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
        wa.me/<num>        tel:<num>        mailto:<email>
        (WhatsApp)         (Phone)           (Email)
```

There is **no server at runtime**. Prerendering happens once at build. The output is plain files.

---

## 2. Layered Structure

```
src/app/
├── config/        Layer 0  Branding constants (SITE_CONFIG)
├── models/        Layer 0  TypeScript interfaces
├── data/          Layer 1  Typed content arrays (depends on models)
├── core/          Layer 2  Singleton services + directives (depends on config)
├── shared/        Layer 3  Reusable presentational components (depends on core, models)
├── pages/         Layer 4  Route components (depends on everything below)
└── app.*          Layer 5  Shell, routing, providers
```

**Dependency rule:** a layer may import only from layers below it. `shared/` never imports from `pages/`. `data/` never imports from `core/`.

---

## 3. Key Modules

### 3.1 `config/site.config.ts` — Branding single source of truth

```ts
export interface SiteConfig {
  name: string;               // "Sri Annapurna Caterers"
  tagline: string;
  legalName?: string;
  phone: string;              // "+91XXXXXXXXXX"
  whatsapp: string;           // digits only, country code included
  email: string;
  address: { line1: string; line2?: string; city: string; state: string; pincode: string; };
  mapEmbedUrl: string;        // Google Maps embed iframe src
  mapLink: string;            // Google Maps share link for "Get directions"
  hours: { days: string; open: string; close: string }[];
  socials: { platform: 'instagram' | 'facebook' | 'youtube'; url: string }[];
  serviceAreas: string[];     // ["Visakhapatnam", "Vizianagaram", ...]
  siteUrl: string;            // canonical origin for SEO
  defaultOgImage: string;
  establishedYear?: number;   // "serving since" copy on About
}

export const SITE_CONFIG = new InjectionToken<SiteConfig>('SITE_CONFIG');
export const siteConfig: SiteConfig = { /* ... */ };
```

Provided once in `app.config.ts`. Injected with `inject(SITE_CONFIG)` anywhere.

### 3.2 `models/` — Contracts

- `icon.model.ts`: `IconName` union — keys of the inline-SVG icon set (no icon fonts). `icon` fields below are typed with it.
- `catalogue.model.ts`: `CatalogueCategory { id, title, teluguTitle?, description, icon: IconName, items: CatalogueItem[] }`, `CatalogueItem { name, teluguName?, description, tags?: CatalogueTag[], unit?, image? }`, `CatalogueTag = 'popular' | 'premium' | 'signature' | 'new' | 'seasonal'`.
- `event-service.model.ts`: `EventService { id, title, teluguTitle?, eventType, description, features: string[], inclusions: string[], priceFrom?, image, icon }`.
- `package.model.ts`: `DecorPackage { id, name, teluguName?, tagline, priceFrom?, popular?, suitedFor: string[], inclusions: string[], exclusions? }`.
- `testimonial.model.ts`: `Testimonial { name, event, location, quote, rating }`.
- `gallery.model.ts`: `GalleryImage { src, alt, album, category, eventType, venue?, width, height }` — grouped into albums by the gallery page.
- `faq.model.ts`: `Faq { question, answer }`.
- `feature.model.ts`: `Feature { icon: IconName, title, text, teluguTitle? }` — generic block used by `data/features.data.ts` (`WHY_US`, `HOW_IT_WORKS`, `TEAM`) so page copy stays editable outside components.

### 3.3 `data/` — Content

Pure exported constants. No logic. Each file exports one array typed by its model. Placeholder entries carry `// TODO(client):`.

### 3.4 `core/services/`

| Service | Responsibility |
|---|---|
| `SeoService` | `setPage({ title, description, path, image? })` → sets `<title>`, meta description, OG tags, canonical link, and a LocalBusiness JSON-LD `<script>` built from `SITE_CONFIG`. Uses `SITE_CONFIG.siteUrl` |
| `WhatsappService` | `link(message?: string): string` → `https://wa.me/<num>?text=<encoded>`. Helper builders: `general()`, `forCatalogue(category)`, `forService(service)`, `forPackage(pkg)`, `customQuote()`; plus `telHref()` and `mailtoHref(subject?)` so templates never assemble contact links |
| `ScrollService` (optional) | Smooth scroll to anchor, guarded for browser platform |

### 3.5 `core/directives/`

- `RevealOnScrollDirective` (`appReveal`): runs in `afterNextRender` (browser-only, post-hydration). Adds `.reveal` then `.is-visible` when the element enters the viewport via `IntersectionObserver`. Prerendered HTML never carries `.reveal`, so pages read fine without JS. No-ops under `prefers-reduced-motion` or without `IntersectionObserver`.

### 3.6 `shared/components/`

Presentational only. Receive data via `input()`, emit via `output()`. No app-service injection except `SITE_CONFIG` and `WhatsappService` (Angular's `Router`/`RouterLink` are allowed in navbar/footer). Navigation links live once in `shared/nav-links.ts` and feed both navbar and footer.

| Component | Purpose |
|---|---|
| `icon` | Inline SVG icon set keyed by `IconName` (`@switch`); decorative by default, `label` input exposes it as an image |
| `navbar` | Sticky header, logo/name from config, nav links, mobile hamburger, "Book Now" WhatsApp CTA |
| `footer` | Address, hours, quick links, socials, copyright |
| `whatsapp-fab` | Fixed floating WhatsApp button |
| `section-heading` | Eyebrow + title + kolam underline |
| `cta-banner` | "Plan your event" strip with WhatsApp + call buttons |
| `catalogue-item-card` | One catalogue item (with `unit`) |
| `service-card` | One event service (with `priceFrom`) |
| `package-card` | One package tier (inclusions/exclusions, `--popular` variant) |
| `album-card` | One gallery album cover (event type, venue, photo count) → opens `image-lightbox` |
| `testimonial-card` | One review |
| `faq-accordion` | Accessible disclosure list — `<button aria-expanded aria-controls>` + region, arrow-key navigation, `singleOpen` input |
| `image-lightbox` | Minimal gallery viewer on native `<dialog>` (platform focus trap + Esc); parent calls `open(index)` via `viewChild` |

### 3.7 `pages/`

Each page is a lazy standalone component. Composes shared components + data. Calls `SeoService.setPage()` in `ngOnInit`.

| Route | Component | Data used |
|---|---|---|
| `/` | `HomeComponent` | catalogue (featured), events (preview), testimonials, `WHY_US` |
| `/about` | `AboutComponent` | config (serviceAreas, establishedYear), `WHY_US`, `TEAM` |
| `/services` | `ServicesComponent` | events, faqs, `HOW_IT_WORKS` |
| `/decor` | `DecorComponent` | catalogue (all, with signal-based category filter) |
| `/packages` | `PackagesComponent` | packages |
| `/gallery` | `GalleryComponent` | gallery (grouped into albums) |
| `/contact` | `ContactComponent` | config (phone, whatsapp, email, address, map, hours) |
| `/404`, `**` | `NotFoundComponent` | — (sets `noindex`) |

### 3.8 App shell & routing

- `app.component`: `<a class="skip-link">` + `<app-navbar>` + `<main id="main"><router-outlet/></main>` + `<app-footer>` + `<app-whatsapp-fab>`.
- `app.routes.ts`: lazy `loadComponent` per page; explicit `404` route plus `**` wildcard (both `NotFoundComponent`; the 404 page also calls `SeoService.setNoIndex()`). Pages call `SeoService.setPage()` directly in `ngOnInit` — routes carry no SEO `data`.
- `app.config.ts`: `provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }), withViewTransitions(), withComponentInputBinding())`, `provideClientHydration(withEventReplay())`, `{ provide: SITE_CONFIG, useValue: siteConfig }`. Input binding lets the decor page read `?category=` as an `input()`.
- `app.routes.server.ts`: `{ path: '**', renderMode: RenderMode.Prerender }`.

---

## 4. Styling Architecture

```
src/styles.css
  @import './styles/tokens.css';   /* design tokens: --color-*, --space-*, --font-*, --radius-*, --shadow-* */
  @import './styles/base.css';     /* metric-matched font fallbacks, reset, typography, focus, .btn primitives, reduced-motion */
  @import './styles/layout.css';   /* .container, .section, .grid-*, .stack */
  @import './styles/motifs.css';   /* .kolam-divider, .temple-arch, .petal-card, .mandala-bg */
```

- Global = tokens + primitives + motifs only.
- Every component owns its CSS (Angular emulated encapsulation).
- Theme swap for a new client = edit `tokens.css` only.

---

## 5. Data Flow

```
data/*.data.ts  ──(import)──▶  page component  ──(input())──▶  shared card component
                                     │
                                     ├── computed() filters (e.g. menu category)
                                     └── WhatsappService.forX(...) → href
site.config.ts  ──(inject SITE_CONFIG)──▶ navbar / footer / contact / seo / whatsapp
```

No HTTP. No state library. Signals inside components are enough.

---

## 6. Build & Deploy Pipeline

```
npm run build
  └─ prebuild           (scripts/generate-seo-files.mjs → robots.txt, sitemap.xml from site.config)
  └─ ng build            (outputMode: static — browser bundle only, no Node server)
       └─ prerender      (visits every route, writes static HTML)
            └─ dist/<app>/browser/   ← deploy this folder
```

- `postbuild` (`scripts/postbuild.mjs`) copies `404/index.html` → `404.html`, which Netlify, Vercel and GitHub Pages serve for unknown paths.
- `netlify.toml`: `publish = "dist/<app>/browser"`, explicit `/* → /404.html 404`, immutable cache headers for hashed assets.
- `vercel.json`: `outputDirectory`, `cleanUrls`, cache headers. `404.html` is picked up automatically.
- GitHub Pages: deploy `browser/` folder; set `baseHref` if hosted under a sub-path.

---

## 7. Performance Budget

| Metric | Target |
|---|---|
| Initial JS (gzipped transfer) | < 250 KB (angular.json budget: 400 KB warn / 500 KB error, uncompressed) |
| Largest image | < 500 KB (hero), < 300 KB (others) |
| LCP | < 2.5 s on mid-range mobile |
| CLS | < 0.1 |
| Lighthouse | 90+ all categories |

Enforced via `angular.json` budgets and `NgOptimizedImage`.

---

## 8. Extension Points

| Want to… | Do this |
|---|---|
| Add a catalogue item | Append to the right category in `data/catalogue.data.ts` |
| Add a catalogue category | Add `CatalogueCategory` entry; decor page filter picks it up automatically |
| Add an event | Append to `data/events.data.ts` |
| Add a package | Append to `data/packages.data.ts` |
| Add a page | Create `pages/<name>/`, add lazy route with `data.title/description`, add to navbar links + `sitemap.xml` |
| Rebrand | Edit `config/site.config.ts` + `styles/tokens.css` + `public/images/` |
| Add a real form later | Create `core/services/enquiry.service.ts` calling a static-form API; contact page swaps the WhatsApp CTA for the form. Nothing else changes |
| Add i18n (Telugu UI) | Use Angular `@angular/localize`; strings already flow through templates only |
