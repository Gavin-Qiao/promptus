---
id: lit-20260630T004121Z-basic-memory
substrate: lit
kind: NOTE
status: CITE
created: "2026-06-29 20:41:21"
source: "https://github.com/basicmachines-co/basic-memory"
links: [markdown-is-the-graph, prior-art-landscape-2026]
---
# Basic Memory

Basic Memory (basicmachines-co, AGPL). The closest SUBSTRATE to Promptus: local-first plain markdown as the source of truth + a derived SQLite index, agent-operated over MCP, opens in Obsidian, with light `[fact]`/`[method]` observation tags and wiki-relations. What it lacks (the Promptus delta): a gated controlled EPISTEMIC-STATUS vocabulary (CONJECTURED/VALIDATED/REFUTED/SUPERSEDED) and write-time calibration — its frontmatter is only title/type/permalink/tags, and it reaches for embeddings. Lesson (adopt, don't rebuild): its file + SQLite-index + MCP plumbing is the reference design for our mechanics — don't rewrite file I/O or indexing. Caveat: AGPL, so keep our code clean-room.

Related: [[markdown-is-the-graph]] · [[prior-art-landscape-2026]]
