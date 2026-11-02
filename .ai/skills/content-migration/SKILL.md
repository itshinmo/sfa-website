---
name: content-migration
description: Use when moving factual content, team/achievement/partner data, images, or homepage copy from the old sfa-solutions site into the new identity.
---

# content-migration

## Prerequisites

- [`docs/content-migration.md`](../../../docs/content-migration.md)
- Access to the old repository/assets
- Author confirmation for facts and permissions

## Workflow

1. Inventory the old content: team, stats, achievements, partners, copy,
   images, contact details.
2. Mark each item as migrate, rewrite, replace, or drop.
3. Verify facts and numbers with the author; never invent.
4. Move assets to `public/images/...`; optimize and write alt text.
5. Put localized copy in typed content files or locale namespaces.
6. Rewrite the marketing narrative for the new identity; keep Persian primary.
7. Keep blog content out of the repo; the app/API owns it.
8. Record unresolved items as questions.

## Constraints

- No unverified claims, awards, partners, or testimonials.
- No old visual identity carried over by accident.
- No copyrighted assets without permission.
- No blog JSON copied as production content.

## Expected output

A migration table, updated content/assets, and an author question list.
