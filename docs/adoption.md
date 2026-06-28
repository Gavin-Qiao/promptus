# Adoption — migrating a project to Promptus

> **Status: STUB.** The manual migration checklist (the operator adopts projects
> one by one). Body `TODO`.

## Checklist (per project)

1. `/promptus-init` to scaffold the four stores (Telos first).
2. Backfill the ledger: `kb-add` the key past decisions/findings (don't re-type the
   whole history — capture what you'd hate to lose).
3. Move external notes into `docs/lit/` as `lit` units (each with a `--source`).
4. `kb-index` and resolve any orphans / broken links it reports.
5. Adopt the cadence in the project's `AGENTS.md`.

## Canonicalization (operator's real machine — not done in this repo)

The proven global assets — `~/.claude/skills/research-ledger`,
`~/.claude/commands/checkpoint.md`, the memory store — get **demoted to thin
pointers with a degraded-mode fallback** (the probatio pattern), with Promptus as
the single source of truth. This is a manual step on the operator's machine; it is
**not** performed by this repo (those globals aren't present here).

## TODO

- [ ] Concrete pointer/fallback snippet for the global → Promptus demotion.
- [ ] Order to migrate Probatio / Psi; what to backfill vs leave behind.
