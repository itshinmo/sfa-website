# Designer — Locked identity implementation

- **Status:** done
- **Date:** 2026-11-02
- **Task id:** M1-3 follow-up (brand lock)

## Changed files

- `app/styles/tokens.css` — locked hybrid palette, radii, shadows, type, motion,
  and hero/focus tokens.
- `app/styles/fonts.css` — new self-hosted BYekan `@font-face` rules.
- `app/app.css` — imports `fonts.css`, maps the new tokens, and disables
  synthetic bolding.
- `app/routes/design-lab.tsx` — status notice only: locked 01+02 hybrid,
  historical previews, decision panel now records the lock.
- `docs/design-system.md` — locked direction, token tables, contrast, typography,
  layout, hero art direction, lab status.
- `docs/design-lab-directions.md` — marked chosen; hybrid decision recorded;
  proposal tables retained as history.
- `docs/motion.md` — updated motion tokens and direction wording.
- `docs/accessibility.md` — typography/identity check status.
- `decisions/ADR-008-brand-direction.md` — new ADR.
- `decisions/README.md` — ADR-008 index entry.
- `.ai/memories/working/sfa-website/handoffs/designer-locked-identity.md` — this
  handoff.

Not edited: `app/routes/home.tsx`, blog routes, content files, locale files,
`package.json`, lockfile, tests, `app/routes.ts`, or the design lab's direction
content beyond status notes.

## Locked direction

**Field Notes × Rooted** — a light, editorial hybrid:

- From 01: forest/cream/water palette, research-led hierarchy, precise data
  accents, mono labels in restrained doses.
- From 02: warm cream/sand ground, paper surfaces, softer card/panel radii,
  generous rhythm, human/team moments, organic shape language.
- Rejected: 03 Signal's near-black surfaces, lime accent, kinetic ticker, and
  dashboard density.
- Light mode only. The dark farmland hero overlay is a photo treatment, not a
  dark theme.

## Token tables

### Color

| Token                       | Value                 | Notes                                 |
| --------------------------- | --------------------- | ------------------------------------- |
| `--color-bg`                | `#f7f1e3`             | warm cream ground                     |
| `--color-surface`           | `#fffcf4`             | paper cards/panels                    |
| `--color-surface-raised`    | `#fbf7ec`             | subtle raised sections                |
| `--color-surface-muted`     | `#efe7d6`             | section alternation                   |
| `--color-text`              | `#13231c`             | body                                  |
| `--color-text-strong`       | `#0b1d16`             | headings                              |
| `--color-text-muted`        | `#4e6157`             | 5.88:1 on page ground                 |
| `--color-brand`             | `#15503b`             | primary action                        |
| `--color-brand-strong`      | `#0b2b21`             | inverse/dark panels                   |
| `--color-brand-soft`        | `#dde9dd`             | chips/selected states                 |
| `--color-accent`            | `#387253`             | moss highlight; 5.04:1 on page ground |
| `--color-water`             | `#1d6380`             | data/support                          |
| `--color-water-100`         | `#d8eaf1`             | water tint                            |
| `--color-border`            | `#dcd3c1`             | warm hairline                         |
| `--color-border-strong`     | `#6f7c6b`             | 3.91:1 on page ground                 |
| `--color-focus`             | `#15503b`             | light-surface focus ring              |
| `--color-focus-inverse`     | `#d8eaf1`             | new; dark-photo focus ring            |
| `--color-hero-scrim-strong` | `rgb(7 28 20 / 0.78)` | new; hero overlay bottom              |
| `--color-hero-scrim-soft`   | `rgb(7 28 20 / 0.22)` | new; hero overlay mid                 |

Primitive ramps were updated to match: forest brand ramp
(`#071c14`→`#f1f6ef`), sand 50/100/200 (`#f7f1e3`, `#efe7d6`, `#e3d8c3`),
ink, and water. Feedback colors are unchanged.

### Type

| Token            | Value                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `--font-body`    | `"BYekan", "Vazirmatn", "Noto Sans Arabic", "Segoe UI", system-ui, -apple-system, sans-serif` |
| `--font-display` | same                                                                                          |
| `--font-mono`    | `"JetBrains Mono", "SFMono-Regular", Consolas, monospace`                                     |
| Leading tight    | `1.15`                                                                                        |
| Leading snug     | `1.4`                                                                                         |
| Leading normal   | `1.72`                                                                                        |
| Display weight   | `700` (BYekan Bold); `font-synthesis-weight: none` prevents faux 800/900                      |

### Radii and shadows

| Token                 | Value                                                             |
| --------------------- | ----------------------------------------------------------------- |
| `--radius-lg` (card)  | `1.25rem`                                                         |
| `--radius-xl` (panel) | `1.75rem`                                                         |
| `--radius-2xl`        | `2rem`                                                            |
| `--radius-organic`    | `46% 54% 48% 52% / 54% 46% 54% 46%`                               |
| `--radius-pill`       | `9999px`                                                          |
| `--shadow-sm`         | `0 2px 10px rgb(11 29 22 / .06), 0 1px 2px rgb(11 29 22 / .04)`   |
| `--shadow-md`         | `0 16px 40px rgb(11 29 22 / .09), 0 3px 8px rgb(11 29 22 / .04)`  |
| `--shadow-lg`         | `0 30px 80px rgb(11 29 22 / .13), 0 8px 20px rgb(11 29 22 / .05)` |

`rounded-organic` is for non-interactive editorial photos/decorative shapes only;
never buttons, inputs, cards, or data UI.

### Motion

| Token                      | Value                            |
| -------------------------- | -------------------------------- |
| `--motion-duration-fast`   | `160ms`                          |
| `--motion-duration-base`   | `280ms`                          |
| `--motion-duration-slow`   | `420ms`                          |
| `--motion-duration-reveal` | `650ms`                          |
| `--motion-ease-out`        | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--motion-ease-in-out`     | `cubic-bezier(0.65, 0, 0.35, 1)` |
| Distances                  | `0.5rem` / `1rem` / `1.5rem`     |

## Font setup

`app/styles/fonts.css`:

```css
@font-face {
  font-family: "BYekan";
  src: url("/fonts/BYekan/BYekan.ttf") format("truetype");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "BYekan";
  src: url("/fonts/BYekan/BYekanBold.ttf") format("truetype");
  font-style: normal;
  font-weight: 700;
  font-display: swap;
}
```

- Imported from `app/app.css` before `@plugin`.
- Family is referenced only through `--font-body` / `--font-display`.
- Fallbacks: Vazirmatn, Noto Sans Arabic, Segoe UI, system UI.
- No external Google Fonts or CDN.
- BYekan files are the migrated originals (224K regular, 241K bold).
- Browser check: both faces returned HTTP 200, `document.fonts.check` true for
  400 and 700, and the computed body/heading family resolves to BYekan on `/fa`,
  `/en`, and `/design-lab`.

## Hero art direction

Full brief is in `docs/design-system.md`; summary:

- **Desktop:** landscape 2000×1499, full-bleed, `min-height:
clamp(34rem, 78svh, 46rem)`, `object-position: 50% 58%`, text in the lower
  third at logical start.
- **Mobile:** portrait 1200×1800, `min-height: 86svh`,
  `object-position: 50% 50%`, text below the tree line, not over the bright sky
  or sunlit mountains. The portrait fills height and crops sides, so vertical
  object-position is a no-op; adjust hero height or scrim instead.
- **Picture sources:** desktop WebP then JPEG; mobile portrait WebP then JPEG
  fallback; explicit dimensions, `fetchPriority="high"`, `loading="eager"`,
  `decoding="async"`, meaningful alt text.
- **Overlay:** bottom-weighted forest scrim using
  `--color-hero-scrim-strong`/`--color-hero-scrim-soft`; side-weighted scrims
  must mirror in RTL. Test white text against the actual brightest area it
  covers.
- **Copy:** eyebrow, one `<h1>`, two-line description, two CTAs. No stats, app
  mock, feature list, or dashboard cards.
- **CTA hierarchy:** warm paper primary (`bg-surface text-brand-strong`), white
  outline secondary; 44px minimum; `outline-focus-inverse` on the photo.
- **Preload:** preload one matching WebP via the home route `links` with the same
  breakpoint media query. Do not preload both crops.
- **Relationship:** one full-bleed photo only. Cream/paper sections below, at
  most one secondary editorial field/team photo. No dark full-bleed section, no
  lime, no ticker.

A temporary comp using the real landscape/portrait assets was checked at 1440
and 390 widths: the desktop crop keeps the rows and horizon with text over the
field; the mobile 86svh hero keeps the eyebrow below the mountains on the darker
tree line. The production hero is still for the homepage implementer.

## Contrast verification

WCAG relative-luminance checks:

- Text on page ground 14.51; muted on page ground 5.88; muted on muted surface
  5.38.
- White on brand 9.36; brand-strong on brand-soft 12.14; water on water tint
  5.39.
- Accent on page ground 5.04; accent on muted surface 4.61.
- Border-strong on page ground 3.91; focus on page ground 8.31.
- White on the strong hero scrim over white 8.79; focus-inverse on the strong
  scrim over white 7.10.

## Verification

- `pnpm typecheck` — pass.
- `pnpm lint` — pass.
- `pnpm build` — pass. Built CSS includes the two BYekan `@font-face` rules and
  the locked token values.
- Targeted axe-core (Playwright with system Chrome) on `/fa`, `/en`, and
  `/design-lab` at 1440 and 360 widths: **0 violations** each. No console errors.
- No horizontal overflow at 360 on all three pages.
- Root token check: `--color-brand: #15503b`, `--color-bg: #f7f1e3`,
  `--color-focus-inverse: #d8eaf1`, hero scrim resolves.
- BYekan loaded on `/fa`, `/en`, and `/design-lab`; mixed Persian/English
  rendering checked visually on desktop and mobile placeholder pages.
- Hero comp crop/overlay checked against the real assets (not production markup).
- Not run: full E2E/a11y/SEO suites, unit tests, or the full `pnpm check` (blog
  work is still in parallel).

## Remaining gaps / drift

1. `app/root.tsx` still hardcodes `theme-color` `#fbf9f3`, and
   `public/site.webmanifest` still uses the old `#fbf9f3`. Update both to
   `#f7f1e3`; this is an orchestrator follow-up because root/manifest were outside
   this design change.
2. Blog SVG illustrations still contain the old palette hex values. Content/asset
   refresh is a content-strategist follow-up.
3. `app/routes/home.tsx` is still the placeholder dashboard hero with raw gradient
   hexes. The homepage implementer must replace it with the farmland `<picture>`
   hero and the locked section rhythm; do not copy the old app-mock treatment.
4. The hero is not implemented in production yet. `--color-focus-inverse` and
   `--color-hero-scrim-*` are ready for it. Shared `Button` hardcodes
   `outline-focus`; the hero needs a className override or a dedicated hero
   variant for `outline-focus-inverse`.
5. BYekan is TTF-only. WOFF2 conversion and a regular-weight preload are
   performance follow-ups; no font swap is required now.
6. The design lab's direction previews remain historical and now inherit BYekan;
   their type notes mention the old Vazirmatn/800–900 assumptions. Do not use
   those weights in new production work; use 700.
7. `--radius-organic`, `--color-focus-inverse`, and the hero scrim tokens are
   mapped but not yet used by a production component. The homepage/team sections
   are the first consumers.
8. `theme-color`, manifest, and blog SVGs are the only known old-palette leaks
   outside the homepage placeholder.

## Next step

The homepage implementer builds the farmland `<picture>` hero, CTA hierarchy,
and the locked cream/paper sections. The orchestrator updates `theme-color` and
the web manifest. The quality pass should run axe on `/fa`, `/en`, the blog, and
the new hero at 360/1440, plus a reduced-motion check.
