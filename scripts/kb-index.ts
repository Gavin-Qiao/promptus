#!/usr/bin/env bun
/**
 * kb-index.ts — rebuild the DERIVED, disposable index from the markdown truth.
 * Run after a batch of writes; safe to delete .promptus/ and regenerate anytime.
 *
 * Usage: kb-index [--root <dir>] [--strict]
 *
 *   1. Walk all four stores' markdown under the project root.
 *   2. Parse each unit's header/frontmatter (frontmatter.ts) and links (links.ts).
 *   3. Rebuild .promptus/CATALOG.md — one line per unit (the card-catalog the model reads).
 *   4. Rebuild .promptus/graph.json — adjacency from [[links]].
 *   5. Resolve page supersedes (a finding/lit with `supersedes: <id>` marks the target SUPERSEDED).
 *   6. Lint + report: orphans (no links in/out) and unresolved links (target not a file).
 *   7. Idempotent. With --strict, exit non-zero when lint finds problems (gates /checkpoint).
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { parseFrontmatter } from "./lib/frontmatter.ts";
import { extractLinks } from "./lib/links.ts";
import { loadVocab, type Vocab } from "./lib/vocab.ts";
import { derivedDir, findProjectRoot } from "./lib/paths.ts";

interface Unit {
  substrate: string;
  status: string;
  title: string;
  slug: string | null; // page units are link targets; ledger entries are not
  relPath: string;
  links: string[];
  id?: string;
  supersedes?: string;
}

const rel = (root: string, p: string) => relative(root, p).replace(/\\/g, "/");

function mdFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !["index.md", "memory.md"].includes(f.toLowerCase()))
    .map((f) => join(dir, f));
}

function parseLedger(root: string, store: string): Unit[] {
  const file = join(root, store);
  if (!existsSync(file)) return [];
  const text = readFileSync(file, "utf8");
  const re = /^### \[([^\]]+)\] ([^\n—]+?) — (.+)$/gm;
  const heads: Array<{ ts: string; ks: string; title: string; idx: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) heads.push({ ts: m[1], ks: m[2].trim(), title: m[3].trim(), idx: m.index });
  return heads.map((h, i) => {
    const body = text.slice(h.idx, i + 1 < heads.length ? heads[i + 1].idx : undefined);
    const status = h.ks.split("/").pop()!.replace(/^[★⚠]/, "");
    // anchor must be space-free so the catalog's `· path ·` columns stay parseable
    return { substrate: "ledger", status, title: h.title, slug: null, relPath: `${store}#${h.ts.replace(/ /g, "T")}`, links: extractLinks(body) };
  });
}

function parsePage(root: string, substrate: string, file: string): Unit {
  const text = readFileSync(file, "utf8");
  const { data, body } = parseFrontmatter(text);
  const slug = file.replace(/\\/g, "/").split("/").pop()!.replace(/\.md$/, "");
  const h1 = /^#\s+(.+)$/m.exec(body);
  const links = Array.from(new Set([...(Array.isArray(data.links) ? data.links : []), ...extractLinks(body)]));
  return {
    substrate,
    status: String(data.status ?? "?"),
    title: h1 ? h1[1].trim() : String(data.description ?? data.name ?? slug),
    slug,
    relPath: rel(root, file),
    links,
    id: typeof data.id === "string" ? data.id : undefined,
    supersedes: typeof data.supersedes === "string" ? data.supersedes : undefined,
  };
}

function collect(root: string, vocab: Vocab): Unit[] {
  const units: Unit[] = [];
  for (const [name, sub] of Object.entries(vocab.substrates)) {
    if (sub.envelope === "log") units.push(...parseLedger(root, sub.store));
    else if (sub.placement === "file") for (const f of mdFiles(join(root, sub.store))) units.push(parsePage(root, name, f));
  }
  return units;
}

function main(argv: string[]): number {
  const ri = argv.indexOf("--root");
  const root = findProjectRoot(ri >= 0 ? argv[ri + 1] : process.cwd());
  const vocab = loadVocab(root);
  const units = collect(root, vocab);

  // page supersedes → mark the target SUPERSEDED in place
  const byId = new Map(units.filter((u) => u.id).map((u) => [u.id!, u]));
  for (const u of units) if (u.supersedes && byId.has(u.supersedes)) byId.get(u.supersedes)!.status = "SUPERSEDED";

  const nodes = new Set(units.filter((u) => u.slug).map((u) => u.slug!));
  const out: Record<string, string[]> = {};
  const inDeg: Record<string, number> = Object.fromEntries([...nodes].map((s) => [s, 0]));
  const unresolved: Array<{ from: string; to: string }> = [];
  for (const u of units) {
    const key = u.slug ?? u.relPath;
    out[key] = u.links;
    for (const t of u.links) (nodes.has(t) ? inDeg[t]++ : unresolved.push({ from: key, to: t }));
  }
  const orphans = [...nodes].filter((s) => inDeg[s] === 0 && (out[s] ?? []).length === 0);

  const lines = units
    .map((u) => `${u.substrate}:${u.status} · ${u.title} · ${u.relPath}${u.links.length ? ` · ${u.links.map((l) => `[[${l}]]`).join(" ")}` : ""}`)
    .sort();
  const dir = derivedDir(root);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, "CATALOG.md"),
    `# Promptus card-catalog (DERIVED — rebuilt by kb-index; safe to delete)\n\n> ${units.length} units · read this first; load only the bodies you need.\n\n${lines.join("\n")}\n`,
  );
  writeFileSync(join(dir, "graph.json"), `${JSON.stringify({ nodes: [...nodes], out, inDeg }, null, 2)}\n`);

  console.log(`kb-index: ${units.length} units → .promptus/CATALOG.md + graph.json`);
  if (unresolved.length) {
    console.log(`  unresolved links (${unresolved.length}) — a typo or an intentional concept-handle:`);
    for (const e of unresolved.slice(0, 25)) console.log(`    ${e.from} → [[${e.to}]]`);
  }
  if (orphans.length) {
    console.log(`  orphans (${orphans.length}) — nothing links in or out:`);
    for (const o of orphans.slice(0, 25)) console.log(`    ${o}`);
  }
  if (unresolved.length + orphans.length === 0) console.log("  clean.");
  return argv.includes("--strict") && unresolved.length + orphans.length > 0 ? 1 : 0;
}

process.exit(main(process.argv.slice(2)));
