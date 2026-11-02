# Motion

The site is a presentation product, so motion is part of the design language.
The chosen direction is **editorial + warm, immersive hero**: a richer hero
sequence, subtle scroll reveals elsewhere, and no scroll hijacking. It follows
the locked Field Notes × Rooted identity (ADR-008), not the 03 Signal kinetic
language.

Library: `motion` (Motion for React). Use `motion/react`.

## Principles

1. **Content first.** Motion must never hide content from users without
   JavaScript or with reduced motion.
2. **Performance.** Animate transform and opacity only. Avoid layout, width,
   height, top/left, and filter animations.
3. **Restraint.** One primary idea per section. No infinite ambient motion in
   reading areas.
4. **Direction-aware.** In RTL, movement uses logical direction (`start`/`end`),
   not hardcoded left/right.
5. **Accessible.** `MotionConfig reducedMotion="user"` and `useReducedMotion`
   are required for animated components.
6. **No hijacking.** Native scroll, no Lenis, no pinned scroll traps.

## Tokens

Defined in `app/styles/tokens.css`:

| Token                      | Value                          | Use                               |
| -------------------------- | ------------------------------ | --------------------------------- |
| `--motion-duration-fast`   | 160ms                          | hover, focus, small state changes |
| `--motion-duration-base`   | 280ms                          | cards, menus, reveals             |
| `--motion-duration-slow`   | 420ms                          | larger transitions                |
| `--motion-duration-reveal` | 650ms                          | scroll reveals                    |
| `--motion-ease-out`        | cubic-bezier(0.22, 1, 0.36, 1) | entrances                         |
| `--motion-ease-in-out`     | cubic-bezier(0.65, 0, 0.35, 1) | state changes                     |
| `--motion-distance-sm`     | 0.5rem                         | small reveals                     |
| `--motion-distance-md`     | 1rem                           | standard reveals                  |
| `--motion-distance-lg`     | 1.5rem                         | hero elements                     |

## Patterns

- **Hero:** staggered eyebrow → headline → description → CTA over the full-bleed
  farmland photo. The photo is the backdrop; no app mock, dashboard panel, or
  ticker.
- **Scroll reveal:** fade + 12–24px translate, once, threshold ~0.2.
- **Cards:** hover lift 2–4px and image scale ≤ 1.03; focus gets an equally
  clear state.
- **Stats:** count-up on first view; reduced motion shows the final value.
- **Partners marquee:** pause on hover/focus; stop for reduced motion.
- **Mobile nav:** slide/fade with focus trap; respect reduced motion.
- **Page transitions:** short or none; never delay navigation.
- **Hero parallax:** transform only, small range, disabled for reduced motion.

## Implementation rules

- Lazy-load `motion` with `LazyMotion` + `domAnimation` where possible.
- Keep animated components client-only; render meaningful static markup on the
  server.
- Do not set `opacity: 0` in SSR markup without a no-JS fallback.
- Use `whileInView` with `viewport={{ once: true }}`.
- Prefer `initial={false}` or CSS-based reveals if SSR visibility is a concern.
- Test with `prefers-reduced-motion: reduce` in Playwright.
- Add a performance check when a section introduces a large animation.

## Motion primitives

Implemented:

- `MotionProvider` — `MotionConfig reducedMotion="user"`.
- `Reveal` — progressive scroll reveal; content visible without JS, reveals on
  focus, and respects reduced motion.
- `CountUp` — stats animate on first view; reduced motion and SSR show the final
  value.
- Hero CSS rise — transform-only, reduced-motion safe.

Still optional:

- `Stagger` / `StaggerItem`.
- `Marquee` — accessible pause/stop.
- `PageTransition` — optional, subtle.
- `HoverLift` — shared card interaction.

Each new primitive gets a component test or a reduced-motion E2E check.
