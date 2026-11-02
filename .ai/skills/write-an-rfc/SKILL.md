---
name: write-an-rfc
description: Use when a change is architectural, cross-cutting, or has meaningful alternatives. Routes the work to a spec, RFC, or ADR and carries it to implementation.
---

# write-an-rfc

## Prerequisites

- [`rfcs/README.md`](../../../rfcs/README.md)
- [`decisions/README.md`](../../../decisions/README.md)
- [`.ai/templates/rfc.md`](../../templates/rfc.md)

## Workflow

1. Route:
   - real alternatives → RFC in `rfcs/active/`;
   - hard-to-reverse choice without alternatives → ADR directly;
   - otherwise → local spec in `.ai/specs/`.
2. Draft the RFC with context grounded in files/measurements, options, and
   consequences.
3. One decision per RFC.
4. Status Draft → Proposed; the author moves it to Accepted.
5. Do not implement before Accepted.
6. On ship: update `docs/`, write the ADR, cross-link, set Implemented, move to
   `rfcs/archived/`, update indexes.

## Constraints

- Never fabricate numbers or sources; unknowns are open questions.
- Unaccepted RFCs never override docs/ADRs.
- Do not rewrite accepted ADRs; supersede them.

## Expected output

The RFC/ADR, updated indexes, and open questions for the author.
