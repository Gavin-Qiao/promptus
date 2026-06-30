---
id: lit-20260630T004121Z-limit-single-vector-retrieval-bound
substrate: lit
kind: PAPER
status: CITE
created: "2026-06-29 20:41:21"
source: "arXiv:2508.21038"
links: [header-beats-vector, prior-art-landscape-2026]
---
# LIMIT single-vector retrieval bound

LIMIT — "On the Theoretical Limitations of Embedding-Based Retrieval" (DeepMind, arXiv:2508.21038). Proves that for a fixed embedding dimension there exist top-k relevance sets that NO single-vector model can return; SOTA embedders score <60% recall@2 on a trivially-constructed task, while a long-context reranker solves it. Consolidation value: a theoretical backstop for Promptus principle #4 (a header beats a vector at this scale) — single-vector similarity is not a complete retriever, so header-first + lexical + graph is defensible, not contrarian. Lesson: when we DO cross to embeddings, go multi-vector / late-interaction (ColBERT-style) or add a reranker — never a single-vector DB alone.

Related: [[header-beats-vector]] · [[prior-art-landscape-2026]]
