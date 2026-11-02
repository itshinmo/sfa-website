---
name: blog-api-presentation
description: Use when integrating the read-only blog API, adding or changing a blog template, or fixing list/detail/search/tag/related behavior. Keeps the website a renderer, never an editor.
---

# blog-api-presentation

## Prerequisites

- [`docs/blog-api.md`](../../../docs/blog-api.md)
- `app/modules/blog/domain/post.ts`
- `app/modules/blog/infrastructure/blog-api-schemas.ts`
- `app/modules/blog/application/ports/blog-repository.ts`

## Workflow

1. Confirm the API shape and update the contract doc first if it changes.
2. Add/update Zod schemas; keep domain types aligned.
3. Implement through `BlogRepository`; routes call the module composition file.
4. Render the discriminated `content` union; do not parse raw HTML.
5. Handle list, pagination, tag filter, search, related, fallback, empty, error,
   and loading states.
6. Generate TOC from structured headings; compute/receive reading time.
7. Add metadata, canonical, hreflang, and JSON-LD on detail pages.
8. Add contract tests and E2E for the new behavior.

## Constraints

- No draft, preview, editor, publishing, or CMS UI.
- No Markdown blog pipeline.
- No unvalidated API data.
- No hardcoded production posts; fixtures are development-only.
- No hallucinated API endpoints.

## Expected output

Adapter/schema/renderer changes, contract tests, and E2E coverage.
