# Runbook

## Requirements

- Node.js 24+
- pnpm 12+
- Docker (optional, for the production image)
- Chrome installed locally for Playwright (`channel: "chrome"`)

## Local development

```sh
pnpm install
cp .env.example .env
pnpm dev
```

Open <http://localhost:3000>. Root redirects permanently (301) to `/fa`.

The dev server binds to `127.0.0.1:3000` so Playwright and curl agree on the
host. Change `vite.config.ts` if you need LAN access.

## Environment

| Variable            | Required   | Purpose                                 |
| ------------------- | ---------- | --------------------------------------- |
| `SITE_URL`          | production | Canonical origin, sitemap, RSS, JSON-LD |
| `BLOG_API_BASE_URL` | production | Blog API base; empty uses mocks         |
| `BLOG_API_TOKEN`    | optional   | Server-side API token                   |
| `DESIGN_LAB`        | optional   | `1` exposes `/design-lab` in production |

Never commit `.env`.

## Verification

```sh
pnpm check
pnpm build
pnpm test:e2e
pnpm test:a11y
pnpm test:seo
```

If Playwright cannot find a browser:

```sh
pnpm exec playwright install chromium
# or remove channel: "chrome" from playwright.config.ts
```

## Production

```sh
pnpm build
pnpm start
```

`react-router-serve` uses `PORT` (default 3000). Put Nginx or a CDN in front.

## Docker

```sh
docker build -t sfa-website .
docker run --rm -p 3000:3000 \
  -e SITE_URL=https://www.sfa-agri.ir \
  -e BLOG_API_BASE_URL=https://api.sfa-agri.ir/api/blog \
  sfa-website
```

The image uses pnpm with a frozen lockfile, builds the SSR bundle, installs
production dependencies, and serves via `pnpm start` as the non-root `node`
user. It exposes a healthcheck against `/robots.txt` and excludes `.env` files
from the build context.

## Nginx notes

- Proxy `/` to the Node service on `127.0.0.1:3000`.
- Serve static assets directly from `build/client/assets` if desired.
- Forward `Host`, `X-Forwarded-Proto`, and `X-Forwarded-For`.
- Respect the application's `Cache-Control` header: clean public HTML is
  `public, max-age=0, s-maxage=300, stale-while-revalidate=3600`, while
  search/tag query pages and error responses are `no-store`.
- Cache immutable hashed assets aggressively; let the app's headers control
  HTML caching.
- Keep gzip/brotli enabled.

## Common issues

### Dev server on 5173

`vite.config.ts` sets port 3000 and host `127.0.0.1`. Restart after changing it.

### Cookie/locale mismatch

The URL locale wins. Clear the `sfa-locale` cookie if a stale preference is
confusing local testing.

### API unavailable

The blog uses `FastApiBlogRepository` when `BLOG_API_BASE_URL` is set and
`MockBlogRepository` otherwise. Verify the base URL, optional `BLOG_API_TOKEN`,
the 5-second timeout, the API error shape, and the fallback/`alternates` fields.

### Playwright hangs

Make sure no other process owns port 3000. The config reuses an existing server
locally.

## Release checklist

- [ ] `pnpm check:all`
- [ ] `pnpm test:e2e`, `pnpm test:a11y`, `pnpm test:seo`
- [ ] `SITE_URL` points at the production origin
- [ ] `BLOG_API_BASE_URL` points at the production API
- [ ] Docker image builds
- [ ] `robots.txt`/`sitemap.xml` accessible
- [ ] No design lab in production (`DESIGN_LAB` unset)
- [ ] Both locales verified
- [ ] Real download links/assets installed
