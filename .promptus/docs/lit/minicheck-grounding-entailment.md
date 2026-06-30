---
id: lit-20260630T014955Z-minicheck-grounding-entailment
substrate: lit
kind: NOTE
status: CITE
created: "2026-06-29 21:49:55"
source: "https://github.com/Liyan06/MiniCheck"
---
# MiniCheck grounding entailment

MiniCheck (Tang et al., arXiv:2404.10774; Bespoke-MiniCheck-7B is current SOTA on LLM-AggreFact). A fine-tuned grounding-NLI checker: input (evidence, claim) -> {supported, 0-1 score}, deterministic at temperature 0, GPT-4-level, fully local; the tiny MiniCheck-Flan-T5-Large (~770M) runs on CPU. ADOPT as stage 2 of the write-time-calibration lint — "does this sentence follow from its cited unit?" — applying ALCE's citation-recall test (concatenate the cited unit(s), ask supported?). HHEM-2.1-Open and Paladin-mini are drop-in single-classifier alternatives. Caveat against Promptus's invariant: a 7B (or even 770M) model is heavy for a stdlib-first substrate, so this belongs in the OPTIONAL deterministic tier, not the default (the agent can score entailment by prompt until judge-variance is a measured problem).
