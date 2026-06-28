# AGENTS.md — working in the Promptus repo

This repo dogfoods its own methodology. When you work here, you are both building
the toolbox and using it.

> **Current state: v0.1 — spine implemented and tested.** `kb-add` / `kb-index` /
> `kb-find` + `lib/` work (`bun test` green); the `promptus`, `humanizer`, `recall`,
> `grannie`, `telos`, and `research-ledger` skills are written. Still scaffolded:
> the overnight-handoff renderer.

## Cadence (once the spine is implemented)

1. **Read `TELOS.md` first.** It holds the north star and the invariant that never bends.
2. **Store as you go.** Don't hand-edit the ledger or `docs/`. Every unit goes in
   through the gated writer-jig:
   ```
   echo "<prose body>" | bun scripts/kb-add.ts --substrate ledger --kind RESULT --status VALIDATED --title "…"
   ```
   The script owns the timestamp, the id, the placement, and the catalog update.
   This is the drift fix — freehand appends are how the old ledger lost a day.
3. **Re-index after a batch of writes.** `bun scripts/kb-index.ts` rebuilds the
   derived `.promptus/CATALOG.md` + `graph.json` and lints orphans / broken links.
4. **Retrieve header-first.** `bun scripts/kb-find.ts "<query>"` before you claim
   anything the repo already knows.
5. **Checkpoint before you compact.** `/checkpoint` flushes anything un-recorded
   into the stores (so a compaction can't lose it), reconciles memory, then tidies.

## Conventions

- Commits: Conventional Commits `type(scope):` + flat `-` bullet body. **Omit** `Co-Authored-By`.
- Never `--no-verify`. Forward-slash paths everywhere.
- Scripts are **TypeScript on bun** (`#!/usr/bin/env bun`); tests via `bun test`.
  `bun:sqlite` only past a measured threshold (see the invariant).
- License: GPL-3.0 (© 2026 Mohan Qiao). The `skills/humanizer` fork includes Part I from
  blader/humanizer (© 2025 Siqi Chen, MIT); that upstream notice is preserved in `NOTICE`.
- Don't commit or push unless asked.

## Layout

- `scripts/` — the KAG mechanics (kb-add / kb-index / kb-find + `lib/`).
- `schema/kb-vocab.json` — the controlled vocab the writer-jig validates against.
- `skills/` — reasoning: `promptus` (orchestrator), `humanizer` (real), `recall`,
  `grannie`, `research-ledger`, `telos`.
- `commands/` — `checkpoint`, `promptus-init`.
- `agents/` — `grounded-writing-reviewer`.
- `templates/` — per-project four-store scaffolds.
- `docs/` — Promptus's own knowledge (`report.md`, `adoption.md`), maintained via `kb-add`.
