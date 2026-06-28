/**
 * paths.ts — resolve where things live. The project root is the nearest ancestor
 * directory containing TELOS.md; all stores resolve relative to it.
 *
 * Contract:
 *   findProjectRoot(start):  walk up from `start` to the nearest dir with TELOS.md or
 *                            schema/kb-vocab.json; throw if none.
 *   storePath(root, vocab, substrate, slug?):
 *                            placement "sentinel" → the store file (e.g. ledger/RESEARCH-LEDGER.md);
 *                            placement "file"     → <store>/<slug>.md.
 *   indexPath(root, vocab, substrate):
 *                            the substrate's index file (memory/MEMORY.md), or null.
 *   derivedDir(root):        <root>/.promptus (gitignored; CATALOG.md + graph.json).
 *   insertBeforeSentinel(content, block, sentinel):
 *                            `content` with `block` inserted immediately before the sentinel
 *                            line (matching ledger-append.mjs); throw if the sentinel is absent.
 */

import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import type { Vocab } from "./vocab.ts";

export function findProjectRoot(start: string): string {
  let dir = resolve(start);
  for (;;) {
    // The root is marked by TELOS.md (the direction store) or, for a project whose direction
    // lives elsewhere (e.g. Probatio's docs/telos.md), by the vocab the scripts already need.
    if (existsSync(join(dir, "TELOS.md")) || existsSync(join(dir, "schema", "kb-vocab.json"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) throw new Error(`no TELOS.md or schema/kb-vocab.json found walking up from ${start}`);
    dir = parent;
  }
}

export function storePath(root: string, vocab: Vocab, substrate: string, slug?: string): string {
  const sub = vocab.substrates[substrate];
  if (!sub) throw new Error(`unknown substrate "${substrate}"`);
  if (sub.placement === "sentinel") return join(root, sub.store);
  if (!slug) throw new Error(`file placement for "${substrate}" requires a slug`);
  return join(root, sub.store, `${slug}.md`);
}

export function indexPath(root: string, vocab: Vocab, substrate: string): string | null {
  const idx = vocab.substrates[substrate]?.index;
  return idx ? join(root, idx) : null;
}

export function derivedDir(root: string): string {
  return join(root, ".promptus");
}

export function insertBeforeSentinel(content: string, block: string, sentinel: string): string {
  if (!content.includes(sentinel)) throw new Error(`sentinel not found: ${sentinel}`);
  const entry = block.endsWith("\n") ? block : `${block}\n`;
  return content.replace(sentinel, `${entry}\n${sentinel}`);
}
