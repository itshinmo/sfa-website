# ADR-002 — Token-driven marketing design system

- **Status:** Accepted
- **Date:** 2026-11-02
- **Topic:** design system

## Context

The website needs a new marketing identity, separate from the Flutter app UI.
The app design is also changing. The author wants the visual system to be easy
to replace with minimum effort.

## Decision

Use a three-layer token system (primitive, semantic, component) in
`app/styles/tokens.css`, mapped into Tailwind 4 via `@theme inline`. Components
consume semantic tokens and CVA variants; raw values live only in the token
layer. A gated `/design-lab` route previews 2–3 identity directions by swapping
token sets.

## Consequences

- A redesign is primarily a token change, not a page rewrite.
- Components cannot drift into ad-hoc colors or spacing.
- New tokens/components require documentation and tests.
- The design lab is internal and excluded from production by default.
