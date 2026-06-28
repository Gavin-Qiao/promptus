/**
 * paths.ts — resolve where things live. The project root is the nearest ancestor
 * directory containing TELOS.md; all stores resolve relative to it.
 *
 * Contract:
 *   findProjectRoot(start):              walk up from `start` to the nearest dir
 *                                        with TELOS.md; throw if none.
 *   storePath(root, vocab, substrate, slug?):
 *                                        for placement "sentinel" → the store file
 *                                        (e.g. ledger/RESEARCH-LEDGER.md); for
 *                                        placement "file" → <store>/<slug>.md.
 *   derivedDir(root):                    <root>/.promptus (gitignored; CATALOG.md + graph.json).
 *   insertBeforeSentinel(content, block, sentinel):
 *                                        return `content` with `block` inserted
 *                                        immediately before the sentinel line;
 *                                        throw if the sentinel is absent.
 *
 * STUB — implement against the contract above.
 */

import type { Vocab } from "./vocab.ts";

export function findProjectRoot(_start: string): string {
  throw new Error("not implemented: findProjectRoot");
}

export function storePath(_root: string, _vocab: Vocab, _substrate: string, _slug?: string): string {
  throw new Error("not implemented: storePath");
}

export function derivedDir(_root: string): string {
  throw new Error("not implemented: derivedDir");
}

export function insertBeforeSentinel(_content: string, _block: string, _sentinel: string): string {
  throw new Error("not implemented: insertBeforeSentinel");
}
