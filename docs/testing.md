# Testing

## Commands

```sh
pnpm test          # Vitest: unit + component
pnpm test:e2e      # Playwright: user flows (desktop + mobile)
pnpm test:a11y     # Playwright + axe
pnpm test:seo      # raw SSR HTML assertions
pnpm check         # typecheck + lint + format + unit
pnpm check:all     # check + production build
```

Playwright uses the installed Chrome channel locally. CI must install a browser
or provide Chrome; adjust `playwright.config.ts` if the runner differs.

## Layers

### Unit / component (Vitest)

- Domain logic and repository behavior.
- Zod schemas and API contract fixtures.
- Shared helpers (`cn`, `normalize`, date/locale).
- Base UI wrappers and interactive components with Testing Library.
- Query by role/name, not CSS classes.

### E2E (Playwright)

- Homepage in both locales.
- Blog index → detail navigation.
- Language switch.
- Search, tag filter, pagination.
- 404.
- Download CTA states (available vs placeholder).
- Mobile navigation.

### Accessibility

- Axe on homepage and blog index/detail, both locales.
- Keyboard walkthrough for menus, search, and pagination.
- Reduced-motion checks once motion primitives exist.
- 200% zoom and 360px viewport checks.

### SEO / SSR

- Raw HTML contains main content.
- Title, description, canonical.
- `hreflang` for real translations.
- `BlogPosting` JSON-LD.
- Sitemap/RSS when implemented.
- Search results are `noindex`.

## Contract tests

The blog API is mocked until the backend is ready. When it exists:

- Validate every response with the Zod schemas in
  `app/modules/blog/infrastructure/blog-api-schemas.ts`.
- Add fixtures for all four templates.
- Test fallback and malformed responses.
- Keep `docs/blog-api.md` and the schemas in sync.

## Definition of done

- `pnpm check` passes.
- `pnpm build` passes when routes, API, i18n, SEO, or UI changed.
- Relevant Playwright suites pass.
- No new serious axe violations.
- New behavior has tests beside the code or in `tests/`.
- Docs and memories updated when behavior changes.
