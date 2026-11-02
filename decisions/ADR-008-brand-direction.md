# ADR-008 — Brand direction: Field Notes × Rooted hybrid

- **Status:** Accepted
- **Date:** 2026-11-02
- **Topic:** design
- **RFC:** direct author decision after the `/design-lab` review

## Context

The marketing site needed a new identity separate from the Flutter app. The
design lab proposed three directions:

1. **Field Notes** — scientific agritech: deep forest green, warm cream, water
   blue, precise editorial/data treatment, research-led hierarchy.
2. **Rooted** — organic modern: earthy greens and sand, soft organic shapes,
   photography-led, calm and human.
3. **Signal** — bold product: near-black surfaces, oversized type, lime accent,
   kinetic product-launch feel.

The audience is farmers, not developers. The author wants a warm, clear, credible
site that shows only what a client needs before downloading the app. The app is
changing, so the identity must stay token-driven and easy to swap.

The author also supplied migrated assets: a full-bleed farmland hero photo
(landscape and portrait) and the original BYekan font files.

## Decision

Adopt a **deliberate hybrid of 01 Field Notes and 02 Rooted**. Do not use 03
Signal or its dashboard aesthetics.

### From 01 Field Notes

- Forest/cream/water palette and a deep green brand anchor.
- Editorial credibility and a research-led hierarchy.
- Precise data treatment: water-blue data accents, restrained mono labels, clear
  figures, no decorative chart noise.
- Light surfaces with high-contrast type.

### From 02 Rooted

- Warm cream/sand ground and paper surfaces instead of clinical white.
- Softer card/panel radii, warm shadows, and generous vertical rhythm.
- Human/team moments and a photography-led hero.
- Organic shape language, limited to editorial photography and decorative
  shapes; never controls or data UI.

### Explicitly rejected

- 03 Signal's near-black page surfaces, lime accent, ticker, oversized
  product-launch type, and dashboard density.
- A dark theme in v1. The site is **light mode only**. The forest hero scrim is
  a photo treatment, not dark mode.
- Dashboard-style hero content, floating metrics, or app mocks. The hero is a
  full-bleed farmland photograph with one clear message and two CTAs.

### Typography

Use the migrated original repo font **BYekan**, self-hosted as
`BYekan.ttf` (400) and `BYekanBold.ttf` (700), with `font-display: swap`.
`--font-body` and `--font-display` point to BYekan with a fallback stack. The
family stays behind tokens so the author can swap it later. No external font
CDN. Display weight is 700; `font-synthesis-weight: none` prevents faux bold.

### Hero

Use the migrated farmland photo as the single full-bleed photographic moment:

- landscape `hero-landscape.webp/.jpg` (2000×1499) at ≥ 768px;
- portrait `hero-portrait.webp/.jpg` (1200×1800) below 768px;
- `<picture>` with WebP first and JPEG fallback, explicit dimensions,
  `fetchPriority="high"`, `loading="eager"`, `decoding="async"`;
- a bottom-weighted forest scrim using `--color-hero-scrim-strong` /
  `--color-hero-scrim-soft`, with white copy in the lower third at logical
  start;
- warm-paper primary CTA and white outline secondary CTA, both ≥ 44px;
- `--color-focus-inverse` focus ring on the photo;
- preload one matching WebP via the home route links, keyed to the same media
  query.

The photo is the only full-bleed image. The rest of the page stays calm and
cream/paper, with at most one secondary editorial field/team photo.

## Consequences

- Production tokens in `app/styles/tokens.css` now lock the hybrid palette,
  radii, shadows, type, and motion.
- `app/styles/fonts.css` and the font-token wiring are part of the design system.
- The design lab remains as a historical record of 01/02/03; its scoped
  previews are not the production values.
- The homepage implementer can build against the locked tokens without another
  identity decision.
- 03 assets or patterns must not leak into production without a new ADR.
- BYekan is TTF only. WOFF2 conversion and a font preload are follow-ups, not
  reasons to change the family.
- The document theme colour and web manifest still need to be updated from the
  old `#fbf9f3` to the new `#f7f1e3`; this is an orchestrator follow-up outside
  the design-token change.
- Blog illustrations that still use the old palette are content/asset follow-ups.
- The author will revisit the font later; only `fonts.css` and the two font
  tokens should need to change.
- A future dark theme would be a new ADR, not an extension of this one.
