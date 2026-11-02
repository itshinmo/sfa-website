## Summary

<!-- What changed and why. Link the spec, ADR, or task. -->

## Verification

- [ ] `pnpm check`
- [ ] `pnpm build` (if routes/API/UI changed)
- [ ] `pnpm test:e2e`
- [ ] `pnpm test:a11y`
- [ ] `pnpm test:seo`

## Checklist

- [ ] Scope is presentation-only (no auth, checkout, tickets, CMS, blog editor).
- [ ] No raw design values outside `app/styles/tokens.css`.
- [ ] fa/en keys added; RTL checked.
- [ ] Accessibility checked (keyboard, focus, axe).
- [ ] SEO metadata/`hreflang`/JSON-LD updated when routes changed.
- [ ] Docs/decisions/memories updated.
- [ ] No secrets or private hostnames.
