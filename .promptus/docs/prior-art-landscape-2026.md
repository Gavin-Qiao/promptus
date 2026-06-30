---
id: finding-20260630T004220Z-prior-art-landscape-2026
substrate: finding
kind: CONCEPT
status: VALIDATED
created: "2026-06-29 20:42:20"
links: [ara-agent-native-research-artifacts, memory-for-autonomous-llm-agents-survey, karpathy-llm-wiki, basic-memory, graphiti-temporal-agent-memory, kag-knowledge-augmented-generation, header-beats-vector, markdown-is-the-graph, limit-single-vector-retrieval-bound, lexical-retrieval-beats-dense-2026, hipporag, the-scriptable-graph-layer, hubness-and-reciprocal-nearest-neighbours]
---
# Prior-art landscape 2026

A consolidation pass — not a novelty claim. A four-facet prior-art deep-research (June 2026, web-verified) to situate Promptus in a fast-moving design space and harvest what to ADOPT vs. BUILD, so the system is as useful as possible.

## Verdict
No single system ships Promptus's full combination — local-first plain markdown + `[[wikilinks]]` + a gated per-claim epistemic-status vocabulary (CONJECTURED/VALIDATED/REFUTED/SUPERSEDED) the agent CALIBRATES its writing against + a human read-port + RAG deliberately delegated out. The niche is open in the install-it-today sense. But it is converging fast and is NOT conceptually original: [[ara-agent-native-research-artifacts]] independently shipped file-based status-tagged falsifiable claims + a maturity tracker (Apr 2026); the [[memory-for-autonomous-llm-agents-survey]] names "uncertainty-aware / hypothesis-ledger memory" as THE open frontier; the Karpathy [[karpathy-llm-wiki]] community now prescribes epistemic-status frontmatter. Defensibility = execution + integration, not novelty.

## Closest neighbours — each one axis short
- Substrate (markdown + wikilinks, agent-operated): [[basic-memory]] — no status vocab, reaches for embeddings.
- Lifecycle (productized supersession + provenance): [[graphiti-temporal-agent-memory]] — temporal validity, not epistemic status; cloud graph; no write-time calibration.
- Thesis (file-based status-tagged claims + maturity): [[ara-agent-native-research-artifacts]] — per-paper reproducibility artifact, not a cross-linked web; prototype.
- Grounding (claim<->source mutual index, knowledge-boundary): [[kag-knowledge-augmented-generation]] — server, no status tags.
- Design-philosophy: the LLM-Wiki / Agentic-Wiki pattern ([[karpathy-llm-wiki]]) — freeform, no standardized vocab/calibration.

## Retrieval bet — validated by 2026 evidence
The embedding-free stance ([[header-beats-vector]], [[markdown-is-the-graph]]) is current, not contrarian: [[limit-single-vector-retrieval-bound]] (single vectors provably can't return some top-k sets), [[lexical-retrieval-beats-dense-2026]] (BM25 > dense; grep > vectors for agents). Promptus is MORE aggressive than the graph-RAG SOTA — [[hipporag]] still uses embeddings to seed its PageRank; we don't. Break-points: papers-scale (grep returns more than the LLM can rank in-context), >~20% multi-hop queries, or cross-lingual/synonym recall. Adopt-at-crossing: hybrid BM25/SPLADE + late-interaction (ColBERT/ColPali) + a reranker — NOT a single-vector DB; the cheapest synonym patch is a reranker. See [[the-scriptable-graph-layer]].

## Adopt, don't rebuild
- File + SQLite-index + MCP plumbing -> [[basic-memory]] pattern (caution: AGPL, keep clean-room).
- Fact-lifecycle -> [[graphiti-temporal-agent-memory]]'s valid_at/invalid_at/superseded as the supersession model.
- Read surface -> AGENTS.md (portable standard).
- Latent-link de-hubbing -> keep mutual-kNN; soft upgrade = Mutual Proximity / local scaling ([[hubness-and-reciprocal-nearest-neighbours]]).
- Grounding seam -> KAG's mutual claim<->source index ([[kag-knowledge-augmented-generation]]).
- Study [[ara-agent-native-research-artifacts]]'s claims.yaml + Maturity Tracker before the next finding/status-model change.

## The moat (build this)
The gate + the `substrate:status` controlled vocabulary + write-time calibration + the human read-port (grannie). The only original, defensible part — and, per the survey, the field's named open frontier. Lean here; stop rebuilding plumbing that exists.

Related: [[ara-agent-native-research-artifacts]] · [[memory-for-autonomous-llm-agents-survey]] · [[karpathy-llm-wiki]] · [[basic-memory]] · [[graphiti-temporal-agent-memory]] · [[kag-knowledge-augmented-generation]] · [[header-beats-vector]] · [[markdown-is-the-graph]] · [[limit-single-vector-retrieval-bound]] · [[lexical-retrieval-beats-dense-2026]] · [[hipporag]] · [[the-scriptable-graph-layer]] · [[hubness-and-reciprocal-nearest-neighbours]]
