# Quality-auditor — M0–M3 audit

- **Status:** done (with P1 findings; no code changes)
- **Date:** 2026-11-02
- **Task id:** M4-4 / independent quality audit

## Changed files

New report files only:

- `docs/quality-audit.md`
- `.ai/memories/working/sfa-website/handoffs/quality-auditor-m0-m3.md`

No feature code, existing tests, tokens, package/lockfile, routes, design-lab
files or existing docs were edited. No git staging/commit/push was run.

## Verification

- `pnpm typecheck` — pass.
- `pnpm lint` — pass.
- `pnpm test` — 12 files / 52 tests pass (earlier during the audit: 11 / 50).
- `pnpm build` — pass; client entry 232.62 KB raw / 73.67 KB br.
- `pnpm test:e2e` — 28/28 pass.
- `pnpm test:a11y` — 8/8 pass final; first run had one transient
  `Execution context destroyed` on `/fa`, consistent with a dev HMR reload
  while the designer was editing. Reruns passed.
- `pnpm test:seo` — 8/8 pass.
- `pnpm format:check` — pass; no designer-only failures.
- Production smoke: `PORT=3001 SITE_URL=http://127.0.0.1:3001 DESIGN_LAB=0
pnpm start`; e2e 28/28, a11y 8/8 and SEO 8/8 against :3001.
- Raw SSR checked with curl/fetch for home, blog index, reference/narrative/
  case-study/simple details, filtered/search, fallback, 404, sitemap, robots
  and RSS.
- Browser checks: no `process is not defined`, no token in `build/client`, clean
  production console on all main routes, SPA metadata preserved.
- API integration with a fake FastAPI: bearer token/`Accept` headers observed,
  token never in HTML, mock fallback works, 502/503 error states work.
- Docker was not built/run: `docker: command not found`.

## Open questions / drift

1. **Homepage metadata scope.** Is canonical/hreflang/OG/Twitter and
   `Organization`/`WebSite` JSON-LD part of M2 acceptance? The audit treats
   missing homepage canonical as P1 for launch.
2. **Root redirect.** `docs/i18n-rtl.md` says `/` is permanent; the code returns 302. Confirm whether 301 is intended.
3. **SITE_URL invariant.** Should production fail fast when `SITE_URL` is
   missing or does not match the public origin? The current fallback silently
   emits `localhost` and can cause a client hydration mismatch.
4. **Fallback language.** Should fallback articles use `contentLocale` for the
   document/`article` `lang`/`dir`, or is the current English page chrome
   intentional?
5. **API date validation.** Reject non-ISO dates in Zod, make `formatDate`
   tolerant, or both? Current bad dates produce a 500.
6. **Design-lab build assets.** The route 404s in production, but the JS/CSS
   chunk remains in `build/client`. Is that acceptable, or should it be
   excluded at build time?
7. **Mock fallback in production.** An empty `BLOG_API_BASE_URL` silently
   serves mock blog content in production. Should that be a startup error?
8. **Docker ownership.** Docker image verification remains blocked; who will
   run the build/run once a daemon is available?
9. **Docs drift.** `docs/` needs a documenter pass for cache headers, redirect
   status, homepage canonical, shared-module imports, 404 axe coverage,
   `q`/body search, component/font status and content-migration optimizer
   statements.

## Next step

Close the P1 items with the smallest changes: (1) root/error-boundary title,
(2) ISO date validation + safe `formatDate`, (3) fallback content `lang`/`dir`,
then include homepage canonical/hreflang/OG/JSON-LD in M2. After that, add
HTML cache headers, fix the `hreflang` prop and blog-index heading order, extend
the a11y/SEO suites to 404 and cache headers, and re-run this audit.
