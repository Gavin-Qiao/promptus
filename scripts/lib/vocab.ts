/**
 * vocab.ts — load schema/kb-vocab.json and enforce the gate.
 *
 * The gate is what makes writes trustworthy: kb-add refuses any unit whose
 * substrate / kind / status isn't in the controlled vocab, a substrate-required
 * field that's missing (e.g. a `lit` unit with no source), or an empty title —
 * erroring with the allowed set, like a failing commit-msg hook.
 *
 * Contract:
 *   loadVocab(root):       parse <root>/schema/kb-vocab.json into a typed Vocab.
 *   validate(vocab, unit): { ok: true } | { ok: false, error, allowed? }
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface SubstrateSpec {
  prefix: string;
  store: string;
  placement: "sentinel" | "file";
  /** how kb-add assembles the unit: "log" (### [ts] KIND/STATUS — title),
   *  "page" (# title + frontmatter), or "memory" (memory frontmatter + index). */
  envelope: "log" | "page" | "memory";
  kinds: string[];
  statuses: string[];
  requires?: string[];
  /** for "file" placement that also maintains an index file (memory). */
  index?: string;
}

export interface Vocab {
  version: number;
  substrates: Record<string, SubstrateSpec>;
  link_classes: string[];
  lit_reuse: string[];
  status_glyphs?: Record<string, string>;
  sentinel: string;
}

export interface UnitInput {
  substrate: string;
  kind: string;
  status: string;
  title: string;
  source?: string;
  links?: string[];
}

export type ValidateResult =
  | { ok: true }
  | { ok: false; error: string; allowed?: string[] };

export function loadVocab(root: string): Vocab {
  return JSON.parse(readFileSync(join(root, "schema", "kb-vocab.json"), "utf8")) as Vocab;
}

export function validate(vocab: Vocab, unit: UnitInput): ValidateResult {
  const sub = vocab.substrates[unit.substrate];
  if (!sub) {
    return { ok: false, error: `unknown substrate "${unit.substrate}"`, allowed: Object.keys(vocab.substrates) };
  }
  if (!unit.title || !unit.title.trim()) {
    return { ok: false, error: "empty title" };
  }
  if (!sub.kinds.includes(unit.kind)) {
    return { ok: false, error: `kind "${unit.kind}" not allowed for substrate "${unit.substrate}"`, allowed: sub.kinds };
  }
  if (!sub.statuses.includes(unit.status)) {
    return { ok: false, error: `status "${unit.status}" not allowed for substrate "${unit.substrate}"`, allowed: sub.statuses };
  }
  for (const req of sub.requires ?? []) {
    const val = (unit as Record<string, unknown>)[req];
    if (typeof val !== "string" || val.trim() === "") {
      return { ok: false, error: `substrate "${unit.substrate}" requires --${req}` };
    }
  }
  return { ok: true };
}
