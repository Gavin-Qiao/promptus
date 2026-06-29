# Research Ledger — Promptus

**Updated:** 2026-06-29 (architecture clarified (agent substrate + grannie read-port); docs re-truthed; clear to ship v0.5.0)  ·  **Operator:** Mohan Qiao  ·  **Agent:** Claude (Opus 4.x)
**Timezone:** America/Montreal (UTC-4) — all timestamps below use it.

> Append-only. Never hand-edit a `### [ts] …` entry; units enter through
> `bun scripts/kb-add.ts --substrate ledger …` (the script owns the timestamp/id/placement).
> Supersede a prior claim with `--supersedes <id>` (a `supersedes` relation marks it SUPERSEDED). Refresh the NOW-header (between the `now:` markers) through `kb-now` at `/checkpoint` — it owns the `Updated:` stamp.

## Mandate
Package the operator's write-it-grounded-and-human methodology — humanizer + research-ledger +
checkpoint + a file-based KAG store — into one installable Claude Code plugin (2026-06-27 directive).

## Thesis / approach
Store / keep / retrieve a project's knowledge as gated markdown — a substrate for the LLM agent;
grannie is the one human read-port. The same virtues that make prose honest make research
trustworthy. Markdown is truth; the index is derived; writes go through a gated script; a
hand-written header beats a vector at this scale.

## Guardrails
- The invariant (see `.promptus/TELOS.md`): markdown is the only source of truth · index derived & disposable ·
  writes gated · script over server · machinery only past a **measured** threshold.
- Failure-first: dead-ends and mistakes earn the same care as wins.
- Commits: `type(scope)` + flat bullet body, no `Co-Authored-By`. Don't merge without operator review.

<!-- now:start -->

## NOW (RETRIEVE + GRAPH done, docs re-truthed; clear to ship v0.5.0)
Released through **v0.4.1**. On `main`, uncommitted, **108 tests + validator green**: (a) **v0.4.2
kb-find de-noise**; (b) **kb-get** body-fetch (find→get; `lib/units.ts` shared + fence-aware; `recall`
two-tier); (c) **kb-graph** `rank`/`lint`/`suggest`. Polished (discoverable across orchestrator/README/
help + `/promptus-graph`), hardened (adversarial pass fixed 3 bugs: kb-get wrong-`--title` mis-fetch;
fenced `### [ts]` + fenced `↳` false-splits → one shared fence-aware parse). **Architecture clarified
(operator):** Promptus is an **agent substrate** (STORE/KEEP/RETRIEVE/GRAPH, agent-operated); **grannie
is the one human read-port**; the humanizer is a bundled STYLE TOOLKIT; "RENDER as a verb" is retired
(grounding=recall, style=humanizer, grannie already composes both). Docs re-truthed to match the code.
Norma parked.

## Open frontier
- [ ] **Ship v0.5.0** — de-noise + kb-get + kb-graph + polish + hardening + re-truthed docs. CHANGELOG +
  `plugin.json` 0.4.1→0.5.0 + feature branch + PR + tag. Verify the CI gate first (`uv run pre-commit`,
  `changelog:check`, cross-OS).
- [ ] **(note in CHANGELOG)** `kb-graph suggest` floods on one broad doc (the design report) — v1
  heuristic; a per-node cap / length-norm is a later refinement.
- [ ] **(deferred)** the Norma seam — external grounding; parked, not dropped.
- [ ] **(gated)** apply migrate→ingest to the REAL Psi + Probatio — commit/stash their WIP first.

## Next actions
1. Operator: green-light the v0.5.0 ship. Then I branch off `main`, verify the CI gate locally, write the
   CHANGELOG, open the PR, and show it before pushing.

## <<< RESUME HERE AFTER COMPACTION >>>
Promptus through **v0.4.1**; **v0.5.0 is staged + uncommitted on `main`**, 108 tests + validator green,
dogfooded + hardened: kb-find de-noise (v0.4.2), kb-get (body-fetch, fence-aware shared `ledgerHeads`),
kb-graph (rank/lint/suggest). An adversarial pass fixed 3 real bugs (kb-get wrong-`--title` mis-fetch;
fenced `### [ts]` and fenced `↳` false-splits). **Architecture is now load-bearing:** Promptus is an
**agent substrate** — STORE/KEEP/RETRIEVE/GRAPH are agent-operated; **grannie is the ONE human read-port**
(human-initiated: a person asks `/grannie explain X`; it retrieves + grounds + explains plainly by status);
the **humanizer is a bundled style toolkit** grannie dials, NOT a verb; the **grounded-writing-reviewer is
an agent-side audit**. "RENDER for an audience" was retired as a category error — the planned humanizer
ground-mode already exists, assembled, inside grannie. All docs were re-truthed to this model. NEXT: ship
v0.5.0 (branch off `main`, verify CI gate, CHANGELOG, PR, tag) on operator go. Deferred: Norma seam. Gated:
real Psi/Probatio. Read `.promptus/TELOS.md`, then this header, then the Log.

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

### [2026-06-29 14:44:31] RESULT/VALIDATED — v0.4.2 (uncommitted): kb-find de-noise — entry-scoped matching + --limit + --snippet
Body-grep now matches a ledger term against the entry's OWN slice (anchor+title to disambiguate same-second entries), not the shared file. Added --limit (caps + reports 'N of M', no silent truncation) and --snippet (the matched line, so the model judges relevance header-first without opening files). A/B on the Probatio corpus: rare-term queries (Quot.sound/irr_fract/corpus-kNN) cut output tokens 92-97% (~9.5k -> ~0.3-0.8k), 0 false positives (was ~94%); pervasive 'Goedel' -40%; page-unit queries unchanged. 79 tests green. UNCOMMITTED on main = would-be v0.4.2.

### [2026-06-29 14:44:31] FINDING/VALIDATED — Retrieval noise root cause: kb-find body-grep matched the shared ledger FILE, not the entry
For any term not in a title, kb-find greps each card's FILE — but all ~200 ledger entries share one file, so a term appearing anywhere in the ledger flagged EVERY entry (191 of 203 FALSE for a rare term). Fix: match the entry's own slice. Principle that falls out: lexical matching is the SCRIPT's job (done at the right granularity); semantic relevance stays the MODEL's (per the invariant). The de-noise is the cheap-CERTAIN retrieval tier; the body-fetch (kb-get, return the entry body not the file) is the conditional one whose ROI depends on retrieval frequency.

### [2026-06-29 14:44:31] RESEARCH/VALIDATED — Checked Norma-demo: the operator's external-literature RAG (working, custom Python, 202 papers)
Telotia/Norma-demo (local C:/Users/mohan/Desktop/Norma-demo) validates an input paper's claims against a 202-paper Yong-Zeng corpus. Stack: LanceDB (dense+vision) + BM25 + claim-index + SQLite citation-graph; Qwen3.6-35B relation-judge + Qwen3-Embedding-8B + ColEmbed vision + Qwen3-Reranker; vLLM; 100% custom Python (no LangChain). Discipline = retrieval != proof: candidates -> relation-judge (supports/method_precedent/conceptual_lineage/contradicts/challenge) -> verification gates (specificity/adversarial/direct) -> 3-tier evidence ladder broad/plausible/strict_showable (admitted ~59KB vs rejected ~8.5MB). Engine is mature + heavily iterated, BUT the rigorous judge/ladder isn't wired into the shipped viewer (older similarity-bridge demo). README is stale.

### [2026-06-29 14:44:31] DECISION/VALIDATED — Grounded-writing strategy: delegate external grounding to a Norma-style RAG, don't absorb one
Promptus and Norma are Principia siblings with a clean split: Promptus = own notes (small, authored, TRUSTED, header-first, no embeddings; the inner loop / writing surface); Norma = external literature (large, untrusted; embeddings+judge; the validation engine). Plan: Promptus does NOT absorb a RAG. It defines a thin external-grounding interface, delegates to a Norma-style service, and writes back ONLY strict_showable evidence as gated lit:CITE units with paper/page anchors + caveats. Shared Principia vocab: Norma's relation labels + broad/plausible/strict ladder ~= Promptus KIND/STATUS. This unifies the stack (Principia/Probatio/Norma/Promptus) under one epistemic frame.

### [2026-06-29 15:01:10] RESULT/VALIDATED — kb-get: the body-fetch retrieval tier (find->get); unit-extraction unified in lib/units.ts
Built kb-get, the RETRIEVE body-fetch tier: returns ONE unit's text by its catalog path — a page's whole file, or a single ledger entry's slice — without opening the shared ledger. Companion to kb-find: find says WHICH (header-first, cheap-certain), get returns the body (conditional tier). Lifted unit-extraction (ledgerEntries/unitText) into lib/units.ts so find and get share one definition of a unit's bounds; refactored kb-find onto it (no behaviour change). Wired recall's procedure to the two-tier find->get (header-first, then fetch only the bodies the headers earned; --snippet to pre-judge). 88 tests green (+9 get). Dogfood: find "de-noise" -> get one entry's slice, disambiguated by --title across a same-second anchor. Uncommitted alongside the v0.4.2 de-noise; together they complete the RETRIEVE verb.

### [2026-06-29 15:21:39] RESULT/VALIDATED — kb-graph: graph slice 1 — PageRank rank + dangling/orphan lint (no embeddings)
Built kb-graph (graph slice 1, over graph.json, no embeddings). Two commands: `rank` ranks load-bearing units by PageRank over the page-link subgraph (power iteration, damping 0.85) with in/out degree alongside; `lint` flags dangling wikilink handles with a "did you mean?" suggestion (token-Jaccard + whole-slug containment + edit-distance, maxed, threshold 0.5) and lists orphans, with --strict to gate a checkpoint. Dogfood on the real corpus: rank puts "Header beats vector" at #1 and ranks it ABOVE "The gate" despite lower raw in-degree (proves PageRank != degree: who links to you beats how many); lint surfaces the 3 orphans (the design report + 2 packaging memories) as actionable. 95 tests green (+7). Situated against prior art: this is HippoRAG's Personalized-PageRank minus the vectors (rank) and Roam/Obsidian unlinked-references minus the ML (the coming latent-link linter = slice 2). Greenlit slice 2 next. Uncommitted on main with the v0.4.2 de-noise + kb-get.

### [2026-06-29 15:32:45] MISTAKE/CORRECTED — kb-graph: suggest() name-collision shadowed the dangling-handle helper; lint broke until renamed nearest()
Naming the latent-link command function suggest(root,dir,g,top) shadowed the existing dangling-handle helper suggest(handle,nodes). JS function hoisting keeps the LATER declaration, so lint's call suggest(to, g.nodes) invoked the command with g.nodes (an array) where the dir (string) arg goes, crashing in pageDocs on join(). It slipped past because lint's dogfood ran BEFORE the command existed; only adding lint + suggest tests in the same suite surfaced it (lint stdout went empty as the "no graph" guard fired on the thrown error). Fix: renamed the helper to nearest(). Lesson: a green earlier dogfood does not cover code added after it -- re-run the old command after introducing a same-named symbol.

### [2026-06-29 15:32:46] RESULT/VALIDATED — kb-graph suggest: latent-link linter (graph slice 2) — IDF co-occurrence + shared source
Built kb-graph suggest (graph slice 2): surfaces unit pairs that are unlinked but probably related. tf.idf cosine over page-unit text (stopwords + sub-3-char tokens dropped; IDF so ubiquitous words carry ~no signal) plus a shared-source bonus (two units citing the same paper id). Suggest-only, excludes already-linked pairs, prints the WHY (top shared terms / shared source) so the human judges -- Roam/Obsidian unlinked-references minus the ML. Dogfood surfaced real prior-art siblings (graphrag<->hipporag, <->raptor, <->kag) but the long design report floods on generic words. A/B: tried IDF-squared to sink the report's faint matches -- it over-sharpened (each doc norm dominated by its own rarest terms) and DROPPED the good cross-doc links; reverted to tf.idf. Cosine floor 0.08; a shared source always shows. 98 tests green (+3). Graph slices 1+2 done; uncommitted with de-noise + kb-get + kb-graph rank/lint.

### [2026-06-29 15:43:53] RESULT/VALIDATED — Polish: integrated kb-get + kb-graph into orchestrator/README/help + /promptus-graph command; doc-accuracy fixes
Polish pass before shipping the retrieval+graph bundle: made the new tools discoverable + the docs accurate. kb-get and kb-graph (rank/lint/suggest) were invisible -- absent from the promptus orchestrator map, the README verbs, and /promptus:help. Added them across all three, a "knowledge graph" subsection to the orchestrator, and a new /promptus-graph command (matching doctor/ingest; validator-clean). Accuracy fix: the README papers-scale section framed the latent-link linter + personalized-PageRank as DEFERRED machinery, but the scriptable no-embeddings versions just shipped -- reworded so the scriptable graph layer ships now at notes-scale, only the embedding-scale version defers. Caught pre-existing drift: README + help also omitted the doctor/ingest commands -- added. False alarm cleared: lib/links.ts ALREADY strips fenced + inline code before extracting wikilinks, so the earlier "kb-index should skip code-spans" item was wrong -- my ledger handle got extracted only because I wrote it as bare prose, not backticked. Discipline: backtick wikilink-syntax when you mean it literally. bun run check green (validator + 98 tests). Release-ready.

### [2026-06-29 15:55:02] RESULT/VALIDATED — Adversarial pass: fixed kb-get silent mis-fetch + ledger fenced-head false-split (shared fence-aware ledgerHeads)
Pre-release adversarial pass on the retrieve+graph layer. Two real bugs, both fixed; six degenerate graph cases (single node, self-loop, identical bodies, all-stopword body, sourceless pairs, path-escape) verified robust. BUG 1 (honesty): kb-get with a --title matching nothing silently returned the FIRST entry at that anchor instead of erroring -- a system that promises an honest substrate must never hand back a different unit than named. Fix: resolve() now errors and lists the candidate titles when a named title matches none at a shared anchor (resolves only when there is exactly one entry there). BUG 2 (corruption): a fenced "### [ts]" example inside a ledger entry body was parsed as a real head, splitting the log and spawning a phantom unit (ledger:PHANTOM). Root cause: the head regex was DUPLICATED in kb-index.parseLedger and units.ledgerEntries and neither respected code fences (though links.ts already did). Fix: centralized a fence-aware ledgerHeads() in lib/units.ts used by BOTH callers, so they can never drift and both skip fenced heads. 107 tests green (+9 adversarial); real corpus unchanged at 67 units, proving the parseLedger refactor is behavior-preserving.

### [2026-06-29 16:43:01] DECISION/VALIDATED — Architecture clarified: Promptus is an agent substrate; grannie is the one human read-port; RENDER is not a verb
Operator reframe, accepted: the whole of Promptus serves the LLM AGENT — STORE/KEEP/RETRIEVE/GRAPH are agent-operated. The only human-initiated loop is grannie (a person asks /grannie explain X; it retrieves, grounds, and explains plainly at honest confidence). So RENDER is NOT a fourth verb: grounding = recall, styling = the humanizer patterns, and grannie already composes BOTH — there was never a "humanizer ground mode" to build (it lives, assembled, inside grannie). Reclassified: humanizer = a bundled STYLE TOOLKIT grannie dials and the agent applies to its own prose (not a knowledge verb); grounded-writing-reviewer = an agent-side AUDIT; overnight-handoff = agent-to-agent state (a checkpoint variant). Retired the planned Phase-3 "humanizer grounding" as a category error. Re-truthed the docs (TELOS, README + both Mermaid diagrams, plugin.json, orchestrator SKILL, help) from "render for an audience" to "agent substrate + grannie as the one human read-port". Clears the last pre-ship honesty gap: docs now match code. Anchoring distinction: grannie is human-initiated; writing / auditing / handoff are agent-initiated.

### [2026-06-29 16:55:56] RESULT/VALIDATED — Final pre-ship audit: .promptus structure conformant; graph design + suggest ancestor distilled into Knowledge
Final audit before the v0.5.0 ship, two parts. (1) STRUCTURE: promptus-doctor check reports layout=current, vocab namespaced v3, gate reachable, gitignore correct (only cache/ ignored), all 6 stores present -- Promptus's own .promptus/ conforms to the canonical layout it prescribes; dogfooding integrity holds. (2) KNOWLEDGE COMPLETENESS: the graph layer + kb-get were built this session but their design rationale lived only in ledger events, and the design report + the hipporag lit unit still framed PageRank / the latent-link linter as DEFERRED (the pre-reframe overreach). Closed: re-truthed report.md (agent substrate + grannie read-port; two-tier retrieve; the scriptable graph ships now, embedding-scale defers) and hipporag.md (PPR ships as kb-graph rank); added finding "The scriptable graph layer" (rank = HippoRAG PPR minus vectors, lint, suggest = unlinked-references minus ML) and lit "Unlinked references" (Roam/Obsidian -- the named ancestor of suggest); wired the orphaned design report to the 7 findings it synthesizes. Now 71 units, no unresolved links, orphans down to 2 (standalone memory facts). 108 tests + validator green. The store now holds its own complete, current design history.

<!-- kb:append-point -->
