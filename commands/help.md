---
description: Promptus help — what it is, the four stores, the three verbs, and the command/skill map. Run with no argument for the overview, or a topic (store, retrieve, render, init, checkpoint) to zoom in.
argument-hint: "[topic]"
---

# /promptus:help — what's in the box

Promptus **stores / keeps / retrieves** what a research project knows as gated markdown, and
**renders** it for an audience. If `$ARGUMENTS` names a topic, focus the answer there;
otherwise give the map below and end at the single next step.

## The model

- **Four stores**, every unit tagged `substrate:status`:
  - **Telos** (`TELOS.md`) — the direction and the invariant that never bends.
  - **Ledger** (`ledger/RESEARCH-LEDGER.md`) — append-only events: decisions, runs, dead-ends.
  - **Knowledge** (`docs/` findings + `docs/lit/` literature) — distilled, each with a source.
  - **Memory** (`memory/`) — durable facts, one per file.
- **Three verbs** — scripts do the mechanics, skills do the reasoning:
  - **STORE** → `kb-add` (the gated writer-jig; off-vocab input is refused with the allowed set).
  - **BOOK-KEEP** → `kb-index` (rebuild the derived catalog + graph; lint) and `/checkpoint`.
  - **RETRIEVE** → `kb-find` (header-first) and the `recall` skill.
- **Render** the store for an audience: `humanizer` (paper voice), `grannie` (plain language),
  and the `grounded-writing-reviewer` agent.

## Commands & skills

| you want to… | use |
|---|---|
| stand up the stores in a repo | `/promptus:promptus-init` |
| record a decision / run / finding | the `research-ledger` skill → `kb-add` |
| flush state before compaction | `/promptus:checkpoint` |
| find what we already know | the `recall` skill → `kb-find` |
| write something grounded and human | the `humanizer` skill (ground mode) |
| explain a concept plainly | the `grannie` skill (`explain <concept>`) |
| audit a draft | the `grounded-writing-reviewer` agent |
| see the whole map | the `promptus` orchestrator skill |

## The invariant

markdown is the only source of truth · the index is derived and disposable · writes go through
a gated script · prefer a script over a server · add machinery only past a **measured** threshold.

## Start here

New repo? Run `/promptus:promptus-init`. Existing project? Follow `docs/adoption.md`. Then store
as you go (`kb-add`), retrieve before you assert (`kb-find` / `recall`), and `/promptus:checkpoint`
before you compact.
