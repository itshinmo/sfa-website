# Accessibility

Target: **WCAG 2.2 AA**. Accessibility is a release gate, not a polish pass.

## Automated gates

- `eslint-plugin-jsx-a11y` runs in `pnpm lint`.
- `pnpm test:a11y` runs axe via Playwright on the homepage, blog index, blog
  detail, filtered search/tag results, and localized 404 pages.
- Add axe checks for new page types: design lab (internal).
- Treat `critical` and `serious` violations as blockers. Moderate/minor
  violations need a documented reason.

## Structural rules

- One `<main id="main-content">` per page.
- Header, nav, main, footer landmarks.
- A skip link is rendered in the root layout.
- Heading hierarchy is sequential; do not skip levels for styling.
- Links and buttons have accessible names. Icon-only controls need
  `aria-label`.
- Current navigation items use `aria-current="page"`.
- Decorative images/icons use `alt=""` or `aria-hidden="true"`.
- Content images use meaningful alt text from the API.

## Keyboard and focus

- All interactive elements are reachable by keyboard.
- Focus is always visible (`:focus-visible` token outline).
- Base UI primitives handle focus trapping for dialogs/menus.
- No keyboard traps.
- Mobile navigation must close on Escape and restore focus to the trigger.
- Blog cards have a single clear focus target; avoid nested interactive
  elements.
- Pagination and filters are keyboard-operable links/buttons.
- The skip link moves focus to `<main id="main-content">`; table-of-contents
  links move focus to the target heading instead of leaving it on `body`.

## Forms and search

- Visible labels, not placeholder-only fields.
- Search has a label, an accessible submit button, and a status message for
  result counts.
- Errors are announced and associated with the field.
- No color-only meaning.

## Color and contrast

- Text contrast ≥ 4.5:1; large text ≥ 3:1.
- UI components and focus indicators ≥ 3:1.
- The current muted text token was darkened to pass on the warm surface.
- `#4CAF50` is not used for text on light surfaces.
- Test tokens with a contrast checker whenever the palette changes.

## Motion

See [`motion.md`](./motion.md).

- `prefers-reduced-motion` is respected globally and in Motion components.
- No autoplay animation without pause.
- No parallax/scroll effects that cause motion sickness without a reduced
  path.
- Content is visible without JavaScript and before animation starts.

## RTL

- Both `fa` (RTL) and `en` (LTR) are tested.
- Logical properties are used for layout.
- Directional icons flip correctly.
- Focus order follows the visual order in both directions.

## Manual checklist per milestone

- [ ] Tab through the page; every control is reachable and visible.
- [ ] Shift+Tab returns in a sensible order.
- [ ] Screen-reader pass on the homepage and one blog detail.
- [ ] Zoom to 200%; no content loss or horizontal scroll.
- [ ] Test at 360px width; touch targets ≥ 44px.
- [ ] Reduced-motion mode: no unexpected movement; content visible.
- [ ] Check both locales.
- [ ] Check the 404 page.
- [ ] Run axe and record the result.

## Known gaps

- `Reveal`, `CountUp`, and the hero rise are implemented; add tests for any new
  motion primitive.
- Homepage metadata (`canonical`, `hreflang`, `Organization`/`WebSite` JSON-LD) is implemented.
- Hero/header contrast was re-measured over the actual farmland photo at
  360/768/1024/1440 in both locales; the scrim/header surface now clears AA.
- FAQ answers are server-rendered native `<details>` content and work without JS.
- BYekan and the locked hybrid tokens have been checked; re-check typography and
  hero contrast after any font or photo swap. The dark hero uses
  `--color-focus-inverse` for focus visibility.
