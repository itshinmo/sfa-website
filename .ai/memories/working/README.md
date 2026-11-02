# Working memories

Committed, temporary context: investigations, hypotheses, open questions, and
in-flight work that must survive sessions/tools. Not contracts or procedures.
Local, throwaway specs stay in `.ai/specs/` (gitignored).

Create from [`../../templates/working-memory.md`](../../templates/working-memory.md).

## Lifecycle

- Resolve before the linked change lands: promote durable parts, then delete.
- Promote current behavior → `docs/`; decisions → `decisions/`; proposals →
  `rfcs/active/`; agent orientation → `.ai/memories/`; workflows → `.ai/skills/`.
- An idle working memory (30 days) is promoted, updated, or deleted.
