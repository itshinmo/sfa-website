# Quality-fixer — audit P1 + low-risk P2

- **Status:** done (Docker build/run remains blocked: no Docker daemon)
- **Date:** 2026-11-02
- **Task id:** M4-4 / quality fixes after independent audit

## Changed files

App/runtime:

- `app/root.tsx` — conditional locale cookie, skip-link focus, error-boundary
  title/description/robots metadata.
- `app/entry.server.tsx` — document `Cache-Control` policy.
- `app/routes/not-found.tsx` — localized loader metadata + 404 status.
- `app/routes/locale-not-found.tsx` — re-export `meta`.
- `app/routes/blog-index.tsx` — card `h2`, formatted counts/page/tags, `main`
  focus target.
- `app/routes/blog-detail.tsx` — content `lang`/`dir`, formatted reading time,
  `main` focus target.
- `app/modules/blog/infrastructure/blog-api-schemas.ts` — ISO datetime schema
  for summary/sitemap dates.
- `app/modules/blog/presentation/post-card.tsx` — optional `headingLevel`
  (default 3), formatted reading time.
- `app/modules/blog/presentation/table-of-contents.tsx` — focus the target
  heading after activation.
- `app/shared/lib/format-date.ts` — tolerant date formatting with `—` fallback.
- `app/shared/lib/format-number.ts` — new `Intl.NumberFormat` helper.
- `app/locales/fa/blog.ts`, `app/locales/en/blog.ts` — use preformatted counts
  while keeping plural `count`.

Tests:

- `tests/unit/format-date.test.ts` (new)
- `tests/unit/blog-contract.test.ts`
- `tests/unit/fast-api-blog-repository.test.ts`
- `tests/e2e/blog.spec.ts`
- `tests/e2e/smoke.spec.ts`
- `tests/seo/ssr.spec.ts`
- `tests/a11y/pages.spec.ts`

Ops/docs:

- `Dockerfile`, `.dockerignore`
- `docs/runbook.md`, `docs/accessibility.md`

No changes to `app/routes/home.tsx`, design-lab, tokens, `app/app.css`,
`content/**`, `package.json`, lockfile, tasks/questions, or designer docs. No
git staging/commit/push.

## What was implemented

### P1

1. **404/error document titles.** `not-found` now loads localized
   title/description from the i18n middleware, returns 404, and exports `meta`
   (title, description, `noindex, nofollow`); `locale-not-found` re-exports it.
   The root `ErrorBoundary` renders `<title>`, description, and robots tags,
   hoisted by React 19, so thrown 404/500s (including production-gated
   `/design-lab`) always have a title.
2. **Invalid API dates.** `publishedAt`/`updatedAt` in summaries and `updatedAt`
   in sitemap entries now use `z.iso.datetime({ offset: true, local: true })`.
   `formatDate` returns `—` (or a supplied fallback) instead of throwing. Unit
   tests cover valid offsets, non-ISO dates, invalid sitemap dates, and the
   FastAPI adapter mapping invalid dates to `invalid_response`.
3. **Fallback content language.** Blog detail sets `lang`/`dir` from
   `post.contentLocale ?? post.locale` on the tag list, `h1`, excerpt, cover
   figure, and a `data-slot="post-body"` wrapper around `PostContent`. Page
   chrome (breadcrumbs, dates, reading time, fallback notice) keeps the requested
   locale. E2E and SEO assertions cover `/en/blog/<persian-slug>`.
4. **Homepage metadata** deliberately untouched; canonical/hreflang/OG/Twitter
   and `Organization`/`WebSite` JSON-LD are recorded below as M2 acceptance
   items.

### P2

5. `PostCard` accepts `headingLevel?: 2 | 3` (default 3); blog index passes 2.
   Related posts and any future homepage teaser keep `h3`.
6. Skip link focuses `#main-content` (sets `tabindex="-1"` if absent); TOC links
   focus the target heading and update the hash. `main` elements on touched
   pages carry `tabIndex={-1}`.
7. `formatNumber` supplies Persian digits for result counts, page numbers, tag
   counts, and reading time in blog components. Translation strings use a
   preformatted `formattedCount` while plural selection still uses `count`.
8. HTML cache policy lives in `entry.server.tsx`: clean public documents get
   `public, max-age=0, s-maxage=300, stale-while-revalidate=3600`; search/tag
   queries, `/design-lab`, non-GET/HEAD, and status ≥400 get `no-store`.
9. The root loader only serializes `sfa-locale` when there is no cookie or the
   cookie differs from the detected locale.
10. `.dockerignore` excludes `.env`/`.env.*` while keeping `.env.example`.
    Docker runtime uses `--chown=node:node`, `USER node`, a `/robots.txt`
    healthcheck, and a shared `COREPACK_HOME` so non-root `pnpm start` does not
    depend on `/root` caches.
11. Runbook cache guidance and accessibility automation/focus notes updated.

## Verification

All final runs used the current tree and passed:

- `pnpm check` — pass (typecheck, ESLint, Prettier, 13 files / 61 tests).
- `pnpm build` — pass.
- `pnpm test:e2e` — 34/34 dev and 34/34 against production on `:3001`.
- `pnpm test:a11y` — 10/10 dev and 10/10 production (now includes both 404s).
- `pnpm test:seo` — 11/11 dev and 11/11 production (now includes 404 metadata,
  fallback `lang`/`dir`, cache headers, conditional cookie).
- `PORT=3001 SITE_URL=http://127.0.0.1:3001 DESIGN_LAB=0 pnpm start` — pass.

Raw production HTML/header checks (`:3001`):

- `/fa/nope` → 404, `cache-control: no-store`, `<title>صفحه پیدا نشد</title>`.
- `/en/nope` → 404, `no-store`, `<title>Page not found</title>`.
- `/design-lab` (gated) → 404, `no-store`, Persian 404 title.
- `/fa/blog/does-not-exist` (thrown route 404) → 404, `no-store`, Persian title.
- `/en/blog` → `public, max-age=0, s-maxage=300, stale-while-revalidate=3600`.
- `/en/blog?q=…` and `?tag=…` → `no-store`.
- Matching locale cookie → no `Set-Cookie`; missing/mismatched cookie → cookie is
  set.
- Fallback detail: `<html lang="en" dir="ltr">`, `h1` and post body carry
  `lang="fa" dir="rtl"`, fallback notice remains English.

Docker was not built or run (`docker: command not found`). `.dockerignore` and
Dockerfile hardening were reviewed statically; `pnpm build` + `pnpm start` on
`:3001` is the production-path verification.

During the work a concurrent design-lab edit briefly failed
`react/no-unescaped-entities`; the designer's later edit cleared it. Final
`pnpm check` is clean; no designer files were modified by this task.

## Open questions / drift

- **M2 acceptance (P1 for launch):** homepage still needs canonical, hreflang,
  OG/Twitter, and `Organization`/`WebSite` JSON-LD. Do not launch without these;
  `app/routes/home.tsx` was intentionally not edited.
- Homepage card teasers should pass `headingLevel={2}` only if their section
  heading is `h1` with no intervening `h2`; default `h3` is unchanged.
- Remaining audit P2s outside this task: startup validation for `SITE_URL`,
  `301` vs `302` root redirect, design-lab build chunk, public image cache
  headers, touch targets, API `javascript:` href hardening, sitemap
  `200`-on-API-failure behavior, raster OG images, metadata lengths.
- Docker image build/run still needs a machine with a daemon. The added
  `COREPACK_HOME`/`USER node` combination is the main runtime path to confirm.
- Docs not in the allowed set still drift (`docs/seo-ssr.md` remaining 404 item,
  `docs/i18n-rtl.md` redirect status, `docs/architecture.md` adapter status);
  route to the documenter.

## Next step

Homepage implementer closes the M2 metadata items. When Docker is available,
build/run the image and confirm the healthcheck and non-root `pnpm start`.
Re-run the audit with the expanded 404/cache/cookie assertions.
