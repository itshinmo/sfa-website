---
name: design-a-feature
description: Use when a page, section, component, variant, or visual change needs a design brief built from the SFA token system, with responsive, RTL, motion, and accessibility states.
---

# design-a-feature

## Prerequisites

- [`docs/design-system.md`](../../../docs/design-system.md)
- [`docs/motion.md`](../../../docs/motion.md)
- [`docs/accessibility.md`](../../../docs/accessibility.md)
- `app/styles/tokens.css`

## Workflow

1. Restate the user need and the content the UI must carry.
2. Compose existing tokens, primitives, and patterns first.
3. Write the brief:
   - layout at 360px, 768px, 1024px, 1440px;
   - states: default, hover, focus-visible, active, disabled, empty, loading,
     error;
   - tokens per property (semantic only);
   - RTL/LTR behavior;
   - motion with duration, easing, and reduced-motion fallback;
   - accessibility: landmarks, names, keyboard, focus, contrast.
4. For each new token/variant/component, state why reuse failed and where it is
   documented.
5. If the change affects the brand identity, propose 2–3 directions in the
   design lab and stop for the author's choice.
6. After implementation, run the conformance checklist against the diff.

## Constraints

- No raw values outside `app/styles/tokens.css`.
- No generic rounded/soft UI that ignores the chosen identity.
- No motion without a reduced-motion path.
- No contrast, focus, or keyboard trade-offs.

## Expected output

A design brief or a conformance report with findings ordered by severity.
