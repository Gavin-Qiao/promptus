---
id: lit-20260630T014955Z-faithful-response-uncertainty
substrate: lit
kind: PAPER
status: CITE
created: "2026-06-29 21:49:55"
source: "arXiv:2405.16908"
---
# Faithful response uncertainty

Yona, Aharoni & Geva, "Can Large Language Models Faithfully Express Their Intrinsic Uncertainty in Words?" (EMNLP 2024, arXiv:2405.16908). Defines FAITHFUL response uncertainty as the gap between a model's intrinsic confidence and its expressed DECISIVENESS, penalizing both over- and under-hedging, and ships an LLM decisiveness scorer. This is the formal target for Promptus's moat: "expressed decisiveness must not exceed warranted confidence" is exactly the rule "a sentence's assertiveness must not exceed the status of the unit it cites." Cite it as the moat's formal framing; adopt the decisiveness-scoring idea for stage 3 (assertiveness rating). Companion: hedge-word LEXICONS must not be used as the score — Chen 2026 (arXiv:2606.26062) shows they invert under negation/polysemy (correlation collapses r=0.85 -> 0.21); use a certainty model (Pei & Jurgens 2021) or an LLM rater instead.
