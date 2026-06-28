---
name: recall
description: Retrieve what a project already knows, with provenance and status, before asserting it. Use when grounding a statement, answering "what did we decide / find / read about X", or checking a draft's claims against the store. Auto-invoke by judgement whenever a claim could be verified against recorded knowledge. Drives kb-find; verifies each claim against its source before synthesizing.
---

# recall — retrieval reasoning

> **Status: STUB.** Contract below; body `TODO`.

## What this skill should do

Turn a question into grounded, cited knowledge — the reasoning layer over
`scripts/kb-find.ts`:

1. **Decompose** the query into retrievable sub-questions.
2. **Retrieve** header-first: `bun scripts/kb-find.ts "<sub-q>" [--substrate …] [--status …] [--hops …]`.
3. **Confidence-gate** on status: `event:CONJECTURED` is weak, `finding:VALIDATED`
   / `memory:validated` is firm, `lit:CITE` is citable prior art.
4. **Verify** each claim against its `source#anchor` — don't pass through a unit
   you didn't open.
5. **Synthesize** a calibrated answer that carries the substrate:status and the
   citation, so the caller (e.g. humanizer, grannie, a reviewer) can render it honestly.

This is where grounding lives (humanizer stays pure style). It is **auto-invoked
by judgement**: if a claim under discussion could be checked against the store, check it.

## TODO

- [ ] Decomposition heuristics; when to widen `--hops`.
- [ ] Confidence-gate mapping from status → how firmly to state it.
- [ ] Output shape that downstream renderers consume (claim · status · source#anchor).
