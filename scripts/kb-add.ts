#!/usr/bin/env bun
/**
 * kb-add.ts — the gated writer-jig. The ONE way knowledge enters a project.
 * The LLM supplies only the prose body (on stdin); the script owns everything
 * else: the envelope, the metadata, the timestamp, the id, the placement, the
 * incremental index update, and the validation gate.
 *
 * Usage:
 *   kb-add --substrate <ledger|finding|lit|memory> --kind <K> --status <S>
 *          --title "<t>" [--source "<src#anchor>"] [--links "a,b"]
 *          [--supersedes <id>] [--dry-run]  < body.md
 *
 * Behavior (the contract to implement):
 *   1. loadVocab(root) and validate the flags. On failure, print the allowed set
 *      and exit non-zero (commit-msg-hook style). Never write a malformed unit.
 *   2. Read the prose body from stdin.
 *   3. Stamp an ISO timestamp (clock.ts) and mint an id (ids.ts).
 *   4. Assemble the unit: frontmatter block + `## <title>` heading + body.
 *   5. Place it (paths.ts):
 *        ledger  → insert before the sentinel in ledger/RESEARCH-LEDGER.md
 *        finding → docs/<slug>.md
 *        lit     → docs/lit/<slug>.md       (requires --source)
 *        memory  → insert before the sentinel in memory/MEMORY.md (per-project)
 *   6. Append ONE line for the new unit to .promptus/CATALOG.md (incremental index).
 *   7. --supersedes / CORRECTION: write a ★CORRECTION block referencing the prior
 *      id and flip the prior unit's catalog status to CORRECTION (supersede-in-place).
 *   8. --dry-run: print the assembled unit + intended path + catalog line; write nothing.
 *
 * Low friction is a hard requirement — friction is what made the old append script drift.
 *
 * STUB — implement against the contract above.
 */

function main(_argv: string[]): number {
  console.error("kb-add: not yet implemented — see the contract at the top of this file.");
  return 1;
}

process.exit(main(process.argv.slice(2)));
