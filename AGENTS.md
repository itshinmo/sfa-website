# AGENTS.md

The only instruction source for AI agents working on the SFA website. Every tool
reads this file; `CLAUDE.md` points here and tool folders are symlinks into
`.ai/`. Do not duplicate the contents of linked documents.

Project knowledge lives in [`docs/`](./docs/) (current behavior), [`decisions/`](./decisions/)
(accepted decisions), and [`rfcs/`](./rfcs/) (proposals). The agent layer lives in
[`.ai/`](./.ai/README.md).

## Approval gate

**Do not run `git add`, `git commit`, or `git push` (or anything that stages,
such as `git mv` or `git rm`) unless the author explicitly asks.** Stop after
verification and hand over the diff. The reviewer/quality agents run when the
author asks.

## Precedence

When sources disagree, trust them in this order:

1. the author's explicit instructions;
2. code and config;
3. `docs/`;
4. `decisions/`;
5. accepted `rfcs/`;
6. `.ai/memories/`;
7. working memories;
8. assumptions.

Fix or flag the lower source and say so. An unaccepted RFC never overrides
accepted knowledge.

## Project in one paragraph

SFA is a downloadable Flutter application for smart irrigation and soil
management. The application owns authentication, subscriptions, payments, and
tickets. This repository is the public presentation website: homepage, blog,
app-download information, achievements, research, team, partners, FAQ, and
contact. The website is read-only: supervisors author and publish blog posts
inside the application; the website renders published posts from the backend
API. There is no website auth, checkout, ticket UI, CMS, draft workflow, or
blog editing.

## Non-negotiables

**Product scope**

- The website is presentation-only. Do not add accounts, login, checkout,
  subscriptions, tickets, or admin surfaces.
- Blog content comes from the read-only API. Do not invent a CMS, Markdown blog
  pipeline, draft mode, or publishing UI.
- Download links are placeholders until the author provides real store URLs.

**SSR and SEO**

- Public pages render on the server. Do not move blog or homepage content into
  client-only effects.
- Every public page has a title, description, canonical URL, and correct
  `lang`/`dir`.
- Blog detail pages keep `hreflang`, Open Graph, and `BlogPosting` JSON-LD.
- Search-result pages are `noindex`.
- API data is validated at the boundary with Zod. Invalid data must not crash a
  page.

**Design system**

- Components consume semantic tokens or component tokens, never raw values.
- Raw colors, spacing, radii, shadows, and motion values live in
  `app/styles/tokens.css` or the token layer only.
- Every layer exposing `className` carries `data-slot="<name>"`.
- Use Base UI for interactive primitives; do not build an inaccessible custom
  select, dialog, menu, or tooltip.
- Use `class-variance-authority` for variants and `cn()` for class merging.
- A new token or component is justified in `docs/design-system.md` in the same
  change.

**Internationalization and RTL**

- Persian is the default locale; `/fa` and `/en` are the public URL prefixes.
- No hardcoded UI strings. Add keys to `app/locales/fa` and `app/locales/en`.
- Use logical CSS properties (`ms`, `me`, `ps`, `pe`, `start`, `end`), not
  `left`/`right`, for direction-sensitive layout.
- Localized blog slugs come from the API. Use `alternates` for language
  switching and `hreflang`.
- Missing translations use the API fallback behavior and a visible notice.

**Accessibility and motion**

- WCAG 2.2 AA is the release gate.
- Keyboard paths, visible focus, landmarks, labels, and reduced motion are
  mandatory.
- Motion is progressive enhancement. Content must be visible without
  JavaScript and without animation.
- Animate transform/opacity only; never hijack scroll.
- `MotionConfig reducedMotion="user"` and `useReducedMotion` are required for
  animated components.
- No autoplay motion without a pause mechanism.

**Process**

- Architectural or cross-cutting changes need a spec (`.ai/specs/`, local) and,
  when there are real alternatives, an RFC.
- A hard-to-reverse choice gets an ADR.
- Run `pnpm check` before handing off; run `pnpm build` and the relevant
  Playwright suites when routes, API, SEO, i18n, or UI change.
- Keep `docs/`, `decisions/`, and `.ai/memories/` in sync with behavior.
- No secrets, tokens, credentials, or private hostnames in the repo.
- Never fabricate commands, numbers, sources, or decisions.

## Key commands

```sh
pnpm dev              # local SSR dev server on :3000
pnpm build            # production build
pnpm start            # serve the production build
pnpm typecheck        # route typegen + tsc
pnpm lint             # ESLint, including jsx-a11y
pnpm format           # Prettier
pnpm test             # Vitest unit/component tests
pnpm test:e2e         # Playwright smoke flows
pnpm test:a11y        # Playwright + axe
pnpm test:seo         # SSR/SEO assertions
pnpm check            # typecheck + lint + format check + unit tests
pnpm check:all        # check + build
```

## Where things live

| Topic                             | Location                                                   |
| --------------------------------- | ---------------------------------------------------------- |
| Stack, routes, module boundaries  | [`docs/architecture.md`](./docs/architecture.md)           |
| Tokens, components, design rules  | [`docs/design-system.md`](./docs/design-system.md)         |
| Blog API contract and DTOs        | [`docs/blog-api.md`](./docs/blog-api.md)                   |
| Locale routing, RTL, translations | [`docs/i18n-rtl.md`](./docs/i18n-rtl.md)                   |
| SSR, metadata, sitemap, RSS       | [`docs/seo-ssr.md`](./docs/seo-ssr.md)                     |
| Accessibility gate and checklist  | [`docs/accessibility.md`](./docs/accessibility.md)         |
| Motion principles and tokens      | [`docs/motion.md`](./docs/motion.md)                       |
| Test strategy and commands        | [`docs/testing.md`](./docs/testing.md)                     |
| Local workflow, env, Docker       | [`docs/runbook.md`](./docs/runbook.md)                     |
| Content migration                 | [`docs/content-migration.md`](./docs/content-migration.md) |
| Agent roles, skills, memories     | [`.ai/README.md`](./.ai/README.md)                         |
| Accepted decisions                | [`decisions/`](./decisions/README.md)                      |
| Proposals                         | [`rfcs/`](./rfcs/README.md)                                |
| Local task specs (gitignored)     | `.ai/specs/`                                               |

## Current milestone

The homepage and blog vertical are complete. The site now uses the app-aligned
identity recorded in ADR-009: the SFA app palette, Vazirmatn + Inter, a 100svh
top-start editorial hero with an opaque scroll cue, and a laptop/tablet/phone
device showcase with current app screens. The hero composition was chosen on
2026-11-05 and recorded in the ADR-009 addendum. Next: app-capture approval,
final visual review, content/link confirmations, and Docker image verification on
a host with a daemon.
