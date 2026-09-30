---
name: decor-site
description: Build or extend the static Angular + CSS wedding & event decoration website (Visakhapatnam). Use for any task in this repo — scaffolding, adding pages/components/catalogue items/events/packages, rebranding for a new client, styling with the regional design system, SEO, or deploy prep. Enforces PROJECT_RULES, ARCHITECTURE, and the ORCHESTRATOR phases.
---

# Decor Site Skill

You are working on a **static, prerendered Angular website** for a **wedding & event decoration business in Visakhapatnam**. Plain CSS only. No backend. Branding is a template variable.

## Always do first

1. Read `docs/PROJECT_RULES.md` (conventions, hard constraints).
2. Read the relevant section of `docs/ARCHITECTURE.md` (layers, module contracts).
3. Find the phase in `docs/ORCHESTRATOR.md` that matches the task and follow its entry → tasks → gate.
4. Check `PLAN.md` only if you need the original intent.

## Hard constraints (never break)

- Standalone Angular components, `OnPush`, `inject()`, signals, `@if/@for` control flow.
- Plain CSS. All values from `src/styles/tokens.css`. No SCSS / Tailwind / UI libraries.
- Business name, phone, WhatsApp, email, address, socials come from `SITE_CONFIG` (`src/app/config/site.config.ts`). Never hard-code them.
- Catalogue, events, packages, testimonials, gallery, FAQs come from `src/app/data/*.data.ts`. Never inline them in components.
- Every route prerendered. Guard `window`/`document` with `isPlatformBrowser`.
- Enquiries = WhatsApp / `tel:` / `mailto:` links via `WhatsappService`. No forms unless explicitly asked.
- Placeholder content is marked `// TODO(client):`.

## Layer map (import only downward)

```
config/ + models/  →  data/  →  core/  →  shared/components/  →  pages/  →  app.*
```

## Task recipes

### Add a catalogue item
Edit `src/app/data/catalogue.data.ts` → find category → append `CatalogueItem` (`name`, `teluguName?`, `description`, `tags?`, `unit?`). Done. Decor page filter picks it up.

### Add a catalogue category
Append a `CatalogueCategory` to `catalogue.data.ts` with `id`, `title`, `teluguTitle?`, `description`, `icon`, `items`.

### Add an event
Append `EventService` to `src/app/data/events.data.ts` (`inclusions`, `priceFrom?`). Image under `public/images/services/`.

### Add a package
Append `DecorPackage` to `src/app/data/packages.data.ts` (`inclusions`, `suitedFor`, `priceFrom?`, `popular?`).

### Add a page
1. `src/app/pages/<name>/<name>.component.{ts,html,css}` — OnPush, one `<h1>`, `SeoService.setPage()` in `ngOnInit`.
2. Lazy `loadComponent` route in `src/app/app.routes.ts` (SEO lives in the page's `setPage()` call, not route data).
3. Add the link to `shared/nav-links.ts` — navbar, footer and the generated sitemap all read from it.
4. Run build, verify `dist/<app>/browser/<name>/index.html` exists.

### Add a shared component
`src/app/shared/components/<name>/` — presentational only, `input()`/`output()`, tokens-only CSS, keyboard operable. May inject only `SITE_CONFIG` and `WhatsappService`.

### Rebrand for a new client
1. Edit `src/app/config/site.config.ts` (all fields).
2. Adjust palette/fonts in `src/styles/tokens.css`.
3. Drop client photos into `assets-src/images/**` (JPG/PNG, mirroring `public/images/`), run `npm run images:convert`.
4. `siteUrl` in config drives `sitemap.xml`/`robots.txt` (generated at build) and JSON-LD (SeoService). Update `theme-color` in `index.html` and `public/manifest.webmanifest` + `public/favicon.svg` (then `npm run images:favicons`).
5. Rebuild; confirm name appears in navbar, footer, `<title>`, WhatsApp text.

### Style something
Use tokens: `var(--color-primary)`, `var(--space-4)`, `var(--font-display)`, `var(--radius-md)`, `var(--shadow-sm)`. Mobile-first; breakpoints `48rem`, `64rem`, `80rem`. Regional motifs available: `.kolam-divider`, `.temple-arch`, `.petal-card`, `.mandala-bg`. Respect `prefers-reduced-motion`.

### Prepare for deploy
Run Phase 7–9 of `docs/ORCHESTRATOR.md`. Deploy folder is `dist/<app>/browser`.

## Regional identity cheatsheet

- Palette: maroon `#8B1A1A`, marigold gold `#E9A825`, peacock teal `#106B6B`, warm champagne `#F4E7D2`, ink `#2B1D14` (defined once in tokens).
- Display font with classical Indian feel (`Yatra One` / `Tiro Telugu`), body `Poppins`.
- Telugu greeting "స్వాగతం" in hero; Telugu item/event names via `teluguName`/`teluguTitle`.
- Motifs: kolam, temple arch, mandala, marigold, flower/petal.
- Copy references Visakhapatnam / Vizag / Andhra naturally.

## Definition of done (every task)

- `npm run build` passes, no warnings.
- Works at 360 / 768 / 1280 px.
- Keyboard navigable, no console errors, no hydration warnings.
- Rules above respected. New placeholders marked `TODO(client)`.

## Report format

When finishing, state: what changed (files), which ORCHESTRATOR phase/gate was satisfied, how it was verified, and any `TODO(client)` items added.
