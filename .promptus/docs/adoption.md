# Adoption — migrating a project to Promptus

The operator adopts projects one by one, by hand. This is the checklist; nothing here is run
automatically against another repo.

## Per-project checklist

1. **Initialize.** `/promptus-init` (or run the `telos` skill) to scaffold the four stores,
   Telos first. Fill `.promptus/TELOS.md` with the project's north star and its own rules-that-never-bend.
2. **Install the Promptus plugin** so the skills, commands, and templates resolve its bundled
   `scripts/` via `${CLAUDE_PLUGIN_ROOT}` — nothing to vendor or copy in.
3. **Backfill the ledger — selectively.** Don't re-type the whole history; capture what you'd
   hate to lose. `kb-add --substrate ledger` the key past `DECISION`s, `RESULT`s, and the
   instructive `DEADEND`s. The NOW-header gets written by hand from the current state.
4. **Move external notes into `.promptus/docs/lit/`** as `lit` units, each with a `--source` and a
   `--reuse` class (CITE / DO-NOT-REBUILD / REUSE / NOVEL). Distil our own findings into `.promptus/docs/`.
5. **Index + lint.** `bun scripts/kb-index.ts`; resolve the orphans / unresolved links it
   reports (wire them up, or confirm an intentional `[[concept-handle]]`).
6. **Adopt the cadence.** Copy `templates/AGENTS.md` into the project's `AGENTS.md` so
   store-as-you-go and `/checkpoint`-before-compaction stay in context.

## Mapping an existing ledger

Projects already on the `research-ledger` skill (e.g. Probatio, Psi) keep their `### [ts]
KIND/STATUS — title` log format unchanged — Promptus emits exactly that. The conversions are:
add `.promptus/TELOS.md` if missing; move the project's stores under `.promptus/` (ledger →
`.promptus/ledger/`, notes → `.promptus/docs/`); add the `<!-- kb:append-point -->` sentinel to
the ledger; route new appends through `kb-add --substrate ledger` instead of the old
`ledger-append.mjs` (the new forwarder resolves the ledger from the project root rather than a
`--ledger` flag, so update any AGENTS.md that still passes `--ledger`).

## Canonicalization (operator's real machine — not done in this repo)

The proven global assets — `~/.claude/skills/research-ledger`, `~/.claude/commands/checkpoint.md`,
the memory store — get **demoted to thin pointers with a degraded-mode fallback** (the
`probatio` pattern), with Promptus as the single source of truth. A thin pointer is a short
skill whose first instruction is "read the canonical version in the Promptus repo and follow
it," with the non-negotiable core inline as a fallback. This is a manual step on the operator's
machine; it is **not** performed by this repo (those globals aren't present here).
