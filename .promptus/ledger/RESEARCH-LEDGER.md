# Research Ledger — Promptus

**Updated:** 2026-06-28 (v0.1.1 — releasing)  ·  **Operator:** Mohan Qiao  ·  **Agent:** Claude (Opus 4.x)
**Timezone:** America/Montreal (UTC-4) — all timestamps below use it.

> Append-only. Never hand-edit a `### [ts] …` entry; units enter through
> `bun scripts/kb-add.ts --substrate ledger …` (the script owns the timestamp/id/placement).
> Supersede a prior claim with `--supersedes <id>` (a `supersedes` relation marks it SUPERSEDED). Rewrite only the NOW-header, at `/checkpoint`.

## Mandate
Package the operator's write-it-grounded-and-human methodology — humanizer + research-ledger +
checkpoint + a file-based KAG store — into one installable Claude Code plugin (2026-06-27 directive).

## Thesis / approach
Store / keep / retrieve a project's knowledge as gated markdown; render it for an audience. The
same virtues that make prose human make research trustworthy. Markdown is truth; the index is
derived; writes go through a gated script; a hand-written header beats a vector at this scale.

## Guardrails
- The invariant (see `TELOS.md`): markdown is the only source of truth · index derived & disposable ·
  writes gated · script over server · machinery only past a **measured** threshold.
- Failure-first: dead-ends and mistakes earn the same care as wins.
- Commits: `type(scope)` + flat bullet body, no `Co-Authored-By`. Don't merge without operator review.

## NOW (v0.1.1 — cut; release workflow publishing)
**v0.1.1 (patch).** Relicensed Apache-2.0 → GPL-3.0; rewrote the README design-philosophy-first
(with a prior-art credit to Karpathy's llm-wiki); removed the humanizer's own version/license
system; and ran the KAG deep-research dogfood — Promptus implements KAG's *epistemic spine* (the
store, the typed graph, status-calibrated grounding), not its scale engine, with the llm-wiki as
its true ancestor (`lit` notes added for llm-wiki/GraphRAG/HippoRAG/RAPTOR; the Karpathy
over-attribution corrected). Tagged `v0.1.1`; `release.yml` publishing the GitHub release. `main`
branch-protected right after.

**v0.1.0 (shipped).** PR #1 merged to `main` (merge commit `3f46375`, conventional history preserved, not
squashed); tagged `v0.1.0`; `release.yml` published the GitHub release after re-running the validator
+ 22 tests, asserting tag==`plugin.json`, and confirming a non-empty `[0.1.0]` CHANGELOG section (notes
drawn from the changelog). Live at github.com/Gavin-Qiao/promptus/releases/tag/v0.1.0; installs via
`/plugin marketplace add Gavin-Qiao/promptus` + `/plugin install promptus@promptus`. v0.1.0 = the store
spine, Apache-2.0, CI/CD, four guarded hooks, the **hybrid vocab** (KIND/STATUS/RELATION; permissive
ledger + strict library; `kb-export` to CiTO/PROV-O), `/promptus:help`. Earned it by dogfooding three
repos: itself, Psi (172 units), Probatio (248 units).

## Open frontier
- [x] **v0.1.0 RELEASED** — PR #1 merged (`3f46375`), tagged, GitHub release published, marketplace-installable.
- [x] **Psi + Probatio migrated** (both additive, in their own working trees, **uncommitted**) — awaiting the operator's review + commit in those repos.
- [ ] overnight-handoff renderer — the last scaffolded piece; partly realized by the SessionStart hook, but no dedicated terse renderer yet. (grannie is built.)
- [ ] (post-1.0) per-project vocab tuning (promote each repo's house tags into the `extended` sets); backfill frontmatter on legacy `docs/lit` notes; consider recursive doc indexing.

## Next actions
1. Operator: review + commit the Psi and Probatio working-tree changes when ready; optionally delete the merged `feat/promptus-v1` branch.
2. Build the overnight-handoff renderer when there's room.

## <<< RESUME HERE AFTER COMPACTION >>>
Promptus **v0.1.1 is cut** — `main` carries the GPL-3.0 relicense (was Apache-2.0), the
design-philosophy-first README (with a prior-art credit to Karpathy's llm-wiki), the removal of the
humanizer's own version system, and the KAG deep-research dogfood (Promptus = KAG's *epistemic spine*,
not its scale engine; the llm-wiki is the true ancestor; `lit` notes for llm-wiki/GraphRAG/HippoRAG/RAPTOR;
the Karpathy over-attribution corrected). Tagged `v0.1.1`; `release.yml` publishes the GitHub release on
the tag — **verify it landed**. `main` is now **branch-protected** (PR + CI required: `test + validate`,
`pre-commit (hygiene)`). `bun test` 22 pass; validator clean. v0.1.0 remains live and marketplace-installable
(`/plugin marketplace add Gavin-Qiao/promptus` → `/plugin install promptus@promptus`). The last scaffolded
piece is the overnight-handoff renderer. Read `TELOS.md`, then this header, then the Log.

## Glossary
- `substrate:status` — every unit's tag (`ledger`/`finding`/`lit`/`memory` : its status).
- `the gate` — `kb-add` enforcing the vocab: strict for the library (finding/lit/memory), permissive (warn) for the ledger.
- `header-first` — retrieval reads the card-catalog of hand-written headers, not vectors.

## Log

### [2026-06-28 10:42:02] DECISION/VALIDATED — Header-first retrieval over embeddings
A hand-written header is a better retrieval key than a vector for a small, dense, status-tagged corpus. Embeddings deferred to the papers-scale crossing. See [[header-beats-vector]].

### [2026-06-28 10:42:02] DECISION/VALIDATED — No graph DB at this scale
The markdown wikilinks are the graph; a derived adjacency covers backlinks, paths, and neighbourhoods at thousands of edges. A real graph DB only past millions. See [[markdown-is-the-graph]].

### [2026-06-28 10:42:02] DECISION/VALIDATED — Gated writer-jig: all writes go through kb-add
kb-add owns the envelope, timestamp, id, placement, and a validation gate that refuses off-vocab writes. Friction killed the old append script, so the jig is one command with stdin and dry-run. See [[the-gate]].

### [2026-06-28 10:42:03] DECISION/VALIDATED — Memory is one file per fact plus an index
Matches the operator real memory format (one file per fact plus a MEMORY.md pointer), not a single append blob. Reconciled at checkpoint.

### [2026-06-28 10:42:03] RESULT/VALIDATED — Store spine implemented and tested
kb-add, kb-index, kb-find and lib, plus integration tests. bun test reports 18 pass, 0 fail. Artifact: scripts/test/.

### [2026-06-28 10:42:03] FIX/VALIDATED — DEADEND added as a ledger status
The live demo rejected a RESULT entry with status DEADEND on its first run; the real Probatio and Psi ledgers use RESULT/DEADEND constantly. Added DEADEND to the ledger statuses. The gate caught a real vocab gap; regression covered in scripts/test.

### [2026-06-28 10:42:03] FIX/VALIDATED — Ledger catalog anchor made space-free
kb-index anchored a ledger entry with its timestamp, whose space broke the catalog path column, so ledger entries were unretrievable. Replaced the space with T. Regression test added.

### [2026-06-28 10:42:03] FIX/VALIDATED — kb-find keyed by card identity not path
Same-second ledger entries share a path and collapsed in kb-find results. Keyed the result map by full card identity instead of path. Test asserts both same-second events show.

### [2026-06-28 10:42:03] DECISION/VALIDATED — Packaged as a Claude Code plugin
Skills, commands, and templates call the bundled scripts via the plugin root, so installing the plugin brings the scripts. claude plugin validate passes.

### [2026-06-28 10:42:03] DECISION/VALIDATED — checkpoint trimmed to a minimal flush
The checkpoint command was re-documenting the research-ledger discipline. Trimmed to a thin check-and-add; the research-ledger skill owns the format.

### [2026-06-28 12:07:00] RESULT/VALIDATED — Committed and pushed v0.1 to PR #1 (14386a0)
Plugin packaging, the three demo-found fixes, the lean checkpoint, and the dogfood, committed as 14386a0 on feat/promptus-v1 and pushed to PR #1. Still unmerged.

### [2026-06-28 12:07:00] DECISION/VALIDATED — Removed legacy global skills and command, with backup
Removed the global research-ledger skill, humanizer skill, and checkpoint command from the Claude config so the plugin versions are not shadowed. Backed up the at-risk originals (ledger-append.mjs, the research-ledger SKILL, checkpoint.md) at ~/.claude/_promptus-legacy-backup/. Consequence: Probatio and Psi still reference the old ledger-append.mjs path and a bare /checkpoint, which break until those repos migrate to the plugin.

### [2026-06-28 12:07:00] RESULT/VALIDATED — Installed Promptus as a local plugin and verified it loads
Added the repo as a Directory-source marketplace and installed promptus@promptus v0.1.0 (user scope, enabled). A reload shows 8 skills plus the grounded-writing-reviewer agent live as promptus:* skills. The bundled scripts run; the plugin-root variable resolves to the repo dir, with a trailing slash so script refs show a harmless double slash.

### [2026-06-28 12:59:11] DECISION/VALIDATED — Apache-2.0 for the patent grant; humanizer stays MIT
Chose Apache-2.0 over MIT for Promptus: same commercial-use + attribution, but it adds an express patent license, the clause that matters for commercialization. The forked humanizer Part I stays MIT (Apache-2.0 is one-way MIT-compatible) in LICENSE-humanizer; NOTICE rewritten.

### [2026-06-28 12:59:11] FINDING/VALIDATED — Operator global pre-commit shim was dormant until pre-commit was installed
The operator's global git hooks delegate to 'uv run pre-commit' only when a repo checks in a .pre-commit-config.yaml, but pre-commit was not installed for uv, so that path had never actually run in any repo. Installed it with 'uv tool install pre-commit'; Promptus is the first repo to exercise it. The pre-push gate now runs the validator + bun test.

### [2026-06-28 12:59:11] DECISION/VALIDATED — CI plus tag-driven release with a changelog sanity gate
Added CI (bun test + an offline validate-plugin + a pre-commit hygiene job) and a release workflow on tag v* that asserts tag==manifest and a non-empty CHANGELOG section before publishing notes from the changelog. .pre-commit-config.yaml drives the operator's shared hooks (hygiene on commit, validate+test on push). SemVer + Keep a Changelog documented in RELEASING.md. CI verified green on PR #1.

### [2026-06-28 12:59:11] RESULT/VALIDATED — Four guarded Claude Code hooks added
SessionStart injects the ledger NOW-header to orient a resuming agent; PreToolUse blocks freehand '### [ts]' log edits and .promptus/ writes while allowing NOW-header edits; PostToolUse re-indexes after a kb-add; SessionEnd nudges to /checkpoint. Each no-ops outside a Promptus repo. Tested all paths locally. Activate in a running session with /reload-plugins.

### [2026-06-28 13:50:23] DECISION/VALIDATED — Adopted the hybrid vocab (facets + permissive ledger + relations + export)
Implemented the research-recommended hybrid vocab (schema v3): split KIND (the act) / STATUS (the claim's epistemic state) / RELATION (a typed link) into separate facets; the ledger is permissive (off-vocab kind/status warns but writes) while finding/lit/memory stay strict; dropped DEADEND from STATUS (it is a KIND) and turned CORRECTION into a supersedes relation, fixing the occurrent/continuant facet collision. Added typed relations (supersedes/refutes/challenges/supports/extends/fixes) and kb-export, which emits the relation graph as CiTO/PROV-O JSON-LD. 20 tests pass. Grounds: [[vocab-grounding-no-single-standard-recommend-a-hybrid-gate]], [[the-gate]].

### [2026-06-28 14:08:45] RESULT/VALIDATED — Migrated Psi to Promptus (dogfood): 172 units indexed, retrieval works, permissive gate fits the free vocab
Converted the Psi research repo (Gauging-Ψ) to Promptus, additively and without committing (Psi has uncommitted work): copied the hybrid vocab to schema/, appended the kb:append-point sentinel, added a plugin-wired AGENTS.md cadence, and /.promptus/ to .gitignore. kb-index indexed 172 real units (the 1795-line free-vocab ledger + docs + docs/lit); kb-find retrieves over them; the permissive ledger accepts Psi's free KIND/STATUS tags (DECISION/PLAN, VERDICT, BUILD, ★CORRECTION + RESULT, …) with a warning, never blocking. Psi had no ledger-append.mjs dependency. See [[the-gate]].

### [2026-06-28 14:08:45] FIX/VALIDATED — kb-find parses free-form compound statuses (the Psi dogfood surfaced it)
The Psi migration exposed a real gap: the catalog line `substrate:status · title · path` assumed a single-token status, so a free-form compound status with spaces (★CORRECTION + RESULT, or a spaced FINDING / RESULT yielding a leading-space status) was written to the catalog but SKIPPED by kb-find's (\S+) matcher — written yet unretrievable, so the permissive ledger only half-delivered. Fixed: kb-find splits the catalog line on the ' · ' delimiter (space-robust), and kb-index trims the parsed status. Regression test added (21 pass). Now free vocab both writes AND reads.

### [2026-06-28 14:22:01] RESULT/VALIDATED — Migrated Probatio to Promptus (dogfood): 248 units, custom ledger path, free vocab fits
Converted Probatio (the Lean proof lab) additively, no commit (it has major parked WIP): a custom schema/kb-vocab.json pointing the ledger substrate at docs/research-ledger.md (finding stays docs), the kb:append-point sentinel, /.promptus/ in .gitignore, and an AGENTS.md cadence rewritten to kb-add — it had called the now-removed global ledger-append.mjs (the breakage the ledger warned about). kb-index indexed 248 units (the 823-line ledger + 46 docs); kb-find retrieves; the permissive gate accepts Probatio's free compound vocab (MISTAKE+FINDING/CRITICAL, RESULT+FIX/IN-PROGRESS, BUILT, SHIPPED, CHECKPOINT, …). See [[the-gate]].

### [2026-06-28 14:22:01] FIX/VALIDATED — Adoption fixes for non-default layouts (Probatio dogfood)
Probatio surfaced two real adoption gaps, now fixed: (1) findProjectRoot keyed only on a root TELOS.md and threw otherwise, but Probatio's direction is docs/telos.md — it now also accepts schema/kb-vocab.json as the root marker; (2) when the ledger lives inside the finding store dir (Probatio: ledger=docs/research-ledger.md, finding=docs), kb-index double-indexed it as both a log and a page — collect() now skips sentinel-store files. Integration test added (22 pass).

### [2026-06-28 14:38:28] RESULT/VALIDATED — Released Promptus v0.1.0 (PR #1 merged, tagged, GitHub release published)
Merged PR #1 to main as a merge commit (3f46375 — conventional history preserved, not squashed), tagged v0.1.0 on it, and release.yml published the GitHub release: it re-ran the validator + 22 tests, asserted tag==plugin.json version, confirmed a non-empty [0.1.0] CHANGELOG section, and created the release with notes from the changelog. Live at https://github.com/Gavin-Qiao/promptus/releases/tag/v0.1.0; installable via `/plugin marketplace add Gavin-Qiao/promptus` + `/plugin install promptus@promptus`. Earned the release by dogfooding on three real repos: itself, Psi (172 units), Probatio (248 units).

### [2026-06-28 14:59:14] RESEARCH/VALIDATED — Deep-research dogfood: audited Promptus against KAG (arXiv:2409.13731)
Ran a deep-research agent on KAG (arXiv:2409.13731, Ant Group / OpenSPG) and the wider Graph-RAG family, then ingested the sources as lit: [[karpathy-llm-wiki]], [[graphrag]], [[hipporag]], [[raptor]]. Verdict ([[promptus-vs-kag-coverage]]): Promptus implements KAG's epistemic spine -- a persistent status-tagged store, a typed wikilink graph, and citation-grounded STATUS-calibrated generation -- plus the whole Karpathy llm-wiki pattern, but defers the scale engine (embeddings, PPR, GraphRAG community summaries, RAPTOR tiers, KG extraction, the KAG-Model) behind the measured-threshold invariant.
↳ relates-to promptus-vs-kag-coverage

### [2026-06-28 14:59:14] MISTAKE/RESOLVED — Our KAG note over-attributed the llm-wiki/KAG link to Karpathy
The KAG lit note claimed Promptus implements "the Karpathy LLM-wiki pattern" as "the local-first version of KAG". Research refuted the attribution: Karpathy's llm-wiki gist makes no knowledge-graph or KAG claim, and the llm-wiki <-> KAG equation is a third-party gloss, not his. Corrected the note in place. The research-ledger skill's "Karpathy wiki-layering (raw -> log -> wiki -> schema)" line is similarly mis-framed (his "schema" is the up-front AGENTS.md, not a final stage) and is flagged for a v0.1.1 doc fix. The tool caught its own store committing the over-attribution it exists to prevent.
↳ relates-to promptus-vs-kag-coverage

### [2026-06-28 15:41:18] DECISION/VALIDATED — Relicensed to GPL-3.0; removed the humanizer version system; reworked the README
Relicensed from Apache-2.0 to GPL-3.0 -- copyleft, so redistributing Promptus or a derivative must share source. Removed LICENSE-humanizer (MIT); the upstream humanizer Part I notice ((c) 2025 Siqi Chen) now lives in NOTICE as MIT requires, and the fork is acknowledged in the README. Dropped the humanizer skill's own version/license frontmatter -- Promptus has one version and one license. Rewrote the README design-philosophy-first.

### [2026-06-28 19:08:33] RESULT/VALIDATED — Cut v0.1.1 (GPL-3.0 relicense, README rework, humanizer de-versioned, KAG audit)
Patch release. plugin.json -> 0.1.1; CHANGELOG renamed [Unreleased] to [0.1.1]. Ships the GPL-3.0 relicense (was Apache-2.0), the design-philosophy-first README with a prior-art credit to Karpathy's llm-wiki, removal of the humanizer's own version/license system, and the KAG deep-research dogfood (Promptus = KAG's epistemic spine, not its scale engine; lit notes for llm-wiki/GraphRAG/HippoRAG/RAPTOR; corrected the Karpathy over-attribution). Tagged v0.1.1; release.yml re-runs the validator + 22 tests, asserts tag==plugin.json, and publishes the GitHub release from the [0.1.1] notes. main set branch-protected (PR + CI required) right after.

<!-- kb:append-point -->
