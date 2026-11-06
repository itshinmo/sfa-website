# Quality audit — M0 / M3 and release readiness

- **Date:** 2026-11-02
- **Auditor:** quality-auditor (independent pass)
- **Scope:** React Router 8 SSR presentation site, Persian/English routing, blog
  vertical, homepage placeholder, feeds, Docker/runbook, API boundary.
- **Not audited:** `/design-lab` content and design files (designer editing
  concurrently), CMS/auth/checkout (out of scope).
- **Code changes:** none. Only this report and the handoff were added.

Follow-up (2026-11-02): the 404 title, invalid-date, fallback `lang`/`dir`, cache-header, cookie, heading-order, focus, and Persian-digit P1/P2 items were closed in `quality-fixer-p1`. Homepage canonical/hreflang/OG/Organization/WebSite JSON-LD remain M2 launch items.

Verdict: **no P0 findings**. The blog vertical and production server are in good
shape; four P1 items should be closed before public launch. The homepage is
still the M0 placeholder, so its metadata gaps are expected to be closed in M2,
but they are still release blockers.

## 1. Commands and results

Final runs were executed after the designer's concurrent edits; all commands
below are from the current working tree.

| Command             | Result                                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| `pnpm typecheck`    | **Pass**                                                                                                 |
| `pnpm lint`         | **Pass** (ESLint + jsx-a11y)                                                                             |
| `pnpm test`         | **Pass** — 12 files, 52 tests (earlier run during the audit: 11 files, 50 tests; concurrent tests added) |
| `pnpm build`        | **Pass** — client 1.01 s, SSR 161 ms; sizes below                                                        |
| `pnpm test:e2e`     | **Pass** — 28/28 (desktop + Pixel 7), 9.0 s                                                              |
| `pnpm test:a11y`    | **Pass final** — 8/8; first run had one transient failure (see below)                                    |
| `pnpm test:seo`     | **Pass** — 8/8                                                                                           |
| `pnpm format:check` | **Pass** — all files match Prettier; no designer-only failures                                           |
| `pnpm start` :3001  | **Pass** — production server served the current build; no asset 404s after a clean restart               |
| `docker version`    | **Not available** — `docker: command not found`; image was not built or run                              |

Notes:

- The first `pnpm test:a11y` run reported `page.evaluate: Execution context was
destroyed, most likely because of a navigation` on `/fa`, with 7/8 passing.
  An immediate rerun and the final run passed 8/8. This is consistent with a dev
  server HMR reload while the designer was editing, not an axe violation.
- A concurrent build at 16:02 temporarily replaced `build/client` while an older
  production server was running, producing transient 404s for hashed assets.
  After rebuilding and restarting on :3001, production HTML referenced existing
  assets and the browser console was clean. This was a local build race, not a
  product defect.
- Production suites were also run against :3001: e2e 28/28, a11y 8/8, SEO 8/8.

## 2. Route and SEO matrix

Tested with raw `fetch`/`curl` against the production server
(`SITE_URL=http://127.0.0.1:3001`) and the dev server. Canonical values below
are from the production test; dev falls back to `http://localhost:3000`.

| Route                                          | Status | Title / description     | Canonical              | hreflang + x-default              | Robots / JSON-LD                 | Notes                                                                       |
| ---------------------------------------------- | ------ | ----------------------- | ---------------------- | --------------------------------- | -------------------------------- | --------------------------------------------------------------------------- |
| `/`                                            | 302    | —                       | —                      | —                                 | —                                | Redirects to `/fa`; docs say permanent, actual is 302.                      |
| `/fa`                                          | 200    | yes / yes (24/74 chars) | **missing**            | **missing**                       | no JSON-LD                       | Default landing page; no canonical, hreflang, OG.                           |
| `/en`                                          | 200    | yes / yes (21/89)       | **missing**            | **missing**                       | no JSON-LD                       | Same as `/fa`.                                                              |
| `/fa/blog`                                     | 200    | yes / yes (8/83)        | yes                    | fa, en, x-default                 | indexable                        | OG title present; no OG image/Twitter card.                                 |
| `/en/blog`                                     | 200    | yes / yes (8/79)        | yes                    | fa, en, x-default                 | indexable                        | Same.                                                                       |
| `/fa/blog?q=…`, `?tag=…`                       | 200    | same as index           | clean index            | none                              | `noindex, follow`                | Canonical intentionally drops the query.                                    |
| `/en/blog?q=…&page=2`                          | 200    | same as index           | `?page=2`              | none                              | `noindex, follow`                | Pagination canonical kept; filtered page not indexable.                     |
| reference FA `/fa/blog/مثلث-بافت-خاک`          | 200    | yes / yes (30/81)       | yes                    | fa, en, x-default                 | `BlogPosting` + `BreadcrumbList` | TOC present, cover + inline image.                                          |
| reference EN `/en/blog/soil-texture-triangle`  | 200    | yes / yes (43/99)       | yes                    | fa, en, x-default                 | `BlogPosting` + `BreadcrumbList` | TOC present.                                                                |
| narrative FA `/fa/blog/سمفونی-قطره-ها`         | 200    | yes / yes (43/93)       | yes                    | fa, en, x-default                 | `BlogPosting` + `BreadcrumbList` | TOC present.                                                                |
| case-study FA `/fa/blog/نتایج-پایلوت-اس-اف-ای` | 200    | yes / yes (32/71)       | yes                    | fa, en, x-default                 | `BlogPosting` + `BreadcrumbList` | No TOC; fixed case-study sections are intentionally excluded.               |
| simple FA `/fa/blog/به-اس-اف-ای-خوش-آمدید`     | 200    | yes / yes (21/58)       | yes                    | fa, en, x-default                 | `BlogPosting` + `BreadcrumbList` | No TOC because fewer than two headings.                                     |
| fallback `/en/blog/مثلث-بافت-خاک`              | 200    | Persian title/desc      | points to `/fa/blog/…` | fa, en, x-default                 | `BlogPosting` + `BreadcrumbList` | Visible fallback notice; `<html lang="en">`/`ltr` while article is Persian. |
| unknown `/fa/does-not-exist`, `/nope`          | 404    | **none**                | **none**               | none                              | none                             | Localized H1 and 404 status; no `<title>`, description or canonical.        |
| `/design-lab` (dev)                            | 200    | yes                     | —                      | —                                 | `noindex, nofollow`              | Internal page; not audited.                                                 |
| `/design-lab` (production)                     | 404    | **none**                | —                      | —                                 | —                                | Correctly gated with `DESIGN_LAB=0`; error page lacks title.                |
| `/sitemap.xml`                                 | 200    | —                       | —                      | 24 URLs, all with fa/en/x-default | —                                | 4 static + 10 FA + 10 EN posts; `lastmod` on posts.                         |
| `/robots.txt`                                  | 200    | —                       | —                      | —                                 | —                                | `Disallow: /design-lab`, sitemap absolute URL.                              |
| `/fa/rss.xml`, `/en/rss.xml`                   | 200    | —                       | —                      | —                                 | —                                | 10 items each, correct `language`, dates, links, Atom self link.            |

### SSR metadata detail

- Blog detail metadata is solid: title, description, canonical, real-slug
  alternates, `x-default`, OG article fields, Twitter card, `BlogPosting`,
  `BreadcrumbList`, ISO dates and localized breadcrumb names.
- `hreflang` is emitted from `post.alternates`, not a prefix swap. The fallback
  page canonicalizes to the content locale, which is correct for duplicate
  content.
- Search/tag pages are `noindex, follow`; clean and paginated index pages are
  indexable with canonical/alternates.
- Homepage metadata is the main gap: no canonical, no hreflang, no OG/Twitter,
  no `Organization`/`WebSite` JSON-LD. `docs/seo-ssr.md` already lists
  Organization/WebSite and homepage hreflang as remaining, but not the canonical.
- Title/description lengths are mostly below the documented 50–60 / 140–160
  guidance. Examples: `/fa` 24/74, `/fa/blog` 8/83, case-study 32/71. This is
  content SEO work, not a rendering bug.
- Blog detail OG image is the cover SVG (`1600×900`). It is absolute and has
  `og:image:alt`, but social platforms are inconsistent with SVG; use a raster
  1200×630 share image. No `og:image:width`/`height`.
- 404 responses have a correct status and localized H1, but no `<title>`,
  description or canonical. Axe reports `document-title` as **serious** on both
  `/fa/nope` and `/en/nope`.

## 3. Client and hydration

- **No `process is not defined`** on any route, dev or production.
- **No token or API env leakage**: `grep` over `build/client` finds no
  `BLOG_API_TOKEN`, `BLOG_API_BASE_URL`, `Authorization`, `Bearer`, mock post
  titles, or `FastApiBlogRepository`. The token was passed to the production
  server during testing and never appeared in HTML.
- Browser console in production: clean on `/fa`, `/en`, `/fa/blog`, `/en/blog`,
  reference/narrative/case-study/simple details and SPA navigation. 404 routes
  log the expected failed document request only.
- Client-side navigation updates title, canonical and JSON-LD correctly; after
  navigating index → detail, two JSON-LD scripts are present, and after
  detail → index they are removed.
- **Dev-only hydration mismatch:** with no `SITE_URL` and the dev server
  accessed at `http://127.0.0.1:3000`, server `SITE.url` falls back to
  `http://localhost:3000` while the client uses `window.location.origin`.
  Every blog detail logs a React hydration mismatch on the JSON-LD script
  (`__html` differs). Browsing `http://localhost:3000` removes it. In
  production, setting `SITE_URL` exactly to the public origin removes it; a
  missing or different `SITE_URL` would reproduce it. This is a configuration
  invariant, not a client crash.
- **Dev-only React warning:** `Invalid DOM property hreflang. Did you mean
hrefLang?` on every blog page. SSR output still has the correct `hreflang`
  attribute; production builds do not warn. The meta descriptors use
  `hreflang` instead of React's `hrefLang`.
- No source maps are published (`0` `.map` files in `build/client`).
- `build/client/assets/site-*.js` contains the guarded site URL fallback and
  public contact/web-app URLs only; no secret.

## 4. Accessibility

Automated axe coverage passes for the eight configured pages (home both
locales, blog index both locales, one detail per locale, filtered search/tag).
Manual axe on additional states found:

- **Serious:** `document-title` on `/fa/nope` and `/en/nope` (and production
  `/design-lab` 404). This is the only serious violation found and is not in
  the current axe suite.
- **Moderate:** `heading-order` on `/fa/blog`, `/en/blog` and filtered index:
  `h1` is followed directly by card `h3`s with no intervening `h2`.
- Fallback detail page has no axe violations, but the language/direction issue
  below is not detectable by axe.

Keyboard/manual checks:

- **Mobile navigation:** opens from the keyboard, `aria-expanded` updates,
  Escape closes it and restores focus to the trigger, in both `fa` and `en`.
- **Search:** visible label, Enter submits, URL becomes `?q=…`, result count
  updates through `role="status"`, and focus ring is a 2 px solid brand outline.
- **Pagination:** `rel="prev"`/`rel="next"` links are keyboard-operable with a
  visible focus ring; disabled states are non-focusable.
- **TOC:** links have valid targets and a visible focus ring. After activation
  `document.activeElement` becomes `BODY`; focus is not moved to the target
  heading, so keyboard/screen-reader position is lost. The skip link has the
  same behavior (scrolls to main, focus falls to body).
- **FAQ:** no public page renders `FaqAccordion`; the component exists but is
  unused, so there is no FAQ keyboard state to test yet.
- **360 px:** no horizontal overflow on home, blog index, detail or 404 in
  either direction.
- **200% text zoom:** no horizontal overflow on home, blog index or detail.
- **Reduced motion:** no running animations, `scroll-behavior: auto`, and no
  hidden content on `/fa`; the motion system is not used by current routes.
- **Contrast:** axe passes; manually sampled muted text/focus colors are above
  4.5:1 / 3:1 on the warm and white surfaces.
- **Touch targets:** against the internal 44 px target, the language switch is
  69×30, tag chips are 38 px high, the logo link is 36×36, and footer links are
  20 px high. WCAG 2.2 2.5.8 (24 px minimum or sufficient spacing) is likely
  met, but the project's stated 44 px goal is not.
- **Fallback language:** `<html lang="en" dir="ltr">` is kept on
  `/en/blog/مثلث-بافت-خاک` while the article, title and fallback notice content
  are Persian. WCAG 3.1.2 (Language of Parts) requires the Persian article to
  carry `lang="fa"` and `dir="rtl"` (or the page to use `contentLocale`).
- **Persian digits:** dates are correctly localized (`۲۲ خرداد ۱۴۰۵`), but
  reading time and result/page counts use Latin digits (`7 دقیقه مطالعه`,
  `10 مقاله`, `صفحه 1 از 2`). `docs/i18n-rtl.md` says Persian digits are the
  default; use `Intl.NumberFormat` for these interpolations.

## 5. Performance

Measured in Chrome via Playwright at 390×844, local production server, no
network throttling. These are lab-local numbers, not field data; INP was not
measured and Lighthouse was not run (no dependency added).

| Route                 | LCP    | LCP element       | CLS | Transfer | JS (br) | CSS (br) | Requests |
| --------------------- | ------ | ----------------- | --- | -------- | ------- | -------- | -------- |
| `/fa`                 | 164 ms | H1                | 0   | 172 KB   | 157 KB  | 11 KB    | 16       |
| `/en`                 | 76 ms  | H1                | 0   | 172 KB   | 157 KB  | 11 KB    | 16       |
| `/fa/blog`            | 144 ms | first cover image | 0   | 176 KB   | 158 KB  | 11 KB    | 20       |
| `/en/blog`            | 84 ms  | first cover image | 0   | 176 KB   | 158 KB  | 11 KB    | 20       |
| reference detail (FA) | 136 ms | cover image       | 0   | 176 KB   | 159 KB  | 11 KB    | 18       |
| reference detail (EN) | 84 ms  | cover image       | 0   | 176 KB   | 159 KB  | 11 KB    | 18       |

Build sizes (Vite/Brotli report):

- `entry.client`: 232.62 KB raw / **73.67 KB br**
- `jsx-runtime`: 123.54 KB raw / **40.45 KB br**
- `context`: 44.60 KB / 14.33 KB br
- root CSS: 62.79 KB / **11.40 KB br**
- design-lab route: 43.51 KB / 10.42 KB br (not loaded by public routes)
- server entry: 200.64 KB / 45.20 KB br
- All client JS: 584 KB on disk; all CSS: 72 KB on disk. Public folder: 1.6 MB.

Findings:

- LCP is fast locally and CLS is 0. Blog covers are eager/high priority with
  width/height; inline images are lazy with dimensions.
- The three first blog cards all get `fetchPriority="high"`. With real raster
  covers this competes for bandwidth; only the actual LCP card should be high
  priority.
- No image `srcSet`/`sizes` strategy is exercised by mock data; `srcSet` without
  `sizes` (when the API provides one) would assume 100vw. Add `sizes` when the
  API supplies variants.
- No self-hosted font files despite the Vazirmatn token. The site currently
  falls back to system fonts; there is no font CLS, but identity depends on the
  OS. `docs/seo-ssr.md` and `docs/design-system.md` describe self-hosting.
- Team PNGs are 512×512 and 123–332 KB each (~1.21 MB total), with no
  WebP/AVIF/srcset. They are unused on the current homepage but will be heavy
  when M2 adds the team section. Partner logos are 16/36 KB.
- Public images are served with `Cache-Control: public, max-age=0` (hashed
  assets are immutable, correctly). Add long-lived cache headers for
  unversioned public images or version them.
- HTML documents have **no `Cache-Control` at all**, and every HTML response
  sets a locale cookie. That prevents CDN/shared caching and contradicts
  `docs/seo-ssr.md` / `docs/blog-api.md`. The loader `data()` headers do not
  reach document responses in this setup; sitemap/RSS/robots do send their
  headers. Use route `headers` exports or proxy rules.
- `build/client` ships the design-lab JS/CSS chunk publicly even though the
  route 404s in production. It is not linked, but the asset is fetchable.

## 6. Docker and runbook

Docker CLI/daemon is unavailable on this machine (`docker: command not found`),
so the image was not built or run. `pnpm start` on port 3001 was used as the
production smoke test.

Static review of `Dockerfile`:

- Multi-stage pnpm flow is structurally correct: base with Corepack/pnpm
  12.11.2, dependencies with frozen lockfile, build with dev deps, production
  dependencies with `--prod --frozen-lockfile`, runtime with only `build`,
  production `node_modules` and `package.json`.
- `pnpm start` is valid in runtime because `@react-router/serve` is a production
  dependency; `ENV NODE_ENV=production` and `PORT=3000` are set.
- The runtime image does **not** copy `.env`, `content`, or source, which is
  correct for this build.
- `.dockerignore` does **not** exclude `.env`/`.env.*`. A local `.env` would be
  sent in the build context and could be captured in the builder stage. Add an
  ignore rule (keep `.env.example`).
- Runtime runs as root; no `USER node`, healthcheck, or security headers. These
  are operational hardening items, not blockers for a static marketing image.
- The design-lab route is gated at runtime, but its client chunk is still built
  into the image and publicly addressable (see performance).

Runbook review:

- `pnpm dev`, `pnpm build`, `pnpm start`, `PORT` behavior, `SITE_URL`,
  `BLOG_API_BASE_URL`, `BLOG_API_TOKEN` and `DESIGN_LAB` are accurate.
- The claim that production pages have public cache headers is not true for
  HTML documents (see above).
- The runbook says the dev server binds to `127.0.0.1:3000` so Playwright/curl
  agree, but `.env.example` uses `SITE_URL=http://localhost:3000` and the code
  fallback is `localhost`. Testing at `127.0.0.1` produces the hydration
  mismatch described above. Align the default host and `SITE_URL`.
- The release checklist says "No design lab in production (`DESIGN_LAB`
  unset)" but does not mention that the design-lab chunk remains in
  `build/client`. Decide whether that is acceptable.
- `SITE_URL` is documented as required but is not validated at startup. If it
  is unset in production, canonicals/sitemap/RSS/JSON-LD silently use
  `http://localhost:3000`. Prefer a startup check or fail the deployment.
- `BLOG_API_BASE_URL` empty in production silently serves mock fixtures. The
  runbook says it is required; consider failing fast outside development.

## 7. API and environment behavior

Verified with the real server and a local fake FastAPI:

- **Mock fallback:** with no `BLOG_API_BASE_URL`, list/detail/tags/related/
  sitemap/RSS use `MockBlogRepository`; 10 posts per locale, four templates,
  fallback notice works.
- **Token/server boundary:** `Authorization: Bearer <token>` and
  `Accept: application/json` were observed on the fake API; the token never
  appeared in HTML or `build/client`.
- **Happy path:** list, detail, tags, related, sitemap and RSS rendered from the
  fake API; sitemap/RSS used `SITE_URL`.
- **Failure paths:** blog index 502 with localized retry state, detail 502 with
  retry, RSS 503 plain text, sitemap still 200 with static URLs only. No blank
  pages, no token leakage.
- **Malformed payloads:** Zod errors map to `invalid_response`; unit tests cover
  malformed JSON, HTTP errors, network errors and the 5-second timeout.
- **Invalid dates are not validated.** `publishedAt`/`updatedAt` are
  `z.string()`. A fake API returning `"not-a-date"` produced `RangeError:
Invalid time value` from `Intl.DateTimeFormat` and a **500** on both the blog
  index and detail. This violates the non-negotiable that invalid API data must
  not crash a page. Validate ISO datetimes in Zod and make `formatDate` return a
  safe fallback.
- `content.type` is validated as a union but not refined against `template`; a
  mismatched payload renders the content-type renderer rather than the named
  template. Low risk, contract-level hardening.
- `href` fields in inline text and case-study CTA are arbitrary strings. The
  renderer only adds `rel` for http(s), but a `javascript:` URL would still be
  rendered as a link. Restrict schemes at the Zod boundary or renderer.
- Sitemap swallows per-locale API failure and returns 200 with static URLs;
  deliberate in the code comment, but repeated failures could drop posts from
  crawlers. Document or monitor it.

## 8. Documentation drift

Reported, not edited. `docs/` predates the final code in several places.

| Source                                                   | Claim                                                                           | Observed                                                                                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `AGENTS.md` (SSR/SEO non-negotiables), `docs/seo-ssr.md` | Every public page has title, description, canonical                             | `/fa` and `/en` have no canonical; 404/error pages have no title/description/canonical.                                           |
| `docs/seo-ssr.md`, `docs/blog-api.md`                    | Public HTML pages have cache headers (`max-age=0, s-maxage=300…`)               | No `Cache-Control` on HTML responses; sitemap/RSS/robots do have it.                                                              |
| `docs/i18n-rtl.md`                                       | `/` redirects permanently to `/fa`                                              | Actual `loader` uses `redirect("/fa")` → 302.                                                                                     |
| `docs/runbook.md`, `.env.example`                        | Dev binds 127.0.0.1 and Playwright/curl agree on host                           | `.env.example` and code fallback use `localhost:3000`; browsing 127.0.0.1 causes canonical/hydration mismatch on detail pages.    |
| `docs/architecture.md`                                   | `shared/` never imports `modules/`                                              | `app/shared/lib/format-date.ts` and `app/shared/lib/locale.ts` import the blog `Locale` type. Type-only, but the rule is literal. |
| `docs/architecture.md`                                   | FastAPI adapter is "planned" in the SSR data flow                               | Adapter is implemented and used when `BLOG_API_BASE_URL` is set.                                                                  |
| `docs/testing.md`                                        | E2E covers download CTA available/placeholder states                            | No E2E references downloads.                                                                                                      |
| `docs/accessibility.md`                                  | Add axe checks for detail, search, 404, design lab                              | Detail/search exist; 404 and design lab are not in the suite. 404 has a serious `document-title` violation.                       |
| `docs/design-system.md`                                  | Self-hosted Persian face; Accordion/TableOfContents are still "next" components | No font files exist; `FaqAccordion` and `TableOfContents` are implemented.                                                        |
| `docs/motion.md`                                         | Motion primitives are still "to build"                                          | `MotionProvider` and `Reveal` exist (unused by public routes).                                                                    |
| `docs/blog-api.md`                                       | `q` searches title, excerpt, tags and body                                      | Mock search covers title, excerpt and tag labels only.                                                                            |
| `docs/content-migration.md`                              | Team portraits were re-encoded; also says no optimizer was available            | Contradictory statements in the same document; actual files are 512×512 and optimized to 123–332 KB.                              |
| `docs/runbook.md`                                        | No design lab in production                                                     | Route 404s, but design-lab JS/CSS remains in the public build and is fetchable.                                                   |

Minor README drift: its route table omits `sitemap.xml`, `robots.txt` and
`/:locale/rss.xml`, which `docs/architecture.md` includes. It is not wrong, just
incomplete.

## 9. Prioritized blockers

### P0

None.

### P1 — fix before public launch

1. **404 and error pages have no `<title>`.** `/fa/does-not-exist`, `/nope` and
   the production `/design-lab` 404 return a localized H1 but an empty document
   title. Axe reports a serious `document-title` violation; WCAG 2.4.2 and SEO
   both fail. Fix at the root error boundary/meta layer so all 404/500 paths
   get a localized title (and description/canonical where appropriate).
2. **Homepage lacks canonical (and the documented hreflang/JSON-LD/OG work).**
   `/fa` and `/en` are the default landing pages and have no canonical. The
   sitemap lists them, so canonical/hreflang should be added as part of M2 (the
   docs already list Organization/WebSite and homepage hreflang as remaining,
   but not canonical). Keep this on the M2 definition of done.
3. **Invalid API dates crash SSR with a 500.** A non-ISO `publishedAt` or
   `updatedAt` passes Zod and throws in `Intl.DateTimeFormat`. Validate ISO
   datetimes at the boundary and make `formatDate` tolerant; add a contract
   test.
4. **Fallback detail pages declare the wrong content language.** The English
   fallback URL serves Persian article content under `<html lang="en"
dir="ltr">`. Add `lang="fa" dir="rtl"` to the article/content (or derive the
   document language from `contentLocale`) and keep the fallback notice.
   WCAG 3.1.2 AA.

### P2 — fix before or during M2 / next maintenance

- HTML documents have no cache headers and set a locale cookie on every
  response; CDN/shared caching is effectively disabled. Add route `headers`
  exports or proxy cache rules, and avoid `Set-Cookie` on anonymous crawler
  requests if possible.
- Dev hydration mismatch when `SITE_URL` differs from the request origin; make
  the site URL invariant explicit and validate `SITE_URL` at startup.
- React dev warning from `hreflang` (use `hrefLang` in meta descriptors).
- Blog index heading order: `h1` → card `h3`; add a section `h2` or make cards
  `h2`.
- TOC and skip-link activation leaves focus on `BODY`; move focus to the target
  heading (`tabindex="-1"` + focus) or preserve focus.
- Touch targets below the internal 44 px goal (language switch, tag chips,
  logo, footer links).
- Persian counts/reading time use Latin digits while dates use Persian digits.
- Metadata lengths are below the documented guidance; OG image is SVG and blog
  index has no OG image/Twitter card.
- Root `/` redirect is 302; make it 301/permanent if intended.
- Docker hardening: exclude `.env` from build context, run as non-root, add a
  healthcheck, and set security headers at Nginx/CDN.
- Design-lab JS/CSS is shipped in the public build; decide whether to gate it
  at build time.
- Sitemap returns 200 with static URLs when the API is down; monitor or return
  a signal so search engines do not drop post URLs.
- Harden API link schemes (`javascript:`) and add date/`template` refinements to
  the Zod boundary.
- Performance: optimize team PNGs (WebP/AVIF + responsive sizes), add `sizes`
  with API `srcSet`, preload only the real LCP image, avoid three high-priority
  cards, and either ship the stated Persian webfont or remove the claim.
- Docs drift table above; assign to documenter after the code fixes land.

## 10. Recommended next action

The smallest safe pre-M2 fix set is:

1. Add a root/error-boundary `<title>` (and generic description) for 404/500 and
   production design-lab 404.
2. Validate ISO datetimes in `blog-api-schemas.ts` and make `formatDate` return
   a neutral fallback instead of throwing.
3. Set `lang`/`dir` on fallback article content from `contentLocale`.

Then make canonical, hreflang, OG/Twitter and `Organization`/`WebSite` JSON-LD
part of the homepage acceptance criteria rather than a post-launch follow-up.
After that, add HTML cache headers, fix the `hreflang` prop and heading order,
and re-run this audit with 404/error pages and cache assertions added to the
suites. Docker image verification remains blocked until a Docker daemon is
available; `pnpm start` on a non-3000 port already validates the production
build path.
