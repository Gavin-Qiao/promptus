#!/usr/bin/env bun
/**
 * kb-index.ts — rebuild the DERIVED, disposable index from the markdown truth.
 * Run after a batch of writes; safe to delete .promptus/ and regenerate anytime.
 *
 * Usage:
 *   kb-index [--root <dir>]
 *
 * Behavior (the contract to implement):
 *   1. Walk all four stores' markdown under the project root.
 *   2. Parse each unit's frontmatter/header (frontmatter.ts) and links (links.ts).
 *   3. Rebuild .promptus/CATALOG.md — one line per unit, the card-catalog:
 *        `substrate · status · title · path · [[links]]`
 *      This is the primary retrieval index; the model reads it and IS the ranker.
 *   4. Rebuild .promptus/graph.json — adjacency from [[links]], typed by link_classes.
 *   5. Lint and report: orphans (no in/out links) and broken links (target not found).
 *   6. Idempotent. Exit non-zero if lint finds problems (so it can gate /checkpoint).
 *
 * STUB — implement against the contract above.
 */

function main(_argv: string[]): number {
  console.error("kb-index: not yet implemented — see the contract at the top of this file.");
  return 1;
}

process.exit(main(process.argv.slice(2)));
