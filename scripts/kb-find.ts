#!/usr/bin/env bun
/**
 * kb-find.ts — header-first retrieval. No embeddings, no DB (see the invariant):
 * a hand-written header beats a vector for a small, dense, status-tagged corpus.
 *
 * Usage:
 *   kb-find "<query>" [--substrate <s>] [--status <st>] [--hops <n>]
 *
 * Behavior (the contract to implement):
 *   1. Read .promptus/CATALOG.md as the primary index (the card-catalog).
 *   2. grep-scan the store files for exact terms / numbers / run-ids.
 *   3. Walk graph.json up to --hops for multi-hop (associative) retrieval.
 *   4. Apply --substrate / --status filters (epistemic slicing).
 *   5. Emit matched units as: `substrate:status · title · source#anchor`.
 *      Everything transparent — the caller (recall) can verify each claim↔source.
 *
 * STUB — implement against the contract above.
 */

function main(_argv: string[]): number {
  console.error("kb-find: not yet implemented — see the contract at the top of this file.");
  return 1;
}

process.exit(main(process.argv.slice(2)));
