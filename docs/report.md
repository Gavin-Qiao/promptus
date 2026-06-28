# Promptus — design report

> **Status: STUB.** Promptus's own knowledge, dogfooded. Once `kb-add` is real,
> this report should be (re)generated *through* it — the toolbox holding its own
> design history is the proof it works. Outline below; body `TODO`.

## Outline

1. **Problem** — a mature but unpackaged research methodology; the append script
   drifts because friction makes it skippable.
2. **The bet** — markdown is truth; the index is derived; writes go through a gated
   script; a hand-written header beats a vector at this scale.
3. **Architecture** — four stores (Telos / Ledger / Knowledge / Memory), three verbs
   (STORE / BOOK-KEEP / RETRIEVE), renderers (humanizer, grannie).
4. **Mechanics** — the gated writer-jig; header-first retrieval; the controlled vocab gate.
5. **The papers-scale crossing** — what machinery turns on, in what order, past what
   measured thresholds (kb-ingest, embeddings pre-filter, latent-link linter, graph
   algorithms, summary tiers, mutual-index hardening).

## TODO

- [ ] Write each section as a `finding` unit via `kb-add`, then assemble.
- [ ] Cite the design decisions from the ledger (`event:DECISION` units).
