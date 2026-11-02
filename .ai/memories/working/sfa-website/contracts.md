# Contracts

Frozen interfaces for parallel work. Change only through the orchestrator.

## Routes

```text
/                          -> /fa
/design-lab                -> internal, noindex, production-gated
/:locale                   -> home
/:locale/blog              -> blog index
/:locale/blog/tag/:tag     -> redirect to /:locale/blog?tag=...
/:locale/blog/:slug        -> blog detail (localized slug)
/:locale/*                 -> localized 404
/*                         -> global 404
```

## Locales

- Supported: `fa` (default), `en`.
- URL prefix always present.
- Blog slugs are localized; use `alternates` from the API.
- Missing translation: API fallback + visible notice.

## Blog API

Canonical contract: [`docs/blog-api.md`](../../../docs/blog-api.md).

- `BlogRepository` port: `listPosts`, `getPost`, `getTags`,
  `getRelatedPosts`, `getSitemap`.
- Zod schemas: `app/modules/blog/infrastructure/blog-api-schemas.ts`.
- Domain types: `app/modules/blog/domain/post.ts`.
- Mock adapter: `app/modules/blog/infrastructure/mock-repository.ts`.
- Routes must import `app/modules/blog/blog-module.ts`, not infrastructure.
- Content templates: `reference`, `narrative`, `simple`, `case-study`.

## Design tokens

Source: `app/styles/tokens.css`; Tailwind mapping: `app/app.css`.

Available semantic utilities:

- colors: `bg-background`, `bg-surface`, `bg-surface-muted`, `text-foreground`,
  `text-foreground-strong`, `text-muted`, `border-border`,
  `border-border-strong`, `bg-brand`, `bg-brand-strong`, `bg-brand-soft`,
  `text-brand`, `text-brand-strong`, `bg-water-100`, `text-water-700`.
- radius: `rounded-card`, `rounded-panel`, `rounded-pill`.
- shadow: `shadow-card`, `shadow-card-hover`, `shadow-panel`.
- type: `font-sans`, `font-display`, `font-mono`; `text-xs`…`text-7xl`.
- motion CSS vars: `--motion-duration-*`, `--motion-ease-*`.

Rules: no raw hex/px in components; every `className` layer has `data-slot`.

## i18n namespaces

`common`, `home`, `blog`, `notFound`.

Add keys to both `app/locales/fa` and `app/locales/en`; Persian is the type
source. No hardcoded UI strings.

## File ownership

| Owner              | Files                                                                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Orchestrator       | `package.json`, `app/routes.ts`, `app/root.tsx`, `app/app.css`, `app/styles/tokens.css`, `app/middleware/*`, shared schemas |
| Designer           | `app/styles/tokens.css` proposals, `/design-lab`, `docs/design-system.md`, motion tokens                                    |
| Implementer-home   | `app/routes/home.tsx`, `app/modules/home/**`, `app/shared/ui/**` (coordinate), `content/home/**`                            |
| Implementer-blog   | `app/modules/blog/**`, `app/routes/blog-*.tsx`, blog tests                                                                  |
| Quality-auditor    | `tests/e2e/**`, `tests/a11y/**`, `tests/seo/**`, quality docs                                                               |
| Content-strategist | `content/**`, locale copy, `docs/content-migration.md`                                                                      |
| Documenter         | `docs/**`, `decisions/**`, `rfcs/**`, API contract                                                                          |

Shared UI is a single-owner area. The orchestrator coordinates changes; never
run two writers against the same component file.
