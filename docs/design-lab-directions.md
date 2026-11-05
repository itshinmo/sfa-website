# Design lab — identity directions

- **Status:** historical — the 2026-11-02 hybrid was superseded for palette and
  typography by [ADR-009](../decisions/ADR-009-app-aligned-identity.md)
- **Chosen:** 2026-11-02
- **Task:** M1-1
- **Date:** 2026-11-02
- **Route:** `/design-lab` (internal, `noindex, nofollow`, production-gated by
  `DESIGN_LAB=1`)
- **Scope:** marketing identity only. The Flutter app UI is not the reference.

> **Decision (2026-11-02):** The author chose a deliberate hybrid of 01 Field
> Notes and 02 Rooted: 01's editorial credibility, forest/cream/water palette,
> and precise data treatment, with 02's warmth, softer surfaces, generous
> spacing, human moments, and organic shape language. Light mode only; BYekan
> typography; full-bleed farmland hero. 03 Signal/dashboard aesthetics are not
> used. See [ADR-008](../decisions/ADR-008-brand-direction.md). Production
> tokens now implement the hybrid; the previews below remain a historical record
> of the three proposals and their scoped palettes are not the locked production
> values.

> **Production update (2026-11-05):** the website moved to the app-aligned
> identity ([ADR-009](../decisions/ADR-009-app-aligned-identity.md)). The hybrid
> below and the three previews remain the historical record; the previews keep
> their scoped palettes and are not the production tokens.

The lab presents three token-driven identity directions using the same content
and the same shared primitives. Only the palette, type treatment, surface
language, and motion feel change. The three previews are retained as proposal
history; production now uses the app-aligned identity.

## How to review

1. Run `pnpm dev` and open `http://127.0.0.1:3000/design-lab`.
2. Scan the comparison cards at the top, then open each direction.
3. View at 360 px, 768 px, and 1440 px. Check both LTR chrome and RTL samples.
4. Tab through the CTA links and the motion replay button. Check focus visibility.
5. Enable `prefers-reduced-motion: reduce` and confirm the motion sample stays
   static and all content remains visible.
6. Check the direction's palette, type specimen, hero, surface, and motion notes.

The lab main is marked `lang="en" dir="ltr"` so the internal review page is
stable. Persian specimens and RTL samples explicitly set `lang="fa" dir="rtl"`.

## The three directions

| #   | Concept         | Category            | Character                      | Best for                                                      | Main trade-off                                                         |
| --- | --------------- | ------------------- | ------------------------------ | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 01  | **Field Notes** | Scientific agritech | Precise · editorial · credible | Research, partners, grants, technical blog, credibility layer | Can read cold or academic; needs documentary photography and warmth    |
| 02  | **Rooted**      | Organic modern      | Calm · tactile · human         | Growers, team, fields, photography-led homepage               | Risks generic eco-branding; softness can hide the product              |
| 03  | **Signal**      | Bold product        | Loud · kinetic · product-first | Launch campaigns, download conversion, social/video           | Energy can overpower research credibility; needs a calm long-form mode |

The type tables below record the proposal-time fallback (Vazirmatn stack).
BYekan was the production family from ADR-008 until ADR-009 replaced it with
Vazirmatn + Inter. See [`docs/design-system.md`](./design-system.md) and
[ADR-009](../decisions/ADR-009-app-aligned-identity.md).

**Designer recommendation at proposal time (superseded by the author's
decision):** 01 as the base for a research-led site, borrowing 03's hero energy
only after the base was locked. The author instead chose a deliberate 01 + 02
hybrid and rejected 03.

---

## 01 · Field Notes — scientific agritech

Deep forest green, warm cream, water blue, precise editorial/data feel. The
surface is paper-like, the layout is ruled and measured, and data is treated as
a first-class visual. Sharp small radii and mono labels make SFA feel like an
instrument, not a generic startup.

### Palette

| Role          | Value     | Semantic mapping                     |
| ------------- | --------- | ------------------------------------ |
| Page ground   | `#F7F2E6` | `--color-bg`                         |
| Surface       | `#FFFCF4` | `--color-surface`                    |
| Muted surface | `#EFEADC` | `--color-surface-muted`              |
| Text          | `#13231C` | `--color-text`                       |
| Muted text    | `#4E6157` | `--color-text-muted`                 |
| Brand         | `#15503B` | `--color-brand`                      |
| Brand strong  | `#0B2B21` | `--color-brand-strong`, hero         |
| Brand soft    | `#DCE9DE` | `--color-brand-soft`                 |
| Accent        | `#3C7A5B` | `--color-accent`                     |
| Water         | `#1D6380` | `--color-water`, `--color-water-700` |
| Water tint    | `#D8EAF1` | `--color-water-100`                  |
| Border        | `#D9DCCF` | `--color-border`                     |
| Border strong | `#6F8076` | `--color-border-strong`              |
| Focus         | `#15503B` | `--color-focus`                      |

### Type, shape, motion

| Property    | Direction                                                           |
| ----------- | ------------------------------------------------------------------- |
| Family      | Current self-hosted family (Vazirmatn stack); no new font added     |
| Display     | 800 weight, Latin `-0.03em`, Persian `-0.015em`, `1.08` line height |
| Body        | 400 weight, `1.7` line height, `--text-sm`/`--text-base`            |
| Data labels | Mono, uppercase, wide tracking                                      |
| Radii       | `--radius-card: 0.5rem`, `--radius-panel: 0.5rem`, pill `0.375rem`  |
| Shadow      | Hairline: `0 1px 2px rgb(11 43 33 / 0.06)`                          |
| Hero        | Deep forest panel, grid overlay, cream data panel                   |
| Motion      | 150–250 ms, out-expo, 8–12 px; one count-up; no bounce              |

**Rationale:** precision is the promise. Hairlines, mono labels, water-blue
data, and a forest field make the product feel trustworthy and measurable; the
cream ground keeps it editorial rather than clinical.

**Best fit:** research pages, partner and grant audiences, technical blog posts,
and the credibility layer of the homepage.

**Watch out:** can read cold or academic. It needs documentary field photography,
warm microcopy, and at least one human moment.

---

## 02 · Rooted — organic modern

Earthy greens and sand, soft organic shapes, photography-led, calm. The hero is
light and warm; a large organic photo slot carries the emotional weight. Data is
a quiet overlay. This direction lowers the barrier for growers who are wary of
"smart" tools.

### Palette

| Role          | Value     | Semantic mapping                     |
| ------------- | --------- | ------------------------------------ |
| Page ground   | `#F3ECDD` | `--color-bg`                         |
| Surface       | `#FBF7EE` | `--color-surface`                    |
| Muted surface | `#E7DBC5` | `--color-surface-muted`              |
| Text          | `#26352A` | `--color-text`                       |
| Muted text    | `#566150` | `--color-text-muted`                 |
| Brand         | `#3F5A3C` | `--color-brand`                      |
| Brand strong  | `#2E4632` | `--color-brand-strong`               |
| Brand soft    | `#E1E7D5` | `--color-brand-soft`                 |
| Accent        | `#6D7F4E` | `--color-accent`                     |
| Water         | `#3E6257` | `--color-water`, `--color-water-700` |
| Water tint    | `#DFE9E2` | `--color-water-100`                  |
| Border        | `#D9CEB9` | `--color-border`                     |
| Border strong | `#82745C` | `--color-border-strong`              |
| Focus         | `#2E4632` | `--color-focus`                      |
| Earth support | `#B97A5E` | Palette only; non-interactive        |

### Type, shape, motion

| Property | Direction                                                                |
| -------- | ------------------------------------------------------------------------ |
| Family   | Current self-hosted family (Vazirmatn stack); no new font added          |
| Display  | 600 weight, `0em` Latin and Persian tracking, `1.2` line height          |
| Body     | 400 weight, `1.8` line height, `--text-base`/`--text-lg`                 |
| Labels   | Mono only for small labels; no mono in reading copy                      |
| Radii    | `--radius-card: 1.25rem`, `--radius-panel: 2rem`, pill `9999px`          |
| Shadow   | Soft: `0 18px 40px rgb(63 90 60 / 0.08), 0 2px 6px rgb(63 90 60 / 0.05)` |
| Hero     | Warm sand panel, organic photo blob, floating soil-health chip           |
| Motion   | 450–700 ms, out-expo, 16–24 px; gentle fade + rise; hover ≤2 px          |

**Rationale:** the brand feels grown, not built. Sand and olive, generous radii,
and a photography-first hero lower the barrier for growers who are wary of
"smart" tools. Data stays a quiet overlay, never the protagonist.

**Best fit:** the human story — growers, fields, team, and a photography-led
homepage that has to feel local and calm.

**Watch out:** risks generic eco-branding. It depends on distinctive photography
and strict restraint; softness can hide the product.

---

## 03 · Signal — bold product

Dark, high-contrast surfaces, large type, lime/fresh accent, kinetic
product-launch feel. Near-black panels, lime CTAs, oversized numerals, and a
static ticker create momentum. This is the direction most likely to turn a scroll
into a download.

### Palette

| Role           | Value     | Semantic mapping           |
| -------------- | --------- | -------------------------- |
| Page ground    | `#080A09` | `--color-bg`               |
| Surface        | `#141816` | `--color-surface`          |
| Raised surface | `#1D2320` | `--color-surface-raised`   |
| Muted surface  | `#111513` | `--color-surface-muted`    |
| Text           | `#F3F6EF` | `--color-text`             |
| Muted text     | `#A7B0A6` | `--color-text-muted`       |
| Brand          | `#1F5C3C` | `--color-brand`            |
| Brand strong   | `#0E2419` | `--color-brand-strong`     |
| Brand soft     | `#E4F6C4` | `--color-brand-soft`       |
| Accent (lime)  | `#C9F56A` | `--color-accent`, CTA      |
| Accent hover   | `#DFFF9E` | `--color-focus`, CTA hover |
| Fresh signal   | `#58E08A` | `--color-water`            |
| Water tint     | `#13251C` | `--color-water-100`        |
| Border         | `#2A302C` | `--color-border`           |
| Border strong  | `#6B7A70` | `--color-border-strong`    |
| Focus          | `#DFFF9E` | `--color-focus`            |

### Type, shape, motion

| Property | Direction                                                           |
| -------- | ------------------------------------------------------------------- |
| Family   | Current self-hosted family (Vazirmatn stack); no new font added     |
| Display  | 900 weight, Latin `-0.045em`, Persian `-0.02em`, `0.95` line height |
| Body     | 400 weight, `1.6` line height, `--text-base`/`--text-lg`            |
| Labels   | Mono, uppercase, wide tracking; tabular numerals for stats          |
| Radii    | `--radius-card: 0.75rem`, `--radius-panel: 1rem`, pill `0.5rem`     |
| Shadow   | Deep: `0 10px 30px rgb(0 0 0 / 0.35)`                               |
| Hero     | Near-black panel, lime glow, product-signal panel, static ticker    |
| Motion   | 150–300 ms, out-expo/in-out, 8–16 px; staggered entrance            |

**Rationale:** the product is the hero. Near-black surfaces, oversized type, and
a lime signal create launch energy and make the app feel like a tool with
momentum.

**Best fit:** launch campaigns, app-download sections, social and video, and a
homepage that leads with the product.

**Watch out:** energy can overpower research credibility. It needs a calm
long-form mode and extra contrast checks. Persian display tracking is softened
to `-0.02em`; verify it again with the final font and weights. A production
marquee must pause on hover, focus, and reduced motion.

---

## Token mapping notes

The scoped preview wrappers remap the **semantic** production variables
(`--color-bg`, `--color-surface`, `--color-text`, `--color-brand`,
`--color-water`, `--color-focus`, `--radius-*`, `--shadow-*`, `--leading-*`) and
the direct palette variables used by shared primitives (`--color-brand-100`,
`--color-brand-300`, `--color-brand-950`, `--color-water-100`,
`--color-water-700`). This lets `Button`, `Card`, and `Badge` adopt each
direction without rewriting them.

Why direct variables are remapped: custom properties that contain `var()`
resolve at the element where they are declared (`:root`). Redefining only
`--color-brand-700` inside a preview does **not** change `--color-brand`, because
`--color-brand` already resolved on `:root`. The preview therefore sets the
semantic variables directly.

Preview-only variables carry the `--lab-` prefix:

| Variable family                  | Purpose                                                            |
| -------------------------------- | ------------------------------------------------------------------ |
| `--lab-hero-*`                   | Hero background, foreground, muted, border, accent, focus override |
| `--lab-panel-*`                  | Data/product panel surface, text, muted, track                     |
| `--lab-cta-*`                    | Preview CTA background, foreground, hover, ghost                   |
| `--lab-motion-*`                 | Preview animation duration, easing, distance, accent               |
| `--lab-photo-*`                  | Organic photo-slot gradient and texture                            |
| `--lab-glow-*`, `--lab-scanline` | Bold product atmosphere                                            |

## Accessibility checks

Contrast ratios were calculated with the WCAG relative-luminance formula. All
normal-text pairs pass AA (≥ 4.5:1); large text and UI boundaries pass 3:1.

| Pair                            | 01 Field Notes | 02 Rooted | 03 Signal |
| ------------------------------- | -------------- | --------- | --------- |
| Text on page ground             | 14.63          | 10.99     | 18.19     |
| Muted text on page ground       | 5.93           | 5.54      | 8.89      |
| White text on brand             | 9.36           | 7.67      | 7.91      |
| Brand-strong text on brand-soft | 12.12          | 8.14      | 14.22     |
| Water text on water tint        | 5.39           | 5.47      | 11.25     |
| Hero text on hero ground        | 13.60          | 9.24      | 15.84     |
| Hero muted text on hero ground  | 8.94           | 7.36      | 8.89      |
| Focus ring on page ground       | 8.38           | 8.76      | 17.90     |
| Border-strong on page ground    | 3.74           | 3.88      | 4.39      |

- Hero focus rings are tuned to the hero ground: 01 and 03 use a light tone on
  dark grounds; 02 keeps the dark focus token on the sand ground.
- Swatches have visible name, hex, and role text; colour is not the only meaning.
- The motion sample is click-to-play, has no autoplay, and its CSS animation is
  disabled under `prefers-reduced-motion: reduce`. The final state is visible
  without animation.
- The lab has one `<main id="main-content">`, sequential headings, real links and
  buttons, visible focus, and no keyboard traps.
- Hero focus rings were checked by keyboard: 01 uses `#9BC9D6` on the forest
  ground, 02 keeps `#2E4632` on the sand ground, and 03 uses `#DFFF9E` on the
  near-black ground. The ring stays visible in each case.
- Jump links, hero CTAs, and the motion replay button are at least 44 px tall.
- The motion sample and hero animations are preview-only. They do not add
  production motion primitives or change `docs/motion.md`.

## Decision record

1. **Direction:** deliberate hybrid of 01 Field Notes + 02 Rooted. 03 Signal is
   rejected. Recorded in ADR-008; superseded by ADR-009 on 2026-11-05.
2. **Type:** BYekan, self-hosted from the migrated original repo files
   (`BYekan.ttf`, `BYekanBold.ttf`) with `font-display: swap`. The family stayed
   behind `--font-body` / `--font-display`; ADR-009 replaced it with Vazirmatn +
   Inter.
3. **Photography:** the migrated farmland hero assets are approved for the hero.
   Team/partner/app-screen assets remain content-migration work.
4. **Light/dark scope:** light mode only for v1. No dark theme.
5. **Production (at the time):** `app/styles/tokens.css`, the font wiring, and
   the design docs implemented the hybrid. The homepage implementer built
   against those tokens; the lab remains historical reference. ADR-009 later
   replaced the palette and type.

## Verification

- `pnpm typecheck` — pass.
- `pnpm lint` — pass.
- Manual review target: 360 px, 768 px, 1440 px; keyboard tab order; focus
  visibility; reduced motion; both LTR chrome and RTL specimens.
- Targeted axe-core check on `/design-lab` at 1440 px and 360 px: 0 violations.
  One `color-contrast` result is marked incomplete because the hero uses
  gradient/pseudo-element backgrounds; the manual ratios above pass.
- No horizontal overflow at 360 px (`scrollWidth === clientWidth`).
- At proposal time, the root resolved the old `--color-brand: #1d6548` and
  `--color-bg: #fbf9f3`; the scoped previews resolved their own values. After
  the author's decision, the root is intentionally replaced by the locked hybrid
  tokens (`--color-brand: #15503b`, `--color-bg: #f7f1e3`).
- Motion check: no animation before the button is pressed; the 450 ms scientific
  sample plays after click; reduced motion renders `animation-name: none` and
  keeps the sample visible.
- `pnpm build` — pass; the route stylesheet is emitted as
  `build/client/assets/design-lab-*.css`.
- Not run in this change: the full Playwright E2E/a11y/SEO suites (the blog
  agent is editing in parallel).

## Files

- `app/routes/design-lab.tsx` — directions, comparison, preview components;
  status banner records the chosen hybrid.
- `app/styles/design-lab-previews.css` — scoped preview styles and keyframes.
- `docs/design-lab-directions.md` — this document, marked chosen.
- `.ai/memories/working/sfa-website/handoffs/designer-identity.md` — original
  proposal handoff.
- `.ai/memories/working/sfa-website/handoffs/designer-locked-identity.md` —
  lock handoff with final tokens, fonts, and hero brief.

The original proposal change did not modify production tokens or shared
components. The follow-up lock change intentionally updates
`app/styles/tokens.css`, `app/styles/fonts.css`, `app/app.css`, this document,
`docs/design-system.md`, `docs/motion.md`, and ADR-008.
