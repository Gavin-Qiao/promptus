/**
 * _lib.ts — shared helpers for the Promptus Claude Code hooks.
 *
 * Every hook reads the event JSON from stdin and is a strict no-op outside a
 * Promptus-initialized repo (no TELOS.md / ledger), so enabling the plugin never
 * interferes with other projects.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";

export async function readHookInput(): Promise<any> {
  try {
    const text = await Bun.stdin.text();
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

export function projectRoot(input: any): string {
  return (input && typeof input.cwd === "string" && input.cwd) || process.cwd();
}

export function ledgerPath(root: string): string | null {
  const p = join(root, "ledger", "RESEARCH-LEDGER.md");
  return existsSync(p) ? p : null;
}

export function isPromptusRepo(root: string): boolean {
  return existsSync(join(root, "TELOS.md"));
}
