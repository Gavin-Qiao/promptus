#!/usr/bin/env bun
/**
 * kb-find.ts — header-first retrieval. No embeddings, no DB (see the invariant):
 * a hand-written header beats a vector for a small, dense, status-tagged corpus.
 *
 * Usage: kb-find "<query>" [--substrate <s>] [--status <st>] [--hops <n>] [--root <dir>]
 *
 *   1. Read .promptus/CATALOG.md as the primary index (the card-catalog).
 *   2. Score catalog headers against the query; grep store bodies for sub-header recall.
 *   3. Walk graph.json up to --hops for multi-hop (associative) retrieval.
 *   4. Apply --substrate / --status filters (epistemic slicing).
 *   5. Emit matches as `substrate:status · title · path` — transparent, so the caller
 *      (the recall skill) can open each and verify the claim against its source.
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { derivedDir, findProjectRoot } from "./lib/paths.ts";

interface Card { substrate: string; status: string; title: string; path: string; links: string[] }

function parseCatalog(text: string): Card[] {
  const cards: Card[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const m = /^(\w+):(\S+) · (.+?) · (\S+)(?: · (.+))?$/.exec(raw.trim());
    if (!m) continue;
    const links = m[5] ? Array.from(m[5].matchAll(/\[\[([^\]]+)\]\]/g)).map((x) => x[1]) : [];
    cards.push({ substrate: m[1], status: m[2], title: m[3], path: m[4], links });
  }
  return cards;
}

const slugOf = (p: string) => p.split("#")[0].split("/").pop()!.replace(/\.md$/, "");

function main(argv: string[]): number {
  const flags: Record<string, string> = {};
  const positionals: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) { flags[argv[i].slice(2)] = argv[i + 1] ?? ""; i++; }
    else positionals.push(argv[i]);
  }
  const flag = (k: string): string | undefined => flags[k];
  const query = positionals[0] ?? "";
  const root = findProjectRoot(flag("root") ?? process.cwd());
  const dir = derivedDir(root);
  const catalogFile = join(dir, "CATALOG.md");
  if (!existsSync(catalogFile)) { console.error("kb-find: no catalog — run `bun scripts/kb-index.ts` first."); return 1; }

  let cards = parseCatalog(readFileSync(catalogFile, "utf8"));
  const subF = flag("substrate"), stF = flag("status");
  if (subF) cards = cards.filter((c) => c.substrate === subF);
  if (stF) cards = cards.filter((c) => c.status === stF);

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const score = (c: Card) =>
    terms.reduce((s, t) => s + (c.title.toLowerCase().includes(t) ? 2 : 0) + (c.path.toLowerCase().includes(t) ? 1 : 0), 0);

  // key by full card identity, not path — ledger entries share the ledger file path
  const key = (c: Card) => `${c.substrate}\t${c.status}\t${c.title}\t${c.path}`;
  const picked = new Map<string, { c: Card; s: number }>();
  for (const c of cards) {
    const s = score(c);
    if (terms.length === 0 || s > 0) picked.set(key(c), { c, s });
  }
  // sub-header recall: grep the bodies the headers didn't advertise
  if (terms.length) {
    for (const c of cards) {
      if (picked.has(key(c))) continue;
      const f = join(root, c.path.split("#")[0]);
      if (existsSync(f) && terms.some((t) => readFileSync(f, "utf8").toLowerCase().includes(t))) picked.set(key(c), { c, s: 1 });
    }
  }
  // graph-walk for associative neighbours
  const hops = Number(flag("hops") ?? 0);
  if (hops > 0 && existsSync(join(dir, "graph.json"))) {
    const g = JSON.parse(readFileSync(join(dir, "graph.json"), "utf8")) as { out: Record<string, string[]> };
    const seen = new Set([...picked.values()].map((x) => slugOf(x.c.path)));
    let frontier = [...seen];
    for (let h = 0; h < hops; h++) {
      const next: string[] = [];
      for (const n of frontier) for (const t of g.out[n] ?? []) if (!seen.has(t)) (seen.add(t), next.push(t));
      frontier = next;
    }
    for (const c of cards) if (seen.has(slugOf(c.path)) && !picked.has(key(c))) picked.set(key(c), { c, s: 0 });
  }

  const hits = [...picked.values()].sort((a, b) => b.s - a.s);
  if (!hits.length) { console.log("kb-find: no matches."); return 0; }
  for (const { c } of hits) console.log(`${c.substrate}:${c.status} · ${c.title} · ${c.path}`);
  return 0;
}

process.exit(main(process.argv.slice(2)));
