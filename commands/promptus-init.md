---
description: Stand up the four Promptus stores + the AGENTS.md cadence in this repo (runs the telos skill end to end, then smoke-tests the loop).
argument-hint: "[project name]"
---

# /promptus-init — initialize Promptus in a repo

Initialize Promptus in the current repository. Use `$ARGUMENTS` as the project name if given;
otherwise ask, or infer from the directory. **Idempotent** — if the repo is already
initialized (a `TELOS.md` exists), report what's there and don't clobber.

## Steps

1. **Run the `telos` skill** against this repo: scaffold the four stores from `templates/`,
   Telos first — `TELOS.md`, `ledger/RESEARCH-LEDGER.md` (with the `<!-- kb:append-point -->`
   sentinel), `docs/` + `docs/lit/` (with `INDEX.md`), and `memory/MEMORY.md`.
2. **Wire the cadence.** Copy `templates/AGENTS.md` → `AGENTS.md` (filling the project name),
   so the store-as-you-go habit is always in context. Add `/.promptus/` to `.gitignore`.
3. **Confirm the scripts resolve the new root.** From the repo, `bun "${CLAUDE_PLUGIN_ROOT}/scripts/kb-find.ts" --root .`
   should find `TELOS.md` and report an empty (or freshly-seeded) catalog rather than erroring.
4. **Seed + smoke-test.** Store the operator's mandate as the first unit
   (`kb-add --substrate ledger --kind DECISION --status VALIDATED --title "Mandate: …"`), then
   `bun "${CLAUDE_PLUGIN_ROOT}/scripts/kb-index.ts"` — confirm `.promptus/CATALOG.md` lists it as `ledger:VALIDATED`.
5. **Print next steps**: how to `kb-add` the next unit, when to `kb-index`, and to run
   `/checkpoint` before compaction.

## How the scripts are found

Promptus is a Claude Code plugin: installing it bundles `scripts/` (kb-add / kb-index / kb-find
+ `lib/`), and the skills, commands, and templates call them via `${CLAUDE_PLUGIN_ROOT}/scripts/…`
— so they resolve from any project with nothing copied in. (For raw development *inside* the
Promptus repo itself, the scripts are just `bun scripts/…` relative to the repo root.)
