---
id: finding-20260628T185816Z-promptus-vs-kag-coverage
substrate: finding
kind: CLAIM
status: CONJECTURED
created: "2026-06-28 14:58:16"
relations: ["cites:kag-knowledge-augmented-generation", "cites:karpathy-llm-wiki", "cites:graphrag", "cites:hipporag", "cites:raptor"]
links: [the-gate, markdown-is-the-graph, karpathy-llm-wiki, hipporag, header-beats-vector, graphrag, raptor]
---
# Promptus vs KAG coverage

An audit of Promptus against KAG (arXiv:2409.13731) and the wider Graph-RAG family. The verdict, in three tiers.

IMPLEMENTED (local-first): a persistent, append-only, status-tagged store with provenance ([[the-gate]]); a hand-authored, typed wikilink graph materialised as derived adjacency ([[markdown-is-the-graph]]); and citation-grounded, STATUS-calibrated generation (the recall skill plus the grounded-writing-reviewer agent). That is KAG's representation / persistence / grounding spine -- and the whole of the [[karpathy-llm-wiki]] pattern.

PARTIAL or MANUAL: schema-constrained capture, not document extraction; unit-level provenance, not chunk-level mutual indexing; a kb-find --hops graph-walk, not Personalized PageRank ([[hipporag]]); prose query-decomposition in recall, not a logical-form solver; alignment by hand at /checkpoint, not an automated latent-link linter.

DEFERRED by the invariant ([[header-beats-vector]]): the embedding pre-filter, GraphRAG community summaries ([[graphrag]]), RAPTOR tiers ([[raptor]]), automated KG extraction, and the fine-tuned KAG-Model.

Net: Promptus is KAG's epistemic half, done in markdown for a small dense corpus; the scale retrieval/reasoning engine is roadmap (report section 5), to switch on by measurement. What Promptus adds that KAG does not name: STATUS-as-calibration -- every retrieved claim renders at its own epistemic strength.

Related: [[the-gate]] · [[markdown-is-the-graph]] · [[karpathy-llm-wiki]] · [[hipporag]] · [[header-beats-vector]] · [[graphrag]] · [[raptor]]
