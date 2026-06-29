# Promptus — design report

Promptus's own knowledge, dogfooded. This is the human-readable synthesis; the durable record
lives as `ledger:` decisions and `finding:` pages, retrievable with `kb-find`. Once the repo
is initialized as its own Promptus project, regenerate the cited claims here *through* the
store — the toolbox holding its own design history is the proof it works.

## 1. Problem

A mature but **unpackaged** research methodology (a per-project ledger + a checkpoint
discipline + a global memory) drifts in practice: the timestamp-stamping append script gets
skipped because hand-typing is lower-friction, and a past ledger lost ~a day to drift. And the
methodology lived as loose global skills, not a thing a project could install.

## 2. The bet

Markdown is the only source of truth; the index is **derived & disposable**; every write goes
through a **gated script** so format can't be forgotten; and — at this scale — a hand-written
header is a better retrieval key than a vector. The corpus is small, dense, hand-linked, and
status-tagged, so structure (grep + the `[[link]]` graph + status filters) beats embeddings,
which stay off until a measured threshold.

## 3. Architecture

Four stores (Telos / Ledger / Knowledge / Memory), three verbs (STORE / BOOK-KEEP / RETRIEVE),
and a family of renderers (humanizer, grannie, a reviewer) projecting the store to an audience.
Every unit is tagged `substrate:status`; that status is the **calibration source** — a
renderer states `VALIDATED` plainly, hedges `CONJECTURED`, and admits a `DEADEND`.

## 4. Mechanics

- **The gated writer-jig** (`kb-add`) owns the envelope (substrate-aware: a `### [ts]
  KIND/STATUS — title` log line for the ledger in local time; a `# claim` page for
  findings/lit; one file + an index pointer for memory), the timestamp, the id, the placement,
  and a validation gate that refuses off-vocab input with the allowed set.
- **Header-first retrieval** (`kb-find`) reads the derived card-catalog (`.promptus/CATALOG.md`,
  one line per unit), greps bodies for what headers didn't advertise, and walks the link graph.
- **Book-keeping** (`kb-index` + `/checkpoint`): rebuild the catalog/graph, resolve supersedes,
  lint orphans + unresolved links; format-linting is unnecessary because nothing is hand-typed.

## 5. The papers-scale crossing

When the corpus becomes hundreds–thousands of *papers* (not one project's notes), the header
catalog stops fitting one read and the deferred machinery turns on, each past a measured
threshold, into the existing seams: `kb-ingest` (schema-constrained extraction) → embeddings as
a pre-filter scoped to `.promptus/docs/lit` → a latent-link linter at checkpoint → graph algorithms as
scripts (personalized-PageRank related-work, GraphRAG-style community summaries) → RAPTOR-style
summary tiers → mutual-index hardening for sentence-level citation. The invariant still governs:
markdown stays truth, indexes stay derived, scripts beat servers, machinery turns on by measurement.
