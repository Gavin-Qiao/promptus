---
id: lit-20260630T004121Z-hubness-and-reciprocal-nearest-neighbours
substrate: lit
kind: NOTE
status: CITE
created: "2026-06-29 20:41:21"
source: "JMLR 11 (2010), Radovanovic et al., Hubs in Space"
links: [the-scriptable-graph-layer, prior-art-landscape-2026]
---
# Hubness and reciprocal nearest neighbours

The lineage grounding kb-graph suggest's mutual-kNN prune. Hubness in high-dimensional similarity (Radovanovic, Nanopoulos & Ivanovic, "Hubs in Space", JMLR 11, 2010) explains why one broad note becomes everyone's nearest neighbour; reciprocal / k-reciprocal nearest neighbours (Qin 2011; Zhong et al. 2017, person-re-ID re-ranking) is the established cure — keep a pair only if each is in the other's top-k. Consolidation value: confirms our suggest de-flood is a textbook method, not an invention. Upgrade path: Mutual Proximity / local scaling (Schnitzer et al., JMLR 13, 2012; Feldbauer & Flexer 2019) DOWN-WEIGHTS hubs instead of deleting edges — a softer, less k-sensitive alternative, and the recipe to use if we ever move suggest to dense embeddings (where hubness worsens).

Related: [[the-scriptable-graph-layer]] · [[prior-art-landscape-2026]]
