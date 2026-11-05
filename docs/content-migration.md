# Content migration

Source: [`itshinmo/sfa-solutions`](https://github.com/itshinmo/sfa-solutions),
snapshot `c0a0b34701f35f577c63b8ce418b8df1ca01e242` (`main`), fetched 2026-11-02.
The old site is a Vite SPA. The new website keeps **verified facts, assets, and
structure**, but rewrites the marketing narrative for the new identity.

This document records what was migrated, what was rewritten, what was left out,
and what still needs author confirmation. The migrated copy lives in
[`content/home/fa.json`](../content/home/fa.json) and
[`content/home/en.json`](../content/home/en.json).

## Source inventory

| Old area                 | Source files                                                    | Decision                                  |
| ------------------------ | --------------------------------------------------------------- | ----------------------------------------- |
| Brand logo               | `src/assets/sfa-512x512.png`                                    | Migrate                                   |
| Team portraits           | `src/assets/team/*.png`                                         | Migrate                                   |
| Partner logo             | `src/assets/swri.png`                                           | Migrate SWRI only; footer credit          |
| Product features         | `src/i18n/locales/{fa,en}/sfa-section.json`                     | Rewrite from facts                        |
| Research numbers         | `src/pages/HomePage/components/ResearchSection.tsx` + copy      | Migrate numbers, verify                   |
| Achievements             | `src/i18n/locales/{fa,en}/achievement-section.json`             | Migrate, add missing metadata             |
| Team facts               | `src/i18n/locales/{fa,en}/team-section.json` + `TeamSection`    | Migrate and lightly rewrite               |
| Partner facts            | `src/components/Footer.tsx` + SWRI logo                         | Migrate SWRI credit to footer             |
| Contact/footer           | `src/i18n/locales/{fa,en}/footer.json`, `src/constants/site.ts` | Migrate partial; phone omitted            |
| Hero/product narrative   | `src/i18n/locales/{fa,en}/common.json`, `HeroSection.tsx`       | Rewrite                                   |
| Blog content             | `src/i18n/locales/*/blog/**` + `src/assets/blogs/**`            | Migrate full articles and images          |
| Feedback form/admin      | `src/components/forms`, `src/pages/AdminDashboardPage.tsx`      | Do not migrate                            |
| Hero photography         | `src/assets/homepage/hero-section/*.jpg`                        | Migrate + optimize; farmland hero         |
| Favicon SVG              | `public/favicon/favicon.svg`                                    | Do not migrate; 444 KB SVG wraps a raster |
| Old UI/components/styles | `src/components`, `src/pages/HomePage`, `src/styles`            | Do not migrate                            |

## Migration table

| Content                      | Old source                                                         | New destination                                                          | Treatment                     | Status / confidence                                                                              |
| ---------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------ |
| SFA logo                     | `src/assets/sfa-512x512.png`                                       | `public/images/brand/sfa-512x512.png`                                    | Copy as-is                    | Verified hash; 512×512 PNG                                                                       |
| Team portraits (6)           | `src/assets/team/{Mahdi,Arash,Hossein,Mohsen,Kamyar,Soheil}.png`   | `public/images/team/*.png`                                               | Copy + optimize               | Resized to max 512px and re-encoded; Mohsen reduced to ~332 KB                                   |
| Team names                   | `team-section.json`                                                | `content/home/{fa,en}.json` → `team.members`                             | Migrate; normalize spelling   | High; Persian spelling normalized (`شمسی‌تبار`)                                                  |
| Team roles                   | `team-section.json`                                                | `team.members[].role`                                                    | Migrate; tighten wording      | High; confirm senior titles                                                                      |
| Team bios                    | `team-section.json`                                                | `team.members[].bio`                                                     | Light rewrite for clarity     | Medium; original claims preserved                                                                |
| Team profile links           | `TeamSection.tsx`                                                  | `team.members[].links`                                                   | Migrate public profiles       | High; cleaned tracking parameters                                                                |
| Team personal emails         | `TeamSection.tsx`                                                  | —                                                                        | Omit                          | Privacy; ask author before publishing                                                            |
| Partner logo/credit          | `Footer.tsx`, `src/assets/swri.png`                                | footer partner strip + `public/images/partners/swri.png`                 | Migrate SWRI only             | Medium; logo use permission still needs confirmation                                             |
| Research: water saved        | `ResearchSection.tsx` (`2000`)                                     | `research.stats[saved-water]`                                            | Migrate, bilingual            | Medium; 2,000 m³ per hectare needs method/scope confirmation                                     |
| Research: water reduction    | `ResearchSection.tsx` (`28`)                                       | `research.stats[reduced-use]`                                            | Migrate, bilingual            | Medium; 28% needs baseline/scope confirmation                                                    |
| Research: water productivity | `ResearchSection.tsx` (`4`)                                        | `research.stats[water-productivity]`                                     | Migrate, bilingual            | Medium; “4×” needs metric/scope confirmation                                                     |
| Research: species count      | `ResearchSection.tsx` (`246`)                                      | `research.stats[crop-species]`, feature, FAQ, hero                       | Migrate, bilingual            | High; repeated consistently across old site                                                      |
| Achievements (4)             | `achievement-section.json`                                         | `achievements.items`                                                     | Migrate; no invented years    | Medium; years/organizers missing; IRC not expanded                                               |
| Product features (4)         | `sfa-section.json`                                                 | `features.items`                                                         | Rewrite from facts            | High; facts preserved                                                                            |
| How-it-works facts           | `sfa-section.json`, `ResearchSection.tsx`                          | `showcase.steps`                                                         | Rewrite as 3 grounded steps   | Medium; no UI workflow was documented, so copy stays model-level                                 |
| Hero narrative               | `common.json`, `HeroSection.tsx`                                   | `hero`                                                                   | Rewrite                       | New identity; old slogans not carried over                                                       |
| Contact email                | Current `app/shared/lib/site.ts` (`info@sfa-agri.ir`)              | `contact.email`                                                          | Use current code value        | Medium; old repo had `info@sfa.com`                                                              |
| Contact location/hours       | `footer.json`                                                      | `contact.location`, `contact.hours`                                      | Migrate                       | Medium; address is city-level only                                                               |
| Contact phone                | `src/constants/site.ts` (`+98`)                                    | `contact.phone`                                                          | Omitted (`null`)              | Old value is incomplete; do not publish                                                          |
| Downloads                    | Current `app/shared/lib/site.ts`                                   | `downloads.items`                                                        | Normalize to content shape    | Web available; all store/desktop links are placeholders                                          |
| FAQ                          | No old FAQ                                                         | `faq.items`                                                              | New copy from verified facts  | Draft; author approval needed                                                                    |
| Hero photography             | `src/assets/homepage/hero-section/landscape1.jpg`, `portrait1.jpg` | `public/images/homepage/hero-{landscape,portrait}.{jpg,webp}`            | Migrate + optimize            | 2000px/1200px wide; JPEG + WebP; same farmland feeling                                           |
| Fonts                        | BYekan TTF + new Inter variable                                    | `public/fonts/BYekan/*`, `public/fonts/Inter/InterVariable-latin.woff2`  | Two-script pairing            | BYekan restricted to Persian glyphs; Inter for Latin/English                                     |
| Blog posts                   | `src/i18n/locales/*/blog/**` + `src/assets/blogs/**`               | `app/modules/blog/infrastructure/mock-posts.json`, `public/images/blog/` | Migrate full content + images | Full original translations and inline images preserved; six extra fixtures expanded with sources |
| Feedback/admin               | Old feedback form and dashboard                                    | —                                                                        | Do not migrate                | Out of scope for presentation site                                                               |

## Asset inventory

Source files were verified against SHA-256 at copy time. Team portraits were
then resized to 512 px and re-encoded; the hero was resized and exported as JPEG
plus WebP. Partner logo proportions are preserved; do not crop the wordmarks.
The original BYekan TTFs are copied unchanged.

| Asset                | Destination                                                  | Dimensions                   | Size           | Alt text (fa / en)                                                        | Notes                                                           |
| -------------------- | ------------------------------------------------------------ | ---------------------------- | -------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------- |
| SFA logo             | `public/images/brand/sfa-512x512.png`                        | 512×512                      | 64 KB          | `لوگوی SFA` / `SFA logo`                                                  | Square mark with wordmark; transparent PNG                      |
| Mahdi Sarai Tabrizi  | `public/images/team/Mahdi.png`                               | 512×512                      | 192 KB         | `پرتره مهدی سرایی تبریزی` / `Portrait of Mahdi Sarai Tabrizi`             | White background; optimized                                     |
| Arash Tafteh         | `public/images/team/Arash.png`                               | 512×512                      | 210 KB         | `پرتره آرش تافته` / `Portrait of Arash Tafteh`                            | White background; optimized                                     |
| Hossein Moradi       | `public/images/team/Hossein.png`                             | 512×512                      | 163 KB         | `پرتره حسین مرادی سیزکوهی` / `Portrait of Hossein Moradi Sizkouhi`        | White background; optimized                                     |
| Mohsen Shamsitabar   | `public/images/team/Mohsen.png`                              | 512×512                      | 324 KB         | `پرتره محسن شمسی‌تبار` / `Portrait of Mohsen Shamsitabar`                 | Dark photo; optimized from 640px                                |
| Kamyar Nakhaie       | `public/images/team/Kamyar.png`                              | 512×512                      | 171 KB         | `پرتره کامیار نخعی خونیکی` / `Portrait of Kamyar Nakhaie Khoonikie`       | White background; optimized                                     |
| Soheil Mehrizi       | `public/images/team/Soheil.png`                              | 512×512                      | 120 KB         | `پرتره سهیل مهریزی` / `Portrait of Soheil Mehrizi`                        | White background; optimized                                     |
| SWRI logo            | `public/images/partners/swri.png`                            | 144×144                      | 36 KB          | `لوگوی مؤسسه تحقیقات خاک و آب` / `Soil and Water Research Institute logo` | Keep aspect ratio; permission pending                           |
| Hero landscape       | `public/images/homepage/hero-landscape.jpg/.webp`            | 2000×1499                    | 399/273 KB     | `نمایی از یک مزرعه سرسبز در نور روز` / `A green farm field in daylight`   | Desktop hero; <picture> with WebP                               |
| Hero portrait        | `public/images/homepage/hero-portrait.jpg/.webp`             | 1200×1800                    | 351/249 KB     | same                                                                      | Mobile hero; <picture> with WebP                                |
| Blog soil cover      | `public/images/blog/soil-texture-triangle/thumbnail.jpg`     | 1000×775                     | 48 KB          | old cover alt                                                             | Migrated from original article                                  |
| Blog symphony images | `public/images/blog/symphony-of-droplets/image{1,2,3}.jpg`   | 1500×655, 1000×667, 1023×784 | 131/206/106 KB | old image alts                                                            | Three inline figures preserved                                  |
| BYekan regular       | `public/fonts/BYekan/BYekan.ttf`                             | —                            | 224 KB         | —                                                                         | Original site font; author will change later                    |
| BYekan bold          | `public/fonts/BYekan/BYekanBold.ttf`                         | —                            | 241 KB         | —                                                                         | Original site font; author will change later                    |
| Inter variable       | `public/fonts/Inter/InterVariable-latin.woff2`               | —                            | 48 KB          | —                                                                         | SIL OFL; English + Latin fallback                               |
| OG fallback          | `public/og-default.png`                                      | 1200×630                     | 26 KB          | —                                                                         | Raster social fallback; SVG covers use this                     |
| App screens          | `public/images/app/app-{fields,irrigation,soil-lab,login}.*` | 1200×750                     | 36–122 KB      | localized in `showcase.screens`                                           | Placeholder captures of the current app; replace after redesign |

Not migrated from the old repo:

- `public/favicon/favicon.svg` (an SVG wrapper around an embedded raster, 444 KB;
  the new favicon is generated from the PNG mark).
- The SRBIAU logo and any copy that presented the university as a partner. SWRI
  remains as a footer research credit.
- Old UI/visual assets and the old Vite architecture.

The two original blog articles are migrated in full (Persian and English) with
their inline images. Additional fixtures are long-form and cite external
sources; production blog media still comes from the API.

## Content shape

The homepage content is one self-contained localized JSON document per locale.
This is deliberate for v1: the homepage is the only consumer of team,
achievement data, so a join between `content/home` and
`content/site` would add complexity without removing duplication. If these facts
are reused on an About page later, extract them to `content/site/*.json` with the
same stable IDs.

```ts
type Hero = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  image: {
    landscape: string;
    landscapeWebp: string;
    portrait: string;
    portraitWebp: string;
    alt: string;
  };
  highlights: { id: string; value: string; label: string }[];
};

type Feature = { id: string; title: string; description: string };
type ShowcaseStep = { id: string; step: number; title: string; description: string };
type AppScreen = { id: string; src: string; webp?: string; alt: string };
type ResearchStat = {
  id: string;
  value: number;
  display: string; // localized digits / separators
  unit: string; // m³, %, برابر, ×
  label: string;
};
type Achievement = { id: string; title: string; description: string };
type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
  links: { label: string; href: string }[];
};
type Partner = { id: string; name: string; logo: string; logoAlt: string };
type FaqItem = { id: string; question: string; answer: string };
type DownloadItem = {
  id: "web" | "google-play" | "bazaar" | "myket" | "apk" | "windows" | "macos" | "linux";
  label: string;
  status: "available" | "placeholder";
  href: string | null;
};

type HomeContent = {
  locale: "fa" | "en";
  meta: { title: string; description: string };
  hero: Hero;
  features: { eyebrow: string; title: string; description: string; items: Feature[] };
  showcase: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ShowcaseStep[];
    screens: AppScreen[];
  };
  research: {
    eyebrow: string;
    title: string;
    description: string;
    stats: ResearchStat[];
  };
  achievements: {
    eyebrow: string;
    title: string;
    description: string;
    items: Achievement[];
  };
  team: { eyebrow: string; title: string; description: string; members: TeamMember[] };
  faq: { eyebrow: string; title: string; description: string; items: FaqItem[] };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    email: string;
    phone: string | null;
    location: string;
    hours: string;
  };
  downloads: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    items: DownloadItem[];
  };
};
```

The runtime schema is `app/modules/home/home-content-schema.ts`; the server-only
loader helper is `app/modules/home/home-content.server.ts`. It validates both
locale files at module load and exposes `getHomeContent(locale)`.

Rules for the implementer:

- Use `display` for the visible stat and `value` only for count-up animation.
- Hide the phone row when `phone` is `null`.
- Render `status: "placeholder"` downloads as disabled, with the coming-soon
  label; never invent a URL.
- Open `team.members[].links` in a new tab with `rel="noreferrer"`.
- Use the content alt text; do not use filenames.
- Keep all section headings and body copy in the content files. A blog CTA, if
  kept on the homepage, still uses the existing `common`/`blog` locale keys.

## Copy decisions

- **New narrative.** The old site led with a full-bleed field photo and three
  slogans. The new copy leads with the decision the product supports: matching
  irrigation to crop, soil, and growth stage. The old slogans
  (`هوشمندی در هر قطره`, `Smarter Water, Stronger Farms`) are not reused as the
  hero.
- **Persian is primary.** Persian copy was written first, then adapted into
  idiomatic English rather than translated word for word. Sentence length,
  punctuation, and paragraph order differ where it reads better.
- **No superlatives.** No “best”, “unique”, “revolutionary”, “guaranteed”, or
  comparative claims. The four research numbers are stated as research results,
  not as guarantees.
- **No invented proof.** There are no testimonials, customer logos, press
  mentions, certifications, or download counts.
- **How it works is model-level.** The showcased steps describe what the model
  does (uses crop/soil/growth stage, optimizes with yield functions, adapts to
  water-stress sensitivity). They do not describe screens or a tap-by-tap flow,
  because the old site documented none.
- **Partners are described as collaborators, not endorsers.** The copy says SFA
  develops alongside academic/research institutions. It does not claim that
  either institution endorses the product or its results.
- **Team emails are omitted.** Public professional profiles are linked instead.
  The old site published personal emails; publishing them again needs explicit
  approval.
- **Contact uses the current code value.** `info@sfa-agri.ir` comes from
  `app/shared/lib/site.ts`. The old repo used `info@sfa.com`; the discrepancy is
  unresolved. The incomplete old phone value (`+98`) is not published.
- **Downloads stay honest.** The web app is the only available target. Store and
  desktop entries are marked placeholder, and the FAQ says the official links
  will be added when live.

### Terminology

| Persian                      | English                        | Notes                                      |
| ---------------------------- | ------------------------------ | ------------------------------------------ |
| بهینه‌سازی آبیاری            | irrigation optimization        | Product category; keep consistent          |
| کشاورزی مناطق خشک و نیمه‌خشک | arid and semi-arid agriculture | Positioning                                |
| توابع تولید محصول            | crop yield functions           | Research term; do not simplify to “models” |
| بهینه‌سازی ریاضی             | mathematical optimization      |                                            |
| مرحله رشد                    | growth stage                   |                                            |
| تنش آبی                      | water stress                   |                                            |
| بهره‌وری آب                  | water productivity             |                                            |
| گونه‌های زراعی و باغی        | field crops and orchards       | Species count context                      |
| دستیار هوش مصنوعی            | AI assistant                   |                                            |
| پایگاه‌های داده کشاورزی      | agricultural databases         |                                            |
| سامانه‌های مدیریت منابع آب   | water-management systems       |                                            |
| داده‌های ملی کشاورزی         | national agricultural datasets |                                            |

## Author questions

Facts and permissions that still need confirmation before launch:

1. **Research numbers.** Can we publish 2,000 m³ saved per hectare, 28% less
   water use, and 4× water productivity? What is the study scope, baseline,
   region, crop set, and method? Should the page link to a paper or report?
2. **Achievements.** What years and organizers should be shown for the four
   awards? What does IRC stand for? Are the titles “Best Idea” and “Best Paper”
   the official award names, and is “national nominee” the correct status for
   Watsave and UNESCO?
3. **Partner.** Do we have written permission to publish the SWRI logo, and what
   exact relationship wording may we use (partner, supporter,
   research collaborator, host institution)? Are the Persian legal names correct?
4. **Team.** Are the current roles and bios accurate? May we link the public
   profiles included in the content files? Should any personal emails be public?
   Is the member order intentional?
5. **Contact.** Which email is canonical: `info@sfa-agri.ir` (current code) or
   `info@sfa.com` (old site)? What phone number, street address, and support
   hours should be published? Are there official social profiles?
6. **Downloads.** What are the real Google Play, Bazaar, Myket, APK, Windows,
   macOS, and Linux URLs? Is the web app at `https://sfa-agri.ir` public, and
   does it require an account? Is it free, trial-based, or subscription-based?
7. **FAQ.** Approve the six drafted answers, especially the download answer.
   Should we add pricing, offline use, trial, support, or data-privacy questions
   once those facts are confirmed?
8. **Imagery.** The old hero photography was not migrated because it belongs to
   the old identity. Provide new hero/field photography and current app
   screenshots (or approve a UI-free hero).
9. **Brand assets.** Only the 512×512 PNG mark was migrated. Provide light/dark
   logo variants, a proper favicon set, and a social share image if available.
10. **Structure.** If team/achievements will also appear on an About or
    Research page, should we extract them to `content/site/*.json` now or later?

## Verification

- Both JSON files parse and have identical section/key shape and stable IDs.
- Every `image`/`logo` path in the content resolves under `public/`.
- Copied assets match the old repo by SHA-256.
- `pnpm exec prettier content docs/content-migration.md --write` is the only
  formatting step for this migration. Full checks are deferred because parallel
  work is in progress.
