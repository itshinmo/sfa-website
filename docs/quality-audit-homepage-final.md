# Homepage final audit — P1 closure

- **Date:** 2026-11-02
- **Auditor:** quality-auditor (final verification pass)
- **Supersedes:** the P1 findings in `docs/quality-audit-homepage.md`
- **Code changes:** none. Only this report and the handoff were added.
- **Docker:** still unavailable (`docker: command not found`); the image was not
  built or run.

## P1 closure

### 1. Hero/header contrast — CLOSED

Method: screenshots at 360/768/1024/1440 in both locales, with text set
`color: transparent` (so the actual photo, scrim, active header pill and header
surface remain) and the text bounding box hidden. The worst background pixel in
each text box was compared with white using the WCAG relative-luminance formula.
H1 is large text (≥3:1); eyebrow, description and nav are normal text (≥4.5:1).

| Viewport | FA eyebrow / H1 / description | EN eyebrow / H1 / description |
| -------- | ----------------------------- | ----------------------------- |
| 360      | 14.32 / 14.56 / 14.64         | 14.36 / 14.36 / 14.64         |
| 768      | 15.73 / 15.11 / 15.37         | 14.37 / 15.15 / 15.56         |
| 1024     | 14.36 / 15.51 / 15.38         | **8.79** / 14.36 / 15.35      |
| 1440     | 15.88 / 15.43 / 15.13         | **8.82** / 14.36 / 15.15      |

Worst values across all eight combinations: eyebrow **8.79:1**, H1
**14.36:1**, description **14.64:1** — all above their thresholds.

Header nav (solid dark translucent header surface; active pill included):

| Viewport | FA Home / Blog | EN Home / Blog |
| -------- | -------------- | -------------- |
| 768      | 6.63 / 9.40    | 6.35 / 9.40    |
| 1024     | 6.55 / 9.40    | 6.34 / 9.40    |
| 1440     | 6.06 / 9.27    | 5.95 / 9.27    |

The mobile nav is hidden at 360; the language chip interior measured 9.4–11.9
and its text is full white. The header surface, active pill, and mobile menu
open/close behavior remain intact. **P1 closed.**

### 2. FAQ SSR / no-JS — CLOSED

- Raw `/en` HTML now contains **6 `<details>` elements and 6
  `[data-slot="faq-panel"]` answer blocks**; all six answers are server-rendered.
- `javaScriptEnabled:false`: clicking the first `<summary>` sets `open=true` and
  the answer becomes visible. The native disclosure works without JS.
- With JS: Enter opens, Space closes, Enter reopens; focus remains on the
  summary. No custom accordion state is required.
- Axe remains clean on both homepage locales.

**P1 closed.**

## Gates

Final runs on the updated tree:

| Command             | Result                                                      |
| ------------------- | ----------------------------------------------------------- |
| `pnpm check`        | **Pass** — 14 files / 64 tests; typecheck, ESLint, Prettier |
| `pnpm build`        | **Pass** — client 1.25 s, SSR 184 ms                        |
| `pnpm test:e2e`     | **48/48** dev (21.3 s); **48/48** production on `:3001`     |
| `pnpm test:a11y`    | **12/12** dev (14.5 s); **12/12** production on `:3001`     |
| `pnpm test:seo`     | **15/15** dev (1.5 s); **15/15** production on `:3001`      |
| `pnpm format:check` | **Pass**                                                    |
| `pnpm start` :3001  | **Pass**                                                    |
| Docker              | **Unavailable** — image not verified                        |

No failures in the final runs. The earlier dev a11y HMR flake was not
reproduced. Home route chunk is now **95.11 KB / 32.63 KB gzip** (down from
110.28 / 37.92 KB because the Base UI accordion left the homepage bundle).

## Quick P2 verification

- **Homepage OG:** `/images/homepage/og-home.jpg`, **1200×630**, raw meta
  `og:image:width=1200`, `og:image:height=630`; pass.
- **No-JS header:** `<noscript>` fallback now gives a cream/solid header with
  dark nav text after scrolling; no white-on-cream text; pass.
- **Mobile compact team/showcase:** 360 px homepage has zero horizontal
  overflow; team and showcase remain 2-column at mobile; pass.
- **200% text at 360:** improved but **not closed** — scroll width is 385 px FA
  (25 px overflow) and 428 px EN (68 px overflow). Standard 200% zoom at 640 CSS
  px still passes.
- **Logo/footer touch targets:** logo now has `min-w-11` and passes; footer
  Home/Blog links are still 37×44 / 28×44 (width below the internal 44 px
  square goal). Other footer links pass.
- **Homepage JS:** 95.11 KB raw / 32.63 KB gzip; no framework duplication.

## Remaining P2s

- 200% text-only overflow at 360 px (25/68 px) — WCAG edge case; standard zoom
  passes.
- Footer Home/Blog link widths below the internal 44 px goal.
- Metadata lengths remain short (home 46/44 chars, descriptions 99/118; blog
  index 8 chars).
- `Organization.url`/`WebSite.url` vary per locale under one `@id`.
- Homepage teaser waits 5 s for a hanging blog API before the empty state.
- Fonts remain TTF (476 KB raw / 189 KB compressed, both preloaded); team PNGs
  ~1.21 MB; three showcase PNGs; initial 1440 transfer ~860 KB.
- Blog index still lacks an OG image/Twitter card.
- Dev-only blog hydration/`hreflang` warnings when `SITE_URL` differs from the
  request origin; `.env.example` still uses localhost while the dev server uses
  127.0.0.1.
- First anonymous HTML request still sets the locale cookie.
- Design-lab JS/CSS remains publicly fetchable in `build/client`.
- Sitemap stays 200 with static URLs when the API fails.
- API `href` schemes (`javascript:`) and `content.type` vs `template` are still
  not hardened.
- Docker image build/run, non-root startup and healthcheck timing remain
  unverified.
- Docs drift: `docs/seo-ssr.md`, `docs/accessibility.md`, `docs/motion.md`,
  `docs/design-system.md`, `docs/quality-audit.md`, `docs/testing.md`, README/
  AGENTS/tasks and working memory still need a documenter pass.
- Author content/link confirmations (research numbers, achievements, team,
  partner permissions, contact details, store links) remain open.

## Launch verdict

**GO.** Both P1 blockers are closed: the hero/header contrast passes with a wide
margin in both locales at all four breakpoints, and FAQ answers are server
rendered and usable without JavaScript. All gates pass in dev and production.

Release operations still need to confirm authored content/links and build/run
the Docker image on a host with a daemon; those are deployment/content checks,
not remaining P1 code blockers.
