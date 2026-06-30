---
id: lit-20260630T004121Z-graphiti-temporal-agent-memory
substrate: lit
kind: NOTE
status: CITE
created: "2026-06-29 20:41:21"
source: "arXiv:2501.13956"
links: [prior-art-landscape-2026]
---
# Graphiti temporal agent memory

Graphiti / Zep (getzep, arXiv:2501.13956). Productized bi-temporal knowledge-graph agent memory: facts carry validity windows (`valid_at`/`invalid_at`) and are SUPERSEDED rather than deleted — the only mainstream system with a real fact-lifecycle notion. Difference to consolidate against: that status is TEMPORAL validity, not EPISTEMIC status (no conjectured/refuted), it is a cloud graph DB (Neo4j), there are no markdown/wikilinks, and there is no write-time calibration. Lesson (adopt the model): Graphiti's `valid_at`/`invalid_at`/`superseded` is the reference design for our `lit`/supersession lifecycle, and a temporal dimension we could add alongside epistemic status.

Related: [[prior-art-landscape-2026]]
