---
name: promptus
description: Orchestrator and map for the Promptus research knowledge system. Use at the start of research book-keeping to choose the right verb/script/skill — STORE (kb-add), BOOK-KEEP (kb-index + /checkpoint), RETRIEVE (kb-find + recall), RENDER (humanizer, grannie). Knows the four stores (Telos, Ledger, Knowledge, Memory), the substrate:status tagging, and the invariant.
---

# Promptus — orchestrator

Promptus stores / keeps / retrieves what a research project knows as gated markdown, and
renders it for an audience. Read `TELOS.md` for the canonical statement and the invariant.
This skill is the map: pick the verb, run the piece.

## Decision table — intent → do this

| You are about to… | Verb | Do |
|---|---|---|
| record a decision / run / observation / dead-end / finding | STORE | `bun "${CLAUDE_PLUGIN_ROOT}/scripts/kb-add.ts" --substrate ledger …` (or the `research-ledger` skill for the habit) |
| distill a settled finding into a concept page | STORE | `kb-add --substrate finding …` (one concept per file, `[[linked]]`) |
| capture external prior art you read | STORE | `kb-add --substrate lit --source "<src#anchor>" …` |
| remember a durable, cross-session fact | STORE | `kb-add --substrate memory …` |
| make the index current after writes | BOOK-KEEP | `bun "${CLAUDE_PLUGIN_ROOT}/scripts/kb-index.ts"` |
| flush a session before compaction | BOOK-KEEP | `/checkpoint` |
| answer "what did we decide / find / read about X" | RETRIEVE | the `recall` skill (drives `kb-find`) |
| write something the project already knows | RETRIEVE → RENDER | `recall` first, then `humanizer` |
| explain a stored concept plainly | RENDER | `grannie` (`/grannie explain <concept>`) |
| audit a draft for AI-tells + unsourced claims | RENDER | the `grounded-writing-reviewer` agent |
| initialize Promptus in a repo | — | `/promptus-init` (runs the `telos` skill) |

## The four stores

Telos (`TELOS.md`, direction) · Ledger (`ledger/RESEARCH-LEDGER.md`, events) · Knowledge
(`docs/` findings + `docs/lit/` literature) · Memory (`memory/`, durable facts). Every unit
is tagged `substrate:status` — `ledger:DEADEND`, `finding:VALIDATED`, `lit:CITE`,
`memory:validated`.

## The invariant (do not break)

markdown is the only source of truth · the index is derived & disposable · writes go through
a gated script, never freehand · prefer a script over a server · add machinery only past a
threshold you've **measured**.

## When NOT to use Promptus

Throwaway scratch work, a one-off answer, or anything you would not want to resume after a
compaction. Storing noise is as bad as losing signal — record what you'd hate to lose.
