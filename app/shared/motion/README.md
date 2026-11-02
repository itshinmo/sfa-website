# Motion primitives

Planned shared primitives for the editorial + immersive hero direction:

- `MotionProvider` — `MotionConfig reducedMotion="user"`.
- `Reveal` — safe scroll reveal; content visible without JS.
- `Stagger` / `StaggerItem`.
- `CountUp`.
- `Marquee` — pause on hover/focus, stop for reduced motion.
- `PageTransition` — optional/subtle.
- `HoverLift`.

Read [`docs/motion.md`](../../../docs/motion.md) and
[`ADR-005`](../../../decisions/ADR-005-motion-system.md). Every primitive needs a
reduced-motion path and a test.
