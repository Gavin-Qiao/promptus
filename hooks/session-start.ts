#!/usr/bin/env bun
/**
 * SessionStart hook — inject the ledger's NOW-header so a resuming agent is oriented.
 * The "overnight-handoff renderer", automated. No-op when there is no ledger.
 */
import { readFileSync } from "node:fs";
import { readHookInput, projectRoot, ledgerPath } from "./_lib.ts";

const input = await readHookInput();
const root = projectRoot(input);
const lp = ledgerPath(root);
if (!lp) process.exit(0);

const lines = readFileSync(lp, "utf8").split(/\r?\n/);

// The live state is the NOW-header: from "## NOW" down to the "## Log" that starts the
// append-only entries. Fall back to the RESUME block, then to the top of the file.
function header(): string {
  const now = lines.findIndex((l) => /^## NOW/.test(l));
  const log = lines.findIndex((l) => /^## Log\b/.test(l));
  if (now !== -1) {
    const end = log > now ? log : Math.min(lines.length, now + 60);
    return lines.slice(now, end).join("\n").trim();
  }
  const resume = lines.findIndex((l) => /RESUME HERE/.test(l));
  if (resume !== -1) return lines.slice(resume, Math.min(lines.length, resume + 14)).join("\n").trim();
  return lines.slice(0, 30).join("\n").trim();
}

const block = header();
if (!block) process.exit(0);

const title = (lines.find((l) => /^# /.test(l)) || "# Research Ledger").replace(/^#\s*/, "").trim();
process.stdout.write(
  `Promptus — resuming "${title}". Current state, from the ledger NOW-header ` +
    `(read the full ledger/RESEARCH-LEDGER.md and TELOS.md before acting):\n\n${block}\n`,
);
