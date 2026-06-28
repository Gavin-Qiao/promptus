---
name: promptus
description: Orchestrator and map for the Promptus research knowledge system. Use at the start of research book-keeping to choose the right verb/script/skill — STORE (kb-add), BOOK-KEEP (kb-index + /checkpoint), RETRIEVE (kb-find + recall), RENDER (humanizer, grannie). Knows the four stores (Telos, Ledger, Knowledge, Memory), the substrate:status tagging, and the invariant.
---

# Promptus — orchestrator

> **Status: STUB.** Contract below; body `TODO`.

## What this skill should do

Be the map. When a user is doing research book-keeping, route them to the right
piece and explain the shape, then hand off:

- **STORE** something happened/was found/was read → `bun scripts/kb-add.ts …`
  (or the `research-ledger` skill for the proactive habit).
- **BOOK-KEEP** → `bun scripts/kb-index.ts` (rebuild the derived index) and
  `/checkpoint` (lossless flush before compaction).
- **RETRIEVE** → the `recall` skill (which drives `kb-find`).
- **RENDER** → `humanizer` (style), `grannie` (explain).

Hold the four stores and the **invariant** (markdown is truth · index is derived ·
writes go through a gated script · prefer a script over a server · add machinery
only past a measured threshold). Point at `TELOS.md` for the canonical statement.

## TODO

- [ ] Decision table: intent → verb → exact command/skill.
- [ ] The "auto-invoke store lookup by judgement" rule (when to reach for `recall`
      without being asked).
- [ ] When NOT to use Promptus (trivial/throwaway work).
