# ADR-004 — Path-based fa/en routing with localized slugs

- **Status:** Accepted
- **Date:** 2026-11-02
- **Topic:** i18n

## Context

SFA serves Persian and English audiences. Persian is the primary audience.
SEO requires stable, shareable locale URLs and accurate `hreflang`. Blog slugs
should be natural in each language.

## Decision

Use path prefixes `/fa` and `/en`, with Persian as the default (`/` redirects to
`/fa`). Blog slugs are locale-specific and paired by a `translationKey`.
`alternates` from the API drive language switching and `hreflang`. Missing
translations fall back with a visible notice.

## Consequences

- Crawlers and users get distinct, stable URLs per locale.
- The language switcher must use `alternates` on blog pages, not prefix swaps.
- Translation completeness is a content/API responsibility.
- Persian search normalization is required.
