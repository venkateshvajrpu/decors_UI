# CLAUDE.md

Static, prerendered **Angular + plain CSS** website for a **wedding & event decoration business in Visakhapatnam**. No backend. Branding is a template variable.

## Read before working

- `docs/PROJECT_RULES.md` — conventions and hard constraints (mandatory)
- `docs/ARCHITECTURE.md` — layers, module contracts, data flow
- `docs/ORCHESTRATOR.md` — phased build playbook with gates
- `PLAN.md` — original intent and page outline

For any implementation task, invoke the **`decor-site`** skill (`.claude/skills/decor-site/SKILL.md`). It encodes the rules and task recipes.

## Non-negotiables

- Standalone components, `OnPush`, `inject()`, signals, `@if/@for`.
- Plain CSS with tokens from `src/styles/tokens.css`. No SCSS, Tailwind, or UI libs.
- Branding from `SITE_CONFIG`; content from `src/app/data/*.data.ts`. Never hard-code either.
- All routes prerendered. Guard browser APIs with `isPlatformBrowser`.
- Enquiries via WhatsApp / `tel:` / `mailto:` links. No forms unless asked.
- Placeholder content marked `// TODO(client):`.

## Commands

```
npm start            # dev server
npm run build        # production build + prerender → dist/<app>/browser
npm run serve:static # serve the prerendered output locally
npm test             # unit tests
```

## Layer rule

`config/ + models/ → data/ → core/ → shared/ → pages/ → app.*` — import only downward.
