# Project Rules

Coding standards and conventions for the decoration website. Every contributor (human or AI) must follow these.

---

## 1. Tech Stack (fixed)

- **Angular** latest stable, standalone components only. No NgModules.
- **TypeScript** strict mode on. No `any`. No `// @ts-ignore`.
- **Plain CSS** only. No SCSS, Tailwind, Bootstrap, or CSS-in-JS.
- **No backend.** The site is static. Enquiries go through WhatsApp / `tel:` / `mailto:` links.
- **No third-party UI libraries** (Material, PrimeNG, etc.). Build components by hand.
- Allowed runtime deps: `@angular/*`, `rxjs`, `tslib`. The app is **zoneless** (`zone.js` is not installed); do not add it. Anything else needs a written reason in the PR.
- Dev-only tooling: `sharp` (image resize/WebP for `scripts/images.mjs` — macOS `sips` cannot write WebP), `angular-eslint`, `prettier`, `vitest`.

---

## 2. Branding & Content Rules

- **Never hard-code** the business name, phone, WhatsApp number, email, address, or social links in a template. Read them from `SITE_CONFIG` (`src/app/config/site.config.ts`).
- **Never hard-code catalogue items, events, packages, testimonials, gallery images, or FAQs** in a component. They live in `src/app/data/*.data.ts` and are typed by `src/app/models/*.model.ts`.
- Placeholder content must be marked with `// TODO(client):` in data files so it can be found with one grep.
- Keep regional flavor: use Telugu names alongside English where natural (`teluguName` field), reference Visakhapatnam / Andhra in copy.

---

## 3. Folder & Naming Conventions

| Thing | Location | Naming |
|---|---|---|
| Page component | `src/app/pages/<page>/` | `<page>.component.{ts,html,css}` |
| Shared component | `src/app/shared/components/<name>/` | `<name>.component.{ts,html,css}` |
| Service | `src/app/core/services/` | `<name>.service.ts` |
| Directive | `src/app/core/directives/` | `<name>.directive.ts` |
| Model / interface | `src/app/models/` | `<name>.model.ts` |
| Data file | `src/app/data/` | `<name>.data.ts` |
| Global CSS | `src/styles/` | `tokens.css`, `base.css`, `layout.css`, `motifs.css` |
| Static assets | `public/` | `public/images/<section>/<kebab-name>.webp` |

- Component selectors: `app-<name>` (kebab-case).
- One component per folder. Template and styles in separate files, not inline, unless under 10 lines.
- File names kebab-case. Class names PascalCase. Constants `UPPER_SNAKE_CASE`. Interfaces PascalCase without `I` prefix.

---

## 4. Component Rules

- `changeDetection: ChangeDetectionStrategy.OnPush` on **every** component.
- Use `inject()` instead of constructor injection.
- Use **signals** (`signal`, `computed`, `input()`, `output()`) for state. Avoid `@Input()` / `@Output()` decorators in new code.
- Use the new control flow (`@if`, `@for` with `track`, `@switch`). No `*ngIf` / `*ngFor`.
- Pages set their SEO meta via `SeoService.setPage(...)` on init. No page ships without title + description.
- No business logic in templates. Move it to a `computed()` or a method.
- Components must not reach into `document` or `window` directly. Use `inject(DOCUMENT)` and either guard with `isPlatformBrowser` or run the code inside `afterNextRender` (browser-only by design), because the site is prerendered.

---

## 5. CSS Rules

- All colors, spacing, font sizes, radii, and shadows come from CSS custom properties in `src/styles/tokens.css`. No magic hex values in component CSS.
- Mobile-first. Write base styles for small screens, then `@media (min-width: …)` upward. Breakpoints: `48rem` (768px), `64rem` (1024px), `80rem` (1280px).
- Use `rem` for sizing, `px` only for borders and 1px hairlines.
- Class naming inside a component: simple, BEM-lite (`.card`, `.card__title`, `.card--featured`). Component encapsulation prevents collisions, so keep names short.
- No `!important`. No inline styles in templates except for dynamic `background-image` from data.
- Respect `prefers-reduced-motion`. Every animation must be wrapped or disabled under it.
- Focus states must be visible. Never `outline: none` without a replacement.

---

## 6. Images & Assets

- Use `NgOptimizedImage` (`ngSrc`) with explicit `width` and `height`. Hero image gets `priority`. Everything else lazy loads.
- Prefer `.webp`. Keep each image under 300 KB. Hero under 500 KB.
- Every image has meaningful `alt` text. Decorative images use `alt=""`.
- SVG motifs (kolam, temple arch) are inline or CSS `background-image` data URIs. Do not add icon fonts.

---

## 7. Accessibility

- One `<h1>` per page. Heading levels never skip.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`. A skip-link to `#main` at the top of the app shell.
- All interactive elements are `<button>` or `<a>`. No `div` with click handlers.
- Color contrast at least 4.5:1 for text.
- Mobile nav is keyboard operable and traps focus while open.

---

## 8. SEO & Production

- Every route is prerendered (`RenderMode.Prerender`).
- `robots.txt` and `sitemap.xml` are generated from `site.config.ts` at `prebuild` — never hand-edit. Favicons, `theme-color`, and Open Graph tags are mandatory before deploy.
- LocalBusiness JSON-LD emitted by `SeoService` from `SITE_CONFIG` values (prerendered into every page). Never hand-write it in `index.html`.
- Lighthouse target: **90+** on Performance, Accessibility, Best Practices, SEO.
- Initial JS bundle budget: **under 250 KB gzipped** (transfer size). `angular.json` budgets measure *uncompressed* size, so they are set to 400 KB warning / 500 KB error (≈ 110–140 KB gzipped).

---

## 9. Git Workflow

- Branch names: `feat/<short-name>`, `fix/<short-name>`, `chore/<short-name>`.
- Commit messages: imperative, under 72 chars, e.g. `feat: add menu category filter`.
- Never commit `node_modules/`, `dist/`, `.angular/`, or `.env*`.
- `npm run build` must pass before any merge to `main`.

---

## 10. Definition of Done (per task)

- [ ] Follows all rules above
- [ ] `npm run build` passes with no warnings
- [ ] Works at 360px, 768px, and 1280px widths
- [ ] Keyboard navigable
- [ ] No console errors, no hydration warnings
- [ ] New content is data-driven and marked `TODO(client)` if placeholder
