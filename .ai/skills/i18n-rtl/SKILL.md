---
name: i18n-rtl
description: Use when adding UI copy, routes, blog locales, language switching, dates/numbers, or direction-sensitive layout. Enforces fa/en parity and RTL correctness.
---

# i18n-rtl

## Prerequisites

- [`docs/i18n-rtl.md`](../../../docs/i18n-rtl.md)
- `app/locales/fa` and `app/locales/en`
- `app/middleware/i18next.ts`

## Workflow

1. Add keys to both locales; the Persian file is the type source of truth.
2. Use namespaces (`common`, `home`, `blog`, `notFound`) consistently.
3. Use logical CSS properties; audit `left`/`right` usage.
4. Flip directional icons; do not mirror logos or images.
5. Use `Intl` for dates/numbers; check Persian digits.
6. For blog language switching, use `alternates` from the API.
7. Add/update E2E for both locales and localized slugs.
8. Check contrast and layout at 360px in both directions.
9. Normalize Persian search input (ی/ي, ک/ك, ZWNJ, diacritics).

## Constraints

- No hardcoded UI strings.
- No `dir` overrides on arbitrary elements for layout hacks.
- No prefix-swapping on localized slugs.
- No missing-translation empty states; show the API fallback notice.

## Expected output

Locale-complete UI, RTL/LTR verification, and tests for both directions.
