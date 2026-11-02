# Content Strategist — Homepage content + asset migration

- **Status:** needs-review
- **Date:** 2026-11-02
- **Task id:** M2-1 (content model + copy) / M4-2 (real assets)

## Changed files

Created:

- `content/home/fa.json` — full Persian homepage content.
- `content/home/en.json` — idiomatic English adaptation.
- `public/images/brand/sfa-512x512.png`
- `public/images/team/{Mahdi,Arash,Hossein,Mohsen,Kamyar,Soheil}.png`
- `public/images/partners/{srbiau,swri}.png`
- `.ai/memories/working/sfa-website/handoffs/content-strategist-migration.md`

Updated:

- `docs/content-migration.md` — source inventory, migration table, asset
  inventory, content schema, copy decisions, author questions, verification.
- `content/README.md` — refreshed from the M0 placeholder note to describe the
  new homepage files, schema location, and blog boundary.

Not changed: `app/**`, `app/locales/**`, tokens, routes, tests, `package.json`,
lockfile, `tasks.md`, `questions.md`. Nothing staged, committed, or pushed.

## What was implemented

- Inventoried the old `itshinmo/sfa-solutions` repo at commit
  `c0a0b34701f35f577c63b8ce418b8df1ca01e242`.
- Migrated verified factual material only: 6 team members, 4 achievements, 4
  research numbers, 4 product features, 2 partners, contact details, and
  download status.
- Rewrote the homepage narrative for the new identity; Persian written first and
  English adapted rather than translated literally.
- Copied real assets into the allowed directories and verified them by SHA-256.
- Drafted six FAQ answers from verified product facts. The old site had no FAQ.
- Proposed a `HomeContent` shape in `docs/content-migration.md` for the
  homepage implementer. The JSON files are the source of truth; no runtime
  schema was added because `content/**` is outside the app.
- Kept `content/site/team.json`, `achievements.json`, and `partners.json` out of
  v1: the homepage is the only consumer, so splitting would add join logic
  without removing duplication. The docs explain how to extract them later with
  the same stable IDs.

## Migration summary

| Content               | Old source                             | New destination                             | Treatment                                  |
| --------------------- | -------------------------------------- | ------------------------------------------- | ------------------------------------------ |
| Logo                  | `src/assets/sfa-512x512.png`           | `public/images/brand/sfa-512x512.png`       | Copy                                       |
| Team photos (6)       | `src/assets/team/*.png`                | `public/images/team/*.png`                  | Copy                                       |
| Team names/roles/bios | `team-section.json`                    | `content/home/*.json` → `team.members`      | Migrate + light rewrite                    |
| Team profile links    | `TeamSection.tsx`                      | `team.members[].links`                      | Migrate public profiles; clean UTM         |
| Team emails           | `TeamSection.tsx`                      | —                                           | Omit pending consent                       |
| Partner logos/names   | `Footer.tsx`, `srbiau.png`, `swri.png` | `public/images/partners/`, `partners.items` | Copy + migrate                             |
| Research stats        | `ResearchSection.tsx`                  | `research.stats`                            | Migrate numbers; verify                    |
| Achievements (4)      | `achievement-section.json`             | `achievements.items`                        | Migrate; no years invented                 |
| Product features      | `sfa-section.json`                     | `features.items`                            | Rewrite from facts                         |
| How it works          | `sfa-section.json`                     | `showcase.steps`                            | 3 model-level steps, no invented UI flow   |
| Hero copy             | `common.json`, `HeroSection.tsx`       | `hero`                                      | Rewrite                                    |
| Contact               | current `site.ts` + old `footer.json`  | `contact`                                   | Email from code; phone omitted             |
| Downloads             | current `site.ts`                      | `downloads.items`                           | Web available; store URLs placeholder      |
| FAQ                   | none                                   | `faq.items`                                 | New copy from verified facts               |
| Blog JSON             | old `i18n/**/blog/**`                  | —                                           | Not migrated; app/API owns blog            |
| Hero photography      | old `hero-section/*.jpg`               | —                                           | Not migrated; old identity art             |
| Old favicon SVG       | `public/favicon/favicon.svg`           | —                                           | Not migrated; 444 KB SVG wrapping a raster |

## Assets copied

| Asset    | Path                                  | Details                         |
| -------- | ------------------------------------- | ------------------------------- |
| SFA logo | `public/images/brand/sfa-512x512.png` | 512×512, 64 KB                  |
| Mahdi    | `public/images/team/Mahdi.png`        | 512×512, 176 KB                 |
| Arash    | `public/images/team/Arash.png`        | 512×512, 188 KB                 |
| Hossein  | `public/images/team/Hossein.png`      | 512×512, 144 KB                 |
| Mohsen   | `public/images/team/Mohsen.png`       | 640×640, 592 KB; optimize later |
| Kamyar   | `public/images/team/Kamyar.png`       | 512×512, 152 KB                 |
| Soheil   | `public/images/team/Soheil.png`       | 512×512, 112 KB                 |
| SRBIAU   | `public/images/partners/srbiau.png`   | 270×180, 16 KB                  |
| SWRI     | `public/images/partners/swri.png`     | 144×144, 36 KB                  |

Filenames preserved from the old repo. No optimizer was available, so files are
not re-encoded. Partner proportions are untouched.

## Copy decisions

- Hero leads with the product decision, not the old full-bleed photo/slogan
  treatment: “آب دقیق‌تر، مزرعه مطمئن‌تر” / “Precise water, resilient farms”.
- No superlatives, guarantees, testimonials, customer logos, press mentions, or
  invented metrics.
- Research numbers are presented as research results, not product guarantees.
- How-it-works copy stays at the model level (crop/soil/growth stage, crop yield
  functions, mathematical optimization, water-stress sensitivity). The old site
  documented no screen-by-screen flow.
- Partners are described as collaborators, not endorsers.
- Contact uses `info@sfa-agri.ir` from current code, not the old `info@sfa.com`.
  The old `+98` phone is omitted because it is incomplete.
- Download copy only promises the web app; all store/desktop links are honest
  placeholders.
- Persian is primary; English is idiomatic and shorter where needed.
- Team personal emails are omitted; public professional profiles are linked.

## Verification

- `content/home/{fa,en}.json` parse as JSON.
- 39 stable IDs per locale, no duplicate IDs, identical ID order and key shape.
- All `image` and `logo` paths resolve under `public/`.
- Copied assets match the old repo files by SHA-256.
- `pnpm exec prettier content docs/content-migration.md --write` passes.
- Did not run `pnpm check` / `pnpm build`: the task explicitly limits checks while
  the blog agent works in parallel, and no React code changed.

## Open questions / drift

Full list with context is in `docs/content-migration.md` → “Author questions”.
Blocking confirmations before launch:

1. **Research numbers** — 2,000 m³/ha, 28%, and 4× need study scope, baseline,
   region, crop set, method, and a link to a paper/report if one exists.
2. **Achievements** — years, organizers, official award titles, and what IRC
   stands for.
3. **Partners** — written permission to publish SRBIAU and SWRI logos, plus the
   exact relationship wording and legal names.
4. **Team** — confirm roles/bios and public profile links; decide whether any
   personal emails may be published.
5. **Contact** — resolve `info@sfa-agri.ir` vs `info@sfa.com`; provide phone,
   street address, social profiles.
6. **Downloads** — real store/desktop URLs; confirm whether the web app requires
   an account and how pricing works.
7. **Imagery** — new hero/field photography and current app screenshots; old
   hero photography was intentionally not migrated.
8. **Brand variants** — only the 512 px PNG mark exists; need light/dark marks,
   favicon set, social share image.

Drift notes:

- The old site had no FAQ or documented UI workflow. FAQ and showcase steps are
  new copy derived from the old feature copy; they need author approval.
- The old repo has no license file. Partner/team asset publication permission is
  assumed from the old public site but not documented.

## Next step

1. Orchestrator/author answer the fact and permission questions above.
2. `implementer-home` imports `content/home/{fa,en}.json` in the homepage loader,
   follows the schema/rules in `docs/content-migration.md`, and keeps section
   components presentational.
3. If the author wants a free/paid/offline FAQ or real store links, update only
   the content files and the `downloads`/`faq` sections.
4. If team/achievements/partners gain a second page, extract them to
   `content/site/*.json` with the existing IDs.
