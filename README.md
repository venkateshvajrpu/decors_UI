# Wedding & Event Decoration — Website Template

A static, prerendered **Angular 22 + plain CSS** marketing site for a wedding & event decoration business in
Visakhapatnam. No backend: enquiries go through WhatsApp, `tel:` and `mailto:` links. Branding and content are
template variables, so the same codebase can be rebranded per client by editing a handful of files.

- Docs: [`docs/PROJECT_RULES.md`](docs/PROJECT_RULES.md) · [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) ·
  [`docs/ORCHESTRATOR.md`](docs/ORCHESTRATOR.md) · [`PLAN.md`](PLAN.md)
- Output: `dist/decor-site/browser/` — plain HTML/CSS/JS, deploy anywhere.

## Prerequisites

- Node.js **24+** (uses native TypeScript imports in the build scripts)
- npm 11+

## Quick start

```bash
npm install
npm run build          # → dist/decor-site/browser
npm run serve:static   # preview the prerendered output
```

For local development use `npm start` (dev server at http://localhost:4200).

## Scripts

| Command | What it does |
|---|---|
| `npm start` | Dev server at http://localhost:4200 |
| `npm run build` | `prebuild` (robots/sitemap) → `ng build` (prerender every route) → `postbuild` (`404.html`) |
| `npm run serve:static` | Serve the built output locally (deep-link refresh test) |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint (angular-eslint) |
| `npm run format` | Prettier |
| `npm run images:placeholders` | Generate brand-coloured placeholder images for every image the data references |
| `npm run images:convert` | Convert client photos in `assets-src/` into sized WebP under `public/images/` |
| `npm run images:favicons` | Regenerate `favicon.ico`, `apple-touch-icon.png`, `icon-512.png` from `public/favicon.svg` |
| `npm run seo:generate` | Regenerate `public/robots.txt` and `public/sitemap.xml` (also runs automatically before build) |

## Rebrand for a new client

1. **`src/app/config/site.config.ts`** — name, tagline, phone, WhatsApp number, email, address, map embed + link,
   hours, socials, service areas, `siteUrl` (production domain), established year, `enquiryNoun`/`whatsappSubject`.
   This one file feeds the navbar, footer, contact page, WhatsApp messages, `<title>`s, Open Graph, JSON-LD,
   sitemap and robots.
2. **`src/styles/tokens.css`** — palette and fonts. Keep `theme-color` in `src/index.html` and the colours in
   `public/favicon.svg` / `public/manifest.webmanifest` in sync, then `npm run images:favicons`.
3. **Images** — drop the client's photos as JPG/PNG into `assets-src/images/…` mirroring `public/images/…`
   (see the list in `scripts/images.mjs`), then `npm run images:convert`. Replace `assets-src/images/og-default.jpg`
   for the social-share image.
4. **Content** — edit `src/app/data/*.data.ts` (catalogue, events, packages, testimonials, gallery, FAQs,
   why-us/process/team copy). Everything is typed; adding a catalogue item is one array entry.
5. Find every remaining placeholder: `grep -rn "TODO(client)" src public`.
6. `npm run build` and deploy `dist/decor-site/browser`.

### Editing the catalogue

`src/app/data/catalogue.data.ts` → find the category → append a `CatalogueItem`:

```ts
{ name: 'Ring Backdrop', teluguName: 'రింగ్ బ్యాక్‌డ్రాప్', description: '…', tags: ['popular'], unit: 'per setup' },
```

New category: append a `CatalogueCategory` with a unique `id` (used in `?category=` links). The decor page filter,
home-page featured cards and WhatsApp prefills pick it up automatically.

### Adding an event / package / testimonial / FAQ

Append to the matching file in `src/app/data/` (`events.data.ts`, `packages.data.ts`, `testimonials.data.ts`,
`faqs.data.ts`). Event images live at `public/images/services/<id>.webp` (800×600).

### Adding a page

Create `src/app/pages/<name>/`, add a lazy route in `src/app/app.routes.ts`, call `SeoService.setPage()` in
`ngOnInit`, and add the link to `src/app/shared/nav-links.ts` — navbar, footer and sitemap all read from it.

## Deploy

The build output is fully static. `404.html` is produced by `postbuild`, so unknown URLs get the branded page.

### Netlify
`netlify.toml` is included. Connect the repo; build command `npm run build`, publish dir `dist/decor-site/browser`.

### Vercel
`vercel.json` is included. Import the repo; framework preset "Other". Output directory `dist/decor-site/browser`.

### GitHub Pages
1. If hosted under `https://<user>.github.io/<repo>/`, build with `ng build --base-href /<repo>/`.
2. Publish the contents of `dist/decor-site/browser` to the `gh-pages` branch (e.g. with `gh-pages` or an Action).
3. `404.html` at the root handles unknown paths.

### Any static host / S3 / nginx
Upload `dist/decor-site/browser`. Serve `<dir>/index.html` for directory URLs and `404.html` for misses.

## Verification checklist

- [ ] `npm run build` passes with no warnings
- [ ] `dist/decor-site/browser/{index,about/index,services/index,decor/index,packages/index,gallery/index,contact/index,404}.html` exist
- [ ] Deep-link refresh works on every route via `npm run serve:static`
- [ ] Changing `siteConfig.name` and rebuilding updates navbar, footer, `<title>`, WhatsApp text, JSON-LD
- [ ] Mobile: hamburger nav traps focus and closes on Escape; WhatsApp FAB doesn't cover the footer
- [ ] Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, SEO
- [ ] `grep -rn "TODO(client)" src public` is empty before go-live
