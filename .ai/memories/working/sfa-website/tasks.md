# Task board

Update status as work moves. Status: `todo`, `in-progress`, `review`, `done`,
`blocked`.

## Foundation

| ID   | Task                                               | Owner        | Status | Files                                               |
| ---- | -------------------------------------------------- | ------------ | ------ | --------------------------------------------------- |
| M0-1 | Scaffold React Router 8 SSR                        | orchestrator | done   | repo                                                |
| M0-2 | Tokens, Tailwind mapping, Base UI primitives       | orchestrator | done   | `app/styles`, `app/shared/ui`                       |
| M0-3 | i18n routing + locale resources                    | orchestrator | done   | `app/locales`, `app/middleware`, entries            |
| M0-4 | Blog domain, port, schemas, mock adapter, fixtures | orchestrator | done   | `app/modules/blog`                                  |
| M0-5 | Homepage/blog/404/design-lab placeholders          | orchestrator | done   | `app/routes`                                        |
| M0-6 | Unit/E2E/a11y/SEO tests                            | orchestrator | done   | `tests`, `vitest.config.ts`, `playwright.config.ts` |
| M0-7 | AI layer, docs, ADRs                               | orchestrator | done   | `.ai`, `docs`, `decisions`                          |

## M1 — identity

| ID   | Task                                | Owner    | Status | Files                                              |
| ---- | ----------------------------------- | -------- | ------ | -------------------------------------------------- |
| M1-1 | 2–3 design directions in design lab | designer | done   | `app/routes/design-lab.tsx`, tokens                |
| M1-2 | Motion tokens/primitives proposal   | designer | done   | `app/shared/motion`, `docs/motion.md`              |
| M1-3 | Author chooses direction            | author   | done   | hybrid 01+02, light, farmland hero, BYekan         |
| M1-4 | Lock tokens, fonts, hero brief, ADR | designer | done   | `app/styles`, `docs/design-*`, `decisions/ADR-008` |

## M2 — homepage

| ID    | Task                                                                           | Owner                     | Status | Files                                                                     |
| ----- | ------------------------------------------------------------------------------ | ------------------------- | ------ | ------------------------------------------------------------------------- |
| M2-1  | Homepage content model + copy                                                  | content-strategist        | review | `content/home`, locales                                                   |
| M2-1b | Home content schema + server loader                                            | orchestrator              | done   | `app/modules/home`, `content/home`                                        |
| M0-8  | Hydration/i18n + mobile-nav accessibility fixes                                | orchestrator              | done   | `app/root.tsx`, `app/shared/lib/site.ts`, `app/shared/ui/site-header.tsx` |
| M2-2  | Hero, features, showcase, research, achievements, team, partners, FAQ, contact | implementer-home          | done   | `app/routes/home.tsx`, `app/modules/home/**`                              |
| M2-3  | Motion primitives + hero sequence                                              | implementer-home/designer | done   | `app/shared/motion`                                                       |
| M2-4  | Download section with placeholder config                                       | implementer-home          | done   | `app/shared/lib/site.ts`                                                  |
| M2-5  | Homepage a11y/SEO/E2E tests                                                    | implementer-home          | done   | `tests`                                                                   |

## M3 — blog

| ID   | Task                                       | Owner            | Status | Files                             |
| ---- | ------------------------------------------ | ---------------- | ------ | --------------------------------- |
| M3-1 | FastAPI adapter + env switch               | implementer-blog | done   | `app/modules/blog/infrastructure` |
| M3-2 | Four template renderers + TOC + related    | implementer-blog | done   | `app/modules/blog/presentation`   |
| M3-3 | Search/tags/pagination states              | implementer-blog | done   | `app/routes/blog-index.tsx`       |
| M3-4 | Sitemap + robots + RSS                     | implementer-blog | done   | new routes/scripts                |
| M3-5 | Blog detail metadata + breadcrumbs JSON-LD | implementer-blog | done   | `app/routes/blog-detail.tsx`      |
| M3-6 | Blog contract/E2E/a11y/SEO tests           | implementer-blog | review | `tests`                           |

## M4 — integration

| ID   | Task                                             | Owner              | Status                          | Files                           |
| ---- | ------------------------------------------------ | ------------------ | ------------------------------- | ------------------------------- |
| M4-1 | Fix language switcher for localized slugs        | orchestrator       | done                            | `app/shared/ui/site-header.tsx` |
| M4-2 | Replace placeholder images/copy with real assets | content-strategist | review                          | `public`, `content`             |
| M4-3 | Docker build + runbook verification              | orchestrator       | blocked (no Docker daemon)      | `Dockerfile`, `docs/runbook.md` |
| M4-4 | Independent quality audit                        | quality-auditor    | done                            | `docs/quality-audit.md`         |
| M4-6 | Close audit P1/P2 fixes                          | quality-fixer      | done                            | root, blog, Docker, docs        |
| M4-7 | Final re-audit after homepage                    | quality-auditor    | done                            | all                             |
| M4-5 | Resolve working memory                           | orchestrator       | blocked (author facts + Docker) | `.ai`                           |
