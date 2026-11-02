# Architecture

## Runtime

- **React Router 8 framework mode** with SSR (`react-router.config.ts`, `ssr: true`).
- Node server (`react-router-serve`) in production, Docker/Nginx in front.
- Vite 8 builds the client and server environments.
- Public blog content is fetched on the server through a repository port. The
  browser never holds API credentials. `FastApiBlogRepository` is used when
  `BLOG_API_BASE_URL` is set; otherwise the mock adapter is used for local
  development.

## Route map

```text
/                              -> redirect /fa
/design-lab                    -> internal token preview (noindex)
/sitemap.xml                   -> localized sitemap with alternates
/robots.txt                    -> crawler policy + sitemap reference
/:locale/rss.xml               -> localized RSS feed
/:locale                       -> homepage
/:locale/blog                  -> blog index (search, tags, pagination)
/:locale/blog/tag/:tag         -> redirect to filtered blog index
/:locale/blog/:slug            -> blog detail (localized slug)
/:locale/*                     -> localized 404
/*                             -> global 404
```

`locale` is `fa` (default) or `en`.

## Source layout

```text
app/
  app.css                      Tailwind entry + token mapping
  root.tsx                     HTML shell, i18n middleware, skip link
  entry.client.tsx             client i18n hydration
  entry.server.tsx             SSR + i18next provider
  middleware/i18next.ts        locale detection + i18next instance
  routes.ts                    route composition
  routes/                      route modules only
  modules/
    home/
      home-content-schema.ts   Zod schema for localized homepage content
      home-content.server.ts   server-only loader helper
    blog/
      domain/                  pure blog types
      application/ports/       BlogRepository interface
      infrastructure/          API adapter, schemas, mock adapter
      presentation/            post card, content renderer, TOC
      blog-module.ts           composition root for the module
  shared/
    lib/                       cn, date, locale, normalize, site config
    ui/                        Base UI wrappers and design-system primitives
    motion/                    motion primitives (next milestone)
  styles/tokens.css            primitive + semantic tokens
  locales/                     fa/en namespaces
content/                       homepage/site content, migration workspace
docs/                          current behavior
decisions/                     ADRs
rfcs/                          proposals
.ai/                           agent layer
```

## Module rules

- `app/routes/` is the composition root. It may import module composition files
  and `shared/`; it should not reach into a module's `infrastructure/` directly.
- `modules/blog/domain/` is pure TypeScript. It imports nothing outside the
  module.
- `modules/blog/application/ports/` declares interfaces. It may import domain
  types only.
- `modules/blog/infrastructure/` implements the ports (mock now, API later). It
  may import domain, application, and shared server-safe helpers.
- `modules/blog/presentation/` renders UI. It imports domain types and shared
  UI, not its own infrastructure. Routes pass data in.
- `shared/` has no domain knowledge and never imports `modules/`.
- No barrel files except a module composition file where an interface boundary
  genuinely needs one.

## SSR data flow

```text
Request /:locale/blog/:slug
  -> root loader: locale + Set-Cookie
  -> locale layout loader: validate locale
  -> blog detail loader
       -> BlogRepository.getPost({ locale, slug, fallbackLocale })
       -> Zod-validated API response (FastApiBlogRepository, or mock fallback)
       -> related posts + i18n strings
  -> meta(): title, description, canonical, hreflang, OG, JSON-LD
  -> SSR HTML
```

The repository port is defined in
`app/modules/blog/application/ports/blog-repository.ts`. The composition root
`app/modules/blog/blog-module.ts` selects:

- `FastApiBlogRepository` when `BLOG_API_BASE_URL` is set;
- `MockBlogRepository` for local development and tests.

The contract is in [`blog-api.md`](./blog-api.md). The API adapter validates every
response with Zod, uses a 5-second timeout, supports an optional server-side
bearer token, and maps failures to typed repository errors.

## i18n

- `remix-i18next` middleware detects the locale from the pathname, then cookie,
  then `Accept-Language`, falling back to Persian.
- The root loader serializes the locale cookie and passes it to the app.
- The root layout sets `<html lang dir>` from the i18n instance.
- `entry.server.tsx` wraps the router in `I18nextProvider`; `entry.client.tsx`
  hydrates with the same locale and bundled resources.
- Locale resources are typed from the Persian source of truth in
  `app/locales/fa`.

## Styling

- Tailwind CSS 4 with `@theme inline` mapping semantic tokens to utilities.
- Raw values live in `app/styles/tokens.css`.
- Components use semantic utilities such as `bg-background`, `text-foreground`,
  `text-muted`, `border-border`, `bg-brand`, `rounded-panel`, `shadow-card`.
- Variants use `class-variance-authority`; class merging uses `cn()`.
- Direction-sensitive layout uses logical utilities (`ms`, `me`, `ps`, `pe`,
  `start`, `end`).

## Blog templates

The API returns a discriminated `content` payload:

| Template     | Content shape                                             |
| ------------ | --------------------------------------------------------- |
| `reference`  | intro + sections + subsections + optional management      |
| `narrative`  | intro + ordered paragraph/heading/image/quote/list blocks |
| `simple`     | intro + titled paragraph sections                         |
| `case-study` | challenge + solution + results + gallery + optional CTA   |

`app/modules/blog/presentation/post-content.tsx` renders all four. Detail pages
also generate a structured table of contents, breadcrumbs, related posts, and a
reading-time fallback. Adding a new template requires a new API schema branch, a
renderer, and a docs update; adding a post of an existing template requires no
page changes.

## Feeds and crawler routes

- `app/routes/sitemap.ts` builds localized URLs for home, blog index, and every
  post, with `xhtml:link` alternates and `x-default`.
- `app/routes/robots.ts` disallows `/design-lab` and points at the sitemap.
- `app/routes/rss.ts` serves `/fa/rss.xml` and `/en/rss.xml` from the latest 50
  published posts. API failure returns a 503 rather than an empty feed.

## Decisions not to "fix"

- The site is not a static export. SSR is required for SEO and API freshness.
- Blog content is not stored in this repo. The mock repository is development
  scaffolding only.
- The website has no auth, checkout, ticket UI, or editor. Those belong to the
  application.
- Search-result pages are `noindex`; the blog index itself is indexable.
- The design lab is not part of the public product.
