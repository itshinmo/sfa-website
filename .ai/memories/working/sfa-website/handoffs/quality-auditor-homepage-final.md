# Quality-auditor — homepage final P1 closure

- **Status:** done — both P1s closed; launch verdict GO
- **Date:** 2026-11-02
- **Task id:** M4-7 / final re-audit after homepage fixes

## Changed files

New report files only:

- `docs/quality-audit-homepage-final.md`
- `.ai/memories/working/sfa-website/handoffs/quality-auditor-homepage-final.md`

No feature code, tests, tokens, content, package/lockfile, routes or existing
docs were edited. No git staging/commit/push was run.

## Verification

- `pnpm check` — **14 files / 64 tests**, pass (typecheck, ESLint, Prettier).
- `pnpm build` — pass; home route **95.11 KB / 32.63 KB gzip**; client 1.25 s.
- `pnpm test:e2e` — **48/48** dev (21.3 s) and **48/48** production on `:3001`.
- `pnpm test:a11y` — **12/12** dev (14.5 s) and **12/12** production.
- `pnpm test:seo` — **15/15** dev (1.5 s) and **15/15** production.
- `pnpm format:check` — pass.
- `PORT=3001 SITE_URL=http://127.0.0.1:3001 DESIGN_LAB=0 pnpm start` — pass.
- Docker still unavailable (`docker: command not found`).

## P1 closure evidence

### Hero/header contrast

Screenshot method: text set `color: transparent` so the real photo, scrim,
header surface and active pill remain; worst background pixel in each text
bounding box compared with white.

| Viewport | FA eyebrow / H1 / description | EN eyebrow / H1 / description |
| -------- | ----------------------------- | ----------------------------- |
| 360      | 14.32 / 14.56 / 14.64         | 14.36 / 14.36 / 14.64         |
| 768      | 15.73 / 15.11 / 15.37         | 14.37 / 15.15 / 15.56         |
| 1024     | 14.36 / 15.51 / 15.38         | 8.79 / 14.36 / 15.35          |
| 1440     | 15.88 / 15.43 / 15.13         | 8.82 / 14.36 / 15.15          |

Header nav: Home 5.95–6.63, Blog 9.27–9.40 across 768/1024/1440; language chip
interior 9.4–11.9. All thresholds met (H1 ≥3:1; normal text ≥4.5:1).

### FAQ SSR / no-JS

Raw `/en` HTML contains **6 `<details>` + 6 `[data-slot="faq-panel"]` answer
blocks**. With JavaScript disabled, clicking a summary opens the answer. With
JS, Enter opens / Space closes / Enter reopens and focus stays on the summary.
Axe remains clean.

## Quick P2 status

- Homepage OG `/images/homepage/og-home.jpg` 1200×630 — pass.
- No-JS header `<noscript>` solid fallback — pass.
- 360 px mobile team/showcase compact, zero overflow — pass.
- 200% text at 360 still overflows 25 px FA / 68 px EN; standard 200% zoom
  (640 CSS px) passes.
- Logo target fixed; footer Home/Blog links remain 37×44 / 28×44 (width below
  the internal 44 px square goal).
- Home bundle reduced to 95.11 KB / 32.63 KB gzip.

## Open questions / remaining P2

- 200% text-only mobile overflow; footer link target widths.
- Metadata lengths; blog index OG/Twitter; Organization/WebSite URL consistency.
- Homepage teaser 5 s timeout; TTF fonts; team PNG weight; public image cache.
- Dev-only blog hydration/`hreflang` warning when `SITE_URL` differs; `.env.example`
  host mismatch.
- Anonymous first request still sets locale cookie; design-lab chunk public.
- Sitemap 200-on-API-failure; API `javascript:` href and template/type refinement.
- Docker image/non-root/healthcheck unverified.
- Docs/documenter pass and author content/link confirmations remain.

## Next step

**GO.** Both P1s are closed and all gates pass. Before deployment, confirm
authored content/links and build/run the Docker image on a machine with a
daemon; track the P2 list as post-launch polish.
