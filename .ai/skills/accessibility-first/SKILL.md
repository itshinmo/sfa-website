---
name: accessibility-first
description: Use while implementing any page, component, form, menu, motion, or blog template. Makes WCAG 2.2 AA part of the definition of done rather than a final audit.
---

# accessibility-first

## Prerequisites

- [`docs/accessibility.md`](../../../docs/accessibility.md)
- `eslint-plugin-jsx-a11y` in `pnpm lint`
- `pnpm test:a11y`

## Workflow

1. Start with semantic HTML: landmarks, headings, lists, buttons vs links.
2. Use Base UI primitives for interactive patterns; do not improvise focus
   management.
3. Every control gets an accessible name; icon-only controls get `aria-label`.
4. Every form field gets a visible label, description, and error association.
5. Keyboard walkthrough: Tab, Shift+Tab, Enter/Space, Escape, arrows.
6. Check focus-visible on the brand surface and cards.
7. Check contrast in both light surfaces and brand surfaces.
8. Check reduced motion and no-JS content visibility.
9. Check RTL and LTR.
10. Run axe on the page type; fix critical/serious violations.

## Constraints

- No keyboard traps.
- No hover-only actions.
- No color-only meaning.
- No `aria-hidden` on focusable content.
- No fake buttons (`div` with click handler).
- No autoplay motion without pause.

## Expected output

Accessible implementation plus the axe/keyboard results in the handoff.
