# Final quality audit — homepage and site

- **Date:** 2026-11-02
- **Auditor:** quality-auditor (final independent pass)
- **Scope:** completed homepage, blog vertical, SEO/feeds, motion, accessibility,
  production build/start, Dockerfile static review, regression of prior audit.
- **Not audited:** `/design-lab` content (internal/designer-owned), auth/CMS
  (out of scope).
- **Code changes:** none. Only this report and the handoff were added.

## Verdict

**Resolved.** See [`quality-audit-homepage-final.md`](./quality-audit-homepage-final.md) for the P1 closure verification and GO verdict.

At the time of this audit, the site was not launch-ready as-is. Automated gates are green and the homepage is
structurally complete, but two P1 issues remain:

1. Hero/header text contrast over the actual farmland photo fails WCAG AA at
   several viewport/locale combinations. Axe cannot detect contrast over a
   background image, so this is a manual finding.
2. FAQ answers are not in the server-rendered DOM. Without JavaScript the
   accordion has questions but no panels/answers, and raw HTML contains the
   answers only in the React Router stream payload. This violates the
   server-render/content rule for homepage content.

Both are fixable without architectural change. Docker image build/run is still
unverified because no Docker CLI/daemon is installed.

## 1. Commands and exact results

| Command                    | Result                                                                 |
| -------------------------- | ---------------------------------------------------------------------- |
| `pnpm check`               | **Pass** — typecheck, ESLint, Prettier, **14 files / 64 tests**        |
| `pnpm build`               | **Pass** — client 1.28 s, SSR 186 ms                                   |
| `pnpm test:e2e`            | **48/48 pass** dev (13.5 s); **48/48 pass** production on `:3001`      |
| `pnpm test:a11y`           | **12/12 pass** final dev (6.1 s); **12/12 pass** production on `:3001` |
| `pnpm test:seo`            | **15/15 pass** dev (806 ms); **15/15 pass** production on `:3001`      |
| `pnpm format:check`        | **Pass**                                                               |
| `pnpm start` (`:3001`)     | **Pass** — production build served                                     |
| Docker                     | **Unavailable** — `docker: command not found`                          |
| Docker healthcheck command | **Exit 0** against local `/robots.txt`                                 |

A11y note: two earlier dev runs produced 11/12 with `Execution context was
destroyed, most likely because of a navigation` on different pages (`/fa/blog`,
then `/fa`). Immediate/final reruns passed 12/12, and production passed 12/12.
This looks like a dev-server recompile/HMR race in the test setup, not an axe
violation; the suite should settle or run against production in CI.

Client/security checks: `build/client` contains no API token, API base URL,
authorization header, mock fixture text or `process.env` reference; no
`process is not defined` occurred in dev or production; no source maps are
published; production console is clean on the homepage and blog routes.

Build sizes:

- Home route chunk: **110.28 KB raw / 37.92 KB gzip**
- `entry.client`: 229.84 KB / **73.04 KB**
- `jsx-runtime`: 123.54 KB / 40.45 KB
- Root CSS: 66.92 KB / 12.06 KB
- Server entry: 262.34 KB / 59.24 KB

## 2. Homepage route / SEO matrix

Production server: `SITE_URL=http://127.0.0.1:3001`.

| Route / asset                | Status      | Title / description | Canonical     | hreflang                | Social / JSON-LD                                         | Cache                  |
| ---------------------------- | ----------- | ------------------- | ------------- | ----------------------- | -------------------------------------------------------- | ---------------------- |
| `/`                          | 301 → `/fa` | —                   | —             | —                       | —                                                        | —                      |
| `/fa`                        | 200         | 46 / 99 chars       | `/fa`         | fa, en, x-default       | OG/Twitter + Organization + WebSite                      | `public, s-maxage=300` |
| `/en`                        | 200         | 44 / 118            | `/en`         | fa, en, x-default       | same                                                     | public                 |
| `/fa/blog`                   | 200         | 8 / 83              | yes           | fa, en, x-default       | no JSON-LD; OG title only                                | public                 |
| `/en/blog`                   | 200         | 8 / 79              | yes           | fa, en, x-default       | same                                                     | public                 |
| `/fa/blog?q=…`               | 200         | index values        | clean index   | none                    | `noindex, follow`                                        | `no-store`             |
| `/fa/blog?tag=…`             | 200         | index values        | clean index   | none                    | `noindex, follow`                                        | `no-store`             |
| detail (FA/EN)               | 200         | localized           | yes           | fa, en, x-default       | BlogPosting + BreadcrumbList; `/og-default.png` 1200×630 | public                 |
| fallback detail              | 200         | Persian             | to `/fa` slug | fa, en, x-default       | BlogPosting + BreadcrumbList                             | public                 |
| `/fa/nope`, `/en/nope`       | 404         | localized           | —             | —                       | `noindex, nofollow`                                      | `no-store`             |
| `/design-lab` prod           | 404         | localized 404       | —             | —                       | noindex                                                  | `no-store`             |
| `/sitemap.xml`               | 200         | —                   | —             | 24 URLs, all alternates | —                                                        | public                 |
| `/robots.txt`                | 200         | —                   | —             | —                       | design-lab disallowed                                    | public                 |
| `/fa/rss.xml`, `/en/rss.xml` | 200         | —                   | —             | —                       | 10 items each                                            | public                 |

Homepage raw SSR verified:

- `<html lang="fa" dir="rtl">` / `<html lang="en" dir="ltr">`.
- One `<h1>` per locale, `h1→h2→h3` with no skipped levels.
- Canonical is the locale URL; hreflang includes `x-default` → `/fa`.
- OG/Twitter image is the absolute hero JPG, with width/height 2000×1499 and
  alt text. `og:locale`/alternate are present.
- `Organization` and `WebSite` JSON-LD parse and include name, URL, logo,
  email, description, `inLanguage`, and publisher reference.
- Hero `<picture>` has landscape WebP/JPEG at `(min-width: 768px)`, portrait
  WebP fallback source and portrait JPG `<img>` fallback; alt, `width=1200`,
  `height=1800`, `fetchPriority=high`, eager/async.
- Root preloads both BYekan faces; route preloads landscape WebP and portrait
  WebP with mutually exclusive media queries. Browser tests loaded only the
  matching hero crop (portrait at 360, landscape at 768/1024/1440).

SEO notes:

- Homepage title/description are below the documented 50–60 / 140–160 guidance;
  blog index (8/79–83) and detail titles are also short.
- Homepage OG image is 2000×1499 (4:3), not a 1200×630 share card. Blog details
  correctly use the 1200×630 raster `/og-default.png`.
- `Organization.url` and `WebSite.url` change per locale while both reuse the
  same `@id`; crawlers see two inconsistent URLs for one entity. Prefer a root
  `Organization.url` (and document the localized `WebSite` choice) or distinct
  IDs.
- 404 titles/descriptions/noindex and cache policy are now correct (previous P1
  closed). Root redirect is now 301 (previous P2 closed).

## 3. Hero findings

What works:

- Correct responsive crop per breakpoint, meaningful alt, explicit dimensions,
  eager/high-priority loading, only one hero request, and correct preload.
- Hero frame is 688 px at 360 and 702 px at desktop; no horizontal overflow.
- CTAs are 52 px tall, keyboard-focusable, and use a visible inverse ring over
  the dark lower part of the photo.
- Transparent header over the hero and solid header after 8 px scroll/off-home
  both work with JavaScript (e2e passes). Mobile Escape/focus return works.
- LCP is the hero image; CLS is 0 at 390 and 1440, including a full-page scroll.

Contrast failure (measured):

Screenshots were taken with the hero text hidden but the photo/scrim preserved;
the worst background pixel in each text box was compared with white using the
WCAG formula. H1 is large text (3:1); eyebrow/nav are normal text (4.5:1).

| Viewport | FA eyebrow / H1 | EN eyebrow / H1 |
| -------- | --------------- | --------------- |
| 360      | 3.87 / 6.15     | **2.86** / 4.16 |
| 768      | 8.75 / 9.54     | **4.00** / 9.20 |
| 1024     | **3.85** / 8.10 | **1.97 / 2.52** |
| 1440     | 7.72 / 8.91     | **1.98 / 2.53** |

- English desktop is the worst case: the two-line H1 starts over the bright sky
  at 1024/1440, so it fails even the large-text 3:1 threshold. The eyebrow is
  ~2:1.
- Persian desktop sits lower over the field and passes; Persian/English
  eyebrow failures remain at smaller widths.
- Transparent header nav is also white over the bright sky: measured 4.09–4.23
  at 1440 and 4.15 at 768 (FA “Blog”); actual text is `white/85`, so the real
  ratio is lower. The active pill’s `white/15` background makes it worse.
- This directly contradicts `docs/design-system.md` (“white headline and CTAs
  must clear 4.5:1 over the brightest part of the actual image”) and is a
  WCAG 2.2 AA release blocker.

Recommended fix: strengthen the upper/mid scrim (not just the bottom), lower the
desktop copy block and/or constrain H1 width, and use a solid/darker header
surface over the sky. Re-test both locales at 360/768/1024/1440 with the text
hidden screenshot method.

## 4. Sections and content

- **Features:** 4 cards, 4 icon mappings, h3 under h2, hover lift motion-safe;
  pass.
- **Showcase:** 3 steps and 4 app screens; lazy images with alt/dimensions;
  only login has WebP. Declared 1200×750 vs actual PNG 1200×757 is a negligible
  crop; pass.
- **Research:** 4 `CountUp` stats; Persian digits throughout the animation
  (`۸۵۸` → `۱٬۴۷۵` → `۲٬۰۰۰`); reduced motion shows final `۲٬۰۰۰`, `۲۸%`,
  `۴ برابر`, `۲۴۶`; pass.
- **Achievements:** 4 cards with decorative Roman numerals, h3 under h2; pass.
- **Team:** 6 cards; lazy 512×512 portraits; external links open in a new tab
  with `rel="noreferrer"` and an sr-only “opens in a new tab”; 44 px min height;
  pass. Total portraits are ~1.21 MB (123–332 KB each), see performance.
- **Partners:** 2 logos with correct dimensions/alt and names; static, not a
  marquee; pass.
- **Blog teaser:** 3 latest posts with h3 cards under a section h2; API failure
  renders a localized empty card and keeps homepage 200; pass. A hanging API
  delays the whole homepage by **5.0 s** before the empty state.
- **FAQ:** keyboard Enter/Space toggles, focus remains on the trigger,
  `aria-expanded` is correct, axe clean. **Answers are not in the rendered
  DOM**; see P1.
- **Downloads:** Web available with new-tab label; all store/desktop links
  disabled with “Coming soon”; note linked via `aria-describedby`; honest and
  pass.
- **Contact:** email/location/hours render; `phone: null` removes the phone row
  entirely; mailto CTA works; pass.
- **Footer:** duplicate top email removed; contact/download anchors; one email;
  pass. The web-app footer link opens a new tab without an sr-only new-tab
  notice (minor).
- **Header:** transparent/solid behavior correct with JS; see contrast. Without
  JS it never switches to solid, so after scrolling the white nav text sits on
  cream.

## 5. Motion

- `MotionProvider` is present; `Reveal` uses transform/opacity, only hides
  below-fold content after mount, has a 3 s fallback, honors
  `prefers-reduced-motion`, and reveals on `:focus-within` (verified: focused
  team link inside a pending reveal became opacity 1).
- Server HTML has no `data-reveal`/opacity-0 state; without JS the hero,
  research, downloads and primary content are visible.
- Hero CSS animates transform only; reduced motion sets `animation: none` and
  content remains visible.
- CountUp uses `useReducedMotion`, Persian `Intl.NumberFormat`, and final display
  values in reduced motion.
- No scroll hijacking, Lenis, parallax or infinite ambient motion was found.
- CLS 0 at 390/1440, initial and after a full-page scroll.
- **FAQ panel transitions `height`**, contrary to `docs/motion.md` (“avoid
  layout, width, height”); use a transform/grid technique or document the
  exception.
- **Without JS, FAQ panels are absent**, and the header remains transparent
  after scroll. The rest of the homepage is usable.

## 6. Accessibility

- Axe: 12/12 final dev and 12/12 production; manual axe at 360/1440 on `/fa`
  and `/en` returned no violations. This does **not** cover photo contrast.
- Keyboard: skip link focuses `MAIN#main-content` (fixed); TOC focuses target
  heading (fixed); mobile menu Escape/focus (pass); FAQ Enter/Space (pass);
  search/pagination prior suite (pass); hero CTAs have visible focus (pass).
- Heading order: one h1 and no skipped levels on the homepage; blog index is
  now h1→h2 (fixed).
- 360 px: no horizontal overflow in either locale. 768/1024/1440: no overflow.
- 200% zoom: 640 CSS px (1280 at 200%) has no overflow. A stricter 200% text
  size at 360 px produces 444 px scroll width (nowrap hero/CTA and section
  minimum widths) — P2.
- Reduced motion: no running animations, scroll behavior auto, hero animation
  none, final CountUp values.
- RTL/LTR: logical properties used in the homepage/header/footer; team arrow
  flips; no physical left/right utilities found.
- Touch targets: header/language/team/download controls are now ≥44 px; residual
  logo 36×44 and footer links 23×44 fail the internal 44 px square goal. The
  contact email is an inline text link (WCAG exception).
- **Hero/header contrast** is the only manual accessibility failure found and is
  the P1 blocker above.
- **No-JS FAQ/header** gaps are progressive-enhancement/SSR issues.

## 7. Performance

Lab-local Chrome, production server, no throttling. LCP/CLS at 390 and 1440:

| Viewport / locale | LCP   | LCP element | CLS | Initial transfer | JS (gzip) | CSS | Fonts  | Images |
| ----------------- | ----- | ----------- | --- | ---------------- | --------- | --- | ------ | ------ |
| 390 FA            | 88 ms | hero IMG    | 0   | 649 KB           | 195 KB    | 12  | 189 KB | 250 KB |
| 390 EN            | 72 ms | hero IMG    | 0   | 649 KB           | 195 KB    | 12  | 189 KB | 250 KB |
| 1440 FA           | 84 ms | hero IMG    | 0   | 860 KB           | 195 KB    | 12  | 189 KB | 460 KB |
| 1440 EN           | 84 ms | hero IMG    | 0   | 860 KB           | 195 KB    | 12  | 189 KB | 460 KB |

- Hero transfer: 255 KB portrait WebP (mobile), 279 KB landscape WebP
  (desktop). Hero LCP is preloaded and one crop is loaded.
- Fonts: BYekan regular + bold are TTF (476 KB raw, **189 KB compressed**),
  both preloaded on every page. No WOFF2/subsetting yet. `font-display: swap`
  and `font-synthesis-weight: none` are used.
- Images: team PNGs total ~1.21 MB and have no WebP/AVIF/responsive variants;
  three showcase screens are PNG (~36–40 KB each), login is WebP. Public images
  are served with `Cache-Control: public, max-age=0` (hashed JS/CSS is
  immutable).
- At 1440 the browser fetched all four below-fold showcase images despite
  `loading="lazy"` (Chrome lazy threshold), adding ~189 KB to initial transfer.
  After a full scroll the page approaches ~2 MB of image/font/JS weight.
- Home chunk 110/38 KB gzip; Motion/FAQ are the main contributors. Total home
  JS ~195 KB gzip; no obvious duplicate framework bundles. Lazy-loading
  below-fold Motion/FAQ remains a possible follow-up.
- No long tasks were observed; INP was not measured (no Lighthouse dependency
  added).
- Design-lab JS (44.88 KB / 10.77 KB gzip) and CSS (5.49 KB / 1.41 KB gzip)
  are still in the public client build and fetchable, although the route 404s in
  production.

## 8. Regression check from the previous audit

| Previous item                         | Result                                                                                          |
| ------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 404 title/description/noindex         | **Fixed** — `/fa/nope` 404, title/desc/noindex, no-store                                        |
| Invalid API dates crash               | **Fixed** — ISO datetime schema, safe `formatDate`, contract tests                              |
| Fallback `lang`/`dir`                 | **Fixed** — h1/post body carry `lang="fa" dir="rtl"` on the EN fallback URL                     |
| HTML cache headers                    | **Fixed** — public clean pages, `no-store` for filters/errors/design-lab                        |
| Locale cookie on every request        | **Partially fixed** — no rewrite when cookie matches; first anonymous request still sets cookie |
| Blog index heading order              | **Fixed** — h1→h2 cards                                                                         |
| TOC/skip focus                        | **Fixed** — e2e confirms focus on target/main                                                   |
| Persian digits                        | **Fixed** — counts/reading time/stats                                                           |
| Root redirect status                  | **Fixed** — 301                                                                                 |
| Blog OG raster fallback               | **Fixed** — `/og-default.png` 1200×630                                                          |
| Docker hardening                      | **Static pass** — `.env` ignored, USER node, healthcheck, COREPACK_HOME; image not verified     |
| Dev blog hydration / hreflang warning | **Still present** — only when `SITE_URL` differs from origin; production clean                  |
| Touch targets                         | **Mostly fixed** — residual logo/footer widths                                                  |
| Sitemap API failure                   | Still 200 with static URLs only                                                                 |
| API `javascript:` href                | Still not scheme-restricted                                                                     |

## 9. Docker/runbook static review

- Multi-stage pnpm flow is coherent: Corepack/pnpm 12.11.2 in base, frozen
  install, build stage, production-only node_modules, runtime with `build` and
  `package.json`.
- Runtime runs as `USER node` with recursive `--chown`; `COREPACK_HOME` is
  writable; `HEALTHCHECK` uses Node 24 `fetch` against `/robots.txt`;
  `.dockerignore` now excludes `.env`/`.env.*` while keeping `.env.example`.
- `pnpm start` on 3001 works; healthcheck command exits 0 locally.
- Docker CLI/daemon is absent, so non-root image startup, healthcheck timing and
  final image size remain unverified.
- Runbook now documents 301 and cache headers correctly. `.env.example` still
  uses `SITE_URL=http://localhost:3000` while the dev server/runbook use
  `127.0.0.1`; this causes dev canonicals and blog hydration warnings when
  browsing 127.

## 10. Documentation drift

Recommendations only; no docs were edited except this report/handoff.

| Source                                       | Drift / action                                                                                                                                                                                                                                |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/seo-ssr.md`                            | Mark homepage Organization/WebSite, hreflang, canonical and OG/Twitter as done; add `tests/seo/home.spec.ts`; update the “SSR tests” list; recheck/close the 500 note; document the 4:3 OG image and metadata-length gaps.                    |
| `docs/accessibility.md`                      | Remove stale “homepage JSON-LD/hreflang pending” and “full motion not implemented” gaps; mark the manual checklist; add the measured hero/header contrast failure, FAQ no-JS gap and residual touch targets; update axe coverage to 12 tests. |
| `docs/motion.md`                             | `MotionProvider`, `Reveal` and `CountUp` now exist — remove them from “to build” or mark done; partners are static (no marquee); document the FAQ height transition; keep no-scroll-hijack rule.                                              |
| `README.md` / `AGENTS.md`                    | Status text is current; add the final audit/P1 contrast+FAQ fixes and note the route table still omits `sitemap.xml`, `robots.txt` and RSS.                                                                                                   |
| `tasks.md`                                   | M2-2/3/4/5 are done; M4-7 (“Final re-audit after homepage”) should move to done after handoff; M4-5, M4-2 and M2-1 remain review/todo. Do not edit from this audit.                                                                           |
| `.ai/memories/working/sfa-website/README.md` | Stale: still says M0 foundation only and “designer apply tokens / homepage implementer next”; update milestone and Next to homepage complete + final audit.                                                                                   |
| `docs/design-system.md`                      | Component “Next” list still includes FAQ Accordion, TableOfContents and motion primitives that exist; add the hero contrast re-test requirement.                                                                                              |
| `docs/architecture.md`                       | `shared/` rule still says no module imports; `format-date.ts` and `format-number.ts` import the blog `Locale` type. Type-only, but the rule is literal.                                                                                       |
| `.env.example`                               | Align `SITE_URL` with the runbook's `127.0.0.1` host, or make both use localhost and document the invariant.                                                                                                                                  |
| `docs/quality-audit.md`                      | Prior report is superseded by this one; link/replace it after the P1 fixes.                                                                                                                                                                   |
| `docs/testing.md`                            | Add homepage no-JS FAQ/header, hero-contrast and cache tests; document the dev a11y settle/flake.                                                                                                                                             |

## 11. Prioritized blockers

### P0

None.

### P1 — launch blockers

1. **Hero and transparent-header contrast fails over the actual photo.**
   English H1 is ~2.5:1 at 1024/1440 (fails 3:1), eyebrow is ~2:1, and several
   360/768 eyebrow/header-nav combinations fall below 4.5:1. Fix the scrim,
   copy placement and/or header surface; re-test both locales against the real
   photograph.
2. **FAQ answers are not server-rendered or available without JavaScript.**
   Raw SSR contains questions but no `faq-panel`/answers; the answer text exists
   only in the stream payload. A presentation site should render the answer
   content in the SSR DOM with a no-JS fallback (e.g. `<details>` or a static
   list) and keep the enhanced accordion client-side.

### P2 — before/soon after launch

- Transparent header remains transparent without JS; after scrolling, white
  nav/logo text sits on cream. Add a no-JS solid fallback or CSS scroll-state
  alternative.
- 200% text-only at 360 px overflows 84 px; standard 200% zoom (640 CSS px)
  passes.
- Residual touch targets: logo 36×44 and footer links 23×44 vs the internal
  44 px goal.
- Homepage/blog metadata lengths are below guidance (home 46/44 chars and
  99/118 descriptions; blog index 8 chars). Homepage OG image is 4:3; blog index
  has no OG image/Twitter card.
- `Organization.url`/`WebSite.url` per-locale inconsistency under one `@id`.
- Homepage teaser waits up to 5 s for the supplementary blog API on timeout;
  consider a shorter budget or non-blocking fallback.
- Fonts: two TTF files, 476 KB raw / 189 KB compressed, both preloaded; WOFF2
  and subsetting would materially reduce cost.
- Team PNGs ~1.21 MB and three showcase PNGs lack WebP/responsive variants;
  initial 1440 transfer 860 KB and full-page weight ~2 MB.
- Home JS 110/38 KB chunk includes Motion/FAQ; lazy-loading below-fold motion is
  a reasonable follow-up.
- FAQ height animation conflicts with the transform/opacity motion rule.
- Dev-only blog hydration mismatch and `hreflang` warning when `SITE_URL`
  differs from origin; production with matching env is clean.
- First anonymous HTML request still sets `Set-Cookie`, limiting shared-cache
  behavior; conditional rewrite only helps returning visitors.
- Homepage a11y suite flaked twice in dev (11/12) with execution-context
  destruction; production is 12/12. Add a settle/wait or use production in CI.
- Design-lab JS/CSS remains publicly fetchable in `build/client`.
- Sitemap returns 200 with static URLs when the API is down; monitor or signal.
- API link `href` schemes (`javascript:`) and `content.type` vs `template`
  refinement remain unhardened.
- Docker image (non-root start, healthcheck, size) still needs a daemon.
- Docs drift table above.

## 12. Launch recommendation

Do the two P1 fixes first, then re-run `pnpm check`, build, e2e, a11y and SEO
against production. The automated gates do not catch either P1, so keep the
manual hero-contrast and no-JS FAQ checks in the release checklist. After those
fixes, the remaining work is P2 performance/asset polish, content/link
confirmations, docs sync and Docker verification.
