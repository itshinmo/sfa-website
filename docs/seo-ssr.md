# SEO and SSR

## Principles

- Public content renders on the server. A crawler must see the main content
  without executing client JavaScript.
- Every public page has a unique title, description, canonical URL, and
  `lang`/`dir`.
- Locale alternates use real translated slugs.
- Search-result pages are `noindex, follow`.
- The design lab is `noindex, nofollow` and gated in production.

## Current implementation

- `app/routes/home.tsx` exports `meta` for title/description.
- `app/routes/blog-index.tsx` exports `meta` and marks query searches
  `noindex`.
- `app/routes/blog-detail.tsx` exports:
  - title and description;
  - canonical;
  - `hreflang` alternates plus `x-default`;
  - Open Graph and Twitter metadata;
  - `BlogPosting` and `BreadcrumbList` JSON-LD;
  - a structured table of contents.
- `app/routes/blog-index.tsx` adds canonical and `hreflang` on clean pages,
  and `noindex, follow` on search/tag queries.
- `app/routes/sitemap.ts` generates localized URLs and alternates from
  `BlogRepository.getSitemap`.
- `app/routes/robots.ts` disallows `/design-lab` and references the sitemap.
- `app/routes/rss.ts` serves localized feeds at `/fa/rss.xml` and `/en/rss.xml`.
- The homepage adds canonical, fa/en/x-default `hreflang`, OG/Twitter, and `Organization` + `WebSite` JSON-LD.
- The root layout sets `<html lang dir>`.
- `SITE_URL` controls canonical origins at runtime.

## Remaining

- [ ] Dynamic Open Graph share cards remain optional; the raster fallback is in place.
- [ ] 500 pages should be re-checked after the homepage implementation.
- [ ] Metadata lengths should be tuned with final copy.
- [ ] SSR smoke tests for the homepage `Organization`/`WebSite` data once added.

## Metadata rules

- Title: 50–60 characters; include “SFA” where natural.
- Description: 140–160 characters; write for humans.
- Canonical: absolute URL on `SITE_URL`, no query strings except meaningful
  filters.
- `hreflang`: only for real translations; include `x-default` if a default
  fallback page exists.
- OG image: 1200×630, absolute URL, with alt text where supported.
- Article dates: ISO 8601 in metadata and JSON-LD.
- Do not use the API URL as canonical.

## Structured data

Blog detail:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "...",
  "description": "...",
  "image": "...",
  "datePublished": "...",
  "dateModified": "...",
  "inLanguage": "fa",
  "author": { "@type": "Person", "name": "..." },
  "publisher": { "@type": "Organization", "name": "Smart Farm Aqua" },
  "mainEntityOfPage": "..."
}
```

Homepage: `Organization` + `WebSite` with `name`, `url`, `logo`, and
`sameAs` (when social links exist). Do not invent profiles.

## Caching

- Public homepage/blog pages: `public, max-age=0, s-maxage=300,
stale-while-revalidate=3600` (current baseline).
- Search/tag query pages: short cache or no cache; `noindex`.
- Authenticated content: none (the website has none).
- API responses: cache at the server/CDN with a short TTL; never cache errors.

## SSR tests

`tests/seo/ssr.spec.ts` fetches the raw HTML and asserts:

- status;
- `<h1>`;
- title/description;
- canonical;
- `hreflang`;
- JSON-LD `BlogPosting`;
- localized homepage content.

Extend this suite whenever a new public page type is added.

## Performance and crawlers

- Keep the LCP image discoverable in the initial HTML; preload the hero/cover
  where appropriate.
- Always set image width/height.
- Self-host and subset fonts; use `font-display: swap`.
- Avoid client-only content for SEO-critical sections.
- Keep the homepage JS budget small; lazy-load below-the-fold motion.
- Verify with `curl`/Playwright request context, not only the hydrated browser.
