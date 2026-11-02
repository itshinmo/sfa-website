# ADR-006 — Agent-agnostic knowledge layer

- **Status:** Accepted
- **Date:** 2026-11-02
- **Topic:** process

## Context

The project should support multiple coding agents without duplicating
instructions. The author uses an agent-agnostic pattern successfully in another
repository: one instruction source, symlinked tool adapters, and project
knowledge that stands alone.

## Decision

Adopt `AGENTS.md` as the only instruction source, `CLAUDE.md` as a pointer,
and symlinks from `.claude`, `.opencode`, and `.agents` into `.ai/`. Project
knowledge lives in `docs/`, `decisions/`, and `rfcs/`; `.ai/` holds memories,
skills, roles, templates, and local specs. A precedence order and approval gate
apply. The layer is a simplified version of the sudo-overclock pattern.

## Consequences

- Removing AI tooling leaves the site and its knowledge intact.
- Agents share one source of truth and one vocabulary.
- Tool adapters are symlinks; Windows contributors need `core.symlinks`.
- Parallel agents coordinate through `.ai/memories/working/` and the
  `parallel-coordination` skill.
