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
 *     reject, with a message naming the allowed values:
 *       - unknown substrate
 *       - kind not in substrate.kinds
 *       - status not in substrate.statuses
 *       - a substrate.requires field missing on the unit (e.g. lit.source)
 *       - empty/whitespace title
 *
 * STUB — implement against the contract above.
 */

export interface SubstrateSpec {
  prefix: string;
  store: string;
  placement: "sentinel" | "file";
  kinds: string[];
  statuses: string[];
  requires?: string[];
}

export interface Vocab {
  version: number;
  substrates: Record<string, SubstrateSpec>;
  link_classes: string[];
  lit_reuse: string[];
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

export function loadVocab(_root: string): Vocab {
  throw new Error("not implemented: loadVocab");
}

export function validate(_vocab: Vocab, _unit: UnitInput): ValidateResult {
  throw new Error("not implemented: validate");
}
