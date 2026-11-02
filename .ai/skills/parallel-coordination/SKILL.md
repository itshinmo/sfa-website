---
name: parallel-coordination
description: Use when multiple subagents work at once. Defines file ownership, the shared working-memory blackboard, handoffs, and integration order so parallel work does not conflict.
---

# parallel-coordination

## Prerequisites

- `.ai/memories/working/sfa-website/README.md`
- `contracts.md`, `tasks.md`, `questions.md`
- A frozen contract for routes, tokens, API, and i18n keys

## Model

Hub-and-spoke, not peer-to-peer chat. The orchestrator owns shared files and
integration. Writers use disjoint file sets; when two writers need the same
file, it is owned by the orchestrator or sequenced.

## Workflow

1. Freeze contracts before parallel writes:
   - route map;
   - API DTO/schemas;
   - token names and component interfaces;
   - i18n keys.
2. Create tasks with: id, owner, files, dependencies, acceptance, status.
3. Each agent reads the contract/task files before starting.
4. Each agent writes only its owned files and updates its task status.
5. Handoff note: changed files, verification, open questions, next step.
6. Orchestrator resolves `questions.md`, merges in order, runs the full gates.
7. Resolve the working memory when the initiative ships.

## Concurrency rules

- Maximum 2–3 concurrent writers.
- Use separate git worktrees for writers.
- Shared files (`package.json`, routes, root, tokens, schemas) have one owner.
- No parallel package installs/builds that mutate the same lockfile.
- No parallel changes to the same route or component.
- Read-only research/audit agents may run in parallel freely.

## Good parallel work

- Design lab direction vs. API mock/contract vs. content inventory.
- Homepage sections vs. blog templates vs. test scaffolding, after contracts.
- Independent audits (a11y, SEO, performance).

## Bad parallel work

- Auth/architecture/design foundations before decisions.
- Two agents editing `app/routes.ts`, tokens, or `package.json`.
- Final integration and deployment.

## Expected output

A merged change with a clean task board, handoffs, and green quality gates.
