---
description: Design identity, tokens, motion, and the design-lab process. Read before UI work.
last-verified: 2026-11-02
---

# Design (agent context)

Contract: [`docs/design-system.md`](../../../docs/design-system.md),
[`docs/motion.md`](../../../docs/motion.md),
[`docs/accessibility.md`](../../../docs/accessibility.md).

- New marketing identity; SFA logo + green accent are brand anchors.
- App design is changing; never hardcode the current app look. Tokens are the
  switch point.
- Three token layers: primitive, semantic, component. Raw values only in
  `app/styles/tokens.css`.
- Current default direction: scientific agritech (deep forest, sand, water).
  The designer must still propose 2–3 directions in `/design-lab`.
- Motion: editorial + immersive hero; transform/opacity only; reduced motion
  mandatory; no scroll hijacking.
- Accessibility: WCAG 2.2 AA; Base UI; axe critical/serious are blockers.
- Typography: self-hosted Persian face + Latin companion; no external Google
  Fonts in production.
