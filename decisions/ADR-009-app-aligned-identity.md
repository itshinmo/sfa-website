# ADR-009 — App-aligned marketing identity

- **Status:** Accepted
- **Date:** 2026-11-05
- **Topic:** design
- **Supersedes:** the separate-identity clause of
  [ADR-008](./ADR-008-brand-direction.md)
- **Spec:** [`.ai/specs/brand-app-alignment.md`](../.ai/specs/brand-app-alignment.md)
  (local, gitignored)

## Context

The Flutter app has shipped. The author wants the website to share the app's
palette, typography, surfaces, and product feeling while remaining an editorial
marketing site that explains the product and points visitors to a download.

ADR-008 deliberately kept the marketing identity separate from the app because
the app was still changing. That rationale no longer holds: the app is the
product people see first, and the author wants one recognizable SFA identity
across app and web. The separate-identity clause is superseded. The rest of
ADR-008 — light mode, editorial hierarchy, photography-led hero, no dashboard
aesthetics — still guides the website. ADR-008 is not rewritten.

## Decision

Adopt the **app identity** for the website:

- the full app palette, with darker AA-safe variants for text and actions;
- **Vazirmatn** for Persian/Arabic and **Inter** for Latin;
- a **100svh full-viewport hero** using the existing farmland photo and an
  opaque scroll cue;
- a **device showcase** (laptop, tablet, phone) using current app screenshots;
- the existing **editorial layout**, not a clone of the app shell. There is no
  sidebar, dashboard, data grid, or account surface on the website.

### Palette mapping

| Role              | Value                 | Intended use                              |
| ----------------- | --------------------- | ----------------------------------------- |
| Page ground       | `#F4F6F2`             | app light green-gray                      |
| Surface           | `#FFFFFF`             | cards, header, footer                     |
| Raised surface    | `#FAFCFA`             | subtle raised sections                    |
| Muted surface     | `#EEF2ED`             | section alternation                       |
| Text              | `#33444F`             | body; 10.09:1 on white                    |
| Strong text       | `#1F2A30`             | headings                                  |
| Muted text        | `#5B6B75`             | secondary copy; 5.52:1 on white           |
| Brand interactive | `#007A1F`             | buttons/links; 5.52:1 with white          |
| App primary       | `#018A24`             | large fills/accents; 4.50:1 on white      |
| Bright accent     | `#02AA2C`             | decorative/large only; 3.09:1 on white    |
| Dark brand        | `#006A1A`             | hover/strong green; 6.83:1 on white       |
| Brand soft        | `#DDF3E2` / `#E8F7EC` | chips, active nav, tinted panels          |
| Water text/action | `#1565C0`             | links/actions; 5.75:1 on white            |
| Water accent      | `#2196F3`             | large icons/accents; 3.12:1 on white      |
| Water tint        | `#E3F2FD` / `#EFF8FE` | data panels                               |
| Soil tan          | `#B0875F` / `#D8B98A` | soil data only; 3.24:1 on white           |
| Soil text         | `#8A5A33`             | tan text; 5.85:1 on white                 |
| Assistant teal    | `#0CA5CD` / `#00A99D` | decorative gradient only; 2.88:1 on white |
| Assistant text    | `#00796B`             | teal text; 5.32:1 on white                |
| Border            | `#E3E9E3`             | hairlines                                 |
| Border strong     | `#7A8A80`             | inputs/outline UI; 3.34:1 on the ground   |
| Hero scrim strong | `rgb(6 33 18 / 0.94)` | top of the photo                          |
| Hero scrim soft   | `rgb(6 33 18 / 0.38)` | lower hero fade                           |
| Focus inverse     | `#D8EAF1`             | controls on the photo                     |

### Contrast rationale

The app palette is tuned for large surfaces and icons. Several exact app colors
fail WCAG 2.2 AA for normal-size text on white:

| App color | Contrast on white | Result      |
| --------- | ----------------- | ----------- |
| `#02AA2C` | 3.09:1            | fails 4.5:1 |
| `#448AFF` | 3.32:1            | fails 4.5:1 |
| `#2196F3` | 3.12:1            | fails 4.5:1 |
| `#B0875F` | 3.24:1            | fails 4.5:1 |
| `#0CA5CD` | 2.88:1            | fails 4.5:1 |

Therefore:

- text and actions use the darker variants: `#007A1F` (5.52:1 with white),
  `#006A1A` (6.83:1), `#1565C0` (5.75:1), `#8A5A33` (5.85:1), and `#00796B`
  (5.32:1);
- `#018A24` is the app primary for large fills and accents (4.50:1 on white),
  not the default action or text color;
- bright `#02AA2C`, `#2196F3`, `#B0875F`/`#D8B98A`, and `#0CA5CD`/`#00A99D`
  are large or decorative only, never normal-size text;
- body `#33444F` is 10.09:1 on white and 9.28:1 on the `#F4F6F2` ground; muted
  `#5B6B75` is 5.52:1 on white and 5.08:1 on the ground.

### Hero

The final hero is full-viewport: **100svh**, full-bleed, `object-fit: cover`,
with the existing `hero-landscape` / `hero-portrait` farmland photo. It keeps one
eyebrow, one `h1`, one short description, and two CTAs. White copy sits on a
top-weighted scrim.

An **opaque scroll cue** — a 48px solid surface circle with a chevron, centered
at the bottom — is part of the decision. It bobs with transform only, is visible
only while the hero covers the viewport, hides after about 8px of scroll, leaves
the tab order and accessibility tree when hidden, is static with reduced motion,
and is a plain anchor to `#features` without JavaScript. Its label comes from
`hero.scrollCue`.

**Composition (resolved 2026-11-05).** The author chose the editorial
composition, adjusted so the copy sits at the top rather than the bottom. The
chosen variant is recorded in the addendum below; the centered-glass preview and
its review route are removed.

### Showcase

Replace the browser-chrome grid with a **device composition**:

- laptop: soil lab;
- tablet: irrigation plan;
- phone: AI assistant.

CSS/SVG frames, no hardware trademarks. Overlapping perspective stage on
desktop; simplified stack on mobile; logical start/end in RTL. Visible localized
captions and alt text. Screenshots are cropped to remove the sidebar and account
identity, use WebP, are lazy-loaded with explicit dimensions, and target under
300 KB in total. The 74 MB Photoshop composite is not a web asset and is not
used.

### Layout and surfaces

The website keeps its editorial composition: generous section rhythm, readable
long-form pages, photography-led hero, and content sections rather than
dashboard grids. Cards are 16px, panels 24px, primary buttons 12px, chips and
pills unchanged. Shadows are soft and green-tinted. The app's sidebar, account
chrome, and data density are not reproduced.

## Consequences

- `app/styles/tokens.css`, `app/styles/fonts.css`, and the docs become the switch
  point. Components keep consuming semantic tokens.
- Vazirmatn replaces BYekan in the token and preload path. BYekan files remain
  for one release as an asset fallback, then are removed.
- The raw app colors cannot be used for normal text. The darker variants are the
  action/text tokens; bright greens, blue, tan, and teal stay large/decorative.
- The design lab's three proposals remain a historical record. Its scoped
  preview palettes are not production values.
- The website does not copy the app's sidebar or dashboard, so it stays a
  marketing site and not an app clone.
- App screenshots must be current and free of personal data. A screenshot that
  shows an account email, phone number, farm identity, or coordinates is a
  release blocker.
- Theme color and the web manifest move to `#F4F6F2`.
- Real store download links remain placeholders and are outside this decision.
- The hero composition was resolved on 2026-11-05: top-start editorial, no
  glass panel. The addendum records the choice.

## Addendum — 2026-11-05: chosen hero composition

The author chose the **top-start editorial** composition, originally offered as
the bottom-start editorial variant with the copy anchored at the top instead.

- The production hero is `100svh` and full-bleed, using the existing landscape
  and portrait farmland crops.
- Copy sits at the logical start, directly below the header: one eyebrow, one
  `h1`, one description, and two CTAs. There is no glass panel.
- A top-weighted scrim protects the copy: strong `rgb(6 33 18 / 0.94)` through
  the first `32rem`, soft `rgb(6 33 18 / 0.38)` at `50rem`, and transparent at
  `62rem`. The lower photo is left readable.
- The opaque scroll cue remains centered at the bottom.
- The centered-glass variant, the `/:locale/design-lab/hero` review route, the
  `hero-demo` route, and the `--color-hero-glass*` tokens are removed.
- Production no longer keeps the earlier 78svh composition.

## Links

- [`docs/design-system.md`](../docs/design-system.md)
- [`docs/motion.md`](../docs/motion.md)
- [`docs/accessibility.md`](../docs/accessibility.md)
- [`docs/architecture.md`](../docs/architecture.md)
- Spec: [`.ai/specs/brand-app-alignment.md`](../.ai/specs/brand-app-alignment.md)
- Superseded clause: [ADR-008](./ADR-008-brand-direction.md)
