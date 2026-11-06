# SFA website — working memory

- **Status:** active
- **Created:** 2026-11-02
- **Goal:** ship the public SFA presentation website (homepage + blog) on
  React Router 8 SSR with an app-aligned marketing identity.
- **Scope:** presentation only. No auth, checkout, tickets, CMS, blog editor, or
  drafts. Blog data is read-only from the API.

## Current milestone

**M6 — app-aligned identity: implementation complete, in review (2026-11-05).**

- [ADR-009](../../../../decisions/ADR-009-app-aligned-identity.md) records the app
  palette, Vazirmatn + Inter, the 100svh hero, and the laptop/tablet/phone device
  showcase. It supersedes ADR-008's separate-identity clause.
- Implementation landed on `feat/app-aligned-identity`: tokens/fonts, hero/cue,
  showcase, tests, and docs.
- The author chose the **top-start editorial** hero on 2026-11-05: copy at the
  logical start under the header, top-weighted scrim, no glass panel. The choice
  is recorded in the ADR-009 addendum. The demo route, centered variant, and
  glass tokens are removed.
- The three app captures (soil lab, irrigation, assistant) are in
  `public/images/app/`; they show no account or personal data but still need
  explicit author approval.
- Theme color and the web manifest use `#F4F6F2`.

### Earlier milestone

**M0 — foundation: complete.** React Router 8 SSR scaffold, Tailwind 4, Base UI,
Motion, token system + `/design-lab`, i18n routing, blog domain/repository/mock
fixtures, all four templates, homepage/blog/404 pages, quality gates, and the
docs/ADR layer.

## Progress

- Blog vertical complete: FastAPI adapter + mock fallback, four templates, TOC,
  breadcrumbs, search/tags/pagination, related, sitemap/robots/RSS,
  contract/E2E/a11y/SEO tests.
- Content migration complete: `content/home/{fa,en}.json`, team/partner/brand
  assets, homepage content schema and server loader.
- Hydration/i18n fixed: locale changes derive from the pathname; mobile nav
  Escape handling; `process.env` removed from client-reachable modules.
- App-aligned identity implemented: ADR-009, design-system/motion/accessibility
  docs, palette/type tokens, Vazirmatn fonts, 100svh top-start hero, and device
  showcase.
- Device showcase and app captures added: laptop soil lab, tablet irrigation,
  phone assistant. The captures show no account or personal data.
- Hero variant decision: top-start editorial, chosen by the author on
  2026-11-05; the demo route is removed.
- Theme color and manifest moved to `#F4F6F2`.
- Unit/E2E/a11y/SEO coverage for the cue, hero variants, and showcase added.
- Follow-up refinement: Persian brand copy now uses **SFA**, and Persian blog
  slugs use the SFA phonetic form (`اس-اف-ای`); Mohsen Shamsitabar
  is listed as Software Engineer. The team carousel is direction-aware in RTL
  and LTR, its pause button is removed, and the blog TOC sticks on desktop and
  appears before the body on mobile.

## Decisions locked

- Identity: **app-aligned** (ADR-009). The 01 Field Notes + 02 Rooted hybrid is
  historical and no longer the production palette/type.
- Hero: existing farmland photography, full-viewport 100svh, top-start
  editorial composition with the copy at the top, and an opaque scroll cue to
  `#features`. Chosen 2026-11-05.
- Fonts: Vazirmatn for Persian/Arabic (unicode-ranged) + self-hosted Inter for
  Latin. BYekan is retired from the token/preload path.
- Showcase: laptop/tablet/phone CSS frames with current app screenshots, no
  personal data, no PSD composite.
- Audience: farmers; the site stays editorial and informative, not a dashboard
  or info dump.

## Status

The homepage and blog vertical are complete. The app-aligned identity is
implemented on `feat/app-aligned-identity`; the hero composition is chosen and
covered by tests. It is not shipped until the app captures are approved, the
author facts are confirmed, and the final gates pass. The app is the palette/type
source; the website keeps its editorial composition and does not clone the app
shell.

## Next

1. Author approves the three app captures. Confirm the temporary demo farm was
   deleted; stop and ask the author if the app cannot delete it.
2. Verify the final hero at 360/768/1024/1440 in both locales, RTL/LTR, reduced
   motion, and no JS.
3. Run `pnpm check`, `pnpm build`, `pnpm test:e2e`, `pnpm test:a11y`, and
   `pnpm test:seo`.
4. Author confirms research numbers, achievements, partner permissions, team
   facts, contact details, and real download URLs.
5. Build/run the Docker image on a host with a daemon; verify the non-root
   runtime and healthcheck.
6. Address optional P2s: mobile 200% text overflow, team WebP/srcset,
   blog-index metadata length, and design-lab chunk exclusion.

## Blackboard

- [`contracts.md`](./contracts.md) — frozen interfaces.
- [`tasks.md`](./tasks.md) — task board and file ownership.
- [`questions.md`](./questions.md) — blockers for the author/orchestrator.
- [`handoffs/`](./handoffs/) — per-agent handoff notes.
