---
description: The read-only blog API boundary and current mock adapter. Read before touching blog data.
last-verified: 2026-11-02
---

# Blog API (agent context)

Contract: [`docs/blog-api.md`](../../../docs/blog-api.md).

- Website is read-only. No drafts, editor, publishing, or CMS.
- API returns structured JSON (no HTML/Markdown), four template unions:
  reference, narrative, simple, case-study.
- `alternates` drive language switching and `hreflang`.
- Missing translation falls back with `contentLocale` + `isFallback` and a
  visible notice.
- Zod schemas: `app/modules/blog/infrastructure/blog-api-schemas.ts`.
- Port: `app/modules/blog/application/ports/blog-repository.ts`.
- Mock: `MockBlogRepository`; fixtures are development-only.
- Production adapter: `FastApiBlogRepository` using `BLOG_API_BASE_URL` and an
  optional server-side `Authorization: Bearer <BLOG_API_TOKEN>`.
- 5s timeout; typed errors for timeout/network/HTTP/invalid body; detail 404 is
  null, related 404 is an empty list.
- List/search/tags/pagination are API-driven.
- Detail includes TOC, breadcrumbs, related posts, reading-time fallback,
  `BlogPosting` and `BreadcrumbList` JSON-LD.
- Sitemap/robots/RSS are implemented in `app/routes/{sitemap,robots,rss}.ts`.
- Validate at the boundary; never crash on malformed data.
