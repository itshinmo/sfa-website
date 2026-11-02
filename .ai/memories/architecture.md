---
description: Layers, routes, and the SSR/blog data flow. Read before changing structure.
last-verified: 2026-11-02
---

# Architecture (agent context)

Contract: [`docs/architecture.md`](../../../docs/architecture.md).

## Mental model

- `/` → `/fa`; `/:locale` home; `/:locale/blog`; `/:locale/blog/:slug`;
  localized 404; `/design-lab` internal.
- Routes are the composition root. They import `blog-module.ts`, not
  `infrastructure/`.
- Domain is pure. Ports declare interfaces. Infrastructure implements them.
  Presentation renders data passed from routes.
- Shared has no domain imports.
- SSR loaders fetch blog data; the browser never sees API tokens.
- `BlogRepository` is the API boundary. `FastApiBlogRepository` is selected when
  `BLOG_API_BASE_URL` is set; otherwise the mock adapter is used.
- `meta` uses `loaderData`, not `data` (React Router 8).
- Locale detection is path → cookie → header → fa. On client navigation the root
  app derives locale from the pathname and updates i18n; do not rely only on the
  root loader data.
- Feeds/crawler routes: `/sitemap.xml`, `/robots.txt`, `/:locale/rss.xml`.

## Decisions not to “fix”

- No Markdown blog files, drafts, or CMS.
- No auth/checkout/tickets.
- `#4CAF50` is not used for light-surface text; tokens use darker green.
- The language switcher's prefix swap is a known temporary gap; use `alternates`
  for blog pages.
