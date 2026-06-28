---
description: Flush everything important into the Promptus stores before compacting a session — so a context compaction can't lose it.
argument-hint: "[optional scope note]"
---

# /checkpoint — lossless flush before compaction

> **Status: STUB.** Contract below; body `TODO`.

You are about to compact (or end) a session. The goal is simple: **lose nothing.**

## What this command should do

1. **Sweep the session for un-recorded knowledge** — decisions made, runs done,
   observations, dead-ends, findings, prior art read — anything that exists only in
   the conversation and not yet in a store.
2. **Write each through the gate** with `bun scripts/kb-add.ts` (the right substrate
   + status). Never freehand into the ledger.
3. **Reconcile memory** — promote settled facts to `memory:validated`; retire what's
   superseded; don't relearn next session what was settled this one.
4. **Re-index** — `bun scripts/kb-index.ts` to rebuild the catalog/graph and surface
   orphans or broken links.
5. **Then tidy (semantic, not formatting):** contradictions, stale claims, obvious
   dedup, latent links worth drawing. Format-linting is unnecessary — nothing here
   was hand-typed.
6. **Report** what was flushed, so the user can trust the compaction is safe.

The emphasis is capture-before-loss; the tidy is secondary.

## TODO

- [ ] The sweep heuristic: how to find what's un-recorded in a long session.
- [ ] Memory reconcile rules (promote / retire / leave provisional).
- [ ] What to surface in the report vs handle silently.
