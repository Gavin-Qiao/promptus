# Promptus

A file-based research knowledge system for Claude Code. It **stores / keeps / retrieves**
everything a research project knows — events (the ledger, right and wrong), external
literature, distilled findings, durable memory — as gated, well-formed markdown, and
**renders** that knowledge for an audience: a reviewer, a curious layperson, or the next
agent. The [humanizer](skills/humanizer/SKILL.md) writing skill is one renderer in the box.

> Latin *promptus* — "brought forth, ready, at hand": the store from which knowledge is
> brought out and made ready to write, to recall, to hand off.

> **Status: v0.1 scaffold.** The store spine (`kb-add` / `kb-index` / `kb-find` + lib) is
> implemented and tested (`bun test` → green). Skills, commands, and docs are written against
> their contracts. See [`TELOS.md`](TELOS.md) for the north star and the invariant.

## The idea

The same virtues that make prose *human* make research *trustworthy*: calibrate to the
evidence, name your sources, keep your dead-ends. Promptus ties writing to one knowledge
store so what you write can't drift from what you actually know — calibrated confidence
becomes *sourced* (read from a unit's status), and citations point at real units.

## Architecture — four stores · three verbs · renderers

**Four stores** (per project), each unit tagged `substrate:status`:

| store | path | example tag |
|---|---|---|
| Telos | `TELOS.md` | — (direction) |
| Ledger | `ledger/RESEARCH-LEDGER.md` | `ledger:DEADEND` |
| Knowledge | `docs/` (findings) + `docs/lit/` (literature) | `finding:VALIDATED`, `lit:CITE` |
| Memory | `memory/` (one file per fact) | `memory:validated` |

**Three verbs** — the KAG mechanics are scripts, the reasoning is skills:

- **STORE** → `scripts/kb-add.ts` — the gated writer-jig. The LLM supplies only the prose
  body (stdin); the script owns the envelope, the local timestamp, the id, the placement, the
  index, and the **validation gate** (off-vocab kind/status, a `lit` unit with no source, or
  an empty title is refused with the allowed set).
- **BOOK-KEEP** → `scripts/kb-index.ts` (rebuild the derived `.promptus/CATALOG.md` card-catalog
  + `graph.json`, resolve supersedes, lint orphans / unresolved links) + `/checkpoint`.
- **RETRIEVE** → `scripts/kb-find.ts` (header-first: read the card-catalog, grep bodies, walk
  the `[[link]]` graph, filter by status) + the `recall` skill (decompose → retrieve →
  confidence-gate → verify → synthesize).

**Renderers** project the store to an audience: `humanizer` (paper voice), `grannie`
(`/grannie explain …`, plain-language ELI90), and a `grounded-writing-reviewer` agent.

## The invariant

> markdown is the only source of truth · the index is derived & disposable · writes go
> through a gated script, never freehand · prefer a script over a server · add machinery
> (embeddings, a graph DB) only past a threshold you've **measured**, never on spec.

A hand-written header is a better retrieval key than a vector for a small, dense,
status-tagged corpus, and the `[[links]]` in markdown *are* the graph — so v1 has no
embeddings and no DB. Both turn on only at the papers-scale crossing (see [`docs/report.md`](docs/report.md)).

## Quick start

```bash
bun test                                   # run the store-spine tests

# in a project (a repo with a TELOS.md):
echo "We chose bun for bun:sqlite later." | \
  bun scripts/kb-add.ts --substrate ledger --kind DECISION --status VALIDATED --title "Chose bun"
bun scripts/kb-index.ts                     # rebuild the derived catalog + graph
bun scripts/kb-find.ts "bun"                # header-first retrieval
```

To stand up the four stores in a new repo: `/promptus-init` (runs the `telos` skill). To
adopt Promptus in an existing project, see [`docs/adoption.md`](docs/adoption.md).

## Layout

```
scripts/    kb-add · kb-index · kb-find · ledger-append (forwarder) · lib/ · test/
schema/     kb-vocab.json — the controlled vocab the gate validates against
skills/     promptus (orchestrator) · humanizer · recall · grannie · research-ledger · telos
commands/   checkpoint · promptus-init
agents/     grounded-writing-reviewer
templates/  the per-project four-store scaffolds
docs/       Promptus's own knowledge (report, adoption)
```

## Requirements

[bun](https://bun.sh) (scripts are TypeScript on bun; `bun:sqlite` is a deferred, measured
upgrade — not used yet). Tested on Windows; paths use forward slashes.

## Attribution

The `humanizer` skill is an extended fork of [blader/humanizer](https://github.com/blader/humanizer)
by Siqi Chen (MIT) — its 29 removal patterns (Part I) plus this fork's 14 positive "human
factor" patterns (Part II). The upstream copyright and license are retained in
[LICENSE](LICENSE); provenance and changes are in [NOTICE](NOTICE). Promptus and the
rest of the system are Copyright (c) 2026 Gavin-Qiao, MIT. Personal-use project.
