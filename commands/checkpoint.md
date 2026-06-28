---
description: Minimal pre-compaction flush — sweep the session for anything not yet stored and add it through kb-add, refresh the NOW-header, re-index. Doesn't rebuild the wheel; the research-ledger skill owns the format.
argument-hint: "[optional scope note]"
---

# /checkpoint — minimal flush before compaction

Goal: lose nothing to the compaction. This is a thin **check-and-add**, not a re-run of the
whole methodology — the `research-ledger` skill owns the format (kinds, status tags, the
NOW-header); load it if you need the spec. Work from facts; never invent entries.

1. **Check.** Sweep the session for anything that exists only in the conversation, not yet in
   a store — decisions, runs, observations, dead-ends, fixes, findings, prior art read.
2. **Add** each through the gate (the script owns the timestamp / id / placement):
   ```
   echo "<body>" | bun "${CLAUDE_PLUGIN_ROOT}/scripts/kb-add.ts" --substrate <s> --kind <K> --status <S> --title "…"
   ```
   Lead with the dead-ends and mistakes — those are the ones that get skipped. Be terse.
3. **Refresh the NOW-header** of `ledger/RESEARCH-LEDGER.md` so a resuming self is current:
   the `Updated:` stamp, `NOW`, `Open frontier`, and the `<<< RESUME HERE AFTER COMPACTION >>>`
   paragraph. Hand-edit only the header — never a `### [ts]` log line.
4. **Reconcile memory** only where the session clearly settled or overturned a fact
   (`kb-add --substrate memory`, or flip a stale one to `status: retired`). Don't re-survey.
5. **Re-index + report.** `bun "${CLAUDE_PLUGIN_ROOT}/scripts/kb-index.ts"` to refresh the
   catalog and surface orphans / unresolved links, then a one-line summary: N added (by kind),
   anything flagged, and the resume line. Then it's safe to `/compact`.

Distilling findings into `docs/`, chasing contradictions, archiving the log — that's deliberate
tidying, **not** part of the minimal flush. Do it when you have the room, not as a reflex.
