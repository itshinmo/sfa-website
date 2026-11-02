---
name: motion-system
description: Use when adding animation, scroll reveals, hero sequences, count-ups, carousels, or page transitions. Enforces the motion tokens, reduced-motion path, performance, and RTL behavior.
---

# motion-system

## Prerequisites

- [`docs/motion.md`](../../../docs/motion.md)
- `motion` package
- motion tokens in `app/styles/tokens.css`

## Workflow

1. Define the purpose: entrance, hierarchy, feedback, or storytelling.
2. Use the motion tokens for duration/easing/distance.
3. Build from shared primitives (`Reveal`, `Stagger`, `CountUp`, `Marquee`,
   `MotionProvider`) rather than ad-hoc transitions.
4. Animate transform/opacity only.
5. Provide a reduced-motion path; verify content is visible without JS.
6. Check RTL direction: use logical start/end.
7. Check mobile performance and bundle impact; lazy-load Motion.
8. Add a test or Playwright check for reduced motion and content visibility.

## Constraints

- No scroll hijacking or pinned traps.
- No infinite motion in reading areas.
- No autoplay without pause.
- No SSR `opacity: 0` without a no-JS fallback.
- No animation that delays navigation or content.

## Expected output

Motion primitives/usage, reduced-motion verification, and performance notes.
