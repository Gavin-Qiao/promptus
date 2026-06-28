/**
 * frontmatter.ts — parse/serialize the minimal YAML-subset frontmatter block
 * that tops every stored unit (--- ... ---). Stdlib-only; no YAML dependency.
 * Support only what units need: scalar `key: value` and inline `[a, b]` lists.
 *
 * Contract:
 *   parseFrontmatter(md):      { data, body } — `data` is the parsed block (or {}
 *                              if absent), `body` is the markdown after it.
 *   serializeFrontmatter(data): the "---\n…\n---\n" block for `data`.
 *
 * STUB — implement against the contract above.
 */

export type Frontmatter = Record<string, string | string[]>;

export function parseFrontmatter(_md: string): { data: Frontmatter; body: string } {
  throw new Error("not implemented: parseFrontmatter");
}

export function serializeFrontmatter(_data: Frontmatter): string {
  throw new Error("not implemented: serializeFrontmatter");
}
