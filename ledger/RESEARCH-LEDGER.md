# Research Ledger — Promptus

**Updated:** 2026-06-28 (v0.1 — installed locally)  ·  **Operator:** Mohan Qiao  ·  **Agent:** Claude (Opus 4.x)
**Timezone:** America/Montreal (UTC-4) — all timestamps below use it.

> Append-only. Never hand-edit a `### [ts] …` entry; units enter through
> `bun scripts/kb-add.ts --substrate ledger …` (the script owns the timestamp/id/placement).
> A `★CORRECTION` supersedes a prior claim in place. Rewrite only the NOW-header, at `/checkpoint`.

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

## NOW (v0.1 — installed & dogfooded)
Committed `14386a0` on `feat/promptus-v1` (plugin packaging + the three demo-found fixes + dogfood),
pushed to PR #1, **unmerged**. **Installed locally** as `promptus@promptus` v0.1.0 (a Directory-source
marketplace = this repo) and verified it loads — `promptus:*` skills + the reviewer agent are live,
`bun test` 18 pass, `claude plugin validate` clean. Legacy global skills/command removed and backed up
at `~/.claude/_promptus-legacy-backup/`.

## Open frontier
- [ ] OPEN — ledger vocab strict vs permissive: real Probatio/Psi ledgers use a free KIND/STATUS set, and the dogfood itself hit the strict gate twice (DEADEND, then FIX-as-status). Recommendation on file: **permissive ledger** (warn-not-block), keep finding/lit/memory strict. (→ [[the-gate]])
- [ ] grannie + overnight-handoff renderers (scaffolded, not built).
- [ ] **Migrate Probatio / Psi** — now urgent: their `AGENTS.md` still call the removed global `ledger-append.mjs` and bare `/checkpoint`, which break until they adopt the plugin.

## Next actions
1. Resolve the strict-vs-permissive ledger-vocab question (the one open design call).
2. Operator tests the plugin in a fresh session (`/promptus:humanizer`, `/promptus:checkpoint`, …).
3. Migrate Probatio / Psi to the plugin (their old refs are now broken).

## <<< RESUME HERE AFTER COMPACTION >>>
Promptus v0.1 is on `feat/promptus-v1` (commit `14386a0`, PR #1, **unmerged**) and **installed locally**
as a Directory-source plugin (`${CLAUDE_PLUGIN_ROOT}` = this repo). Store spine + skills/commands + the
plugin all work (`bun test` 18 pass; `claude plugin validate` clean; reload shows `promptus:*` live).
Legacy globals were removed and backed up at `~/.claude/_promptus-legacy-backup/` (recover `ledger-append.mjs`
there if Probatio/Psi need it before migration). The one open design call is the **ledger vocab**
(permissive vs strict). Read `TELOS.md`, then this header, then the Log below. Do not merge without the operator.

## Glossary
- `substrate:status` — every unit's tag (`ledger`/`finding`/`lit`/`memory` : its status).
- `the gate` — `kb-add` refusing an off-vocab write with the allowed set.
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

<!-- kb:append-point -->
