# AGENTS.md — <PROJECT NAME>

> Template cadence for a Promptus-managed project. `/promptus-init` drops this in.

## Cadence

1. **Read `TELOS.md` first** — the direction and the rules that never bend.
2. **Store as you go.** Don't hand-edit the ledger or `docs/`. Append through the gate:
   ```
   echo "<prose body>" | bun scripts/kb-add.ts --substrate ledger --kind EVENT --status VALIDATED --title "…"
   ```
3. **Re-index after writes** — `bun scripts/kb-index.ts`.
4. **Retrieve header-first** — `bun scripts/kb-find.ts "<query>"` (or the `recall` skill).
5. **Checkpoint before you compact** — `/checkpoint` flushes anything un-recorded so
   nothing is lost, reconciles memory, then tidies.
