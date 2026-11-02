---
name: web-performance
description: Use when a page gets heavy motion, images, fonts, third-party code, or a new route, or before release. Checks Core Web Vitals and bundle/font/image budgets.
---

# web-performance

## Prerequisites

- `pnpm build`
- Playwright/Lighthouse (or Chrome DevTools) for measurement
- [`docs/seo-ssr.md`](../../../docs/seo-ssr.md), [`docs/motion.md`](../../../docs/motion.md)

## Workflow

1. Identify the LCP element per page; preload it where useful.
2. Ensure images have width/height and appropriate `loading`/`fetchPriority`.
3. Self-host/subset fonts; preload only the primary face.
4. Lazy-load Motion and below-the-fold heavy components.
5. Check JS/CSS weight of the route; split where needed.
6. Measure mobile LCP, CLS, INP; record numbers.
7. Check third-party scripts; avoid them unless approved.
8. Add budgets to the release checklist.

## Targets

- LCP < 2.5s on a representative mobile profile.
- CLS < 0.1.
- INP < 200ms.
- Lighthouse performance/accessibility/SEO ≥ 90 (adjust with the author).

## Constraints

- No layout-shifting image/font loading.
- No motion that forces layout.
- No unnecessary client components on SEO-critical pages.
- No “fix” that hides content until JS loads.

## Expected output

Measurements, bottlenecks, and the smallest performance fix.
