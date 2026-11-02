# ADR-003 — Read-only structured blog API

- **Status:** Accepted
- **Date:** 2026-11-02
- **Topic:** content

## Context

Supervisors author and publish blog posts inside the Flutter application. The
website must only present published content. The site needs four templates,
localized slugs, search, tags, pagination, related posts, and SEO. A repo-based
Markdown/CMS pipeline would duplicate the application or create a second source
of truth.

## Decision

The website consumes a **public, read-only blog API** that returns structured
JSON blocks/sections. The frontend defines the contract, validates responses
with Zod, and builds against a mock adapter until the backend implements it.
There is no blog editor, draft preview, or publishing workflow in this repo.

## Consequences

- The backend owns content, media, localization, and publishing.
- The website is a renderer; it never writes content.
- The contract in `docs/blog-api.md` must be signed off by the backend team.
- API downtime and malformed payloads need graceful UI states.
- A future CMS can sit behind the same API without changing the frontend.
