---
id: finding-20260630T015109Z-write-time-calibration-design
substrate: finding
kind: CONCEPT
status: VALIDATED
created: "2026-06-29 21:51:09"
links: [prior-art-landscape-2026, grade-evidence-to-recommendation-strength, evibound-claims-ledger-and-semantic-laundering, faithful-response-uncertainty, veriscore-claim-extraction, minicheck-grounding-entailment]
---
# Write-time calibration design

A calibration prior-art pass (mid-2026, web-verified) for the moat: a CHECKED mechanism ensuring a sentence's assertion strength never exceeds the epistemic STATUS of the unit it cites. Extends [[prior-art-landscape-2026]].

## Verdict: the moat is open
No system enforces, as a write-time check, that assertiveness <= a cited unit's CURATED discrete status; all calibration prior art keys hedging to model-internal or retrieval confidence, which Promptus rejects. Closest ancestor [[grade-evidence-to-recommendation-strength]] (weak evidence => weak claim, but manual, no automated checker); closest implemented [[evibound-claims-ledger-and-semantic-laundering]] (gates claim admission, not graded prose); the formal target is already named by [[faithful-response-uncertainty]] (expressed decisiveness must not exceed warranted confidence). So the moat is execution and integration, not raw conception.

## The lint pipeline -- adopt the engines, build the gate
1. decompose prose into atomic claims, each tied to one cited unit -- ADOPT [[veriscore-claim-extraction]] (swappable, tunable granularity; validate against our own units).
2. entail: does each claim follow from its cited unit? -- ADOPT [[minicheck-grounding-entailment]].
3. assertiveness: how loud is each claim (plain / hedged / speculative)? -- a certainty model or an LLM decisiveness-rater, NOT hedge-word lexicons (they invert under negation).
4. GATE (the moat; BUILD): a deterministic strength x STATUS lattice -> ok / overclaim / block / must-attribute.
5. fix (BUILD): prompt-based rewrite to the warranted hedge, re-scored in a check-fix loop.
Plus a lit:CITE URL-existence check (3-13% of cited URLs are hallucinated -- a separate failure mode from entailment).

## Proposed shape (CONJECTURED, pending build) -- respect the invariant
MiniCheck-7B and VeriScore are real ML models, heavy for a stdlib-first substrate, so ship the invariant-clean default first: the deterministic lattice + per-claim->unit mapping + the AGENT scoring entailment and assertiveness by prompt (it is already the substrate) + a sharpened grounded-writing-reviewer rubric -- zero new heavy dependencies. Bank the off-the-shelf engines as an OPTIONAL deterministic tier, turned on past a measured threshold when LLM-judge variance becomes a felt problem. This keeps the moat invariant-pure and makes the ML a measured upgrade, not a default dependency.

Related: [[prior-art-landscape-2026]] · [[grade-evidence-to-recommendation-strength]] · [[evibound-claims-ledger-and-semantic-laundering]] · [[faithful-response-uncertainty]] · [[veriscore-claim-extraction]] · [[minicheck-grounding-entailment]]
