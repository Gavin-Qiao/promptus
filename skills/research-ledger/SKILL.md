---
name: research-ledger
description: Proactively record a research project into Promptus as work happens. Use throughout a session — after a decision, a run, an observation, a dead-end, or a finding — to append the unit via kb-add (never freehand). Teaches the recording habit so the ledger fills itself instead of being reconstructed later. The script owns the timestamp, id, and placement (the drift fix).
---

# research-ledger — record as you go

> **Status: STUB.** Contract below; body `TODO`.

## What this skill should do

Make recording a reflex, not an afterthought. During real work, watch for moments
worth keeping and write them through the gate the moment they happen:

- a **decision** (and the alternatives rejected) → `--substrate ledger --kind DECISION`
- a **run** / experiment and its outcome → `--kind RUN`
- an **observation** or surprise → `--kind OBSERVATION`
- a **dead-end** (so it's never re-walked) → `--status DEADEND`
- a distilled **finding** → `--substrate finding`
- external prior art read → `--substrate lit --source …`

Always via:
```
echo "<prose body>" | bun scripts/kb-add.ts --substrate <…> --kind <…> --status <…> --title "…" [--links "…"]
```
Never hand-edit the ledger. The script owns the timestamp/id/placement/index — that
discipline is the whole point (freehand appends are how the old ledger drifted a day).

## TODO

- [ ] Trigger heuristics: what's ledger-worthy vs noise.
- [ ] Title/links conventions; when to mark CONJECTURED vs VALIDATED.
- [ ] Relationship to `/checkpoint` (proactive trickle vs the pre-compaction flush).
