# ADR-001 — React Router 8 framework mode with SSR

- **Status:** Accepted
- **Date:** 2026-11-02
- **Topic:** architecture

## Context

The website is the public presentation layer for a Flutter product. SEO is a
primary requirement for the homepage and blog. The team chose React Router over
Next.js. The site needs server-rendered content, route loaders, and a Node
runtime; a client-only Vite SPA would fail the SEO requirement.

## Decision

Use **React Router 8 framework mode with SSR** (`ssr: true`), Vite 8, and the
Node adapter (`react-router-serve`). Public content is loaded in route loaders
and rendered on the server. The site is not a static export.

## Consequences

- Blog and homepage content is crawlable without JavaScript.
- Deployments need a Node runtime; Docker/Nginx is the target.
- Route modules own data loading and metadata.
- Client-only state is limited to progressive enhancement (menus, motion,
  search input behavior).
