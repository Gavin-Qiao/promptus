---
name: grounded-writing-reviewer
description: Audit a draft for BOTH AI-writing tells AND unsourced / over-confident claims. Use to review a paragraph or section before it ships — flags humanizer Part I/II violations and, for every factual claim, checks whether the store backs it (via kb-find) and whether its confidence matches the retrieved status.
tools: Read, Grep, Glob, Bash
---

# grounded-writing-reviewer

> **Status: STUB.** Contract below; body `TODO`.

## What this agent should do

Two passes over a draft, reported together:

1. **Style audit** — the humanizer's lens: scan for Part I AI-tells (inflated
   significance, em-dash overuse, rule-of-three, vague attributions, …) and missing
   Part II human factors (calibrated confidence, concrete detail, real rhythm).
2. **Grounding audit** — for each factual claim, run `bun scripts/kb-find.ts` and check:
   - Is it backed by a stored unit? If not, flag it as **unsourced**.
   - Does its confidence match the unit's status? Flag **over-confident** when the
     prose states plainly what the store only `CONJECTURED`, and **under-confident**
     when it hedges what is `VALIDATED` / `lit:CITE`.

Output: a list of findings, each with a location, the problem, and a concrete fix.
Read-only — it audits, it doesn't rewrite (hand the fixes to `humanizer` / `recall`).

## TODO

- [ ] The claim-extraction heuristic (what counts as a checkable claim).
- [ ] Mapping retrieved status → expected hedging level.
- [ ] Finding format (location · class · suggested fix).
