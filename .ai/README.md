# .ai — agent knowledge layer

Agent-facing orientation only. Project knowledge lives in
[`docs/`](../docs/), [`decisions/`](../decisions/), and [`rfcs/`](../rfcs/).
If every AI tool and this directory were removed, the site and its decisions
would still stand on their own.

Entry point: [`AGENTS.md`](../AGENTS.md). Tool adapters (`CLAUDE.md`,
`.claude/`, `.opencode/`, `.agents/`) are pointers/symlinks and never contain
content.

## Placement rules

| Location                | Holds                                 | Test question                                          |
| ----------------------- | ------------------------------------- | ------------------------------------------------------ |
| `docs/`                 | current behavior, rules, procedures   | Would a human need it without AI?                      |
| `decisions/`            | accepted decisions and why            | Does it record a hard-to-reverse choice?               |
| `rfcs/`                 | proposals                             | Is it proposed, not decided?                           |
| `.ai/memories/`         | short present-state orientation       | Does it help an agent decide without being a contract? |
| `.ai/memories/working/` | committed in-flight context           | Is it still unresolved?                                |
| `.ai/skills/`           | repeatable workflows                  | Is it a reusable class of task?                        |
| `.ai/agents/`           | role behavior and boundaries          | Does it apply to one role only?                        |
| `.ai/templates/`        | specs, RFCs, ADRs, memories, handoffs | —                                                      |
| `.ai/specs/`            | local task specs (gitignored)         | Is it one deliverable's working spec?                  |

Rules: link, do not copy. Memories describe the present. Runtime code never
reads `.ai/`. No secrets or private hostnames.

## Index

### Memories

- [`overview.md`](./memories/overview.md) — what the project is.
- [`architecture.md`](./memories/architecture.md) — layers and data flow.
- [`conventions.md`](./memories/conventions.md) — code, styles, tests.
- [`design.md`](./memories/design.md) — token/identity guardrails.
- [`blog-api.md`](./memories/blog-api.md) — the read-only API boundary.
- [`development-workflow.md`](./memories/development-workflow.md) — commands and gates.
- [`working/README.md`](./memories/working/README.md) — in-flight context lifecycle.
- [`working/sfa-website/README.md`](./memories/working/sfa-website/README.md) — current task board.

### Agents

- [`documenter.md`](./agents/documenter.md) — specs, RFCs, ADRs, docs, API contract.
- [`designer.md`](./agents/designer.md) — identity, tokens, motion, conformance.
- [`implementer.md`](./agents/implementer.md) — code and tests.
- [`reviewer.md`](./agents/reviewer.md) — architecture, design, drift.
- [`content-strategist.md`](./agents/content-strategist.md) — homepage copy, migration, translation QA.
- [`quality-auditor.md`](./agents/quality-auditor.md) — a11y, SEO, E2E, performance.

Typical flow: documenter → designer (direction/tokens) → implementer →
quality-auditor → reviewer (on request) → author review. Content strategist
works alongside for copy and migration.

### Skills

- [`design-a-feature`](./skills/design-a-feature/SKILL.md)
- [`accessibility-first`](./skills/accessibility-first/SKILL.md)
- [`seo-ssr`](./skills/seo-ssr/SKILL.md)
- [`i18n-rtl`](./skills/i18n-rtl/SKILL.md)
- [`motion-system`](./skills/motion-system/SKILL.md)
- [`blog-api-presentation`](./skills/blog-api-presentation/SKILL.md)
- [`web-performance`](./skills/web-performance/SKILL.md)
- [`content-migration`](./skills/content-migration/SKILL.md)
- [`knowledge-drift-sync`](./skills/knowledge-drift-sync/SKILL.md)
- [`write-an-rfc`](./skills/write-an-rfc/SKILL.md)
- [`parallel-coordination`](./skills/parallel-coordination/SKILL.md)

### Templates

[`spec`](./templates/spec.md), [`rfc`](./templates/rfc.md),
[`adr`](./templates/adr.md), [`memory`](./templates/memory.md),
[`working-memory`](./templates/working-memory.md),
[`skill`](./templates/skill.md), [`agent`](./templates/agent.md),
[`handoff`](./templates/handoff.md).
