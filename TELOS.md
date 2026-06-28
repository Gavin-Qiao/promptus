# Telos — Promptus

## North star

Promptus is a file-based research knowledge system. Its job is to **store / keep /
retrieve** everything a research project knows — events, literature, findings,
durable memory — as gated, well-formed markdown, and to **render** that knowledge
for an audience (a reviewer, a layperson, the next agent at 3am).

The humanizer is one renderer in the box. Everything else (the four stores, the
three verbs, the card-catalog) exists so that what a project knows is honest,
grounded, and navigable.

## The four stores

| store | path | retrieve it to… |
|---|---|---|
| **Telos** | `TELOS.md` | know the direction |
| **Ledger** | `ledger/RESEARCH-LEDGER.md` | reconstruct what happened & why (incl. dead-ends) |
| **Knowledge** | `docs/` (findings) + `docs/lit/` (literature) | ground a claim in prior art / our findings |
| **Memory** | `memory/MEMORY.md` (per-project) | not relearn what was settled |

Every retrievable unit carries a **substrate + status** (`ledger:DEADEND`,
`lit:CITE`, `finding:VALIDATED`, `memory:validated`). The `[[wikilink]]` graph
spans all four.

## The three verbs

- **STORE** → `scripts/kb-add.ts` (gated writer-jig; the LLM supplies only the prose body).
- **BOOK-KEEP** → `scripts/kb-index.ts` (rebuild the derived catalog + graph) + `/checkpoint` (lossless flush before compaction).
- **RETRIEVE** → `scripts/kb-find.ts` (header-first) + `skills/recall` (reasoning).

## The renderers

- **humanizer** (`/humanizer`) — write humanized text (pure style). *Real / shipping.*
- **grannie** (`/grannie explain …`) — explain a concept in plain language; auto-looks-up the store by judgement. *Stub.*
- **overnight-handoff** — terse resumable state for the next agent. *Deferred.*

## Rules that never bend (the invariant)

> markdown is the only source of truth · the index is derived & disposable ·
> writes go through a gated script, never freehand · prefer a script over a
> server · add machinery (embeddings, a DB) only past a threshold you've
> **measured**, never on spec.

This is *why* there are no embeddings and no graph DB in v1: a hand-written header
is a better retrieval key than a vector for a small, dense, status-tagged corpus,
and the `[[links]]` in markdown *are* the graph. Both turn on only at the
papers-scale crossing (hundreds–thousands of papers), each past a measured
threshold. (bun makes `bun:sqlite` a one-line upgrade when that day comes — but
not before.)

## Memory

Memory is **per-project**, in your real one-file-per-fact format: `kb-add --substrate
memory` writes one file per fact (`memory/<slug>.md`, with `name` / `description` / `type`
frontmatter) and adds a pointer line to the `memory/MEMORY.md` index — not a single append
blob. Kept current and reconciled at `/checkpoint`. Each project owns what it has settled; a
global `~/.claude/.../memory` store, if you keep one, is reconciled up to at checkpoint.
