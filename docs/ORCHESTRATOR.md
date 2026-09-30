# Orchestrator

The step-by-step execution playbook for building (and later extending) this site. Each phase has an entry condition, tasks, and an exit gate. Do not start a phase until the previous gate passes.

Companion docs: [PROJECT_RULES.md](PROJECT_RULES.md), [ARCHITECTURE.md](ARCHITECTURE.md), [../PLAN.md](../PLAN.md).

---

## Phase 0 — Scaffold

**Entry:** empty repo with `.git`.

1. `ng new --ssr --style=css --skip-git` into the current folder (Angular 22: standalone + zoneless by default; tests run on Vitest).
2. Set `angular.json` → `outputMode: "static"` and remove the `ssr.entry` / `src/server.ts` / `express` that `--ssr` adds. `app.routes.server.ts` keeps `RenderMode.Prerender` for `**`. Result: build emits only `dist/<app>/browser`, no Node server bundle.
   Also set `schematics` defaults (`type: "component" | "directive" | "service"`, `changeDetection: "OnPush"`) so `ng generate` keeps the `.component.ts` naming required by PROJECT_RULES §3.
3. Add `.editorconfig`, `.prettierrc`, confirm `.gitignore` covers `node_modules`, `dist`, `.angular`.
4. Set `angular.json` budgets: initial 400 KB warning / 500 KB error (uncompressed; ≈ 110–140 KB gzipped).
5. Add npm scripts: `start`, `build`, `build:prod`, `serve:static` (`npx serve dist/<app>/browser`), `lint`.

**Gate:** `npm run build` succeeds and `dist/<app>/browser/index.html` contains rendered text (not an empty `<app-root>`).

---

## Phase 1 — Design System

**Entry:** Phase 0 gate passed.

1. `src/styles/tokens.css` — colors, spacing scale (`--space-1..12`), font families, type scale, radii, shadows, z-index scale, breakpoints as comments.
2. `src/styles/base.css` — modern reset, `html { scroll-behavior }`, body font/color/background, heading scale, link styles, `:focus-visible`, `@media (prefers-reduced-motion)`.
3. `src/styles/layout.css` — `.container`, `.section`, `.section--alt`, `.grid`, `.grid--2/3/4`, `.stack`, `.cluster`.
4. `src/styles/motifs.css` — `.kolam-divider` (inline SVG data URI), `.temple-arch` (clip-path / radial-gradient scallops), `.petal-card`, `.mandala-bg`.
5. `src/index.html` — `lang="en"`, `theme-color`, Google Fonts `preconnect` + stylesheet. No JSON-LD here: `SeoService` injects LocalBusiness JSON-LD from `SITE_CONFIG` at render time (Phase 3), so rebranding stays single-file.
6. `styles.css` imports the four files in order.

**Gate:** A throwaway test page renders headings, buttons, a card, and a divider using only tokens. No hex values outside `tokens.css`.

---

## Phase 2 — Config, Models, Data

**Entry:** Phase 1 gate passed.

1. `models/` — all interfaces from ARCHITECTURE §3.2.
2. `config/site.config.ts` — `SiteConfig` interface, `SITE_CONFIG` token, `siteConfig` constant with placeholder values marked `TODO(client)`.
3. `data/catalogue.data.ts` — 8 categories (flowers, backdrops & stage, lighting, sound & AV, mandapam, furniture, traditional items, entertainment), 6–12 items each with Telugu names and `unit`.
4. `data/events.data.ts` — 10 events (marriage, reception, half-saree, engagement, seemantham, barasala, gruhapravesam, birthday/anniversary, corporate, temple pandals) with `inclusions` and `priceFrom`.
5. `data/packages.data.ts` — 3–4 tiers plus an event-specific bundle.
6. `data/testimonials.data.ts` — 6 entries with Vizag-area locations.
7. `data/gallery.data.ts` — 6–8 albums pointing at `public/images/gallery/<album>/*`.
8. `data/faqs.data.ts` — 8 entries.
8. Register `SITE_CONFIG` provider in `app.config.ts`.

**Gate:** `tsc` passes. `grep -rn "TODO(client)" src/` lists every placeholder. No component imports yet.

---

## Phase 3 — Core

**Entry:** Phase 2 gate passed.

1. `core/services/seo.service.ts` — `setPage()`; uses `Title`, `Meta`, `DOCUMENT` for canonical.
2. `core/services/whatsapp.service.ts` — `link()`, `general()`, `forCatalogue()`, `forService()`, `forPackage()`, `customQuote()`.
3. `core/directives/reveal-on-scroll.directive.ts` — platform-guarded `IntersectionObserver`.
4. Unit tests for `SeoService` and `WhatsappService` (link encoding, config usage).

**Gate:** `ng test` passes for core. Services are `providedIn: 'root'`.

---

## Phase 4 — Shared Components

**Entry:** Phase 3 gate passed.

Build in this order (each depends only on earlier ones):

1. `section-heading`
2. `cta-banner`
3. `whatsapp-fab`
4. `catalogue-item-card`, `service-card`, `package-card`, `album-card`, `testimonial-card`
5. `faq-accordion`
6. `image-lightbox`
7. `navbar` (mobile menu, focus trap, active link)
8. `footer`

Rules per component: OnPush, `input()`/`output()`, separate `.html`/`.css`, tokens only, keyboard operable.

**Gate:** Each component renders in isolation in a scratch route with sample data at 360px and 1280px. Navbar mobile menu works with keyboard.

---

## Phase 5 — Pages

**Entry:** Phase 4 gate passed.

Build in this order:

1. `pages/home` — hero, why-us, featured categories, services preview, testimonials, CTA.
2. `pages/decor` — category filter (signal), item grid, custom-quote CTA.
3. `pages/services` — cards, how-it-works, FAQs.
4. `pages/packages` — tier cards, indicative-pricing note, CTA.
5. `pages/about` — story, philosophy, what sets us apart, team, service areas.
6. `pages/gallery` — album grid + lightbox.
7. `pages/contact` — contact cards, hours, map iframe, WhatsApp CTA.
8. `pages/not-found`.

Each page: `SeoService.setPage()` in `ngOnInit`, one `<h1>`, `appReveal` on sections.

**Gate:** All routes render prerendered HTML with correct `<title>` and meta description. No hydration warnings in console.

---

## Phase 6 — Shell & Routing

**Entry:** Phase 5 gate passed.

1. `app.routes.ts` — lazy `loadComponent` for each page, an explicit `404` path (so `404/index.html` is emitted for static hosts) and a `**` wildcard, both loading `NotFoundComponent`. SEO is set in each page's `ngOnInit` via `SeoService.setPage()`; routes carry no `data`.
2. `app.config.ts` — router with scroll restoration + view transitions, hydration with event replay.
3. `app.component` — skip-link, navbar, main, footer, fab.

**Gate:** Deep-link refresh on every route works from the static build served locally. Back/forward restores scroll.

---

## Phase 7 — Production Assets

**Entry:** Phase 6 gate passed.

1. `public/robots.txt` and `public/sitemap.xml` are **generated** by `scripts/generate-seo-files.mjs` from `site.config.ts` + `shared/nav-links.ts` (runs as `prebuild`; also `npm run seo:generate`). Never edit them by hand.
2. Favicon set: edit `public/favicon.svg`, then `npm run images:favicons` regenerates `favicon.ico`, `apple-touch-icon.png`, `icon-512.png`. `public/manifest.webmanifest` is hand-maintained.
3. Open Graph default image in `public/images/og-default.jpg`.
4. Verify LocalBusiness JSON-LD (emitted by `SeoService` from `siteConfig`) is present in every prerendered page: `grep -l 'application/ld+json' dist/<app>/browser/**/index.html`.
5. Images: `npm run images:placeholders` writes brand-coloured placeholder WebPs for every image referenced by the data files (manifest lives in `scripts/images.mjs`). Real photos: drop JPG/PNG into `assets-src/` mirroring `public/images/`, run `npm run images:convert`.

**Gate:** `curl` the served build for `/robots.txt`, `/sitemap.xml`, `/favicon.ico` → all 200.

---

## Phase 8 — Deploy Config & Docs

**Entry:** Phase 7 gate passed.

1. `netlify.toml`, `vercel.json`.
2. `README.md`: prerequisites, scripts, rebrand steps, replace-images steps, edit-menu steps, deploy to Netlify / Vercel / GitHub Pages.

**Gate:** A fresh clone can `npm i && npm run build` and deploy following README alone.

---

## Phase 9 — Quality Gate (release)

**Entry:** Phase 8 gate passed.

1. Lighthouse on served build: 90+ on all four categories, mobile preset. Headless: `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npx lighthouse http://localhost:3000/ --chrome-flags="--headless=new"`. If CLS creeps up after a font change, re-measure the fallback metrics in `base.css` (see the comment there).
2. Manual pass at 360 / 768 / 1280 px on every page.
3. Keyboard-only walkthrough of nav, accordion, lightbox.
4. Rebrand smoke test: change `siteConfig.name`, rebuild, confirm it appears in navbar, footer, `<title>`, WhatsApp message.
5. `grep -rn "TODO(client)"` list handed to client as the replacement checklist.

**Gate:** All checks pass. Tag `v1.0.0`.

---

## Extending After Launch

| Request | Phases to re-run |
|---|---|
| Add catalogue items / events / packages | Phase 2 (data) → Phase 9 (quick check) |
| New page | Phase 5 → 6 → 7 (sitemap) → 9 |
| New client rebrand | Phase 2 (config) → Phase 1 (tokens) → Phase 7 (images, OG) → 9 |
| Add contact form | Phase 3 (new service) → Phase 5 (contact page) → 9 |

---

## Task Handoff Template

When delegating a phase (to a person or an AI agent), give:

```
Phase: <n> — <name>
Read first: docs/PROJECT_RULES.md, docs/ARCHITECTURE.md §<relevant>
Entry state: <what already exists>
Deliverables: <list from the phase>
Gate: <exact check to run>
Do not: touch files outside the phase's folders
```
