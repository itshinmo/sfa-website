---
description: What the SFA website is, what it is not, and where knowledge lives. Read first.
last-verified: 2026-11-02
---

# Overview

SFA is a downloadable Flutter application for smart irrigation and soil
management. The application owns accounts, payments, subscriptions, and
tickets. This repository is the public presentation website: homepage, blog,
app downloads, research, achievements, team, partners, FAQ, and contact.

The website is **read-only**. Supervisors author and publish blogs inside the
application; the website renders published posts from a public API. There is no
website auth, checkout, ticket UI, CMS, draft mode, or blog editor.

## Shape

- React Router 8 framework mode, SSR.
- `app/routes` composes pages; `app/modules/blog` owns blog domain/application/
  infrastructure/presentation; `app/shared` holds UI and helpers.
- Blog data comes through a repository port; `MockBlogRepository` is the current
  adapter, `FastApiBlogRepository` is next.
- `app/styles/tokens.css` is the design source of truth.
- `docs/` current behavior; `decisions/` ADRs; `rfcs/` proposals.

## Where knowledge lives

[`docs/`](../../../docs/) · [`decisions/`](../../../decisions/) ·
[`rfcs/`](../../../rfcs/) · [`AGENTS.md`](../../../AGENTS.md).
