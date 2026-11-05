# SFA Website

The public presentation website for **SFA (Smart Farm Aqua)**. The product
itself is a downloadable Flutter application for smart irrigation and soil
management; this repository owns the marketing site and blog.

The website is read-only. The application handles accounts, payments, and
tickets. Supervisors author blog posts inside the application; the website
renders published posts from a public, read-only API.

## Stack

- React Router 8 framework mode with SSR
- React 19 + TypeScript
- Base UI + Tailwind CSS 4
- Motion for React
- i18next + remix-i18next
- Zod
- Vitest, Playwright, axe
- Docker / Node 24

## Quick start

```sh
pnpm install
pnpm dev
```

Open <http://localhost:3000>. The root redirects to `/fa`.

```sh
pnpm check        # typecheck, lint, format check, unit tests
pnpm check:all    # check + production build
pnpm test:e2e     # browser flows
pnpm test:a11y    # axe checks
pnpm test:seo     # SSR metadata checks
```

## Routes

| Route                    | Purpose                                                        |
| ------------------------ | -------------------------------------------------------------- |
| `/`                      | Redirects to `/fa`                                             |
| `/:locale`               | Homepage (`fa`, `en`)                                          |
| `/:locale/blog`          | Blog index with search, tags, pagination                       |
| `/:locale/blog/:slug`    | Blog detail, localized slug                                    |
| `/:locale/blog/tag/:tag` | Redirects to the filtered index                                |
| `/design-lab`            | Internal token/component preview; noindex and production-gated |

## Environment

Copy `.env.example` to `.env` and set:

- `SITE_URL` — public origin used for canonical URLs, sitemap, and JSON-LD.
- `BLOG_API_BASE_URL` — real API base URL. When empty, the mock repository is
  used.
- `BLOG_API_TOKEN` — optional server-side token if the API requires one.
- `DESIGN_LAB=1` — expose the design lab outside development.

## Documentation

Start with [`AGENTS.md`](./AGENTS.md) for the rules, then:

- [`docs/architecture.md`](./docs/architecture.md)
- [`docs/design-system.md`](./docs/design-system.md)
- [`docs/blog-api.md`](./docs/blog-api.md)
- [`docs/i18n-rtl.md`](./docs/i18n-rtl.md)
- [`docs/seo-ssr.md`](./docs/seo-ssr.md)
- [`docs/accessibility.md`](./docs/accessibility.md)
- [`docs/motion.md`](./docs/motion.md)
- [`docs/runbook.md`](./docs/runbook.md)

## Status

The homepage and blog vertical are complete. The identity is now app-aligned
([ADR-009](./decisions/ADR-009-app-aligned-identity.md)): the app palette, a
self-hosted Vazirmatn + Inter pairing, a 100svh top-start editorial hero with an
opaque scroll cue, and a laptop/tablet/phone device showcase. The hero
composition was chosen on 2026-11-05; app-capture approval, author content/link
confirmation, and Docker verification remain. See the working memory at
[`.ai/memories/working/sfa-website/README.md`](./.ai/memories/working/sfa-website/README.md)
for the task board.
