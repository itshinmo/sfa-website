# Designer — Identity directions

- **Status:** needs-review (deliverable complete; awaiting author decision)
- **Date:** 2026-11-02
- **Task id:** M1-1

## Changed files

- `app/routes/design-lab.tsx` — three directions, comparison summary, scoped
  preview components, decision panel.
- `app/styles/design-lab-previews.css` — new scoped preview stylesheet and
  click-to-play motion keyframes.
- `docs/design-lab-directions.md` — new full direction brief, palette/token
  tables, rationale, accessibility notes, and author decision checklist.
- `.ai/memories/working/sfa-website/handoffs/designer-identity.md` — this
  handoff.

Not modified: `app/styles/tokens.css`, `app/app.css`, `app/routes.ts`, other
routes, shared components, locale files, blog files, `package.json`, or the
lockfile.

## What was implemented

The internal `/design-lab` route now presents three distinct identity
directions. Each one has:

- a scoped theme wrapper using local CSS variables;
- palette swatches with name, hex, and role;
- a Persian + English type specimen and tracking note;
- a hero sample with Persian headline and working Persian CTAs;
- a card/surface sample using shared `Card`/`Badge` primitives;
- a click-to-play motion sample plus duration/easing/distance notes;
- a rationale, best-fit, and watch-out strip.

The page also has a comparison summary at the top, anchor navigation, and an
author decision panel at the bottom. The existing loader gate and
`noindex, nofollow` metadata are unchanged.

### Directions

| #   | Concept         | Category            | Character                      | Best fit                                                      | Main trade-off                                                         |
| --- | --------------- | ------------------- | ------------------------------ | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 01  | **Field Notes** | Scientific agritech | Precise · editorial · credible | Research, partners, grants, technical blog, credibility layer | Can read cold or academic; needs documentary photography and warmth    |
| 02  | **Rooted**      | Organic modern      | Calm · tactile · human         | Growers, team, fields, photography-led homepage               | Risks generic eco-branding; softness can hide the product              |
| 03  | **Signal**      | Bold product        | Loud · kinetic · product-first | Launch campaigns, download conversion, social/video           | Energy can overpower research credibility; needs a calm long-form mode |

**Designer recommendation (not a decision):** 01 as the base for a research-led
site, borrowing 03's hero energy only after the base is locked. 02 is strongest
if the site must lead with human, local storytelling and the photography budget
exists.

### Token summary

| Token                   | 01 Field Notes                        | 02 Rooted                      | 03 Signal                             |
| ----------------------- | ------------------------------------- | ------------------------------ | ------------------------------------- |
| `--color-bg`            | `#F7F2E6` cream                       | `#F3ECDD` sand                 | `#080A09` ink                         |
| `--color-surface`       | `#FFFCF4` paper                       | `#FBF7EE` paper                | `#141816` graphite                    |
| `--color-surface-muted` | `#EFEADC`                             | `#E7DBC5`                      | `#111513`                             |
| `--color-text`          | `#13231C`                             | `#26352A`                      | `#F3F6EF` bone                        |
| `--color-text-muted`    | `#4E6157`                             | `#566150`                      | `#A7B0A6`                             |
| `--color-brand`         | `#15503B` forest                      | `#3F5A3C` olive                | `#1F5C3C` deep green                  |
| `--color-brand-strong`  | `#0B2B21`                             | `#2E4632`                      | `#0E2419`                             |
| `--color-brand-soft`    | `#DCE9DE`                             | `#E1E7D5`                      | `#E4F6C4` pale lime                   |
| `--color-accent`        | `#3C7A5B` moss                        | `#6D7F4E` olive                | `#C9F56A` lime                        |
| `--color-water`         | `#1D6380` water blue                  | `#3E6257` eucalyptus           | `#58E08A` fresh green                 |
| `--color-focus`         | `#15503B`                             | `#2E4632`                      | `#DFFF9E`                             |
| `--radius-panel`        | `0.5rem`                              | `2rem`                         | `1rem`                                |
| Display                 | 800 / Latin −0.03em, Persian −0.015em | 600 / 0em                      | 900 / Latin −0.045em, Persian −0.02em |
| Motion                  | 150–250 ms, out-expo, 8–12 px         | 450–700 ms, out-expo, 16–24 px | 150–300 ms, out-expo/in-out, 8–16 px  |

Full palette tables, semantic mappings, and the complete rationale are in
`docs/design-lab-directions.md`.

### Implementation notes

- The scoped wrappers remap the **semantic** production variables directly
  (`--color-bg`, `--color-surface`, `--color-brand`, `--color-water`,
  `--color-focus`, `--radius-*`, `--shadow-*`, `--leading-*`) plus the direct
  palette variables used by shared primitives. `Button`, `Card`, and `Badge`
  therefore adopt each direction without being rewritten.
- Redefining only primitives such as `--color-brand-700` would not work, because
  `--color-brand` resolves at `:root`; the preview sets the semantic variables
  directly.
- Raw hex values live only in the preview data in `design-lab.tsx`. The preview
  stylesheet is fully scoped under `.lab-preview` and uses variables.
- The lab chrome is English LTR (`main lang="en" dir="ltr"`); the samples set
  Persian RTL explicitly. This keeps the internal review page stable while
  showing the real RTL hero layout.
- Persian display tracking is separated from Latin tracking (01 −0.015em, 02
  0em, 03 −0.02em) because the tight Latin display setting is not appropriate
  for Persian.
- The motion sample starts static, plays only on button activation, and uses a
  lab-local CSS keyframe. There is no autoplay. `prefers-reduced-motion: reduce`
  disables the animation and leaves the final state visible.
- Hero focus colours are overridden per hero ground: `#9BC9D6` for 01,
  `#2E4632` for 02's sand hero, and `#DFFF9E` for 03.

## Verification

- `pnpm typecheck` — pass.
- `pnpm lint` — pass.
- `pnpm exec prettier --write` on the changed files — clean.
- Targeted axe-core check on `/design-lab` at 1440 px and 360 px using system
  Chrome: **0 violations**. One `color-contrast` result is marked incomplete
  because the hero uses gradient/pseudo-element backgrounds; manual WCAG ratios
  pass (see docs).
- No horizontal overflow at 360 px (`scrollWidth === clientWidth`).
- Keyboard focus: hero CTA focus ring is visible; 01 resolves `#9BC9D6`, 02
  `#2E4632`, 03 `#DFFF9E`. Light-section focus tokens remain dark.
- Motion: no animation before activation; clicking each sample starts the
  direction-specific duration (450 ms / 700 ms / 300 ms). Reduced motion renders
  `animation-name: none`, opacity 1, final state visible.
- Scoped-token check: root still resolves `--color-brand: #1d6548` and
  `--color-bg: #fbf9f3`; each preview resolves its own values.
- Contrast pairs checked: text 14.63/10.99/18.19, muted 5.93/5.54/8.89, white on
  brand 9.36/7.67/7.91, focus 8.38/8.76/17.90.
- `pnpm build` — pass. The scoped stylesheet is emitted as
  `build/client/assets/design-lab-*.css`.
- Not run: full Playwright E2E/a11y/SEO suites (blog agent editing in parallel).

## Open questions / drift

1. **This is the author decision.** Choose 01, 02, or 03 — or a deliberate hybrid
   with named parts. Do not blend by default.
2. **Type:** stay with the current Vazirmatn stack (confirm weights to
   load/subset) or commission/license a display face. The lab adds no font files.
3. **Photography:** confirm field, team, partner, and app-screen assets.
   Direction 02 is photography-dependent; 01 needs documentary field imagery; 03
   needs product screens.
4. **Dark scope:** Direction 03 is dark-first. Confirm whether the public site
   needs a light variant.
5. `docs/design-system.md`, `app/styles/tokens.css`, and an ADR are intentionally
   not updated until the author chooses. After sign-off, lock the tokens and
   update those docs in the same change.
6. The lab chrome is hardcoded English because it is internal and not
   locale-prefixed. If it ever becomes public, extract the strings into locale
   files and add the missing `designLab` namespace.
7. Production motion primitives (`Reveal`, `Stagger`, `CountUp`, `Marquee`) are
   still pending; this change only adds a lab-local motion sample.
8. The one incomplete axe contrast result is caused by gradient/pseudo-element
   backgrounds. Manual ratios pass; no action needed unless the hero treatment
   changes.

## Next step

The author reviews `/design-lab`, chooses a direction or named hybrid, and
confirms the type/photography/dark-mode questions. Then the designer updates
`tokens.css`, `docs/design-system.md`, and an ADR; the implementer builds the
homepage and blog against the locked tokens. The quality pass should add an axe
check for `/design-lab`.
