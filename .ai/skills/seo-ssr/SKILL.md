---
name: seo-ssr
description: Use when adding a public route, blog template, metadata, locale alternate, sitemap, RSS, or structured data. Verifies SEO from the server response, not only the hydrated page.
---

# seo-ssr

## Prerequisites

- [`docs/seo-ssr.md`](../../../docs/seo-ssr.md)
- `tests/seo/ssr.spec.ts`
- `SITE_URL`

## Workflow

1. Confirm the route renders content in the server loader/component.
2. Add `meta`: title, description, canonical, OG/Twitter.
3. Add `hreflang` from real `alternates`; never from a prefix swap.
4. Add JSON-LD where applicable (`BlogPosting`, breadcrumbs, Organization).
5. Mark search results `noindex`; keep the blog index indexable.
6. Add/update sitemap and RSS generation when content routes change.
7. Add an SSR test: fetch raw HTML, assert status/content/metadata/JSON-LD.
8. Check the API failure path returns a useful error, not a blank page.
9. Check LCP image discoverability and dimensions.

## Constraints

- Do not use the API URL as canonical.
- Do not emit `hreflang` for a translation that does not exist.
- Do not rely on client-side data for SEO-critical content.
- Do not cache errors as public pages.

## Expected output

SSR metadata and tests, plus a short note on what was verified with raw HTML.
