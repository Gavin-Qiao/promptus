#!/usr/bin/env bun
/**
 * ledger-append.ts — thin back-compat wrapper. Forwards to kb-add with
 * `--substrate ledger`, preserving the operator's existing muscle memory and any
 * callers of the old append script. New code should call kb-add directly.
 *
 * Usage:
 *   ledger-append --kind <K> --status <S> --title "<t>" [...]  < body.md
 *     ≡ kb-add --substrate ledger --kind <K> --status <S> --title "<t>" [...]
 *
 * STUB — implement as a forwarder to kb-add.ts.
 */

function main(_argv: string[]): number {
  console.error("ledger-append: not yet implemented — forwards to kb-add --substrate ledger.");
  return 1;
}

process.exit(main(process.argv.slice(2)));
