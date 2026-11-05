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

## Hero scroll cue

- 48×48px target, centered at the bottom of the hero.
- Accessible name comes from `hero.scrollCue`; it links to `#features`.
- Visible focus using `--color-focus-inverse` on the photo.
- Visible only while the hero covers the viewport. After about 8px of scroll it
  must leave the tab order and the accessibility tree (`hidden`,
  `display: none`, `visibility: hidden` plus `aria-hidden` and `tabIndex={-1}`,
  or `inert`). `opacity: 0` alone is not enough.
- Hiding and showing must not shift layout.
- Static under reduced motion; the bob pauses on hover/focus.
- Without JavaScript it stays a normal anchor and remains usable.

## Device showcase

- Every screenshot has meaningful, localized alt text from content and a visible
  localized caption.
- Images are lazy-loaded with explicit `width`/`height`; no layout shift.
- Captures must be current and free of personal data: no account email, phone
  number, farm identity, coordinates, or sidebar/account chrome.
- The asset and the caption must describe the same screen.
- CSS device frames are decorative; they add no focusable controls.

## Forms and search

- Visible labels, not placeholder-only fields.
- Search has a label, an accessible submit button, and a status message for
  result counts.
- Errors are announced and associated with the field.
- No color-only meaning.

## Color and contrast

- Text contrast ≥ 4.5:1; large text ≥ 3:1.
- UI components and focus indicators ≥ 3:1.
- The app-aligned palette uses darker variants for text and actions: body
  `#33444F` is 10.09:1 on white and 9.28:1 on the `#F4F6F2` ground; muted
  `#5B6B75` is 5.52:1 / 5.08:1; white on `#007A1F` is 5.52:1; `#1565C0` is
  5.75:1; `#8A5A33` is 5.85:1; `#00796B` is 5.32:1.
- Exact app accents fail normal-text AA on white: `#02AA2C` 3.09:1, `#448AFF`
  3.32:1, `#2196F3` 3.12:1, `#B0875F` 3.24:1, `#0CA5CD` 2.88:1. They are large
  or decorative only.
- `#018A24` (4.50:1 on white) is for large fills and accents, not normal body
  text or the default action color.
- `#4CAF50` is not used for text on light surfaces.
- Test tokens with a contrast checker whenever the palette changes.

### Hero over photography

- White hero copy and controls must clear 4.5:1 against the actual composited
  pixels they cover, not only the token scrim. Test the brightest covered area
  of both the landscape and portrait crops.
- The top-weighted scrim is not a guarantee. Measure the photo and the scrim
  together at every breakpoint; the copy now sits over the brighter upper part
  of the photo.
- Use `--color-focus-inverse` on the photo.

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
- [ ] Hero cue: 48px target, visible focus, and it leaves the tab order after
      scrolling.
- [ ] Showcase: captions and alt match the screens; no personal data.
- [ ] Run axe and record the result.

## Known gaps

- `Reveal`, `CountUp`, and the hero rise are implemented; add tests for any new
  motion primitive.
- Homepage metadata (`canonical`, `hreflang`, `Organization`/`WebSite` JSON-LD) is implemented.
- Hero/header contrast passed under the ADR-008 scrim at 360/768/1024/1440 in
  both locales. The app-aligned top scrim must be re-measured over the actual
  photo before release; the copy now sits over the brighter upper part of the
  image.
- FAQ answers are rendered by a Base UI accordion with animated height; a native `<details>` fallback inside `<noscript>` keeps every answer usable without JavaScript.
- The team carousel stops on hover/focus and under reduced motion; it has no separate pause button. It becomes a native horizontal scroller on small screens.
- The locale selector is a Base UI combobox with keyboard and screen-reader support.
- The Vazirmatn + Inter pairing is the app-aligned stack; re-check typography and
  hero contrast after any font or photo swap. The dark hero uses
  `--color-focus-inverse` for focus visibility.
- The hero scroll cue and device showcase are new in ADR-009; add their unit,
  E2E, axe, and reduced-motion coverage.
