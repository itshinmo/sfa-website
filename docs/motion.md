# Motion

The site is a presentation product, so motion is part of the design language.
The app-aligned identity (ADR-009) keeps the **editorial + warm, immersive
hero** approach: a full-viewport hero sequence, subtle scroll reveals
elsewhere, and no scroll hijacking. It does not import the app's dashboard
motion, data ticker, or live-updating UI feel.

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
| `--motion-duration-cue`    | 2600ms                         | hero scroll cue bob cycle         |
| `--motion-ease-out`        | cubic-bezier(0.22, 1, 0.36, 1) | entrances                         |
| `--motion-ease-in-out`     | cubic-bezier(0.65, 0, 0.35, 1) | state changes                     |
| `--motion-distance-sm`     | 0.5rem                         | small reveals                     |
| `--motion-distance-md`     | 1rem                           | standard reveals                  |
| `--motion-distance-lg`     | 1.5rem                         | hero elements                     |
| `--motion-distance-cue`    | 0.375rem                       | hero scroll cue travel            |

## Patterns

- **Hero:** the hero is full-viewport (`100svh`) with the full-bleed farmland
  photo. Stagger eyebrow → headline → description → CTA. The photo is the
  backdrop; no app mock, dashboard panel, or ticker. The copy sits at the top,
  at the logical start, over a top-weighted scrim; see
  [`design-system.md`](./design-system.md).
- **Hero scroll cue:** an opaque 48px surface circle with a chevron, centered at
  the bottom of the viewport. It bobs with `transform: translateY()` between 0
  and `--motion-distance-cue` over `--motion-duration-cue`. It is the only
  persistent ambient motion at the top of the page; there is no dashboard
  ticker. It pauses on hover/focus, stays static with reduced motion, and is a
  plain anchor without JavaScript. It is visible only while the hero covers the
  viewport; after about 8px of scroll it hides, leaves the tab order and the
  accessibility tree, and does not shift layout. It targets `#features`.
- **Device showcase:** Reveal on first view and a 2–4px hover lift, nothing
  else. The desktop stage may use a static perspective; it never rotates,
  tilts, or parallaxes with scroll. The stage mirrors with logical start/end in
  RTL.
- **Scroll reveal:** fade + 12–24px translate, once, threshold ~0.2.
- **Cards:** hover lift 2–4px and image scale ≤ 1.03; focus gets an equally
  clear state.
- **Stats:** count-up on first view; reduced motion shows the final value.
- **Team carousel:** pause on hover/focus and stop for reduced motion. Partners
  are a static footer credit, not a marquee.
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
- `Reveal` — CSS `view()` timeline reveal with a visible no-support fallback;
  there is no hydration-time hiding step, so the SSR paint does not flash.
- `HomeTeam` — continuous Motion carousel with hover/focus pause, drag-free
  native scrolling on mobile, and reduced-motion opt-out.
- FAQ — Base UI height/opacity transition with a no-JS native disclosure
  fallback.
- Header — staggered hero entrance, animated transparent→solid header, and an
  animated mobile menu.
- `CountUp` — stats animate on first view; reduced motion and SSR show the final
  value.
- Hero CSS rise — transform-only, reduced-motion safe.

App-aligned additions:

- `HeroScrollCue` — opaque 48px anchor with a transform-only bob, hide-on-scroll,
  hover/focus pause, reduced-motion static state, and a working no-JS anchor.
- `DeviceShowcase` — composes `Reveal` and a small hover lift; no 3D or
  scroll-driven frame motion.

Still optional:

- `Stagger` / `StaggerItem`.
- `PageTransition` — optional, subtle.
- `HoverLift` — shared card interaction.

Each new primitive gets a component test or a reduced-motion E2E check.
