---
description: Stand up the four Promptus stores + the AGENTS.md cadence in this repo.
argument-hint: "[project name]"
---

# /promptus-init — initialize Promptus in a repo

> **Status: STUB.** Contract below; body `TODO`.

## What this command should do

Run the `telos` skill end to end against the current repo, then wire the cadence:

1. Scaffold the four stores from `templates/` (Telos first; ledger with its
   `<!-- kb:append-point -->` sentinel; `docs/` + `docs/lit/`; the memory store).
2. Drop an `AGENTS.md` that prescribes the store-as-you-go cadence (mirroring this
   repo's own `AGENTS.md`).
3. Confirm the scripts resolve the new root (`paths.findProjectRoot` finds `TELOS.md`).
4. Print next steps: how to `kb-add` the first unit and run `kb-index`.

Idempotent: if the repo is already initialized, report and don't clobber.

## TODO

- [ ] Wire to `templates/` + the `telos` skill.
- [ ] Decide how scripts ship into a target repo (vendored vs referenced from the plugin).
- [ ] Smoke test: init a scratch dir, add one unit, index it.
