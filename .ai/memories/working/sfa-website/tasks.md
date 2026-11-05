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

| ID    | Task                                                                          | Owner                     | Status | Files                                                                     |
| ----- | ----------------------------------------------------------------------------- | ------------------------- | ------ | ------------------------------------------------------------------------- |
| M2-1  | Homepage content model + copy                                                 | content-strategist        | review | `content/home`, locales                                                   |
| M2-1b | Home content schema + server loader                                           | orchestrator              | done   | `app/modules/home`, `content/home`                                        |
| M0-8  | Hydration/i18n + mobile-nav accessibility fixes                               | orchestrator              | done   | `app/root.tsx`, `app/shared/lib/site.ts`, `app/shared/ui/site-header.tsx` |
| M2-2  | Hero, features, showcase, research, achievements, team carousel, FAQ, contact | implementer-home          | done   | `app/routes/home.tsx`, `app/modules/home/**`                              |
| M2-3  | Motion primitives + hero sequence                                             | implementer-home/designer | done   | `app/shared/motion`                                                       |
| M2-4  | Download section with placeholder config                                      | implementer-home          | done   | `app/shared/lib/site.ts`                                                  |
| M2-5  | Homepage a11y/SEO/E2E tests                                                   | implementer-home          | done   | `tests`                                                                   |

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

## M5 — 2026-11-03 refinement

| ID   | Task                                             | Owner        | Status | Files                                                               |
| ---- | ------------------------------------------------ | ------------ | ------ | ------------------------------------------------------------------- |
| M5-1 | BYekan + Inter two-script typography             | orchestrator | done   | `app/styles/fonts.css`, `tokens.css`, `public/fonts/Inter`          |
| M5-2 | Locale select + logo header                      | orchestrator | done   | `app/shared/ui/site-header.tsx`, `language-switcher.tsx`            |
| M5-3 | Team carousel + footer partner/nav/rights fixes  | orchestrator | done   | `app/modules/home/presentation/home-team.tsx`, `site-footer.tsx`    |
| M5-4 | Animated Base UI FAQ + reveal/count-up flicker   | orchestrator | done   | `app/shared/ui/faq-accordion.tsx`, `app/shared/motion/count-up.tsx` |
| M5-5 | Long bilingual blog fixtures + multi-tag filters | orchestrator | done   | `app/modules/blog/infrastructure/mock-posts.json`, `blog-index.tsx` |
| M5-6 | Tests, docs, production verification             | orchestrator | done   | `tests`, `docs`                                                     |

## M6 — 2026-11-05 app-aligned identity

| ID   | Task                                                        | Owner        | Status | Files                                                                                         |
| ---- | ----------------------------------------------------------- | ------------ | ------ | --------------------------------------------------------------------------------------------- |
| M6-1 | ADR-009 + design/motion/a11y docs + memories                | documenter   | done   | `decisions/ADR-009*`, `docs/*`, `.ai/memories/*`, `README.md`                                 |
| M6-2 | App palette/type tokens, Vazirmatn, 100svh hero, scroll cue | implementer  | done   | `app/styles/*`, `app/root.tsx`, `app/shared/ui/button.tsx`, `app/modules/home/presentation/*` |
| M6-3 | Device showcase (laptop/tablet/phone) + CSS frames          | implementer  | done   | `app/modules/home/presentation/device-*.tsx`, `home-showcase.tsx`, `app/app.css`              |
| M6-4 | Content schema/JSON, app captures, theme/manifest           | orchestrator | review | `content/home/*`, `home-content-schema.ts`, `public/images/app/*`, `app/root.tsx`, manifest   |
| M6-5 | Hero composition choice + demo cleanup                      | author       | done   | `decisions/ADR-009*`, `app/modules/home/presentation/home-hero.tsx`                           |
| M6-6 | Unit/E2E/a11y/SEO coverage for cue and showcase             | quality      | done   | `tests/*`                                                                                     |

## M7 — 2026-11-05 follow-up refinement

| ID   | Task                                            | Owner        | Status | Files                                                   |
| ---- | ----------------------------------------------- | ------------ | ------ | ------------------------------------------------------- |
| M7-1 | Persian SFA naming + Mohsen profile             | orchestrator | done   | `content/home/*`, `app/locales/fa/*`, `mock-posts.json` |
| M7-2 | RTL/LTR carousel correctness + pause removal    | implementer  | done   | `home-team.tsx`, `marquee.ts`, `app/locales/*/home.ts`  |
| M7-3 | Blog TOC sticky desktop + top-of-article mobile | implementer  | done   | `blog-detail.tsx`, `table-of-contents.tsx`              |
| M7-4 | Regression tests and docs                       | quality      | done   | `tests/*`, `docs/*`                                     |
