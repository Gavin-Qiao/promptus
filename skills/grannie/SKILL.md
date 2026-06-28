---
name: grannie
description: Explain a concept in plain language, as if to a sharp, curious 90-year-old. Invoked as `/grannie explain <concept>`. Decides by judgement whether to look the concept up in the project store first (via the recall skill / kb-find) and ground the explanation, or just explain from general knowledge. Dials the humanizer's analogy, plain-word, and write-like-you-talk patterns to maximum accessibility.
---

# grannie — explain a concept (ELI90)

> **Status: STUB.** Contract below; body `TODO`.

## What this skill should do

Given `/grannie explain <concept>`:

1. **Judge whether the concept lives in the store.** If it plausibly does (a term
   we coined, a finding, a paper we read), retrieve it via `recall` / `kb-find`
   and ground the explanation in what we actually know — with the right confidence
   for its status. Otherwise, explain from general knowledge. **This lookup is
   automatic, by judgement — no flag.**
2. **Explain for a curious 90-year-old.** Lean on the humanizer's positive
   patterns at maximum accessibility: P5 analogies that let them predict something,
   P6 plain/older words, P14 write the way you'd say it aloud. One idea at a time;
   concrete before abstract; no jargon without an everyday handle.
3. **Stay honest.** If the store says a thing is conjectured or a dead-end, say so
   plainly rather than smoothing it into confident simplicity.

## TODO

- [ ] The judgement rule for "is this concept in the store?" → retrieve vs not.
- [ ] The accessibility register (reading level, sentence length, analogy policy).
- [ ] How to fold a retrieved unit's status into the explanation's confidence.
