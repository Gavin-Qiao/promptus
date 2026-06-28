# Promptus

[![CI](https://github.com/Gavin-Qiao/promptus/actions/workflows/ci.yml/badge.svg)](https://github.com/Gavin-Qiao/promptus/actions/workflows/ci.yml)
[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

A file-based research knowledge system for Claude Code. It **stores / keeps / retrieves**
everything a research project knows — events (the ledger, right and wrong), external
literature, distilled findings, durable memory — as gated, well-formed markdown, and
**renders** that knowledge for an audience: a reviewer, a curious layperson, or the next
agent. The [`humanizer`](skills/humanizer/SKILL.md) writing skill is one renderer in the box.

> Latin *promptus* — "brought forth, ready, at hand": the store from which knowledge is
> brought out and made ready to write, to recall, to hand off.

## Why

The same virtues that make prose *human* make research *trustworthy*: calibrate to the
evidence, name your sources, keep your dead-ends. Promptus ties writing to one knowledge store
so what you write can't drift from what you actually know — calibrated confidence becomes
*sourced* (read from a unit's status), and citations point at real units.

## Install

Promptus is a Claude Code plugin. In Claude Code:

```
/plugin marketplace add Gavin-Qiao/promptus
/plugin install promptus@promptus
```

…or from the CLI:

```bash
claude plugin marketplace add Gavin-Qiao/promptus
claude plugin install promptus@promptus
```

Installing brings the bundled `scripts/`, and the skills, commands, and templates resolve them
via `${CLAUDE_PLUGIN_ROOT}` — nothing to vendor or copy in.

**Requirement:** [bun](https://bun.sh) ≥ 1.3 (the scripts are TypeScript on bun).

## Quick start

Stand up the four stores in a repo:

```
/promptus:promptus-init
```

Then just work — tell Claude what happened, and the `research-ledger` skill records it through
the gate. Under the hood that is:

```bash
# store a unit — body on stdin; the script owns the timestamp, id, placement, and the gate
echo "We chose bun for bun:sqlite later." | \
  bun scripts/kb-add.ts --substrate ledger --kind DECISION --status VALIDATED --title "Chose bun"

bun scripts/kb-index.ts        # rebuild the derived .promptus/CATALOG.md + graph.json
bun scripts/kb-find.ts "bun"   # header-first retrieval, with substrate + status
```

(Inside the Promptus repo the scripts are `bun scripts/…`; inside another project the skills
resolve them via `${CLAUDE_PLUGIN_ROOT}`.) Before you compact a session,
`/promptus:checkpoint` flushes anything unrecorded into the stores. New to the system?
`/promptus:help`.

## Architecture — four stores · three verbs · renderers

**Four stores** (per project), each unit tagged `substrate:status`:

| store | path | example tag |
|---|---|---|
| Telos | `TELOS.md` | — (direction) |
| Ledger | `ledger/RESEARCH-LEDGER.md` | `ledger:DEADEND` |
| Knowledge | `docs/` (findings) + `docs/lit/` (literature) | `finding:VALIDATED`, `lit:CITE` |
| Memory | `memory/` (one file per fact) | `memory:validated` |

**Three verbs** — the KAG mechanics are scripts, the reasoning is skills:

- **STORE** → `scripts/kb-add.ts` — the gated writer-jig. The LLM supplies only the prose body
  (stdin); the script owns the envelope, the local timestamp, the id, the placement, the index,
  typed relations, and the **hybrid gate** — *strict* for the curated library (finding/lit/memory:
  off-vocab input is refused with the allowed set), *permissive* for the lab-notebook ledger
  (an off-vocab kind/status is warned about but still written). `kb-export` emits the relation
  graph as CiTO/PROV-O JSON-LD.
- **BOOK-KEEP** → `scripts/kb-index.ts` (rebuild the derived `.promptus/CATALOG.md` card-catalog
  + `graph.json`, resolve supersedes, lint orphans / unresolved links) + `/promptus:checkpoint`.
- **RETRIEVE** → `scripts/kb-find.ts` (header-first: read the card-catalog, grep bodies, walk the
  `[[link]]` graph, filter by status) + the `recall` skill (decompose → retrieve →
  confidence-gate → verify → synthesize).

**Renderers** project the store to an audience: `humanizer` (paper voice, with a *ground* mode),
`grannie` (plain-language ELI90), and a `grounded-writing-reviewer` agent.

## The invariant

> markdown is the only source of truth · the index is derived & disposable · writes go through
> a gated script, never freehand · prefer a script over a server · add machinery (embeddings, a
> graph DB) only past a threshold you've **measured**, never on spec.

A hand-written header is a better retrieval key than a vector for a small, dense, status-tagged
corpus, and the `[[links]]` in markdown *are* the graph — so v1 has no embeddings and no DB.
Both turn on only at the papers-scale crossing (see [`docs/report.md`](docs/report.md)).

## Command & skill reference

| command | what it does |
|---|---|
| `/promptus:help` | the map — stores, verbs, and where to start |
| `/promptus:promptus-init` | scaffold the four stores + the `AGENTS.md` cadence in a repo (idempotent) |
| `/promptus:checkpoint` | minimal pre-compaction flush — store what's unrecorded, refresh the NOW-header |

| skill | role |
|---|---|
| `promptus` | orchestrator — picks the right verb / script / skill |
| `research-ledger` | the store-as-you-go recording habit (append via `kb-add`, never freehand) |
| `recall` | retrieval reasoning — decompose → `kb-find` → verify each claim → synthesize |
| `humanizer` | writing renderer (paper voice); *ground* mode cites + calibrates from the store |
| `grannie` | plain-language ELI90 renderer for a stored concept |
| `telos` | scaffold a project's four stores, Telos first |

Plus the **`grounded-writing-reviewer`** agent — audits a draft for AI-writing tells *and* for
unsourced or over-confident claims, checking each against the store.

## Hooks (optional)

When the plugin is enabled, four hooks activate — each a strict no-op outside a
Promptus-initialized repo (no `TELOS.md` / ledger), so other projects are untouched:

- **SessionStart** injects the ledger's NOW-header, so a resuming agent wakes up oriented.
- **PreToolUse** blocks freehand writes that add a `### [ts]` log line or touch `.promptus/`,
  pointing at `kb-add` — the gate, enforced. Editing the NOW-header (at `/promptus:checkpoint`)
  stays allowed.
- **PostToolUse** re-runs `kb-index` after a `kb-add`, so the derived catalog never drifts.
- **SessionEnd** nudges you to `/promptus:checkpoint`.

To disable any of them, remove its entry from [`hooks/hooks.json`](hooks/hooks.json), or turn
off the plugin's hooks in your Claude Code settings.

## Layout

```
scripts/    kb-add · kb-index · kb-find · kb-export · ledger-append · validate-plugin · changelog · lib/ · test/
schema/     kb-vocab.json — the controlled vocab the gate validates against
skills/     promptus (orchestrator) · humanizer · recall · grannie · research-ledger · telos
commands/   help · checkpoint · promptus-init
agents/     grounded-writing-reviewer
hooks/      session-start · protect-gate · auto-index · checkpoint-nudge (+ hooks.json)
templates/  the per-project four-store scaffolds
docs/       Promptus's own knowledge (report, adoption)
```

## Development

```bash
bun test                       # the store-spine tests
bun run check                  # plugin validator + tests
claude plugin validate         # the full plugin check (needs the Claude CLI)
```

Promptus **dogfoods** its own methodology: it maintains its own `TELOS.md`, ledger, and `docs/`
through its own scripts. Contributions go through `.pre-commit-config.yaml` (hygiene on commit,
validator + tests on push) and CI. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the conventions
and [`RELEASING.md`](RELEASING.md) for how releases are cut. Changes are recorded in
[`CHANGELOG.md`](CHANGELOG.md).

## License

Promptus is licensed under **Apache-2.0** (© 2026 Mohan Qiao) — see [`LICENSE`](LICENSE).

The [`skills/humanizer`](skills/humanizer/SKILL.md) skill is an extended fork of
[blader/humanizer](https://github.com/blader/humanizer) by Siqi Chen; its Part I (29 removal
patterns) remains under the upstream **MIT** license (© 2025 Siqi Chen), retained in
[`LICENSE-humanizer`](LICENSE-humanizer). Part II (14 positive "human factor" patterns) is this
fork's addition. Provenance and changes are in [`NOTICE`](NOTICE). Personal-use project.
