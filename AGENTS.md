# AGENTS.md — working in the Promptus repo

This repo dogfoods its own methodology. When you work here, you are both building
the toolbox and using it. This file is the portable read surface (the `AGENTS.md`
convention); the fuller map is `/promptus:help` and the `promptus` skill.

> **Current state: v0.5.1 (unreleased).** The store / keep / retrieve spine is complete and
> tested (`bun test` green): STORE `kb-add` (+ the NOW-header writer `kb-now`), KEEP `kb-index`
> + `kb-graph` (`rank` / `lint` / `suggest`), RETRIEVE `kb-find` → `kb-get`. Skills: `promptus`,
> `recall`, `humanizer`, `grannie`, `telos`, `research-ledger`. The agent operates the verbs;
> `grannie` is the one human read-port. Embedding-scale machinery stays deferred (the invariant).

## Cadence

1. **Read `.promptus/TELOS.md` first.** It holds the north star and the invariant that never bends.
2. **Store as you go.** Don't hand-edit the ledger or `.promptus/docs/`. Every unit goes in
   through the gated writer-jig:
   ```
   echo "<prose body>" | bun scripts/kb-add.ts --substrate ledger --kind RESULT --status VALIDATED --title "…"
   ```
   The script owns the timestamp, the id, the placement, and the catalog update.
   This is the drift fix — freehand appends are how the old ledger lost a day.
3. **Re-index after a batch of writes.** `bun scripts/kb-index.ts` rebuilds the derived
   `.promptus/cache/CATALOG.md` + `graph.json`; `bun scripts/kb-graph.ts lint` checks graph
   health (dangling `[[handles]]`, orphans).
4. **Retrieve header-first.** `bun scripts/kb-find.ts "<query>"` (then `kb-get` for a unit's
   body) before you claim anything the repo already knows; every hit carries its `substrate:status`.
5. **Checkpoint before you compact.** `/promptus:checkpoint` flushes anything un-recorded into the
   stores (so a compaction can't lose it), refreshes the NOW-header, reconciles memory.

## Conventions

- Commits: Conventional Commits `type(scope):` + flat `-` bullet body. **Omit** `Co-Authored-By`.
  No emoji in commits, PR bodies, or release notes.
- Never `--no-verify`. Forward-slash paths everywhere.
- Scripts are **TypeScript on bun** (`#!/usr/bin/env bun`); tests via `bun test`.
  `bun:sqlite` / embeddings only past a measured threshold (see the invariant).
- License: GPL-3.0 (© 2026 Mohan Qiao). The `skills/humanizer` fork includes Part I from
  blader/humanizer (© 2025 Siqi Chen, MIT); that upstream notice is preserved in `NOTICE`.
- Don't commit or push unless asked.

## Layout

- `scripts/` — the mechanics: `kb-add` / `kb-now` (STORE), `kb-index` / `kb-graph` (KEEP),
  `kb-find` / `kb-get` (RETRIEVE), plus `kb-export`, `kb-ingest`, `promptus-doctor`, and `lib/`.
- `.promptus/schema/kb-vocab.json` — the controlled vocab the writer-jig validates against.
- `skills/` — reasoning: `promptus` (orchestrator), `recall`, `humanizer`, `grannie`,
  `research-ledger`, `telos`.
- `commands/` — `help`, `checkpoint`, `promptus-init`, `promptus-doctor`, `promptus-ingest`, `promptus-graph`.
- `agents/` — `grounded-writing-reviewer`.
- `templates/` — per-project four-store scaffolds.
- `.promptus/docs/` — Promptus's own knowledge (`report.md`, findings + `lit/`), maintained via `kb-add`.
