# Design system

The production identity is **app-aligned**
([ADR-009](../decisions/ADR-009-app-aligned-identity.md)). The SFA application is
the source of the palette, type, surfaces, and product feeling. The website
shares that visual language, but it remains an editorial marketing site: it does
**not** clone the app shell, navigation model, dashboard density, or data
widgets.

The earlier Field Notes × Rooted hybrid
([ADR-008](../decisions/ADR-008-brand-direction.md)) is superseded for palette
and typography by ADR-009. ADR-008's editorial principles still hold: light
mode, a photography-led hero, clear hierarchy, and a calm long-form reading
experience. The design lab's 01/02/03 proposals remain a historical record, not
the production token set.

The source of truth for values is `app/styles/tokens.css`. Tailwind maps those
tokens to utilities in `app/app.css` under `@theme inline`. Font files and
`@font-face` live in `app/styles/fonts.css`.

## Token layers

1. **Primitive** — raw palette, type sizes, spacing, radii, shadows, motion
   durations/easings.
2. **Semantic** — `--color-bg`, `--color-surface`, `--color-text`,
   `--color-text-muted`, `--color-brand`, `--color-accent`, `--color-border`,
   `--color-focus`, `--color-focus-inverse`, `--color-hero-scrim-*`,
   `--font-body`, `--font-display`, etc.
3. **Component** — optional local variables for variants, such as
   `--button-bg` or `--card-padding`.

Components consume semantic/component tokens. No raw hex or arbitrary values
outside the token layer. Raw values in this document are documentation of the
locked tokens, asset dimensions, and art-direction targets; they are not
permission to inline values in components.

## Current color system — light mode only

V1 is **light mode only**. `color-scheme: light` is explicit. The dark green
hero scrim is a photo treatment, not a dark theme.

The table maps the app palette to its web role. `app/styles/tokens.css` declares
the matching semantic `--color-*` tokens; components consume those tokens, never
the hex values.

| Role              | Value                 | Use and contrast                             |
| ----------------- | --------------------- | -------------------------------------------- |
| Page ground       | `#F4F6F2`             | app light green-gray                         |
| Surface           | `#FFFFFF`             | cards, header, footer                        |
| Raised surface    | `#FAFCFA`             | subtle raised sections                       |
| Muted surface     | `#EEF2ED`             | section alternation                          |
| Text              | `#33444F`             | body; 10.09:1 on white, 9.28:1 on ground     |
| Strong text       | `#1F2A30`             | headings; 13.48:1 on ground                  |
| Muted text        | `#5B6B75`             | secondary; 5.52:1 on white, 5.08:1 on ground |
| Brand interactive | `#007A1F`             | buttons/links; 5.52:1 with white             |
| App primary       | `#018A24`             | large fills/accents; 4.50:1 on white         |
| Bright accent     | `#02AA2C`             | decorative/large only; 3.09:1 on white       |
| Dark brand        | `#006A1A`             | hover/strong green; 6.83:1 on white          |
| Brand soft        | `#DDF3E2` / `#E8F7EC` | chips, active nav, tinted panels             |
| Water action      | `#1565C0`             | links/actions; 5.75:1 on white               |
| Water accent      | `#2196F3`             | large icons/accents; 3.12:1 on white         |
| Water tint        | `#E3F2FD` / `#EFF8FE` | data panels; water text on tint is 5.03:1    |
| Soil tan          | `#B0875F` / `#D8B98A` | soil data only; 3.24:1 on white              |
| Soil text         | `#8A5A33`             | tan text; 5.85:1 on white                    |
| Assistant teal    | `#0CA5CD` / `#00A99D` | decorative gradient only; 2.88:1 on white    |
| Assistant text    | `#00796B`             | teal text; 5.32:1 on white                   |
| Border            | `#E3E9E3`             | hairlines                                    |
| Border strong     | `#7A8A80`             | inputs/outline UI; 3.34:1 on ground          |
| Hero scrim strong | `rgb(6 33 18 / 0.94)` | top of the hero photo                        |
| Hero scrim soft   | `rgb(6 33 18 / 0.38)` | lower hero fade                              |
| Focus             | `#007A1F`             | visible focus ring on light surfaces; 5.08:1 |
| Focus inverse     | `#D8EAF1`             | focus ring on the dark hero photo            |
| Danger/success    | unchanged             | feedback states                              |

The website uses the full app palette. Bright app greens, water blue, tan, and
teal are **large or decorative only**. Normal-size text and actions use the
darker variants: `#007A1F`, `#006A1A`, `#1565C0`, `#8A5A33`, and `#00796B`.
The same AA rule applies on the web even when a color is standard in the app.

### Locked contrast checks

Calculated with the WCAG relative-luminance formula. All normal-text pairs pass
AA (≥ 4.5:1); UI boundaries pass 3:1.

| Pair                            | Ratio |
| ------------------------------- | ----- |
| Text on white                   | 10.09 |
| Text on page ground             | 9.28  |
| Muted text on white             | 5.52  |
| Muted text on page ground       | 5.08  |
| White on brand                  | 5.52  |
| Brand on brand soft (`#DDF3E2`) | 4.73  |
| Dark brand on white             | 6.83  |
| Water action on white           | 5.75  |
| Water action on water tint      | 5.03  |
| Soil text on white              | 5.85  |
| Assistant text on white         | 5.32  |
| Border strong on page ground    | 3.34  |
| Focus ring on page ground       | 5.08  |
| App primary on white            | 4.50  |

These exact app colors fail normal-text AA on white and are large/decorative
only:

| App color | Ratio on white |
| --------- | -------------- |
| `#02AA2C` | 3.09           |
| `#448AFF` | 3.32           |
| `#2196F3` | 3.12           |
| `#B0875F` | 3.24           |
| `#0CA5CD` | 2.88           |

The hero must be re-tested against the actual photograph: the scrim is a
gradient, so verify white text over the brightest area it covers, not only the
token composite. Measure the composited pixels under the copy.

## Typography

The site uses a deliberate two-script pairing aligned with the app:

- **Persian/Arabic:** **Vazirmatn**, self-hosted TTF under
  `public/fonts/Vazirmatn/` — `Vazirmatn-Regular.ttf` (400),
  `Vazirmatn-Medium.ttf` (500), `Vazirmatn-SemiBold.ttf` (600), and
  `Vazirmatn-Bold.ttf` (700). Its `unicode-range` is limited to Persian/Arabic
  glyphs.
- **English/Latin:** **Inter Variable**, self-hosted at
  `public/fonts/Inter/InterVariable-latin.woff2` (SIL OFL, licence beside the
  font).
- **Licence:** `public/fonts/Vazirmatn/OFL.txt`.

Because Vazirmatn excludes Latin glyphs, mixed Persian/English sentences use
Vazirmatn for Persian and Inter for Latin automatically. The English locale uses
Inter for the whole page.

| Token            | Value                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `--font-fa`      | `"Vazirmatn", "Inter", "Noto Sans Arabic", "Segoe UI", system-ui, -apple-system, sans-serif` |
| `--font-en`      | `"Inter", "Vazirmatn", "Noto Sans Arabic", "Segoe UI", system-ui, -apple-system, sans-serif` |
| `--font-body`    | `var(--font-fa)`; `html[lang="en"]` switches it to `var(--font-en)`                          |
| `--font-display` | same locale switch as `--font-body`                                                          |
| `--font-mono`    | `"JetBrains Mono", "SFMono-Regular", Consolas, monospace`                                    |

- Preload weights 400, 600, and 700 in `app/root.tsx`; 500 loads on demand.
- `font-display: swap` is intentional.
- `font-synthesis-weight: none` prevents faux bold. Use `font-bold` (700) in
  new components.
- No external Google Fonts or remote font CDN.
- Test mixed-language strings at 14px, 16px, 18px, and display sizes. Keep
  display tracking near zero.
- BYekan is retired from the token and preload path. Its files stay under
  `public/fonts/BYekan/` for one release as an asset fallback, then are removed.
- The families are tokens; a future swap touches `fonts.css` and the token
  layer, not components.

## Layout and shape

- `Container` uses `--page-max` and `--page-gutter`.
- `Section` keeps the `py-16` → `lg:py-24` rhythm. The app-aligned identity
  keeps the generous editorial rhythm; homepage composition should use the
  larger rhythm and avoid dense dashboard grids or stacks of cards.
- Grid: mobile-first; 1 column → 2 → 3 where appropriate.
- Header height is `--header-height`.
- Touch targets ≥ 44px; no hover-only controls.
- Radii: cards `1rem` / 16px (`--radius-lg`, `rounded-card`), panels `1.5rem` /
  24px (`--radius-xl`, `rounded-panel`), primary buttons `0.75rem` / 12px
  (`--radius-button`, `rounded-button`). Chips, tags, and the language switcher
  stay pills (`9999px`).
- `--radius-organic` (`46% 54% 48% 52% / 54% 46% 54% 46%`, exposed as
  `rounded-organic`) is for non-interactive editorial photos or decorative
  shapes only. Do not use it on buttons, inputs, cards, or data UI. Keep at
  most one organic shape per viewport.
- Shadows use soft, green-tinted ink (`rgb(6 33 18 / …)`), not neutral black:
  - card: `0 2px 10px rgb(6 33 18 / 0.06), 0 1px 2px rgb(6 33 18 / 0.04)`
  - card hover: `0 16px 40px rgb(6 33 18 / 0.09), 0 3px 8px rgb(6 33 18 / 0.04)`
  - panel: `0 30px 80px rgb(6 33 18 / 0.13), 0 8px 20px rgb(6 33 18 / 0.05)`

## Hero art direction — farmland photo

The hero is the **single full-bleed photographic moment**. The final target is
**100svh** (small viewport height), full-bleed, `object-fit: cover`, with the
existing farmland photo. It should feel like a real field at working light, not
a stock “tech” image and not a dashboard.

### Composition

The author chose the **top-start editorial** composition on 2026-11-05. The copy
sits at the logical start, directly below the header. A top-weighted scrim
protects it; there is no glass panel. The choice is recorded in the
[ADR-009 addendum](../decisions/ADR-009-app-aligned-identity.md#addendum--2026-11-05-chosen-hero-composition).

The centered-glass variant was not chosen and the review route
`/:locale/design-lab/hero` has been removed.

### Assets

| Crop      | File                                         | Dimensions | Use           |
| --------- | -------------------------------------------- | ---------- | ------------- |
| Landscape | `public/images/homepage/hero-landscape.webp` | 2000×1499  | ≥ 768px       |
| Landscape | `public/images/homepage/hero-landscape.jpg`  | 2000×1499  | WebP fallback |
| Portrait  | `public/images/homepage/hero-portrait.webp`  | 1200×1800  | < 768px       |
| Portrait  | `public/images/homepage/hero-portrait.jpg`   | 1200×1800  | WebP fallback |

Do not upscale, add a second full-bleed hero photo, or place the app UI over the
field. The photo is the atmosphere; the copy is the message. Keep the natural
working-light grade: warm highlights and deep field greens, no heavy teal/orange
filter. A dark overlay is a readability tool, not a colour grade.

### Composition and crop

- **Viewport:** `100svh` at both breakpoints, `object-fit: cover`. The production
  hero is full-height on every screen size.
- **Desktop crop:** `object-position: 50% 58%`. Keep the receding crop rows and
  the horizon; crop sky before field.
- **Mobile crop:** `object-position: 50% 50%`. The portrait is wider than the
  phone container, so cover fills the height and crops the sides; vertical
  object-position does not move the horizon. Keep the rows, horizon, and enough
  lower field for the text. The top scrim keeps the copy readable over the
  brighter sky.
- **Copy:** one eyebrow, one `<h1>`, one short two-line description, two CTAs.
  Max text width ~42rem. Copy sits at the logical `start` and at the top, below
  the header (Persian RTL on the right, English LTR on the left). No floating
  stats, app mock, or feature list in the hero.
- **Overlay:** a top-weighted dark-green scrim, using
  `rgb(6 33 18 / 0.94)` hold through `32rem`, `rgb(6 33 18 / 0.38)` at `50rem`,
  and transparent at `62rem`:
  `linear-gradient(to bottom, var(--color-hero-scrim-strong) 0–32rem, var(--color-hero-scrim-soft) 50rem, transparent 62rem)`.
  The lower field stays visible. There is no glass panel. If a side-weighted
  scrim is added, mirror it with `:dir(rtl)` so the strongest area stays under
  the text.
- **Contrast:** white headline and CTAs must clear 4.5:1 over the actual
  composited pixels, including the top scrim. Muted hero copy (white at ~80%)
  must also clear 4.5:1. Test over the brightest part of the real landscape and
  portrait images, not just the token composite.
- **CTA hierarchy:** primary is an opaque surface button
  (`bg-surface text-brand-strong`); secondary is an outline
  (`border-white/45 text-white`). Primary first in DOM and at the inline start.
  Both are at least 44px tall. On the photo, use `outline-focus-inverse` for
  focus; do not use the light-surface focus token on the dark overlay. Because
  the shared `Button` default primary is brand green, use a hero-local surface
  treatment or a dedicated variant for the photo instead of the default primary.
- **Image loading:** use `<picture>`:
  - desktop source: `(min-width: 768px)` WebP, then JPG;
  - mobile source: portrait WebP, then portrait JPG fallback in `<img>`;
  - set `width`/`height` to prevent layout shift, `fetchPriority="high"`,
    `loading="eager"`, `decoding="async"`, and meaningful alt text describing
    the field.
  - In the home route `links`, preload **one** matching WebP with a media query
    (`min-width: 768px` vs `max-width: 767px`). Do not preload both crops.
- **Relationship to the rest of the page:** the hero is the only full-bleed
  photo. Below it, use the white and muted app surfaces, the generous section
  rhythm, and at most one secondary editorial field/team photo to create a human
  moment. Avoid a dashboard panel, floating metric cards, a data ticker, or a
  second dark full-bleed section. The page should move from “alive field” to
  “calm, credible explanation.”

### Scroll cue

The hero carries an **opaque** scroll cue, not a faint floating chevron:

- 48×48px solid surface circle with a chevron, centered at the bottom.
- Visible only while the hero covers the viewport; hidden after about 8px of
  scroll.
- Bobs with `transform: translateY()` only, using `--motion-duration-cue` and
  `--motion-distance-cue`. Pauses on hover/focus; static with reduced motion.
- When hidden, it leaves the tab order and the accessibility tree. Do not leave
  an invisible focusable link behind.
- Without JavaScript it is a normal anchor to `#features` and stays visible.
- Accessible name comes from `hero.scrollCue`; focus uses
  `--color-focus-inverse`.
- Hiding must not shift layout.

## Components

Base UI primitives live under `app/shared/ui`:

- `Button` — CVA variants `primary`, `secondary`, `outline`, `ghost`, `surface`,
  `inverse`; sizes `sm`, `md`, `lg`, `icon`. Primary buttons use a 12px radius
  (`--radius-button`, `rounded-button`); chips, tags, and the language switcher
  stay pills.
- `Container`, `Section`, `Card`, `Badge`.
- `SiteHeader`, `SiteFooter`.
- `LanguageSwitcher` — Base UI Select, data-driven from
  `supportedLanguages`; future locales need only a resource bundle and an entry
  in that array.
- FAQ uses Base UI Accordion with animated height and `keepMounted` panels, plus
  a native `<details>` fallback inside `<noscript>`.
- `HomeTeam` — Motion-driven continuous carousel with hover/focus pause and a
  reduced-motion/native-scroll path. It is direction-aware in RTL and LTR.
- `TableOfContents` — generated from structured headings. Sticky in the desktop
  article column; after the cover and before the body on mobile. Tall lists
  scroll internally.

The app-aligned component set includes:

- `HeroScrollCue` — the opaque 48px link that targets `#features`. Behavior is
  specified in the hero section and in [`motion.md`](./motion.md).
- `DeviceShowcase` — laptop/tablet/phone composition for the current app
  screens. CSS/SVG generic frames, no hardware trademarks; content order defines
  the stage order; overlapping perspective stage on desktop and a simplified
  stack on mobile; logical start/end in RTL.

Next: `Field`, `Input`, `SearchField`, `Dialog`/`Popover`, `Tabs`, `Tooltip`,
`Pagination`, `EmptyState`, `ErrorState`, `Skeleton`,
`DownloadButton`, `StoreBadge`.

### App screenshots

The showcase uses current app captures, not the old browser-chrome grid and not
the 74 MB Photoshop composite:

| Device | Screen          | Asset                                   |
| ------ | --------------- | --------------------------------------- |
| Laptop | Soil lab        | `public/images/app/app-soil-lab.webp`   |
| Tablet | Irrigation plan | `public/images/app/app-irrigation.webp` |
| Phone  | AI assistant    | `public/images/app/app-assistant.webp`  |

- Crop out the sidebar, account identity, email, phone number, farm identity,
  and coordinates before export.
- WebP, lazy-loaded, explicit `width`/`height`, localized alt text, visible
  localized caption, total target under 300 KB.
- The asset and its caption must match. The historical mismatch where
  `app-soil-lab.png` showed the irrigation screen must not return.
- The old `app-login` and `app-fields` captures are not showcase content.

Rules:

- Every layer exposing `className` has `data-slot="<name>"`.
- Use `render` on Base UI primitives for links/buttons rather than nesting an
  interactive element inside another.
- Component APIs should expose semantic variants, not raw colors.
- Add a component only after checking whether an existing primitive or pattern
  can be composed.
- Document new components in this file and add component tests.

## Design lab

`/design-lab` is an internal, noindex preview, available in development and
gated by `DESIGN_LAB=1` in production.

**Status: historical.** The lab remains the record of the three proposals from
2026-11-02: 01 Field Notes, 02 Rooted, and 03 Signal. Production is now the
app-aligned identity ([ADR-009](../decisions/ADR-009-app-aligned-identity.md)),
which is not one of those proposals. Its scoped previews intentionally preserve
the original proposal palettes and radii and are not the production token set;
they inherit the production Vazirmatn + Inter pairing. Do not copy 03's dark,
lime, or dashboard treatments into production.

The app-aligned hero has a single production composition, chosen on 2026-11-05;
there is no separate hero review route. The composition is documented above and
in the [ADR-009 addendum](../decisions/ADR-009-app-aligned-identity.md#addendum--2026-11-05-chosen-hero-composition).

## Motion

See [`motion.md`](./motion.md). The app-aligned identity uses:

| Token                        | Value                            |
| ---------------------------- | -------------------------------- |
| `--motion-duration-fast`     | 160ms                            |
| `--motion-duration-base`     | 280ms                            |
| `--motion-duration-slow`     | 420ms                            |
| `--motion-duration-reveal`   | 650ms                            |
| `--motion-duration-cue`      | 2600ms                           |
| `--motion-ease-out`          | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--motion-ease-in-out`       | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--motion-distance-sm/md/lg` | `0.5rem` / `1rem` / `1.5rem`     |
| `--motion-distance-cue`      | `0.375rem`                       |

Motion is calm and editorial: staggered hero entrance, an opaque hero scroll cue
that pauses on hover/focus, subtle scroll reveals, hover lift 2–4px, count-up
only when it adds meaning, and a hover/focus-paused team carousel. The device showcase
uses Reveal and hover lift only, with no 3D scroll effects. No kinetic ticker, no
unpausable autoplay, no scroll hijacking. Reduced motion is mandatory.

## Accessibility

See [`accessibility.md`](./accessibility.md). Do not trade contrast, focus
visibility, or reduced motion for visual effects. Test axe on every page type.

- Use `--color-focus-inverse` on the dark hero photo; use `--color-focus`
  elsewhere.
- Verify Vazirmatn for Persian and Inter for English at 14px, 16px, 18px, and
  display sizes. `font-synthesis-weight: none` means unsupported weights render
  at the nearest loaded weight.
- Bright app accents (`#02AA2C`, `#2196F3`, `#B0875F`, `#0CA5CD`) are large or
  decorative only; never use them for normal-size text on light surfaces.
- Keep hero text over the top scrim, not directly on the bright sky; do not use
  a text shadow for contrast.
- Test the hero at 360px, 768px, 1024px, and 1440px, and with reduced motion.
- Test the cue at 48px, with visible focus, and confirm it leaves the tab order
  when hidden.

## Extension rules

- New primitive token: justified by a real need; add to `tokens.css` and map it
  in `app.css` if it should be a utility.
- New component: compose existing primitives first; add a test and a doc entry.
- New variant: add to CVA, document it, and check all states (default, hover,
  focus-visible, active, disabled, loading, empty, error).
- New animation: use motion tokens, provide reduced-motion behavior, and test
  that content is visible without JS.
- Brand-level change: keep tokens as the switch point. A change that follows the
  app is recorded in `docs/`; a change that diverges from the app needs an ADR,
  and 2–3 design-lab directions when there are real alternatives.
