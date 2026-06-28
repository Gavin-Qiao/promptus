/**
 * kb.test.ts — the round-trip contract for the store spine. Each test scaffolds a
 * throwaway project (TELOS.md + the four stores + a copy of the vocab), runs the
 * real scripts through the bun binary, and asserts on what they wrote. Run: `bun test`.
 */
import { test, expect, afterAll } from "bun:test";
import { spawnSync } from "node:child_process";
import {
  copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const REPO = join(import.meta.dir, "..", "..");
const SCRIPTS = join(REPO, "scripts");
const tmps: string[] = [];
afterAll(() => { for (const d of tmps) { try { rmSync(d, { recursive: true, force: true }); } catch { /* ignore */ } } });

function scaffold(): string {
  const root = mkdtempSync(join(tmpdir(), "promptus-test-"));
  tmps.push(root);
  writeFileSync(join(root, "TELOS.md"), "# Telos — test\n");
  mkdirSync(join(root, "ledger"));
  writeFileSync(join(root, "ledger", "RESEARCH-LEDGER.md"), "# Research Ledger — test\n\n<!-- kb:append-point -->\n");
  mkdirSync(join(root, "docs", "lit"), { recursive: true });
  mkdirSync(join(root, "memory"));
  writeFileSync(join(root, "memory", "MEMORY.md"), "# Memory — test\n\n<!-- kb:append-point -->\n");
  mkdirSync(join(root, "schema"));
  copyFileSync(join(REPO, "schema", "kb-vocab.json"), join(root, "schema", "kb-vocab.json"));
  return root;
}

function run(script: string, args: string[], stdin = "") {
  const r = spawnSync(process.execPath, [join(SCRIPTS, script), ...args], { input: stdin, encoding: "utf8" });
  return { status: r.status ?? -1, stdout: r.stdout ?? "", stderr: r.stderr ?? "" };
}
const add = (root: string, args: string[], body = "body") => run("kb-add.ts", ["--root", root, ...args], body);
const index = (root: string, args: string[] = []) => run("kb-index.ts", ["--root", root, ...args]);
const find = (root: string, args: string[]) => run("kb-find.ts", ["--root", root, ...args]);
const read = (root: string, ...p: string[]) => readFileSync(join(root, ...p), "utf8");

test("kb-add round-trips a ledger unit, and kb-index lists it with substrate:status", () => {
  const root = scaffold();
  const r = add(root, ["--substrate", "ledger", "--kind", "RESULT", "--status", "VALIDATED", "--title", "Chose bun over node"], "We picked bun for bun:sqlite.");
  expect(r.status).toBe(0);
  expect(read(root, "ledger", "RESEARCH-LEDGER.md")).toMatch(/### \[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\] RESULT\/VALIDATED — Chose bun over node/);
  expect(index(root).status).toBe(0);
  expect(read(root, ".promptus", "CATALOG.md")).toContain("ledger:VALIDATED · Chose bun over node");
});

test("kb-add writes finding → docs/<slug>.md and lit → docs/lit/<slug>.md", () => {
  const root = scaffold();
  add(root, ["--substrate", "finding", "--kind", "RESULT", "--status", "VALIDATED", "--title", "Header beats vector at this scale"], "Because the corpus is small.");
  expect(existsSync(join(root, "docs", "header-beats-vector-at-this-scale.md"))).toBe(true);
  add(root, ["--substrate", "lit", "--kind", "PAPER", "--status", "CITE", "--title", "KAG 2024", "--source", "arXiv:2409.13731#abstract"], "Mutual indexing.");
  const lit = join(root, "docs", "lit", "kag-2024.md");
  expect(existsSync(lit)).toBe(true);
  expect(readFileSync(lit, "utf8")).toContain("arXiv:2409.13731#abstract");
});

test("kb-add rejects an unknown --status, printing the allowed set", () => {
  const r = add(scaffold(), ["--substrate", "ledger", "--kind", "RESULT", "--status", "BOGUS", "--title", "x"]);
  expect(r.status).toBe(1);
  expect(r.stderr).toContain("allowed:");
  expect(r.stderr).toContain("VALIDATED");
});

test("kb-add rejects a lit unit with no --source", () => {
  const r = add(scaffold(), ["--substrate", "lit", "--kind", "PAPER", "--status", "CITE", "--title", "No source paper"]);
  expect(r.status).toBe(1);
  expect(r.stderr).toContain("requires --source");
});

test("kb-add rejects an empty --title", () => {
  const r = add(scaffold(), ["--substrate", "ledger", "--kind", "RESULT", "--status", "VALIDATED", "--title", "   "]);
  expect(r.status).toBe(1);
  expect(r.stderr).toContain("empty title");
});

test("kb-add --dry-run writes nothing but prints a well-formed unit", () => {
  const root = scaffold();
  const before = read(root, "ledger", "RESEARCH-LEDGER.md");
  const r = add(root, ["--substrate", "ledger", "--kind", "DECISION", "--status", "VALIDATED", "--title", "Dry one", "--dry-run"]);
  expect(r.status).toBe(0);
  expect(r.stdout).toContain("[dry-run]");
  expect(r.stdout).toMatch(/### \[.*\] DECISION\/VALIDATED — Dry one/);
  expect(read(root, "ledger", "RESEARCH-LEDGER.md")).toBe(before);
  expect(existsSync(join(root, ".promptus", "CATALOG.md"))).toBe(false);
});

test("kb-add --supersedes + kb-index marks the prior finding SUPERSEDED", () => {
  const root = scaffold();
  add(root, ["--substrate", "finding", "--kind", "CLAIM", "--status", "VALIDATED", "--title", "Old claim"], "v1");
  const id = /id:\s*(\S+)/.exec(read(root, "docs", "old-claim.md"))![1];
  add(root, ["--substrate", "finding", "--kind", "CLAIM", "--status", "VALIDATED", "--title", "New claim", "--supersedes", id], "v2");
  index(root);
  expect(read(root, ".promptus", "CATALOG.md")).toContain("finding:SUPERSEDED · Old claim");
});

test("kb-index rebuilds CATALOG.md + graph.json idempotently", () => {
  const root = scaffold();
  add(root, ["--substrate", "finding", "--kind", "CLAIM", "--status", "VALIDATED", "--title", "A thing", "--links", "other-thing"], "links to [[other-thing]]");
  index(root);
  const c1 = read(root, ".promptus", "CATALOG.md");
  index(root);
  expect(read(root, ".promptus", "CATALOG.md")).toBe(c1);
  expect(existsSync(join(root, ".promptus", "graph.json"))).toBe(true);
});

test("kb-index flags a deliberately broken [[link]] and a true orphan", () => {
  const root = scaffold();
  add(root, ["--substrate", "finding", "--kind", "CLAIM", "--status", "VALIDATED", "--title", "Lonely"], "no links");
  add(root, ["--substrate", "finding", "--kind", "CLAIM", "--status", "VALIDATED", "--title", "Points nowhere", "--links", "does-not-exist"], "see [[does-not-exist]]");
  const r = index(root);
  expect(r.stdout).toContain("unresolved");
  expect(r.stdout).toContain("does-not-exist");
  expect(r.stdout).toContain("orphan");
  expect(r.stdout).toContain("lonely");
});

test("kb-find returns the right units with substrate:status + path", () => {
  const root = scaffold();
  add(root, ["--substrate", "finding", "--kind", "CLAIM", "--status", "VALIDATED", "--title", "Bun was chosen"], "we use bun");
  add(root, ["--substrate", "finding", "--kind", "CLAIM", "--status", "CONJECTURED", "--title", "Maybe rust later"], "unrelated");
  index(root);
  const r = find(root, ["bun"]);
  expect(r.status).toBe(0);
  expect(r.stdout).toContain("finding:VALIDATED · Bun was chosen");
  expect(r.stdout).not.toContain("Maybe rust later");
});

test("kb-add memory → one file per fact + a MEMORY.md index pointer", () => {
  const root = scaffold();
  const r = add(root, ["--substrate", "memory", "--kind", "preference", "--status", "validated", "--title", "Prefers bun", "--desc", "uses bun + uv"], "The operator prefers bun and uv.");
  expect(r.status).toBe(1); // 'preference' is not an allowed memory kind
  const ok = add(root, ["--substrate", "memory", "--kind", "feedback", "--status", "validated", "--title", "Prefers bun", "--desc", "uses bun + uv"], "The operator prefers bun and uv.");
  expect(ok.status).toBe(0);
  expect(existsSync(join(root, "memory", "prefers-bun.md"))).toBe(true);
  expect(read(root, "memory", "prefers-bun.md")).toContain("type: feedback");
  expect(read(root, "memory", "MEMORY.md")).toContain("- [Prefers bun](prefers-bun.md) — uses bun + uv");
});
