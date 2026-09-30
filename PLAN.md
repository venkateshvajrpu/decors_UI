# Project Plan: Pure-Veg South Indian Catering Website (Visakhapatnam)

Static, production-ready marketing website built with **Angular + plain CSS**, prerendered to static HTML and deployable to any static host.

---

## 1. Goals & Confirmed Decisions

| Topic | Decision |
|---|---|
| Business | Pure-vegetarian South Indian catering service, Visakhapatnam, Andhra Pradesh |
| Branding | **Template-driven.** Business name, tagline, phone, WhatsApp, email, address, socials live in ONE file (`site.config.ts`) so the site can be rebranded per client without touching templates |
| Enquiry flow | WhatsApp click-to-chat + `tel:` + `mailto:` links + embedded Google Map. No backend, no form service |
| Structure | Multi-page with Angular Router: Home, About, Menu, Services, Gallery, Contact, 404 |
| Content | Realistic pure-veg South Indian placeholder content, marked `TODO(client)` for replacement |
| Output | `npm run build` produces a fully prerendered static `dist/` folder |

---

## 2. Architecture Decisions

| Concern | Decision | Rationale |
|---|---|---|
| Angular | Latest stable, **standalone components, no NgModules** | Modern, minimal boilerplate, tree-shakeable |
| Static output | **`@angular/ssr` with prerendering (SSG)** for every route | Plain SPA ships an empty `index.html`, which hurts local SEO. Prerendering gives real HTML per page while staying 100% static (no Node server in production) |
| Styling | **Plain CSS** with **CSS custom properties (design tokens)** globally; component-scoped CSS per component | Requested by user; tokens make the regional theme swappable per client |
| Content/data | **Typed TypeScript data files** (`menu.data.ts`, `services.data.ts`, etc.) with interfaces in `models/` | No CMS needed. Adding a dish = adding one array entry, fully typed |
| Branding | `site.config.ts` exposed through an `InjectionToken` (`SITE_CONFIG`) | Single source of truth for navbar, footer, contact page, SEO meta, WhatsApp links |
| Routing | Lazy-loaded standalone pages via `loadComponent` | Small initial bundle |
| Change detection | `OnPush` on every component | Static content, best performance |
| Images | `NgOptimizedImage` (`ngSrc`) with explicit dimensions; hero marked `priority`, rest lazy | Core Web Vitals |
| SEO | `SeoService` wrapping Angular `Title` + `Meta` (title, description, Open Graph, canonical) per route; `robots.txt`, `sitemap.xml`, favicon, LocalBusiness JSON-LD | Local business discoverability ("South Indian catering Vizag") |
| Accessibility | Semantic landmarks, skip-link, alt text, visible focus styles, `prefers-reduced-motion` respected | Production quality |
| Deployment | `dist/<app>/browser` is the static root; `netlify.toml` + `vercel.json` for deep-link fallback; README with deploy steps | Ready to deploy |

---

## 3. Regional Visual Identity

Design tokens in `src/styles/tokens.css`:

- **Palette (temple / Andhra festive)**
  - `--color-primary: #8B1A1A` deep maroon
  - `--color-accent: #E9A825` turmeric / marigold gold
  - `--color-secondary: #2F6B3A` banana-leaf green
  - `--color-bg: #FFF8EC` cream / ivory
  - `--color-ink: #2B1D14` dark text
- **Typography (Google Fonts with system fallbacks)**
  - Display: `Yatra One` or `Tiro Telugu` (classical Indian feel), fallback `Playfair Display`
  - Body: `Poppins` / `Inter`
  - Telugu greeting in hero (e.g. "స్వాగతం") to reinforce Andhra identity
- **Motifs (CSS/SVG, no heavy images)**
  - Kolam / rangoli SVG divider between sections
  - Temple-arch (scalloped) section edges
  - Banana-leaf card backgrounds for menu categories
  - Brass-lamp / marigold icons, subtle mandala in hero background
- **Pure-veg badge** (green square-dot symbol) in header, hero, and menu cards
- **Motion**: gentle fade / slide-in on scroll via `IntersectionObserver` directive; disabled under `prefers-reduced-motion`

---

## 4. Project Skeleton

```
cat_site_UI/
├── public/                              # copied verbatim to dist root
│   ├── favicon.ico / favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/                          # placeholder images (marked REPLACE_ME in README)
│       ├── hero/
│       ├── menu/
│       ├── gallery/
│       └── services/
├── src/
│   ├── index.html                       # lang, viewport, theme-color, font preconnect (JSON-LD comes from SeoService)
│   ├── main.ts
│   ├── main.server.ts                   # from @angular/ssr (prerender only; outputMode = static, no server.ts)
│   ├── styles.css                       # imports tokens + base + layout + motifs
│   ├── styles/
│   │   ├── tokens.css                   # colors, spacing, fonts, radii, shadows
│   │   ├── base.css                     # reset, typography, focus, reduced-motion
│   │   ├── layout.css                   # .container, .section, grid helpers
│   │   └── motifs.css                   # kolam divider, temple arch, leaf card, veg badge
│   └── app/
│       ├── app.component.{ts,html,css}  # <app-navbar> <router-outlet> <app-footer> <app-whatsapp-fab>
│       ├── app.config.ts                # provideRouter(withInMemoryScrolling, withViewTransitions), provideClientHydration, SITE_CONFIG
│       ├── app.config.server.ts
│       ├── app.routes.ts                # lazy routes + data.title / description for SEO
│       ├── app.routes.server.ts         # RenderMode.Prerender for all routes
│       ├── config/
│       │   └── site.config.ts           # ★ SINGLE PLACE to rebrand
│       ├── models/
│       │   ├── menu.model.ts            # MenuCategory, MenuItem (name, teluguName?, description, tags, isSpicy)
│       │   ├── service.model.ts         # CateringService (eventType, description, features[], minGuests, icon)
│       │   ├── testimonial.model.ts
│       │   └── gallery.model.ts
│       ├── data/
│       │   ├── menu.data.ts
│       │   ├── services.data.ts
│       │   ├── testimonials.data.ts
│       │   ├── gallery.data.ts
│       │   └── faqs.data.ts
│       ├── core/
│       │   ├── services/seo.service.ts
│       │   ├── services/whatsapp.service.ts
│       │   └── directives/reveal-on-scroll.directive.ts
│       ├── shared/components/
│       │   ├── navbar/                  # sticky, mobile hamburger, active link, "Book Now" CTA
│       │   ├── footer/                  # address, hours, quick links, socials, veg badge
│       │   ├── whatsapp-fab/            # floating WhatsApp button
│       │   ├── section-heading/         # eyebrow + title + kolam underline
│       │   ├── cta-banner/              # reusable "Plan your event" strip
│       │   ├── veg-badge/
│       │   ├── menu-item-card/
│       │   ├── service-card/
│       │   ├── testimonial-card/
│       │   └── faq-accordion/
│       └── pages/
│           ├── home/
│           ├── about/
│           ├── menu/
│           ├── services/
│           ├── gallery/
│           ├── contact/
│           └── not-found/
├── angular.json
├── package.json                         # scripts: start, build (prerender), test, lint
├── tsconfig*.json
├── .editorconfig  .gitignore  .prettierrc
├── netlify.toml                         # publish dir + deep-link fallback
├── vercel.json
└── README.md                            # rebrand, replace images, edit menu, build & deploy
```

---

## 5. Pages & Content Outline

### Home
- Hero: Telugu greeting, business name + tagline from config, pure-veg badge, CTAs (WhatsApp, Call, View Menu)
- Why choose us: pure veg, hygiene, traditional recipes, on-time service, banana-leaf option
- Featured menu categories
- Services preview
- Testimonials
- CTA banner

### About
- Story, pure-veg philosophy, hygiene & kitchen standards, team
- Service areas: Visakhapatnam plus nearby (Vizianagaram, Srikakulam, Anakapalli, etc.)

### Menu (data-driven, category filter with signals)
- **Breakfast / Tiffins**: idli, dosa varieties, pesarattu, upma, vada, pongal
- **Andhra Meals (banana-leaf bhojanam)**: pappu, gongura pachadi, pulihora, sambar, rasam, curd
- **Curries & Fry**
- **Rice varieties**: veg biryani, bagara rice, pulihora, curd rice
- **Snacks**: mirchi bajji, punugulu, garelu
- **Sweets**: bobbatlu, pootharekulu, ariselu, payasam, mysore pak
- **Beverages**: filter coffee, buttermilk, panakam
- **Festival specials**
- **Jain / no-onion-no-garlic options**
- "Ask for a custom menu" WhatsApp CTA

### Services
- Wedding (Pelli bhojanam), Engagement, Housewarming (Gruhapravesam), Pooja & religious functions, Birthday, Corporate lunch, Buffet & live counters, Traditional banana-leaf service, Box meals / bulk tiffins, Outdoor / destination
- "How it works" steps
- FAQs accordion

### Gallery
- Responsive masonry-style grid with lightweight lightbox

### Contact
- Phone / WhatsApp / email cards, address, opening hours
- Google Map iframe
- WhatsApp "message us" with prefilled text

### 404
- Friendly not-found page with links home

---

## 6. Implementation Steps

1. **Scaffold** – `ng new` in the existing folder (standalone, routing, CSS; skip git init). Add `@angular/ssr`, configure `RenderMode.Prerender` for all routes. Verify `npm run build` emits static HTML per route.
2. **Design system** – write `tokens.css`, `base.css`, `layout.css`, `motifs.css`; wire Google Fonts with `preconnect`; add kolam / temple-arch SVG motifs.
3. **Config, models, data** – create `site.config.ts` + `SITE_CONFIG` token, models, and all data files with placeholder content marked `TODO(client)`.
4. **Core** – `SeoService`, `WhatsappService`, `RevealOnScrollDirective`.
5. **Shared components** – navbar, footer, whatsapp-fab, section-heading, cta-banner, veg-badge, cards, faq-accordion.
6. **Pages** – home, menu, services, about, gallery, contact, not-found; each sets SEO meta via route data.
7. **Routing & app shell** – lazy `loadComponent`, route `data` for SEO, scroll restoration, view transitions, wildcard 404.
8. **Production assets** – `robots.txt`, `sitemap.xml`, favicons, `theme-color`, LocalBusiness JSON-LD, Open Graph image.
9. **Deploy config + README** – `netlify.toml`, `vercel.json`, README covering rebrand / images / menu edits / deploy.
10. **Quality pass** – Lighthouse (target ≥ 90 across Performance, SEO, Accessibility, Best Practices), responsive checks at 360 / 768 / 1280 px, keyboard navigation, reduced-motion.

---

## 7. Verification Checklist

- [ ] `npm install && npm run build` succeeds
- [ ] `dist/<app>/browser/` contains `index.html`, `about/index.html`, `menu/index.html`, `services/index.html`, `gallery/index.html`, `contact/index.html` with rendered content
- [ ] Serve static output locally (`npx serve dist/<app>/browser`) and click through every route, including hard refresh on deep links
- [ ] Change `siteConfig.name`, rebuild, confirm new name appears in navbar, footer, `<title>`, and WhatsApp prefilled message
- [ ] Mobile: hamburger nav works, tap targets sized correctly, WhatsApp FAB does not overlap content
- [ ] Lighthouse ≥ 90 on all four categories
- [ ] No console errors, no hydration mismatch warnings
- [ ] `robots.txt` and `sitemap.xml` served at root

---

## 8. How to Rebrand for a New Client

1. Edit `src/app/config/site.config.ts` (name, tagline, phone, WhatsApp, email, address, map URL, socials, hours).
2. Replace images under `public/images/`.
3. Edit menu / services / testimonials in `src/app/data/*.data.ts`.
4. Optionally adjust colors in `src/styles/tokens.css`.
5. `npm run build` and deploy `dist/<app>/browser`.
