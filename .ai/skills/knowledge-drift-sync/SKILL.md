---
name: knowledge-drift-sync
description: Use before finishing any non-trivial change. Reconciles code with docs, decisions, API contract, memories, and tests so no knowledge is stale.
---

# knowledge-drift-sync

## Prerequisites

- The change under review (`git diff` or working tree)
- [`AGENTS.md`](../../../AGENTS.md) knowledge table
- [`docs/blog-api.md`](../../../docs/blog-api.md) when API behavior changed

## Workflow

1. List behavior/structure changes: routes, modules, API, templates, tokens,
   i18n, SEO, motion, tests, deployment.
2. Find each item's canonical home and update it:
   - current behavior → `docs/`;
   - hard-to-reverse choice → `decisions/`;
   - proposal → `rfcs/`;
   - orientation → `.ai/memories/`;
   - reusable workflow → `.ai/skills/`.
3. Update `last-verified` on checked memories.
4. Resolve working memories tied to the change.
5. Check relative links in changed Markdown.
6. Report what was synchronized or state “no drift” with evidence.

## Constraints

- Follow the precedence order; ask when code and docs disagree and intent is
  unclear.
- Never silently choose one source.
- No duplicate knowledge; link.

## Expected output

A drift report and the doc/code changes in the same change.
