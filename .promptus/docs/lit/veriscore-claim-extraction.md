---
id: lit-20260630T014955Z-veriscore-claim-extraction
substrate: lit
kind: NOTE
status: CITE
created: "2026-06-29 21:49:55"
source: "arXiv:2406.19276"
---
# VeriScore claim extraction

VeriScore (Song & Iyyer, arXiv:2406.19276). A decompose-then-verify factuality pipeline whose extractor pulls only VERIFIABLE claims from prose; pip-installable, Apache-2.0, with released extractor (Mistral) and verifier (Llama3) weights. VeriFastScore distills extract+verify into one Llama3.1-8B pass, ~6.6x faster. ADOPT the extractor for stage 1 of the calibration lint (split a draft into atomic claims, each tied to one cited unit), but wire it as a SWAPPABLE dependency with tunable granularity and validate it against our own units: 2026 results show atomic decomposition is adoptable-not-solved and can backfire (Rethinking Atomic Decomposition, arXiv:2603.28005). The Alignment Bottleneck result (arXiv:2602.10380) endorses our regime: decomposition pays off precisely when evidence is sub-claim-aligned (one claim, one unit), which Promptus's per-claim->unit mapping enforces.
