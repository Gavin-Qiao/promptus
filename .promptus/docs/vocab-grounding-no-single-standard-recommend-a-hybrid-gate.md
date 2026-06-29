---
id: finding-20260628T172100Z-vocab-grounding-no-single-standard-recommend-a-hybrid-gate
substrate: finding
kind: CLAIM
status: CONJECTURED
created: "2026-06-28 13:21:00"
---
# Vocab grounding: no single standard, recommend a hybrid gate

Researched whether the ledger's controlled vocabulary can be grounded in an established ontology (to justify a strict gate). Conclusion: the prior art is real but FRAGMENTED — individual layers are standardized (PROV-O is a W3C Rec; ECO and OBI are OBO Foundry; CiTO is a settled SPAR module) but there is NO single agreed ontology of "research events + epistemic statuses" to enforce wholesale. This argues for a HYBRID gate: a small enforced CORE plus a warn-only extension the operator curates.

Our vocab is mostly well-grounded: KINDs map onto CoreSC / DEO / Argumentative-Zoning rhetorical moves and EXPO/OBI phases; reuse classes map onto CiTO; CONJECTURED->VALIDATED mirrors SWAN Hypothesis->Claim; CORRECTION maps to PROV wasRevisionOf and CiTO corrects; CONFOUNDED maps to a Micropublications challenge and a Toulmin rebuttal.

The one defect the literature clearly mandates fixing is a facet collision: KIND is an event (a BFO occurrent), STATUS is a quality of a claim (a continuant). BFO, PROV-O (Activity vs Entity), and Toulmin (claim vs qualifier) all keep the act separate from the claim's epistemic state, but our vocab puts DEADEND in BOTH the KIND and STATUS enums, and CORRECTION doubles as a status and a correcting-event.

Recommended v0.2 shape: split KIND / STATUS / RELATION into orthogonal fields; closed core (KINDs PLAN/EXP/RESULT/FINDING/DECISION/RESUME/RESEARCH; STATUSes CONJECTURED/VALIDATED/REFUTED/CONFOUNDED/SUPERSEDED) plus a warn-only extension (IDEA/MISTAKE/FIX/DEADEND); RELATIONS supersedes/supports/challenges/refutes/extends/fixes, exportable to CiTO and PROV-O; drop DEADEND from STATUS. Keep finding/lit/memory strict. v0.1 step: make the ledger gate permissive (warn-not-block) on KIND/STATUS while keeping the core known set.

Sources: EXPO (Soldatova & King 2006), OBI, ISA, PROV-O (W3C), SEPIO, nanopublications (Groth 2010), Micropublications (Clark 2014), ECO, Argumentative Zoning (Teufel & Moens 2002), CoreSC (Liakata 2010), DEO/SPAR, SWAN (Ciccarese 2008), CiTO, Toulmin (1958), AIF, IBIS (Kunz & Rittel 1970), null-results taxonomy (Frontiers 2018), Hyland hedging (1998), CoNLL-2010.
