# Implementer-blog — blog vertical (M3)

- **Status:** done
- **Date:** 2026-11-02
- **Task id:** M3-1, M3-2, M3-3, M3-4, M3-5; added M3-6 coverage

## Changed files

New:

- `app/modules/blog/application/blog-repository-error.ts`
- `app/modules/blog/domain/content-headings.ts`
- `app/modules/blog/domain/reading-time.ts`
- `app/modules/blog/infrastructure/fast-api-blog-repository.ts`
- `app/modules/blog/presentation/table-of-contents.tsx`
- `app/modules/blog/presentation/feed.ts`
- `app/routes/sitemap.ts`
- `app/routes/robots.ts`
- `app/routes/rss.ts`
- `tests/e2e/blog.spec.ts`
- `tests/unit/fast-api-blog-repository.test.ts`
- `tests/unit/blog-content.test.ts`
- `tests/unit/blog-feed.test.ts`

Updated:

- `app/modules/blog/blog-module.ts`
- `app/modules/blog/infrastructure/mock-data.ts`
- `app/modules/blog/presentation/post-content.tsx`
- `app/modules/blog/presentation/post-card.tsx`
- `app/routes/blog-index.tsx`
- `app/routes/blog-detail.tsx`
- `app/routes.ts`
- `app/locales/fa/blog.ts`
- `app/locales/en/blog.ts`
- `tests/a11y/pages.spec.ts`
- `tests/seo/ssr.spec.ts`
- `tests/unit/mock-blog-repository.test.ts`

No dependencies added. No files outside blog/new feed route ownership were edited.

## What was implemented

### API adapter and repository boundary

- Added `FastApiBlogRepository` implementing `BlogRepository`:
  - `BLOG_API_BASE_URL` base URL, optional `BLOG_API_TOKEN`;
  - `Accept: application/json`;
  - optional `Authorization: Bearer <token>`;
  - 5 s timeout via `AbortController`;
  - Zod validation for list, detail, tags, related, and sitemap responses;
  - typed `BlogRepositoryError` codes for `http_error`, `network_error`,
    `timeout`, and `invalid_response`;
  - `404` on detail is a safe `null`; related `404` is an empty list.
- Kept `MockBlogRepository` when `BLOG_API_BASE_URL` is empty. The switch lives
  in `app/modules/blog/blog-module.ts` via `createBlogRepository()`.
- The token is not present in client build output (verified by grep).
- Expanded mock fixtures to 10 posts per locale so default page-size (9)
  pagination is observable in dev/E2E.

### Blog detail

- TOC generated from structured headings for `reference`, `narrative`, and
  `simple` templates, with stable IDs shared by the renderer and TOC.
- Reading-time fallback computed from structured content when the API sends
  `0`; cards clamp to at least one minute.
- Breadcrumb navigation plus `BreadcrumbList` JSON-LD.
- Related posts, localized fallback notice (`role="note"`), localized
  case-study headings (`Challenge`/`Solution`/`Results` no longer hardcoded).
- Accessible article structure (`article[aria-labelledby]`, semantic header,
  cover figure, localized metadata), `x-default` hreflang, OG/Twitter metadata,
  article keywords, and safe external-link `rel` values.
- Related-post failures no longer fail the article; API failure returns a
  localized 502 error page with retry instead of a blank/root crash.

### Blog index

- API-driven search/tag/pagination remains in the loader.
- Accessible `role="status" aria-live="polite"` result count, page state, active
  search/tag summary, visible search label, clear-filter links, empty and error
  states with retry.
- Search/tag query pages are `noindex, follow`; clean and paginated index pages
  have canonical + `hreflang` (`fa`, `en`, `x-default`).
- Filtered pages are not publicly cached; errors are `no-store`.

### Feeds and crawler routes

- `/sitemap.xml`: home, blog index, and every localized post URL from
  `BlogRepository.getSitemap` for both locales, with `xhtml:link` alternates,
  `x-default`, and `lastmod`. One locale failing still yields a usable sitemap.
- `/robots.txt`: allows the site, disallows `/design-lab`, references the
  sitemap.
- `/fa/rss.xml` and `/en/rss.xml`: localized channel metadata, latest 50 posts,
  absolute links/guids, categories, dates, and Atom self link. API failure
  returns a 503 plain-text response, not a blank page.
- `app/routes.ts` additions are limited to sitemap, robots, and `:locale/rss.xml`.

### Tests

- Contract tests with injected mock fetch: query construction, auth header,
  list/pagination, all four template unions, fallback, tags, related, sitemap,
  404 mapping, malformed JSON, HTTP errors, network errors, and timeout.
- Repository factory switch tests (mock vs FastAPI) and mock repository
  pagination/sitemap tests.
- Feed builder tests and TOC/reading-time tests.
- E2E: search, tag filter, pagination, empty search, TOC jump, breadcrumbs,
  related posts, localized case-study headings, fallback notice (desktop +
  mobile).
- A11y: added detail, filtered index, and fallback paths to axe coverage.
- SEO: sitemap, robots, RSS, filtered noindex, index hreflang, breadcrumb
  JSON-LD/TOC, fallback SSR.

## Verification

- `pnpm typecheck` — pass.
- `pnpm test` — pass (final run: 11 files, 50 tests; includes concurrent work).
- `pnpm build` — pass (client + SSR).
- `pnpm test:e2e` — 26/26 pass (desktop + mobile).
- `pnpm test:a11y` — 8/8 pass.
- `pnpm test:seo` — 8/8 pass.
- Targeted `eslint` and `prettier --check` on all touched files — pass.
- Raw HTML checked with curl: `/sitemap.xml` (200, XML, alternates), `/robots.txt`
  (200, text), both RSS feeds (200, RSS), detail TOC/`BreadcrumbList`, filtered
  index `noindex`.
- `pnpm check` — typecheck and lint pass, but repo-wide `format:check` fails on
  files outside this handoff's ownership, likely the designer's concurrent
  work: `.ai/memories/working/sfa-website/tasks.md`,
  `app/routes/design-lab.tsx`, `app/styles/design-lab-previews.css`,
  `docs/design-lab-directions.md`.

## Open questions / drift

- **Token header:** the adapter uses `Authorization: Bearer <BLOG_API_TOKEN>`.
  `docs/blog-api.md` does not name the header; confirm with the backend. If it
  differs, only `FastApiBlogRepository.headers()` changes.
- **Docs drift (not edited, outside ownership):**
  `docs/architecture.md` still says the current adapter is the mock and the
  FastAPI adapter is planned; `docs/seo-ssr.md` still lists sitemap/RSS and
  breadcrumb JSON-LD as planned. The documenter/orchestrator should sync these.
- `docs/blog-api.md` was not changed because the API contract did not change.
- RSS is capped at the latest 50 posts (API page-size maximum). Sitemap covers
  all sitemap entries returned for both locales.
- Mock fixture additions are development-only and should not be treated as
  production content.

## Next step

1. Orchestrator re-run `pnpm check` after the designer/formatting work settles.
2. Confirm the `BLOG_API_TOKEN` header with the backend.
3. Documenter sync the architecture/SEO docs and the M3 task status.
4. Quality-auditor can extend the new blog E2E/a11y/SEO coverage if desired.
