---
id: lit-20260628T185743Z-karpathy-llm-wiki
substrate: lit
kind: NOTE
status: CITE
created: "2026-06-28 14:57:43"
source: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
reuse: CITE
relations: ["relates-to:kag-knowledge-augmented-generation"]
links: [kag-knowledge-augmented-generation]
---
# Karpathy llm-wiki

Karpathy's personal-knowledge pattern (gist, 2026-04-04): instead of re-retrieving chunks per query (RAG), keep a persistent, LLM-maintained markdown wiki over immutable raw sources, governed by a schema doc (CLAUDE.md / AGENTS.md) plus an append-only log of what changed. It is positioned against generic RAG and makes NO knowledge-graph or KAG claim. This -- not [[kag-knowledge-augmented-generation]] -- is Promptus's true ancestor; the "llm-wiki = local-first KAG" equation is a third-party gloss, not Karpathy's.

Related: [[kag-knowledge-augmented-generation]]
