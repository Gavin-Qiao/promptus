---
id: lit-20260628T144203Z-kag-knowledge-augmented-generation
substrate: lit
kind: PAPER
status: CITE
created: "2026-06-28 10:42:03"
source: "arXiv:2409.13731#abstract"
reuse: CITE
---
# KAG knowledge augmented generation

KAG (Ant Group / OpenSPG; arXiv:2409.13731) couples an LLM with a knowledge graph: schema-constrained extraction into an LLM-friendly graph (LLMFriSPG, which separates instances from concepts), mutual indexing between graph nodes and text chunks, a logical-form-guided hybrid reasoning engine (plan / reason / retrieve operators over symbolic, vector, and LLM evidence), and knowledge alignment to denoise extraction. It targets multi-hop precision in professional corpora, where vector RAG's similarity-is-not-relevance and logic-blindness (numbers, time, rules) break down; it reports +33.5% F1 on HotpotQA over prior RAG and benchmarks against [[hipporag]].

Correction (2026-06-28): Promptus is **not** an implementation of KAG — it builds no knowledge graph, runs no logical-form solver, and stays markdown-first by the invariant. Its true ancestor is [[karpathy-llm-wiki]], whose gist makes no KG or KAG claim. The earlier line here ("the local-first version is the Karpathy LLM-wiki pattern Promptus implements") conflated the two and over-attributed the KAG↔llm-wiki link to Karpathy; that equation is a third-party gloss. See [[promptus-vs-kag-coverage]].

Related: [[karpathy-llm-wiki]] · [[hipporag]] · [[promptus-vs-kag-coverage]]
