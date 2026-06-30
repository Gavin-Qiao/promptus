---
id: lit-20260630T014955Z-grade-evidence-to-recommendation-strength
substrate: lit
kind: NOTE
status: CITE
created: "2026-06-29 21:49:55"
source: GRADE (BMJ 2008); PMC2335261
---
# GRADE evidence to recommendation strength

GRADE (Grading of Recommendations Assessment, Development and Evaluation; evidence-based medicine). The canonical map from evidence CERTAINTY (high / moderate / low / very-low) to recommendation STRENGTH (strong / conditional), which explicitly forbids a strong recommendation on low-certainty evidence. This is the conceptual ancestor of Promptus's moat — a "weak evidence => weak claim" rule — but it is MANUAL guideline-authoring by human panels, with no automated prose checker. The gap GRADE leaves (no write-time, machine-checked enforcement over generated text keyed to a stored unit's status) is exactly what Promptus's calibration lint fills. Map our statuses onto GRADE's spirit: VALIDATED ~ high (state plainly), CONJECTURED ~ low (must hedge), REFUTED/SUPERSEDED ~ do-not-assert.
