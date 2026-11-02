# Internationalization and RTL

## Locales

- Persian (`fa`) is the default.
- English (`en`) is the second locale.
- Public URLs are `/{locale}/...`.
- `/` redirects permanently to `/fa`.
- `/design-lab` is outside the locale tree and is noindex.

## Detection

`remix-i18next` middleware in `app/middleware/i18next.ts` detects the locale in
this order:

1. pathname (`/fa`, `/en`);
2. locale cookie (`sfa-locale`);
3. `Accept-Language`;
4. fallback `fa`.

The root loader serializes the locale cookie. The root layout sets
`<html lang dir>`. `entry.server.tsx` provides the i18n instance to SSR;
`entry.client.tsx` hydrates with the same locale and bundled resources.

`findLocale` reads the first pathname segment so the URL always wins over a
stale cookie.

## Resources

- `app/locales/fa/` is the source of truth for types.
- `app/locales/en/` uses `satisfies typeof fa...` so missing keys are compile
  errors.
- Namespaces: `common`, `home`, `blog`, `notFound`.
- `app/locales/index.ts` exports `resources`, `supportedLanguages`, and
  `defaultLanguage`.
- Add a namespace to both locales and register it in `fa/index.ts` and
  `en/index.ts`.
- No hardcoded UI strings. Proper nouns and API data are exceptions.

## Localized slugs

Blog slugs are localized:

- `fa`: `/fa/blog/مثلث-بافت-خاک`
- `en`: `/en/blog/soil-texture-triangle`

The API returns `alternates` with the real slug per locale. Use those for:

- language switching on blog pages;
- `hreflang` links;
- canonical URLs.

Do not mechanically swap the locale prefix on a localized slug; the slug may
not exist in the other language.

The `LanguageSwitcher` in `SiteHeader` reads the active blog post's
`alternates` from route matches; otherwise it swaps the locale prefix. Add a
regression test whenever the blog loader shape changes.

## Fallback

If a translation is missing, the API may return the other language with
`contentLocale` and `isFallback: true`. The UI must show a notice, and
`hreflang` must only list real translations. The fallback notice is in the
`blog` namespace.

## RTL rules

- Use logical CSS properties: `ms`, `me`, `ps`, `pe`, `start`, `end`,
  `text-start`, `border-s`, `border-e`.
- Avoid `left`/`right` for layout. Use them only when the physical direction is
  genuinely required.
- Flip directional icons (arrows, chevrons, back/forward) with
  `rtl:-scale-x-100` or a direction-aware icon choice.
- Test both directions at 360px, 768px, and 1440px.
- Do not mirror images or logos.
- Use `dir="auto"` only for user-generated mixed-direction strings; page
  direction comes from `<html dir>`.
- Use `<bdi>` for mixed-language names or technical terms when needed.

## Formatting

- Dates: `Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US")`.
- Numbers: `Intl.NumberFormat` with the active locale.
- Persian digits are used by `fa-IR` by default; confirm with the author before
  forcing Latin digits.
- Relative time, plurals, and lists should use `Intl` or i18next features, not
  string concatenation.

## Persian search normalization

`app/shared/lib/normalize.ts` normalizes:

- Arabic `ي`/`ك` to Persian `ی`/`ک`;
- `ۀ`, `ة`, `أ`, `إ`, `آ`, `ٱ`;
- diacritics and tatweel;
- ZWNJ to a space;
- repeated whitespace;
- case for Latin text.

The backend search should apply equivalent normalization. If it does not, the
website can still filter the mock/all-post index, but API-driven search is the
target.

## Tests

- Unit tests for locale normalization.
- E2E: `/fa`, `/en`, language switch, localized blog slug.
- SEO: `hreflang` and canonical for both locales.
- A11y: both directions.
- Visual: RTL/LTR screenshots at mobile and desktop.
