# Changelog

All notable changes to Promptus are recorded here.

The format follows [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/),
and the project adheres to [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

> **Convention.** Group changes under a version heading `## [X.Y.Z] - YYYY-MM-DD`, newest
> first. Within a version, use only these categories, in this order, omitting any that are
> empty: **Added** (new features), **Changed** (changes to existing behavior), **Deprecated**
> (soon-to-be-removed), **Removed** (now-removed), **Fixed** (bug fixes), **Security**
> (vulnerabilities). Keep entries terse, user-facing, and in the imperative past ("Add…",
> "Fix…"). Accumulate day-to-day work under `## [Unreleased]`; cutting a release renames that
> heading to the new version + date and opens a fresh `[Unreleased]` (see `RELEASING.md`). The
> reference links at the bottom map each version to its compare/tag URL. The release workflow
> reads the section for the tag being pushed and refuses to publish if it is missing or empty.

## [Unreleased]

## [0.2.0] - 2026-06-28

### Added

- **Robustness test suite** (`scripts/test/robustness.test.ts`, 16 tests): substrate fidelity (no
  phantom or silently-dropped units; status preserved verbatim as the calibration source), cross-OS
  encoding (CRLF, forward-slash paths, non-ASCII titles), path resolution (relative `--root`, a
  subdirectory, spaces, cwd fallback), and corruption resilience (bad vocab, a missing sentinel,
  broken frontmatter, a corrupt cache).
- **CI runs on Windows and macOS** in addition to Linux, so the cross-OS code paths are exercised on
  real runners.

### Changed

- **BREAKING — the knowledge system now lives under one `.promptus/` namespace.** A project's
  stores moved off the repo root into `.promptus/`: `.promptus/TELOS.md`,
  `.promptus/ledger/RESEARCH-LEDGER.md`, `.promptus/docs/` (+ `docs/lit/`), `.promptus/memory/`,
  and `.promptus/schema/kb-vocab.json`. The derived index dropped to `.promptus/cache/`. One folder
  is collision-proof in a host repo (it no longer clobbers the host's own `docs/`, `memory/`, or
  schema) and cleanly separates "the Promptus product" from "Promptus using itself." `AGENTS.md`
  stays at the repo root, where agents look for it.
- `findProjectRoot` now marks the root by `.promptus/schema/kb-vocab.json` (or `.promptus/TELOS.md`);
  `kb-add` / `kb-index` / `kb-find` / `kb-export` read and write the catalog at `.promptus/cache/`;
  the PreToolUse hook guards `.promptus/cache/` (not the whole namespace) plus the relocated ledger.
- `.gitignore` now ignores only `/.promptus/cache/` — the stores under `.promptus/` are committed.
- The shipped default vocab moved to `templates/schema/kb-vocab.json` (what `/promptus-init` copies in).

### Fixed

- **A CRLF ledger no longer drops its entries.** `kb-index` normalizes line endings before parsing,
  so a ledger checked out with `core.autocrlf=true` (Windows) is parsed correctly instead of
  silently yielding an empty catalog. Surfaced by the new cross-OS tests.
- **`loadVocab` reports a clear error** for a missing or malformed `.promptus/schema/kb-vocab.json`
  instead of a raw parser stack trace.

### Migration (from 0.1.x)

Move a 0.1.x repo's stores under `.promptus/` and its vocab to `.promptus/schema/kb-vocab.json`
(prefix the vocab's `store` paths with `.promptus/`), then swap `/.promptus/` for `/.promptus/cache/`
in `.gitignore`. `git mv` keeps history; re-run `kb-index` to rebuild the cache. Full checklist in
`.promptus/docs/adoption.md`.

## [0.1.1] - 2026-06-28

### Added

- **KAG coverage audit.** `docs/promptus-vs-kag-coverage.md` and `lit` notes (KAG, GraphRAG,
  HippoRAG, RAPTOR, Karpathy's llm-wiki) — the audit finds Promptus implements KAG's epistemic
  spine (store, typed graph, status-calibrated grounding) and defers the scale machinery behind the
  invariant.

### Changed

- **Relicensed from Apache-2.0 to GPL-3.0.** Promptus is now copyleft: distributing it or any
  derivative requires sharing the source under GPL-3.0. `LICENSE` is the GNU GPL v3.0 text.
- **Rewrote the README** — design-philosophy first, then quick start; modern layout; corrected the
  `humanizer` description (it is pure style; grounding lives in `recall` + the reviewer); added a
  prior-art credit to Karpathy's llm-wiki pattern.

### Removed

- **`LICENSE-humanizer` (MIT).** The upstream humanizer Part I is MIT-licensed; that copyright and
  permission notice is now preserved in `NOTICE` (as MIT requires) rather than as a separate
  license file. The fork is acknowledged in the README.
- **The humanizer skill's own version system.** The skill no longer carries `version:` / `license:`
  frontmatter or in-text version stamps — Promptus has one version and one license.

## [0.1.0] - 2026-06-28

First public release — the store/keep/retrieve/render spine, packaged as a Claude Code plugin.

### Added

- **Store spine.** `kb-add` (the gated writer-jig — the one way knowledge enters a project),
  `kb-index` (rebuild the derived `.promptus/CATALOG.md` card-catalog + `graph.json`; lint
  orphans and unresolved links), and `kb-find` (header-first retrieval: catalog scan + grep +
  `[[link]]`-graph walk + status filter). TypeScript on bun, stdlib-first; `bun test` covers
  the `lib/` units and store-spine integration.
- **Four-store architecture.** Telos (`TELOS.md`), append-only Ledger
  (`ledger/RESEARCH-LEDGER.md`), Knowledge (`docs/` findings + `docs/lit/` literature), and
  Memory (`memory/`, one file per fact). Every unit carries a `substrate:status` tag.
- **Controlled vocabulary + the hybrid gate.** `schema/kb-vocab.json` separates three facets —
  KIND (the act), STATUS (the claim's epistemic state), and RELATION (a typed link) — each a
  closed core plus blessed extensions. The curated library (finding/lit/memory) is **strict**
  (off-vocab input is refused with the allowed set); the lab-notebook ledger is **permissive**
  (an off-vocab kind/status is warned about but still written). Grounded in PROV-O/BFO (act vs.
  claim), CiTO, and the null-results/hedging literature — `DEADEND` is a KIND, not a STATUS, and
  supersession is a relation, not a status.
- **Typed relations + interop.** Relations (`supersedes`/`refutes`/`challenges`/`supports`/
  `extends`/`fixes`) are first-class edges; `kb-export` emits them as CiTO/PROV-O JSON-LD.
- **Skills.** `promptus` (orchestrator and map), `humanizer` (the writing renderer — paper voice,
  pure style), `recall` (retrieval reasoning, where grounding lives:
  decompose → retrieve → confidence-gate → verify → synthesize), `grannie` (plain-language
  ELI90 renderer), `telos` (scaffold a project's four stores), and `research-ledger` (the
  store-as-you-go recording habit).
- **Commands.** `/checkpoint` (a minimal pre-compaction flush) and `/promptus-init` (stand up
  the four stores + the `AGENTS.md` cadence in a repo, idempotent).
- **Agent.** `grounded-writing-reviewer` — audits a draft for AI-writing tells *and* for
  unsourced or over-confident claims, checking each factual claim against the store.
- **Humanizer Part II.** 14 positive "human factor" patterns plus `human-factors-analysis.md`,
  layered on the upstream's 29 removal patterns.
- **Templates.** Per-project four-store scaffolds that `/promptus-init` drops in.
- **Plugin packaging.** `.claude-plugin/plugin.json` + `marketplace.json`; skills, commands,
  and templates resolve the bundled `scripts/` via `${CLAUDE_PLUGIN_ROOT}`, so installing the
  plugin brings the machinery with nothing to vendor.
- **Project automation.** Continuous integration (lint + `bun test` + an offline plugin
  validator), a tag-driven release workflow with a changelog sanity gate, and a
  `.pre-commit-config.yaml` that the operator's shared git hooks pick up automatically.
- **Hooks.** Four guarded Claude Code hooks, each a no-op outside a Promptus repo:
  SessionStart injects the ledger's NOW-header to orient a resuming agent; a PreToolUse guard
  keeps freehand writes off the ledger log and `.promptus/`; PostToolUse re-indexes after a
  `kb-add`; SessionEnd nudges to `/checkpoint`.
- **Documentation.** `README.md`, `TELOS.md` (north star + the invariant), `AGENTS.md` /
  `WARP.md` (working cadence), `docs/report.md` (the design report), `docs/adoption.md` (the
  manual migration checklist), `CONTRIBUTING.md`, and `RELEASING.md`.

### Fixed

Hardening found by dogfooding before release:

- Parse free-form compound statuses — a permissive-ledger entry whose status contains spaces
  (e.g. `CORRECTION + RESULT`) is written to the catalog *and* retrievable by `kb-find` (the
  catalog is split on its delimiter, not matched by a single-token regex). Surfaced by migrating
  the Psi project.
- Adopt projects with a non-default layout — `findProjectRoot` accepts `schema/kb-vocab.json`
  (not only a root `TELOS.md`), and `kb-index` no longer double-indexes a ledger that lives inside
  the finding store dir. Surfaced by migrating Probatio (ledger at `docs/research-ledger.md`).
- Make the ledger's catalog anchor space-free so ledger entries are retrievable by `kb-find`.
- Key `kb-find` results by full card identity rather than path, so two entries written in the
  same second no longer collapse into one.

### Notes

- **License.** Promptus is licensed under Apache-2.0 (© 2026 Mohan Qiao). The forked
  `skills/humanizer` Part I remains under its upstream MIT license (© 2025 Siqi Chen), retained
  in `LICENSE-humanizer`; see `NOTICE` for provenance.

[Unreleased]: https://github.com/Gavin-Qiao/promptus/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/Gavin-Qiao/promptus/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/Gavin-Qiao/promptus/releases/tag/v0.1.0
