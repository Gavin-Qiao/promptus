# Research Ledger — Promptus

**Updated:** 2026-06-29 (v0.4.1 hardening)  ·  **Operator:** Mohan Qiao  ·  **Agent:** Claude (Opus 4.x)
**Timezone:** America/Montreal (UTC-4) — all timestamps below use it.

> Append-only. Never hand-edit a `### [ts] …` entry; units enter through
> `bun scripts/kb-add.ts --substrate ledger …` (the script owns the timestamp/id/placement).
> Supersede a prior claim with `--supersedes <id>` (a `supersedes` relation marks it SUPERSEDED). Refresh the NOW-header (between the `now:` markers) through `kb-now` at `/checkpoint` — it owns the `Updated:` stamp.

## Mandate
Package the operator's write-it-grounded-and-human methodology — humanizer + research-ledger +
checkpoint + a file-based KAG store — into one installable Claude Code plugin (2026-06-27 directive).

## Thesis / approach
Store / keep / retrieve a project's knowledge as gated markdown; render it for an audience. The
same virtues that make prose human make research trustworthy. Markdown is truth; the index is
derived; writes go through a gated script; a hand-written header beats a vector at this scale.

## Guardrails
- The invariant (see `.promptus/TELOS.md`): markdown is the only source of truth · index derived & disposable ·
  writes gated · script over server · machinery only past a **measured** threshold.
- Failure-first: dead-ends and mistakes earn the same care as wins.
- Commits: `type(scope)` + flat bullet body, no `Co-Authored-By`. Don't merge without operator review.

<!-- now:start -->

## NOW (v0.4.1 — hardening)
**Shipping.** Hardening pass: `kb-index` now recurses into `docs/` subdirs (the `positioning/` blind
spot the Probatio dogfood exposed) — longest-prefix store ownership prevents double-indexing `lit`,
and `archive/` + hidden dirs stay cold; `README` is skipped as navigation. Cross-OS checks
(Windows/macOS) are now **required** on `main`. 76 tests green. v0.3.0 (doctor) + v0.4.0 (kb-ingest)
remain shipped + dogfooded across Promptus/Psi/Probatio.

## Open frontier
- [x] v0.3.0 doctor · v0.4.0 kb-ingest · v0.4.1 kb-index recursion + cross-OS required checks.
- [ ] **Apply migrate → ingest to the REAL Psi + Probatio** — operator-gated; commit/stash WIP first. Probatio lit classification is settled (10 promotes — see memory + Log).
- [ ] **`kb-get` (retrieval economy)** — a measured need (100s of hits/query); the next build lever.
- [ ] On the real Psi conversion: source the 5 flagged lit notes by hand (no machine-recoverable source).

## Next actions
1. Pick the next track: the real-repo conversion (the payoff) or `kb-get` (the next capability).
2. When converting for real, quiesce + commit/stash each repo first.

## <<< RESUME HERE AFTER COMPACTION >>>
Promptus is at **v0.4.1**: doctor (migrate, v0.3.0), kb-ingest (curate lit, v0.4.0), and a hardening
patch (v0.4.1) — `kb-index` now recurses into `docs/` subdirs (each file assigned to its
longest-matching store so `lit` is never double-indexed; `archive/` + hidden dirs cold; README
skipped), and Windows/macOS are required checks on `main`. All shipped + dogfooded on sandbox copies
(originals untouched). **Two live tracks, operator's pick:** (a) run the full pipeline — doctor
`migrate --apply` then `kb-ingest` — on the REAL Psi + Probatio (their gate is down; commit/stash WIP
first; the Probatio lit classification is settled, 10 promotes in memory), or (b) build `kb-get` /
`kb-find --snippet/--limit`, the now-measured retrieval economy. Read `.promptus/TELOS.md`, then this
header, then the Log.

<!-- now:end -->

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

### [2026-06-28 20:14:48] RESULT/VALIDATED — Namespaced the stores under .promptus/ (v0.2.0) and hardened the test suite
Moved the four stores plus the vocab under one .promptus/ namespace (derived index -> .promptus/cache/); the repo root now holds only the product (skills/scripts/commands/agents/hooks/templates). One folder is collision-proof in a host repo. Updated path resolution, the protect-gate hook, .gitignore, the templates, the init/adoption flow, and every doc/skill path reference; re-pointed the test scaffold. Added robustness.test.ts (16 tests across substrate fidelity, cross-OS, path resolution, and corruption) plus a Windows/macOS CI matrix. The cross-OS tests caught a real bug -- a CRLF ledger dropped every entry because the .+$ parser never matches across \r\n -- fixed by normalizing line endings in kb-index. 38 tests pass; validator clean. Breaking change -> v0.2.0; Psi and Probatio need re-migration. Built on a PR branch (main is protected).

### [2026-06-28 20:57:56] RESULT/VALIDATED — Released v0.2.0 (PR #2 merged, tagged, GitHub release published)
PR #2 merged to main (merge commit 3d30c5b, conventional history preserved, not squashed); tagged v0.2.0; release.yml published green (validator + 43 tests + tag==plugin.json + non-empty [0.2.0] changelog). Marketplace-installable. v0.2.0 = the .promptus/ namespace (stores under one folder, derived cache at .promptus/cache/), kb-now, test hardening (43 tests), a Windows/macOS CI matrix, and the CRLF-ledger fix that matrix caught.

### [2026-06-28 20:57:56] DECISION/VALIDATED — kb-now is a separate gated script, not a kb-add mode
kb-add appends immutable, id'd, vocab-gated units; the NOW-header is the opposite (overwrite-in-place, no id, free prose). Different verb, shared lib/ -- a kb-add --header flag would fork kb-add's clean contract. kb-now owns the Updated stamp (clock, local), checks the required sections, writes a bounded replacement between the now: sentinels, atomically. Closes the one freehand carve-out in the ledger; the protect-gate now blocks a hand-set stamp.

### [2026-06-28 20:57:56] DECISION/VALIDATED — Next (v0.3.0): build kb-migrate / promptus-doctor before migrating Psi/Probatio
A version-aware tool with modes check (doctor) / migrate / update, dry-run-first, over a small migration registry (DB-migrations for the knowledge base). Crux it must surface not decide: a docs/ classifier (promptus-unit frontmatter id/substrate/status vs the project's own file) so it never moves research notes. Build as v0.3.0 now that v0.2.0 ships, then use it to migrate Psi/Probatio.

### [2026-06-28 20:57:56] FINDING/VALIDATED — Psi and Probatio docs/ are intermingled with the projects' own research
Inspected both: Psi's docs/ (contour-*, dimension-typing, ...) and Probatio's docs/ are the projects' OWN research notes, not kb-add findings; Probatio uses a custom layout (docs/research-ledger.md, docs/telos.md). Both carry heavy uncommitted WIP. A blind git mv docs .promptus/docs would bury research notes. Open per-repo call: move docs/ under .promptus/, or namespace only ledger/schema/memory/TELOS while docs/ stays. Constraint: additive, do not commit there (operator parks).

### [2026-06-28 20:57:56] IDEA/CONJECTURED — Retrieval economy: the body-fetch is the token sink, not discovery
kb-find already returns one-line headers (the catalog stays in-script, not in agent context). The token sink is recall reading whole files -- worst case the ledger (one file, N entries; reading one entry swallows all N). Fix = kb-get (fetch one unit's body by ref; a ledger anchor -> just that entry) + kb-find --snippet (matching excerpt inline) + --limit. Parked: operator observing the current setup before investing.

### [2026-06-28 21:25:01] RESULT/VALIDATED — v0.3.0: built promptus-doctor (version-aware check/migrate, dry-run default)
promptus-doctor built: `check` diagnoses layout/version/health (is the gate reachable? is .promptus/ broadly gitignored?); `migrate` is dry-run-first, `--apply` moves stores to the canonical .promptus/ layout, upgrades the vocab (preserving custom terms), narrows the .gitignore, and reindexes. It NEVER edits a unit's content. 16 doctor tests, 59 green overall.

### [2026-06-28 21:25:01] DECISION/VALIDATED — doctor normalizes legacy+custom layouts to canonical; narrows .gitignore so stores stay committed
Normalize BOTH legacy-root (Psi: stores at repo root) and custom docs/-intermingled (Probatio: ledger+telos inside docs/) to the canonical .promptus/ layout, routing the ledger and telos out of docs/. The .promptus/ collision (0.1.x used it for the gitignored derived cache; 0.2.0 uses it for the committed namespace) is handled by dropping the stale cache and narrowing /.promptus/ to /.promptus/cache/ — else migration would silently gitignore the whole knowledge base.

### [2026-06-28 21:25:01] RESULT/VALIDATED — dogfood: doctor migrated Psi+Probatio copies clean; originals untouched; needles pass
Migrated COPIES in a sandbox (never the originals): Psi (legacy-root, 191 units) and Probatio (custom, 248 units). Originals byte-identical afterward (ledger sha256 unchanged, root schema untouched, no .promptus/schema created). 12/12 needle facts retrievable post-migration — ledger numbers/methods and frontmatter-less project notes (indexed as finding:?).

### [2026-06-28 21:25:01] FINDING/VALIDATED — real-data needles confirm the retrieval-economy need (parked kb-get/--snippet)
Each real-data needle returned 189-218 hits: the kb-find body-grep matches every ledger card because they share one file. Retrieval works (the needle always surfaces) but is noisy. This is direct evidence FOR the parked retrieval-economy work — kb-get / kb-find --snippet/--limit — to stop swallowing the whole ledger per query.

### [2026-06-29 13:01:04] RESULT/VALIDATED — v0.4.0: built kb-ingest, the CURATE verb (backfill + promote)
Built kb-ingest: backfill (prepend lit frontmatter, source from ledger run-id or the note's own ## Citation/## References) + promote (reclassify an external note out of the finding store into docs/lit/, replacing stale frontmatter, fixing moved links). Derives source ONLY from what's recorded; FLAGS, never invents. 13 tests; /promptus-ingest command.

### [2026-06-29 13:01:04] FINDING/VALIDATED — kb-ingest adversarial audit: 4 bugs fixed; real data caught a recall regression fixtures passed
Adversarial audit found 4 real bugs the 9 happy-path tests missed: (1) promote stacked a 2nd frontmatter block onto a file that already had one; (2) a '## Source of the wall' content heading was extracted as the citation (provenance corruption); (3) an uppercase ](TELOS.md) link mis-pathed; (4) --kind written unvalidated. All fixed + regression-tested. The fix for (2) over-tightened and dropped 8 real '## References (...)' notes — caught ONLY by re-running on real Psi data, not the synthetic tests. Lesson: dogfood on real data, not just fixtures.

### [2026-06-29 13:01:04] DECISION/VALIDATED — Probatio lit-vs-finding settled (operator sign-off): 12 lit units, positioning/ surfaced
Operator signed off on the lit-vs-finding classification for Probatio's deep-research. Promote 10 to lit: prior-art-org-redesign, epistemics-of-the-believer (sweep D75 wf_93f1d629), manager-interventions, apn-125-ladder, + 6 positioning/ audits (aristotle-novelty, buehler arXiv:2606.01444, competitive-landscape, principia-prior-art, reinvented-wheel, publication-strategy). KEY: the positioning/ subdir was UNINDEXED (kb-index is non-recursive on docs/) — promotion both re-types and surfaces them. Result: 12 lit units (was 2).

### [2026-06-29 13:01:04] RESULT/VALIDATED — dogfood: kb-ingest works on Promptus + Psi + Probatio; no invented sources
kb-ingest validated on all 3 dogfood repos (sandbox copies, originals untouched): Promptus = clean no-op (own lit already sourced); Psi = 32/37 sourced (6 ledger run-id, 26 own citation), 5 honestly flagged; Probatio = 12 lit after the signed-off classification. Confirms the tool is honest (no invented provenance) across real corpora.

### [2026-06-29 13:35:03] FIX/RESOLVED — v0.4.1: kb-index recurses into docs/ subdirs (the positioning/ blind spot)
kb-index walked each store dir non-recursively, so notes in docs/ subdirs were silently unindexed + unretrievable — exposed by the Probatio dogfood (its docs/positioning/ audits were invisible). Fix: mdFiles recurses; collect() assigns each file to its LONGEST-matching store so the recursive finding walk never double-indexes the nested lit store; archive/ (cold storage) + hidden dirs + README.md are skipped so re-indexing doesn't re-introduce archived bloat. +4 robustness tests (subdir indexed, no double-index, README skipped, archive cold). 76 green.

### [2026-06-29 13:35:03] DECISION/VALIDATED — Ops: cross-OS checks now required on main; the suite 'flake' was contention, not a bug
Promoted tests (windows-latest) + tests (macos-latest) to required status checks on main (gh api PATCH of the branch-protection required_status_checks, strict kept). The cross-OS matrix now gates every merge — pending since v0.2.0. Also: the one-off 70/2 test result earlier was subprocess/fs contention from running two suites concurrently, not a code flake — 3 consecutive isolated runs are 76/0; documented as transient, not chased.

<!-- kb:append-point -->
