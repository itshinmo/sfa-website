# SFA website — working memory

- **Status:** active
- **Created:** 2026-11-02
- **Goal:** ship the public SFA presentation website (homepage + blog) on
  React Router 8 SSR with a new marketing identity.
- **Scope:** presentation only. No auth, checkout, tickets, CMS, blog editor, or
  drafts. Blog data is read-only from the API.

## Current milestone

**M0 — foundation: complete.**

Delivered:

- React Router 8 SSR scaffold, Tailwind 4, Base UI, Motion dependency.
- Token system + `/design-lab` placeholder.
- i18n path routing (`fa` default), localized blog slugs in mock data, fallback.
- Blog domain types, Zod API schemas, `BlogRepository` port, mock adapter and
  fixtures for all four templates.
- Homepage/blog index/blog detail/404/design lab.
- Unit, E2E, axe, and SSR SEO tests; all green.
- AI layer, docs, ADRs, content/API contract.

## Progress

- Blog vertical complete: FastAPI adapter + mock fallback, four templates, TOC,
  breadcrumbs, search/tags/pagination, related, sitemap/robots/RSS, contract/E2E/
  a11y/SEO tests.
- Content migration complete: `content/home/{fa,en}.json`, team/partner/brand
  assets, homepage content schema and server loader.
- Hydration/i18n fixed: locale changes derive from the pathname; mobile nav
  Escape handling; `process.env` removed from client-reachable modules.

## Decisions locked

- Identity: hybrid **01 Field Notes + 02 Rooted**, light only.
- Hero: original farmland photography, desktop + mobile crops.
- Fonts: original BYekan regular/bold, tokenized for later replacement.
- Audience: farmers; alive and informative, not a dashboard or info dump.

## Status

The homepage, blog vertical, hybrid identity, hero, motion, SEO, and quality
fixes are complete. Final audit verdict: **GO**, no P1 blockers. Remaining work
is author/content confirmation and Docker image verification on a machine with
a daemon.

## Next

1. Author confirms research numbers, achievements, partner permissions, team
   facts, contact details, and real download URLs.
2. Build/run the Docker image on a host with a daemon; verify the non-root
   runtime and healthcheck.
3. Address optional P2s: WOFF2/subset fonts, team WebP/srcset, mobile 200% text
   overflow, blog-index metadata length, and design-lab chunk exclusion.

## Blackboard

- [`contracts.md`](./contracts.md) — frozen interfaces.
- [`tasks.md`](./tasks.md) — task board and file ownership.
- [`questions.md`](./questions.md) — blockers for the author/orchestrator.
- [`handoffs/`](./handoffs/) — per-agent handoff notes.
