# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## What this repo is

**Promptus** — a file-based research knowledge system for Claude Code: store / keep /
retrieve a project's knowledge as gated markdown, and render it for an audience. The
[`humanizer`](skills/humanizer/SKILL.md) writing skill (a fork of blader/humanizer) is
one renderer in the box. See [`TELOS.md`](TELOS.md) for the north star + the invariant and
[`README.md`](README.md) for the overview.

## Source of truth

- **Behavior** lives in two places: the `scripts/` (the KAG mechanics — TypeScript on bun)
  and the `skills/` + `commands/` + `agents/` (the markdown that tells the agent how to use
  them). `schema/kb-vocab.json` is the controlled vocab the writer-jig validates against.
- **Markdown is the only source of truth** for stored knowledge; `.promptus/` (the catalog +
  graph) is derived, gitignored, and rebuilt by `kb-index` — never hand-edit it.

## Key files

- `scripts/kb-add.ts` — the gated writer-jig (the ONE way knowledge enters a project).
- `scripts/kb-index.ts` — rebuild the derived card-catalog + graph; lint.
- `scripts/kb-find.ts` — header-first retrieval.
- `scripts/lib/` — clock / ids / links / frontmatter / vocab / paths.
- `scripts/test/` — `bun test` (lib unit tests + store-spine integration tests).
- `skills/`, `commands/`, `agents/` — the reasoning layer (see `skills/promptus/SKILL.md` for the map).
- `templates/` — the per-project four-store scaffolds (`/promptus-init` drops these in).

## Common commands

```bash
bun test                                # run the test suite
bun scripts/kb-add.ts --substrate … …   # store a unit (body on stdin)
bun scripts/kb-index.ts                 # rebuild .promptus/CATALOG.md + graph.json
bun scripts/kb-find.ts "<query>"        # retrieve header-first
```

## Conventions

- Conventional Commits `type(scope):` + a flat `-` bullet body; **omit** `Co-Authored-By`.
- Never `--no-verify`. Forward-slash paths. Don't commit or push unless asked.
- Scripts: TypeScript on bun (`#!/usr/bin/env bun`); stdlib-first; `bun:sqlite` only past a
  measured threshold (see the invariant in `TELOS.md`).
- Promptus is GPL-3.0 (© 2026 Mohan Qiao). The `skills/humanizer` fork incorporates Part I from
  blader/humanizer (© 2025 Siqi Chen, MIT); that upstream MIT notice is preserved in `NOTICE`.
