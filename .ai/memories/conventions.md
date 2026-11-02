---
description: Naming, imports, styling, tests, and comments. Read before writing code.
last-verified: 2026-11-02
---

# Conventions

Contract: [`AGENTS.md`](../../../AGENTS.md), [`docs/architecture.md`](../../../docs/architecture.md),
[`docs/design-system.md`](../../../docs/design-system.md).

- Files and folders kebab-case; components PascalCase.
- No barrel files except a module composition file (`blog-module.ts`).
- Routes compose; they do not import module infrastructure.
- Use `cn()` for classes and CVA for variants.
- No raw values outside `app/styles/tokens.css`.
- Every `className`-bearing layer carries `data-slot`.
- Use logical CSS properties for RTL.
- No hardcoded UI strings; add fa/en keys.
- Tests: Vitest beside logic or in `tests/unit`; Playwright in `tests/e2e`,
  `tests/a11y`, `tests/seo`.
- Query by role/name, not classes.
- Comments only for non-obvious constraints or file headers in scripts.
- No secrets, tokens, or private hostnames.
