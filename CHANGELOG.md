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
- **Controlled vocabulary + the gate.** `schema/kb-vocab.json` defines the substrates, kinds,
  and statuses; the writer-jig refuses off-vocab input — an unknown kind/status, a `lit` unit
  with no `--source`, or an empty title — and prints the allowed set, commit-msg-hook style.
- **Skills.** `promptus` (orchestrator and map), `humanizer` (the writing renderer, with a
  *ground* mode that cites and calibrates against the store), `recall` (retrieval reasoning:
  decompose → retrieve → confidence-gate → verify → synthesize), `grannie` (plain-language
  ELI90 renderer), `telos` (scaffold a project's four stores), and `research-ledger` (the
  store-as-you-go recording habit).
- **Commands.** `/checkpoint` (a minimal pre-compaction flush) and `/promptus-init` (stand up
  the four stores + the `AGENTS.md` cadence in a repo, idempotent).
- **Agent.** `grounded-writing-reviewer` — audits a draft for AI-writing tells *and* for
  unsourced or over-confident claims, checking each factual claim against the store.
- **Humanizer Part II.** 14 positive "human factor" patterns plus `human-factors-analysis.md`,
  layered on the upstream's 29 removal patterns (carried from the skill's v2.7.0).
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

- Accept `DEADEND` as a ledger status — the real research ledgers use `RESULT/DEADEND`
  constantly, and the gate had rejected it.
- Make the ledger's catalog anchor space-free so ledger entries are retrievable by `kb-find`.
- Key `kb-find` results by full card identity rather than path, so two entries written in the
  same second no longer collapse into one.

### Notes

- **License.** Promptus is licensed under Apache-2.0 (© 2026 Mohan Qiao). The forked
  `skills/humanizer` Part I remains under its upstream MIT license (© 2025 Siqi Chen), retained
  in `LICENSE-humanizer`; see `NOTICE` for provenance.

[Unreleased]: https://github.com/Gavin-Qiao/promptus/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Gavin-Qiao/promptus/releases/tag/v0.1.0
