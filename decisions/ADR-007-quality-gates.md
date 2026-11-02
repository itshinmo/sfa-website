# ADR-007 — Quality gates: unit, E2E, axe, SSR SEO

- **Status:** Accepted
- **Date:** 2026-11-02
- **Topic:** testing

## Context

SEO, accessibility, and i18n are core requirements, not optional polish. A
green typecheck is not enough to catch broken SSR metadata, keyboard issues, or
contrast failures.

## Decision

Adopt four release gates:

1. `pnpm check` — typecheck, lint (including jsx-a11y), formatting, unit tests.
2. `pnpm test:e2e` — Playwright flows on desktop and mobile.
3. `pnpm test:a11y` — axe with critical/serious violations as blockers.
4. `pnpm test:seo` — raw HTML assertions for content, canonical, hreflang, and
   JSON-LD.

`pnpm check:all` adds the production build.

## Consequences

- New page types need tests and accessibility coverage.
- SEO is verified from the server response, not only the hydrated browser.
- Playwright needs Chrome or an installed browser in CI.
- Motion primitives need reduced-motion tests.
