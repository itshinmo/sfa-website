---
description: Design identity, tokens, motion, and the design-lab process. Read before UI work.
last-verified: 2026-11-05
---

# Design (agent context)

Contract: [`docs/design-system.md`](../../docs/design-system.md),
[`docs/motion.md`](../../docs/motion.md),
[`docs/accessibility.md`](../../docs/accessibility.md),
[ADR-009](../../decisions/ADR-009-app-aligned-identity.md).

- Production identity is **app-aligned**: full app palette, Vazirmatn for
  Persian + Inter for Latin. ADR-008's separate-identity clause is superseded;
  its editorial principles and history remain.
- The website shares the app's visual language, not its shell. No sidebar,
  dashboard, data grid, or account UI clone; editorial layout and long-form
  reading stay.
- Hero: existing farmland photo, 100svh, top-start editorial composition with
  the copy at the top and an opaque 48px scroll cue to `#features`. The author
  chose this on 2026-11-05; see the ADR-009 addendum. The glass variant and the
  hero review route are removed.
- Device showcase: laptop/tablet/phone CSS frames with current app screenshots
  in `public/images/app/`; they show no account or personal data. No PSD raster
  composite.
- Bright app accents (`#02AA2C`, `#2196F3`, `#B0875F`, `#0CA5CD`) are
  large/decorative only; darker variants are for text/actions. AA is the gate.
- Tokens are the switch point. Three layers: primitive, semantic, component. Raw
  values only in `tokens.css`.
- Motion: the hero cue is the only persistent ambient motion at the top; the
  showcase uses Reveal + hover lift only; reduced motion is mandatory; no scroll
  hijacking.
- Accessibility: WCAG 2.2 AA; Base UI primitives; axe critical/serious are
  blockers.
- Typography: Vazirmatn 400/500/600/700 (Arabic unicode-range) + Inter Variable.
  BYekan remains an asset fallback for one release, then is removed.
- The design lab is a historical record of the three proposals; its scoped
  palettes are not production values.
