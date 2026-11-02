# Quality-auditor — homepage final audit

- **Status:** done (two P1 launch blockers; no code changes)
- **Date:** 2026-11-02
- **Task id:** M4-7 / final re-audit after homepage

## Changed files

New report files only:

- `docs/quality-audit-homepage.md`
- `.ai/memories/working/sfa-website/handoffs/quality-auditor-homepage.md`

No feature code, tests, tokens, content, package/lockfile, routes or existing
docs were edited. No git staging/commit/push was run.

## Verification

- `pnpm check` — **14 files / 64 tests**, typecheck/ESLint/Prettier pass.
- `pnpm build` — pass; home chunk 110.28 KB / 37.92 KB gzip; entry 229.84 /
  73.04 KB gzip.
- `pnpm test:e2e` — **48/48** dev and **48/48** production on `:3001`.
- `pnpm test:a11y` — **12/12** final dev and **12/12** production. Two earlier
  dev runs were 11/12 due `Execution context was destroyed` (HMR/test race);
  reruns passed.
- `pnpm test:seo` — **15/15** dev and **15/15** production.
- `pnpm format:check` — pass.
- `PORT=3001 SITE_URL=http://127.0.0.1:3001 DESIGN_LAB=0 pnpm start` — pass;
  Docker healthcheck command exits 0 locally.
- Raw SSR/browser checks at 360/768/1024/1440, both locales: one h1, no skipped
  headings, no overflow, correct hero crop/preload, correct header states,
  canonical/hreflang/OG/Twitter/Organization/WebSite, 404 titles, cache headers,
  conditional cookie, fallback `lang`/`dir`, Persian digits, FAQ keyboard, TOC
  and skip focus.
- API failure: homepage stays 200 with a localized empty blog teaser; a hanging
  API delays the homepage 5.0 s before the empty state.
- Docker could not be built/run (`docker: command not found`).

## P1 findings

1. **Hero/header contrast over the real photo fails WCAG AA.** Screenshot
   sampling with text hidden and the photo/scrim intact gave: English 1440
   eyebrow 1.98 / H1 2.53; English 1024 1.97 / 2.52; English 360 eyebrow 2.86;
   English 768 eyebrow 4.00; Persian 360 eyebrow 3.87; Persian 1024 eyebrow
   3.85. Transparent header nav measured 4.09–4.23 at 1440 and 4.15 at 768.
2. **FAQ answers are not server-rendered / visible without JS.** Raw SSR has
   only question buttons (no `faq-panel`); answer text lives in the stream
   payload. `javaScriptEnabled:false` cannot reveal answers.

## Open questions / drift

- Confirm the preferred hero contrast fix: stronger upper/mid scrim, lower
  desktop copy, and/or solid header surface. Re-test both locales against the
  actual photo, not the token composite.
- Confirm the FAQ SSR approach (`<details>` fallback, server-rendered hidden
  panels, or explicit documented exception).
- `.env.example` still says `SITE_URL=http://localhost:3000` while dev/runbook
  use `127.0.0.1`; this produces dev-only blog canonical/hydration warnings.
- Homepage OG is 2000×1499 (4:3); decide whether a dedicated 1200×630 share card
  is required. Metadata lengths remain below the documented guidance.
- Organization/WebSite JSON-LD reuse the same `@id` with per-locale `url` values.
- Docker image still needs verification on a machine with a daemon; non-root
  startup and healthcheck timing are unverified.
- Content facts (research numbers, achievements, team, partner permissions,
  phone/contact, real store links) still need author confirmation.
- Docs to update: `docs/seo-ssr.md`, `docs/accessibility.md`, `docs/motion.md`,
  `docs/design-system.md`, `docs/quality-audit.md`, `docs/testing.md`,
  `README.md`/`AGENTS.md` status/route table, `.ai/memories/working/.../README.md`
  and `tasks.md` M4-7. `.ai` docs were not edited here.

## Next step

Fix the two P1s, re-run `pnpm check`, build, e2e, a11y and SEO against
production, and add hero-photo contrast + no-JS FAQ checks to the release
checklist. Then close P2 performance/docs items and verify the Docker image when
a daemon is available.
