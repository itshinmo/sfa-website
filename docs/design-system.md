# Design system

The website has a **new marketing identity**, separate from the Flutter app UI.
The SFA logo and a green accent remain as brand anchors. The app is a product
reference, not a pixel template.

**Locked direction: Field Notes × Rooted.** A light, editorial hybrid of
direction 01 (scientific agritech) and direction 02 (organic modern). It keeps
01's forest/cream/water palette, research-led hierarchy, and precise data
treatment, then adds 02's warmth, softer surfaces, generous spacing, human/team
moments, and organic shape language. Direction 03 (Signal) and dashboard
aesthetics are **not** part of this identity. See
[ADR-008](../decisions/ADR-008-brand-direction.md).

The source of truth for values is `app/styles/tokens.css`. Tailwind maps those
tokens to utilities in `app/app.css` under `@theme inline`. Font files and
`@font-face` live in `app/styles/fonts.css`.

## Token layers

1. **Primitive** — raw palette, type sizes, spacing, radii, shadows, motion
   durations/easings.
2. **Semantic** — `--color-bg`, `--color-surface`, `--color-text`,
   `--color-muted`, `--color-brand`, `--color-accent`, `--color-border`,
   `--color-focus`, `--color-focus-inverse`, `--color-hero-scrim-*`,
   `--font-body`, `--font-display`, etc.
3. **Component** — optional local variables for variants, such as
   `--button-bg` or `--card-padding`.

Components consume semantic/component tokens. No raw hex or arbitrary values
outside the token layer. Raw values in this document are documentation of the
locked tokens, asset dimensions, and art-direction targets; they are not
permission to inline values in components.

## Current color system — light mode only

V1 is **light mode only**. `color-scheme: light` is explicit. The dark forest
hero overlay is a photo treatment, not a dark theme.

| Role              | Token                                        | Value                 | Notes                                    |
| ----------------- | -------------------------------------------- | --------------------- | ---------------------------------------- |
| Page background   | `--color-bg` / `bg-background`               | `#f7f1e3`             | warm cream                               |
| Surface           | `--color-surface` / `bg-surface`             | `#fffcf4`             | paper cards, panels                      |
| Raised surface    | `--color-surface-raised`                     | `#fbf7ec`             | subtle raised sections                   |
| Muted surface     | `--color-surface-muted` / `bg-surface-muted` | `#efe7d6`             | section alternation                      |
| Text              | `--color-text` / `text-foreground`           | `#13231c`             | high contrast                            |
| Strong text       | `--color-text-strong`                        | `#0b1d16`             | headings                                 |
| Muted text        | `--color-text-muted` / `text-muted`          | `#4e6157`             | tested ≥ 4.5:1 on all light surfaces     |
| Brand             | `--color-brand` / `bg-brand`                 | `#15503b`             | interactive primary                      |
| Brand strong      | `--color-brand-strong` / `bg-brand-strong`   | `#0b2b21`             | hero/dark panels, inverse sections       |
| Brand soft        | `--color-brand-soft` / `bg-brand-soft`       | `#dde9dd`             | chips, selected states                   |
| Accent            | `--color-accent`                             | `#387253`             | moss highlight; 5.04:1 on page ground    |
| Water             | `--color-water` / `bg-water-100`             | `#1d6380` / `#d8eaf1` | data and supporting information          |
| Border            | `--color-border`                             | `#dcd3c1`             | warm hairline                            |
| Border strong     | `--color-border-strong`                      | `#6f7c6b`             | 3.91:1 on page ground; inputs/outline UI |
| Focus             | `--color-focus`                              | `#15503b`             | visible focus ring on light surfaces     |
| Focus inverse     | `--color-focus-inverse`                      | `#d8eaf1`             | focus ring on the dark hero photo        |
| Hero scrim strong | `--color-hero-scrim-strong`                  | `rgb(7 28 20 / 0.92)` | bottom/mid of the hero overlay           |
| Hero scrim soft   | `--color-hero-scrim-soft`                    | `rgb(7 28 20 / 0.35)` | upper fade of the hero overlay           |
| Danger/success    | `--color-danger*`, `--color-success*`        | unchanged             | feedback states                          |

The palette keeps 01's forest, cream, and water. The page ground is slightly
warmer than 01's original cream; cards are paper, not pure white. 03's lime,
near-black surfaces, ticker, and dashboard density are not used.

`#4CAF50` from the app is **not** used for text or primary buttons on light
surfaces; it fails AA. The system uses a darker green for text/actions and
reserves brighter greens for large accents and dark surfaces.

### Locked contrast checks

Calculated with the WCAG relative-luminance formula. All normal-text pairs pass
AA (≥ 4.5:1); UI boundaries pass 3:1.

| Pair                                              | Ratio |
| ------------------------------------------------- | ----- |
| Text on page ground                               | 14.51 |
| Muted text on page ground                         | 5.88  |
| Muted text on muted surface                       | 5.38  |
| White on brand                                    | 9.36  |
| Brand-strong text on brand-soft                   | 12.14 |
| Water text on water tint                          | 5.39  |
| Accent on page ground                             | 5.04  |
| Accent on muted surface                           | 4.61  |
| Border-strong on page ground                      | 3.91  |
| Focus ring on page ground                         | 8.31  |
| White on the strong hero scrim over white         | 8.79  |
| Focus-inverse on the strong hero scrim over white | 7.10  |

The hero must be re-tested against the actual photograph: the scrim is a
gradient, so verify white text over the brightest area it covers, not only the
token composite.

## Typography

The locked family is **BYekan**, self-hosted from the migrated original repo
fonts:

- `public/fonts/BYekan/BYekan.ttf` — 400
- `public/fonts/BYekan/BYekanBold.ttf` — 700

`app/styles/fonts.css` defines two `@font-face` rules with
`font-display: swap`. It is imported from `app/app.css`.

| Token            | Value                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `--font-body`    | `"BYekan", "Vazirmatn", "Noto Sans Arabic", "Segoe UI", system-ui, -apple-system, sans-serif` |
| `--font-display` | same as `--font-body`                                                                         |
| `--font-mono`    | `"JetBrains Mono", "SFMono-Regular", Consolas, monospace`                                     |

- **Display weight is 700 (BYekan Bold).** `font-synthesis-weight: none` is set
  globally so a component asking for 800/900 does not create faux bold. Use
  `font-bold`, not `font-black`, in new components.
- Body is 400. Do not introduce a third weight until a new face is licensed.
- The family is a token. A future font swap changes `fonts.css` plus
  `--font-body` / `--font-display`; it must not require component edits.
- No external Google Fonts, no remote font CDN.
- Scale: `--text-xs` through `--text-7xl`; line heights `tight` (`1.15`),
  `snug` (`1.4`), `normal` (`1.72`).
- Headings use `font-display` and `text-wrap: balance`; paragraphs use
  `text-wrap: pretty`.
- Persian and Latin text share BYekan. Test mixed-language pages at 14px, 16px,
  18px, and display sizes. Keep display tracking near zero; BYekan is not a
  tight-tracking Latin display face. If a component uses `tracking-tight`, check
  Persian joining before shipping.
- Load only the two used weights. TTF is the current format; WOFF2 conversion
  and a preload of the regular face are performance follow-ups, not blockers.
- BYekan is the current choice, not a permanent one. The author will revisit it;
  keep the family behind tokens.

## Layout and shape

- `Container` uses `--page-max` and `--page-gutter`.
- `Section` keeps the existing `py-16` → `lg:py-24` rhythm. The hybrid direction
  prefers the generous end; homepage composition should use the larger rhythm
  and avoid dense stacks of cards.
- Grid: mobile-first; 1 column → 2 → 3 where appropriate.
- Header height is `--header-height`.
- Touch targets ≥ 44px; no hover-only controls.
- Radii: cards `1.25rem` (`rounded-card`), panels `1.75rem`
  (`rounded-panel`), pills `9999px`.
- `--radius-organic` (`46% 54% 48% 52% / 54% 46% 54% 46%`, exposed as
  `rounded-organic`) is for non-interactive editorial photos or decorative
  shapes only. Do not use it on buttons, inputs, cards, or data UI. Keep at
  most one organic shape per viewport.
- Shadows use warm ink, not neutral black:
  - card: `0 2px 10px rgb(11 29 22 / 0.06), 0 1px 2px rgb(11 29 22 / 0.04)`
  - card hover: `0 16px 40px rgb(11 29 22 / 0.09), 0 3px 8px rgb(11 29 22 / 0.04)`
  - panel: `0 30px 80px rgb(11 29 22 / 0.13), 0 8px 20px rgb(11 29 22 / 0.05)`

## Hero art direction — farmland photo

The hero is the **single full-bleed photographic moment**. It should feel like a
real field at working light, not a stock “tech” image and not a dashboard.

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

- **Desktop:** full-bleed, `min-height: clamp(34rem, 78svh, 46rem)`,
  `object-fit: cover`, `object-position: 50% 58%`. Keep the receding crop rows
  and the horizon; crop sky before field. Text sits in the lower third at the
  inline start.
- **Mobile:** full-bleed, `min-height: 86svh`, `object-fit: cover`,
  `object-position: 50% 50%`. The portrait is wider than the phone container, so
  cover fills the height and crops the sides; vertical object-position does not
  move the horizon. Keep the rows, horizon, and enough lower field for the text.
  Do not put white text over the bright sky or the sunlit mountains; keep the
  eyebrow at or below the tree line. If the eyebrow lands on the mountains,
  increase the hero min-height (for example 90svh), lower the copy block, or
  strengthen the lower scrim before adding a text shadow.
- **Text alignment:** logical `start`; Persian RTL on the right, English LTR on
  the left. Max text width ~42rem. One eyebrow, one `<h1>`, one short
  two-line description, two CTAs. No floating stats, no app mock, no feature
  list in the hero.
- **Overlay:** a bottom-weighted forest scrim. Suggested composition:
  `linear-gradient(to top, var(--color-hero-scrim-strong) 0–62%, var(--color-hero-scrim-soft) 82%, transparent)`
  plus a dark translucent header surface. If a
  side-weighted scrim is used, mirror it with `:dir(rtl)` so the strongest area
  stays under the text.
- **Contrast:** white headline and CTAs must clear 4.5:1 over the strongest
  scrim; muted hero copy (white at ~80%) must also clear 4.5:1. Test over the
  brightest part of the actual image, not just the token composite.
- **CTA hierarchy:** primary is warm paper (`bg-surface text-brand-strong`);
  secondary is an outline (`border-white/45 text-white`). Primary first in DOM
  and at the inline start. Both are at least 44px tall. On the photo, use
  `outline-focus-inverse` for focus; do not use the forest focus token on the
  dark overlay. Because the shared `Button` default primary is forest green, use
  a hero-local paper treatment or a dedicated variant for the photo instead of
  the default primary.
- **Image loading:** use `<picture>`:
  - desktop source: `(min-width: 768px)` WebP, then JPG;
  - mobile source: portrait WebP, then portrait JPG fallback in `<img>`;
  - set `width`/`height` to prevent layout shift, `fetchPriority="high"`,
    `loading="eager"`, `decoding="async"`, and meaningful alt text describing
    the field.
  - In the home route `links`, preload **one** matching WebP with a media query
    (`min-width: 768px` vs `max-width: 767px`). Do not preload both crops.
- **Relationship to the rest of the page:** the hero is the only full-bleed
  photo. Below it, use cream/paper sections, the generous section rhythm, and at
  most one secondary editorial field/team photo to create a human moment. Avoid
  a dashboard panel, floating metric cards, lime accents, or a second dark
  full-bleed section. The page should move from “alive field” to “calm,
  credible explanation.”

## Components

Base UI primitives live under `app/shared/ui`:

- `Button` — CVA variants `primary`, `secondary`, `outline`, `ghost`; sizes
  `sm`, `md`, `lg`, `icon`.
- `Container`, `Section`, `Card`, `Badge`.
- `SiteHeader`, `SiteFooter`.
- FAQ uses native `<details>/<summary>` so answers are server-rendered and
  work without JS.
- Next: `Field`, `Input`, `SearchField`, `Select`,
  `Dialog`/`Popover` (mobile nav), `Tabs`, `Tooltip`, `Pagination`,
  `TableOfContents`, `EmptyState`, `ErrorState`, `Skeleton`, `DownloadButton`,
  `StoreBadge`, motion primitives.

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

**Status: direction chosen.** The production tokens now lock the 01+02 hybrid.
The lab remains a historical record of the three proposals: 01 Field Notes, 02
Rooted, and 03 Signal. Its scoped previews intentionally preserve the original
proposal palettes and radii and are not the production token set; they inherit
the locked BYekan family. Do not copy 03's dark, lime, or dashboard treatments
into production.

## Motion

See [`motion.md`](./motion.md). The locked hybrid uses:

| Token                        | Value                            |
| ---------------------------- | -------------------------------- |
| `--motion-duration-fast`     | 160ms                            |
| `--motion-duration-base`     | 280ms                            |
| `--motion-duration-slow`     | 420ms                            |
| `--motion-duration-reveal`   | 650ms                            |
| `--motion-ease-out`          | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--motion-ease-in-out`       | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--motion-distance-sm/md/lg` | `0.5rem` / `1rem` / `1.5rem`     |

Motion is calm and editorial: staggered hero entrance, subtle scroll reveals,
hover lift 2–4px, count-up only when it adds meaning. No 03 kinetic ticker, no
autoplay, no scroll hijacking. Reduced motion is mandatory.

## Accessibility

See [`accessibility.md`](./accessibility.md). Do not trade contrast, focus
visibility, or reduced motion for visual effects. Test axe on every page type.

- Use `--color-focus-inverse` on the dark hero photo; use `--color-focus`
  elsewhere.
- Verify BYekan at 14px, 16px, 18px, and display sizes in both Persian and
  English. `font-synthesis-weight: none` means unsupported weights render at the
  nearest loaded weight (700).
- Keep hero text out of the bright sky; use the scrim, not a text shadow, for
  contrast.
- Test the hero at 360px, 768px, 1024px, and 1440px, and with reduced motion.

## Extension rules

- New primitive token: justified by a real need; add to `tokens.css` and map it
  in `app.css` if it should be a utility.
- New component: compose existing primitives first; add a test and a doc entry.
- New variant: add to CVA, document it, and check all states (default, hover,
  focus-visible, active, disabled, loading, empty, error).
- New animation: use motion tokens, provide reduced-motion behavior, and test
  that content is visible without JS.
- Brand-level change (palette, typeface, logo, layout language): propose 2–3
  directions in the design lab, then record the choice in an ADR.
