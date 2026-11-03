# Blog API contract

The website is a **read-only consumer** of published blog content. Supervisors
author and publish posts inside the Flutter application. The website never
creates, edits, drafts, or publishes posts.

This document is the contract the backend team implements. The frontend builds
against mocks until the API is available.

## Access

- Public, read-only endpoints for published content.
- No user authentication on public pages.
- If the backend requires a server-to-server key, the website keeps it in
  `BLOG_API_TOKEN` and sends `Authorization: Bearer <token>` only from the
  server. Never expose it to the browser.
- CORS is unnecessary for normal SSR because loaders call the API server-side.
- The adapter uses a 5-second timeout. Timeout, network, HTTP, and invalid-body
  failures are mapped to typed repository errors; detail pages render a
  localized 502 state instead of crashing.
- `404` on a detail request is treated as “not found”; `404` on related posts is
  treated as an empty list.

## Base URL

`BLOG_API_BASE_URL` (environment variable). Example:
`https://api.sfa-agri.ir/api/blog`.

All examples below are relative to that base.

## Endpoints

### List posts

```http
GET /posts?locale=fa&page=1&pageSize=9&tag=soil&tag=irrigation&q=خاک
```

| Param      | Type                | Required | Notes                                                  |
| ---------- | ------------------- | -------- | ------------------------------------------------------ |
| `locale`   | `fa` \| `en`        | yes      | Content locale                                         |
| `page`     | positive integer    | no       | Default 1                                              |
| `pageSize` | 1–50                | no       | Default 9                                              |
| `tag`      | string (repeatable) | no       | Filter by tag slug; all supplied tags must match (AND) |
| `q`        | string              | no       | Search title, excerpt, tags, body                      |

Response:

```json
{
  "items": [],
  "page": 1,
  "pageSize": 9,
  "total": 0,
  "totalPages": 0
}
```

### Get a post

```http
GET /posts/{slug}?locale=fa&fallback=en
```

- `slug` is the locale-specific slug.
- `fallback` is optional. If the requested translation is missing, return the
  fallback translation with `contentLocale` and `isFallback: true`.
- If neither exists, return `404`.

### Tags

```http
GET /tags?locale=fa
```

```json
[{ "slug": "soil", "label": "خاک", "count": 3 }]
```

### Related posts

```http
GET /posts/{slug}/related?locale=fa&limit=3
```

Returns an array of `BlogPostSummary`. Related is by shared tags, then recency.

### Sitemap data

```http
GET /sitemap?locale=fa
```

```json
[
  {
    "slug": "مثلث-بافت-خاک",
    "locale": "fa",
    "updatedAt": "2026-07-02T08:00:00.000Z",
    "alternates": [
      { "locale": "fa", "slug": "مثلث-بافت-خاک" },
      { "locale": "en", "slug": "soil-texture-triangle" }
    ]
  }
]
```

The website uses this to generate `sitemap.xml` and RSS without crawling all
list pages.

## Summary DTO

```ts
type Locale = "fa" | "en";

type BlogImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
  srcSet?: string;
};

type BlogPostSummary = {
  id: string;
  slug: string;
  locale: Locale;
  translationKey: string;
  title: string;
  excerpt: string;
  cover: BlogImage;
  template: "reference" | "narrative" | "simple" | "case-study";
  tags: { slug: string; label: string }[];
  author?: { name: string; avatarUrl?: string };
  publishedAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  readingTimeMinutes: number;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
    noindex?: boolean;
  };
  alternates: { locale: Locale; slug: string }[];
  contentLocale?: Locale;
  isFallback?: boolean;
};
```

`BlogPost` is the summary plus `content`.

## Content DTO

`content` is a discriminated union on `type`, matching `template`.

### reference

```ts
type ReferenceContent = {
  type: "reference";
  intro: ParagraphBlock[];
  sections: {
    title: string;
    subsections: {
      title: string;
      paragraphs: ParagraphBlock[];
      management?: ParagraphBlock;
    }[];
  }[];
};
```

### narrative

```ts
type NarrativeContent = {
  type: "narrative";
  intro: ParagraphBlock[];
  blocks: (
    | ParagraphBlock
    | { type: "heading"; level: 2 | 3; text: string; id?: string }
    | { type: "image"; image: BlogImage; caption?: string }
    | { type: "quote"; content: InlineText[]; cite?: string }
    | { type: "list"; ordered: boolean; items: InlineText[][] }
  )[];
};
```

### simple

```ts
type SimpleContent = {
  type: "simple";
  intro: ParagraphBlock[];
  sections: { title: string; paragraphs: ParagraphBlock[] }[];
};
```

### case-study

```ts
type CaseStudyContent = {
  type: "case-study";
  challenge: ParagraphBlock[];
  solution: ParagraphBlock[];
  results: { label: string; value: string; description?: string }[];
  gallery: BlogImage[];
  cta?: { label: string; href: string };
};
```

### Inline text

```ts
type InlineText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  href?: string;
};
```

### Paragraph

```ts
type ParagraphBlock = {
  type: "paragraph";
  content: InlineText[];
};
```

The backend is responsible for producing safe, structured inline content. The
website renders spans, never raw HTML.

## Fallback and locale rules

- `locale` is the requested language.
- If the post exists only in the other language, return it with
  `contentLocale` set to the actual content language and `isFallback: true`.
- `alternates` always lists the real translations and their localized slugs.
- `hreflang` is generated only from `alternates`.
- The UI shows a notice when `isFallback` is true.
- Missing translations should not produce empty cards or broken links.

## Images

- Return absolute URLs or root-relative URLs.
- Always include `alt`, `width`, and `height`; these prevent CLS.
- `srcSet` is optional. If the backend/CDN provides variants, return a valid
  `srcSet`; otherwise the website uses the single URL.
- Cover images should be at least 1600×900, 16:9. Blog figures should preserve
  their intrinsic aspect ratio.
- Do not return HTML in `alt`.

## Caching and reliability

- The website sends `Accept: application/json`.
- Recommended response headers:
  `Cache-Control: public, max-age=60, stale-while-revalidate=300`.
- The website sets public page cache headers separately.
- Use a short timeout and an error state; a failing API must not produce a blank
  page.
- Return `404` for unknown slugs and `422`/`400` for invalid query params.
- Error shape:

```json
{ "error": { "code": "not_found", "message": "Post not found" } }
```

## Validation

The frontend validates responses with Zod in
`app/modules/blog/infrastructure/blog-api-schemas.ts`. A malformed response is
logged and surfaced as a safe error state. Contract tests should cover:

- list shape and pagination;
- post detail for all four templates;
- tags;
- related posts;
- fallback;
- sitemap;
- error responses.

## Mock adapter

Until the backend exists:

- `MockBlogRepository` in
  `app/modules/blog/infrastructure/mock-repository.ts` implements the port.
- Fixtures live in `app/modules/blog/infrastructure/mock-data.ts`.
- `app/modules/blog/blog-module.ts` chooses the adapter. When
  `BLOG_API_BASE_URL` is set, the API adapter will be used instead.

## Backend checklist

- [ ] Public read-only endpoints implemented.
- [ ] Locale + localized slug handling.
- [ ] Fallback behavior with `contentLocale`/`isFallback`.
- [ ] `alternates` for every post.
- [ ] Pagination, tag filter, search.
- [ ] Related posts.
- [ ] Sitemap endpoint.
- [ ] Image dimensions and alt text.
- [ ] ISO dates.
- [ ] Cache headers.
- [ ] Error shape.
- [ ] Contract tests or an OpenAPI document.
