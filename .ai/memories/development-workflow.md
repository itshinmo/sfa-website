---
description: Commands, gates, and the change workflow. Read before starting and before handoff.
last-verified: 2026-11-02
---

# Development workflow

Commands and troubleshooting: [`docs/runbook.md`](../../../docs/runbook.md).

- Route the change: architectural → spec/RFC; UI → design brief; otherwise
  implement directly.
- Verify: `pnpm check`; add `pnpm build`, `pnpm test:e2e`, `pnpm test:a11y`,
  `pnpm test:seo` when routes/API/SEO/UI changed.
- Dev server: `pnpm dev` on `127.0.0.1:3000`.
- No `git add`/`commit`/`push` unless the author asks.
- Update docs/decisions/memories when behavior changes
  ([knowledge-drift-sync](../../skills/knowledge-drift-sync/SKILL.md)).
- Resolve working memories tied to the change.
- Parallel work: read
  [`parallel-coordination`](../../skills/parallel-coordination/SKILL.md) and the
  [task board](../working/sfa-website/README.md).
