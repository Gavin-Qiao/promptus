---
description: Flush everything important into the Promptus stores before compacting a session — so a context compaction can't lose it. Then refresh the NOW-header, reconcile memory, re-index, and tidy.
argument-hint: "[full|quick] (default full)"
---

# /checkpoint — lossless flush before compaction

You are about to compact (or end) a session. The goal is simple: **lose nothing.** Work
from facts — verify against files, git, and command output; never invent entries. First
load the `research-ledger` skill for the format (kinds, status tags, NOW-header).

Scope from `$ARGUMENTS` (default `full`): `quick` = steps 1–2 only (a fast save when
context is nearly full); `full` = all steps.

## 1. Flush the log
Sweep the session for anything that exists only in the conversation, not yet in a store —
decisions made, runs done, observations, dead-ends, fixes, findings, prior art read. Write
each through the gate, in the right substrate:

```
echo "<prose body>" | bun scripts/kb-add.ts --substrate ledger --kind <KIND> --status <STATUS> --title "…"
```

Cite artifacts (paths / run-ids) and quote key numbers inline. Be terse — this is state,
not a transcript. Negative results (`DEADEND`, `MISTAKE`) earn the same care as wins. Never
hand-type a `### [ts]` line.

## 2. Refresh the NOW-header
Rewrite the top-of-ledger header so it is true *now*: the `Updated:` stamp, the `NOW` state,
`Open frontier` (current `OPEN` items), `Next actions`, and the
`<<< RESUME HERE AFTER COMPACTION >>>` paragraph (which files matter, what was in flight).
Add any new jargon to the `Glossary` so the header stands alone.

## 3. Compile + lint the wiki  (full only)
Distill new, settled findings into `docs/` concept pages — one concept per file, `[[linked]]`:
```
echo "<distilled finding>" | bun scripts/kb-add.ts --substrate finding --kind <RESULT|METHOD|CLAIM|CONCEPT> --status <…> --title "…" --links "…"
```
Then rebuild + lint the index: `bun scripts/kb-index.ts`. Resolve what it surfaces —
**contradictions** (write the correction with `--supersedes <id>`; keep both, never silently
overwrite), **stale** claims, **orphans / unresolved links** (wire them up, or confirm an
intentional concept-handle). Auto-fix the mechanical issues; list anything that needs the
operator's judgement.

## 4. Reconcile memory  (full only)
Keep `memory/` correct and current, not merely additive. **Promote** settled facts to a
`memory` unit (`--substrate memory --status validated`); **retire** what's superseded (edit
its file's `status: retired`); **add** genuinely durable, non-obvious facts. The
`memory/MEMORY.md` index is kept in sync by `kb-add`; verify one pointer per file.
(If the operator runs a global `~/.claude/.../memory` store, reconcile up to it here too.)

## 5. Report
Output a compact summary: **Logged** N entries (by kind) · **Wiki/lint** pages touched,
contradictions/stale/orphans fixed, items flagged · **Memory** added/updated/retired · the
one-line **Resume**. Then it is safe to `/compact`.
