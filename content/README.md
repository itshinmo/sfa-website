# Content workspace

This directory holds **presentation content owned by the website**: homepage
copy, team/achievement/partner facts, FAQ, contact, and download copy.

## Homepage content

- [`home/fa.json`](./home/fa.json) — Persian (primary).
- [`home/en.json`](./home/en.json) — idiomatic English adaptation.

Both files follow the same shape and stable IDs. The proposed `HomeContent`
type, field rules, and migration notes live in
[`docs/content-migration.md`](../docs/content-migration.md).

The homepage sections are `hero`, `features`, `showcase`, `research`,
`achievements`, `team`, `partners`, `faq`, `contact`, and `downloads`, plus
`meta` for the page title and description.

Team, achievement, and partner facts live inside the localized homepage files
for v1 because the homepage is the only consumer. If they gain a second page,
extract them into `content/site/*.json` with the same IDs rather than copying
them.

## Blog content

This directory does **not** hold blog posts. Blog content is published inside the
Flutter application and read from the backend API. Do not add Markdown posts,
drafts, or a CMS here.

## Assets

Migrated public images live under `public/images/team`, `public/images/partners`,
and `public/images/brand`. Alt text is stored next to each image reference in the
content files.
