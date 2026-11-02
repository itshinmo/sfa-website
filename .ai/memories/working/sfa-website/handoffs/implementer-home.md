# Implementer — Homepage

- **Status:** done
- **Date:** 2026-11-02
- **Task id:** M2-2, M2-3, M2-4, M2-5 (homepage implementation)

## Changed files

Homepage:

- `app/routes/home.tsx`
- `app/modules/home/presentation/section-intro.tsx` (new)
- `app/modules/home/presentation/home-hero.tsx` (new)
- `app/modules/home/presentation/home-features.tsx` (new)
- `app/modules/home/presentation/home-showcase.tsx` (new)
- `app/modules/home/presentation/home-research.tsx` (new)
- `app/modules/home/presentation/home-achievements.tsx` (new)
- `app/modules/home/presentation/home-team.tsx` (new)
- `app/modules/home/presentation/home-partners.tsx` (new)
- `app/modules/home/presentation/home-blog-teaser.tsx` (new)
- `app/modules/home/presentation/home-faq.tsx` (new)
- `app/modules/home/presentation/home-downloads.tsx` (new)
- `app/modules/home/presentation/home-contact.tsx` (new)

Shared UI / styles:

- `app/shared/ui/site-header.tsx`
- `app/shared/ui/site-footer.tsx`
- `app/shared/ui/button.tsx`
- `app/app.css` (hero frame/scrim/rise utilities only)
- `app/locales/fa/home.ts`, `app/locales/en/home.ts` (new homepage-only UI keys)

Tests:

- `tests/e2e/home.spec.ts` (new)
- `tests/a11y/home.spec.ts` (new)
- `tests/seo/home.spec.ts` (new)
- `tests/unit/home-hero.test.tsx` (new)
- `tests/e2e/smoke.spec.ts` (updated hero strings)
- `tests/seo/ssr.spec.ts` (updated homepage SSR strings)

Not edited: `app/styles/tokens.css`, `fonts.css`, `content/home/**`, blog module/routes,
`decisions/`, `docs/`, `package.json`, lockfile, tasks/questions. No git staging.

## What was implemented

- Full homepage assembled from `getHomeContent(locale)` in both locales.
- Full-bleed `<picture>` hero: landscape WebP/JPEG ≥768px, portrait WebP/JPEG
  below 768px, explicit 1200×1800 intrinsic size, eager/high-priority/async
  decoding, content alt, bottom-weighted forest scrim, top scrim for header
  legibility, white copy in the lower third, warm-paper primary CTA `#download`,
  white-outline secondary `#showcase`, inverse focus rings.
- Route `links` preloads one matching hero WebP per breakpoint.
- Slim trust strip below the hero using `hero.highlights`; no dashboard/stat
  cards inside the hero.
- Sections: features (4 icon cards), showcase (3 steps + 4 paper/browser-framed
  app screens, lazy), research (4 `CountUp` stats using `display` final and
  `value` animation), achievements (I–IV cards), team (6 cards, lazy portraits,
  roles/bios/public links with new-tab semantics and 44px targets), partners
  (2 logos + names), blog teaser (latest 3 from
  `blogRepository.listPosts({ locale, page: 1, pageSize: 3 })`, `PostCard`
  heading level 3, graceful empty state), FAQ (`FaqAccordion`), downloads
  (web/mobile/desktop groups, available links open in a new tab, placeholders
  disabled with coming-soon, note linked by `aria-describedby`), contact
  (email/location/hours, phone hidden when null, mailto CTA).
- Header: transparent over the home hero and solid after scroll/off-home, with
  inverse logo/nav/language/CTA colors on the photo and solid states elsewhere;
  mobile Escape/focus behavior retained; 44px header/nav/language/footer targets.
- Footer: removed duplicated top email, added contact anchor, kept one email.
- Motion: `MotionProvider`; CSS hero rise (transform-only, no opacity dip);
  `Reveal` for below-fold sections/cards; `CountUp`; hover/focus states;
  reduced-motion paths; content visible without JS.
- Accessibility: one h1, section h2s, card h3s, logical properties, alt text,
  decorative icons hidden, valid list semantics, no horizontal overflow at
  360/768/1024/1440.
- SEO: content title/description, canonical `SITE.url/{locale}`, fa/en/x-default
  hreflang, OG/Twitter with hero image, `Organization` + `WebSite` JSON-LD.
  `sameAs` intentionally omitted because there are no official profiles.
- Fixed a locale bug exposed by single-fetch: `/en.data` makes middleware
  `findLocale` see `en.data`; the home loader now uses `params.locale`. This
  only affects top-level locale routes (nested routes start with the locale
  segment).
- Fixed JSON-LD hydration mismatch by computing absolute URLs from a
  server-serialized `siteUrl` in loader data.

## Verification

Latest tree:

- `pnpm check` — pass (typecheck, ESLint, Prettier, 14 files / 64 tests).
- `pnpm build` — pass.
- `pnpm test:e2e` — 48/48 dev and 48/48 production on `:3001`.
- `pnpm test:a11y` — 12/12 dev and 12/12 production.
- `pnpm test:seo` — 15/15 dev and 15/15 production.
- Production server:
  `PORT=3001 SITE_URL=http://127.0.0.1:3001 DESIGN_LAB=0 pnpm start`.
- Raw production HTML checked: canonical `http://127.0.0.1:3001/en`, fa/en/
  x-default hreflang, `Organization`/`WebSite` JSON-LD with logo, hero picture,
  both preloads, localized Persian metadata.
- Browser checks at 360/768/1024/1440, both locales: 0 console errors, 0
  horizontal overflow, one h1, correct hero WebP selected per breakpoint.
- No-JS E2E confirms homepage content is visible without JavaScript.

## Open questions / drift

- Homepage-only UI copy needed new keys: download group labels, blog teaser
  description/empty state, contact field labels/email CTA, and “opens in a new
  tab”. Content JSON was used as-is.
- No official organization social profiles exist, so `Organization.sameAs` is
  omitted rather than invented. Team links are personal profiles and were not
  used as organization `sameAs`.
- OG image is the hero landscape (2000×1499); a dedicated 1200×630 share card
  remains optional. `/og-default.png` still exists.
- Research numbers, achievements metadata, partner logo permission, team facts,
  and contact email/phone still need the author confirmations listed in
  `questions.md`. The homepage presents the migrated content without adding
  claims.
- App screenshots remain the migrated placeholders; no fake dashboard was added.
- Docs are now stale and need a documenter update: `docs/seo-ssr.md` remaining
  homepage JSON-LD/hreflang/OG items and `docs/accessibility.md` homepage pending
  items are implemented. `docs/motion.md` lists `Reveal`/`CountUp` as planned;
  they exist.
- Home client chunk is ~110 kB (38 kB gzip), mostly Motion/FAQ. No dependency was
  added. Further lazy-loading of below-fold motion is a possible follow-up, not
  a blocker.

## Next step

Run the independent homepage quality/reviewer audit on the final tree, then update
the stale SEO/accessibility/motion docs and the task board.
