---
id: finding-20260629T205327Z-the-scriptable-graph-layer
substrate: finding
kind: CLAIM
status: VALIDATED
created: "2026-06-29 16:53:27"
links: [markdown-is-the-graph, hipporag, unlinked-references, graphrag]
---
# The scriptable graph layer

Promptus's graph layer is scriptable and embedding-free -- the wikilink graph is the truth (see [[markdown-is-the-graph]]); kb-index derives graph.json and kb-graph queries it three ways. (1) rank -- Personalized PageRank over the page-link graph for the load-bearing units: [[hipporag]]'s PPR minus the vectors. (2) lint -- health: dangling `[[handles]]` (with a "did you mean?" by slug similarity) plus orphans; --strict gates a checkpoint. (3) suggest -- a latent-link linter: IDF-weighted shared vocabulary plus a shared-source signal surfaces unlinked-but-related pairs; this is [[unlinked-references]] minus the ML, kept suggest-only so the human draws the edge. Retrieval pairs as two tiers: kb-find (header-first, cheap-certain) then kb-get (body-fetch, the conditional token-sink). The embedding-scale versions -- [[graphrag]] community summaries, vector latent-links -- stay deferred to the papers-scale crossing, each past a measured threshold. No embeddings, no DB: lexical match is the script's job, relevance the human's.

Related: [[markdown-is-the-graph]] · [[hipporag]] · [[unlinked-references]] · [[graphrag]]
