# ADR-005 — Editorial + immersive hero motion system

- **Status:** Accepted
- **Date:** 2026-11-02
- **Topic:** motion

## Context

The website is a presentation product and should feel alive. Motion can improve
storytelling but can also hurt accessibility, performance, and SEO if content is
hidden behind animation.

## Decision

Use Motion for React with a restrained **editorial + immersive hero** direction:
a richer hero/product sequence, subtle scroll reveals elsewhere, count-ups, and
hover states. All motion uses shared duration/easing tokens, respects
`prefers-reduced-motion`, animates transform/opacity only, and never hijacks
scroll. Content is visible without JavaScript.

## Consequences

- Motion primitives (`Reveal`, `Stagger`, `CountUp`, `Marquee`) are shared.
- Every animated component needs a reduced-motion path.
- Performance budgets include animation cost.
- RTL direction is part of the motion contract.
