#!/usr/bin/env bun
/**
 * kb-add.ts — the gated writer-jig. The ONE way knowledge enters a project.
 * The LLM supplies only the prose body (on stdin); the script owns everything
 * else: the envelope, the metadata, the timestamp, the id, the placement, the
 * incremental index update, and the validation gate.
 *
 * Usage:
 *   kb-add --substrate <ledger|finding|lit|memory> --kind <K> --status <S>
 *          --title "<t>" [--source "<src#anchor>"] [--links "a,b"] [--reuse <r>]
 *          [--desc "<one-line>"] [--supersedes <id|ref>] [--root <dir>] [--dry-run]  < body.md
 *
 * Envelope is substrate-aware (the local-convention fix the cloud lacked):
 *   ledger  → `### [YYYY-MM-DD HH:MM:SS] KIND/STATUS — title` (local time) before the sentinel
 *   finding → docs/<slug>.md         : frontmatter + `# title` + body + `Related:` footer
 *   lit     → docs/lit/<slug>.md      : same, requires --source
 *   memory  → memory/<slug>.md + a `- [title](slug.md) — hook` line in memory/MEMORY.md
 *
 * The validation gate refuses any off-vocab substrate/kind/status, a lit unit with
 * no --source, or an empty title — printing the allowed set (commit-msg-hook style).
 * Low friction is a hard requirement — friction is what made the old append script drift.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { nowISO, stampUTC, nowLocalStamp } from "./lib/clock.ts";
import { mintId, slugify } from "./lib/ids.ts";
import { extractLinks } from "./lib/links.ts";
import { serializeFrontmatter, type Frontmatter } from "./lib/frontmatter.ts";
import { loadVocab, validate, type UnitInput, type Vocab } from "./lib/vocab.ts";
import { derivedDir, findProjectRoot, indexPath, insertBeforeSentinel, storePath } from "./lib/paths.ts";

type Args = Record<string, string | boolean>;

function parseArgs(argv: string[]): Args {
  const a: Args = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith("--")) continue;
    const key = argv[i].slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) a[key] = true;
    else (a[key] = next), i++;
  }
  return a;
}

function str(a: Args, k: string): string | undefined {
  return typeof a[k] === "string" ? (a[k] as string) : undefined;
}

function fail(msg: string, allowed?: string[]): never {
  console.error(`kb-add: ${msg}`);
  if (allowed) console.error(`  allowed: ${allowed.join(", ")}`);
  process.exit(1);
}

function rel(root: string, p: string): string {
  return relative(root, p).replace(/\\/g, "/");
}

function statusDisplay(vocab: Vocab, status: string): string {
  return vocab.status_glyphs?.[status] ?? status;
}

function catalogLine(sub: string, status: string, title: string, relPath: string, links: string[]): string {
  const tail = links.length ? ` · ${links.map((l) => `[[${l}]]`).join(" ")}` : "";
  return `${sub}:${status} · ${title} · ${relPath}${tail}`;
}

/** Keep the derived catalog fresh on every write; kb-index rebuilds it authoritatively. */
function appendCatalog(root: string, line: string): string {
  const dir = derivedDir(root);
  const catalog = join(dir, "CATALOG.md");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const head = "# Promptus card-catalog (DERIVED — rebuilt by kb-index; safe to delete)\n\n";
  const cur = existsSync(catalog) ? readFileSync(catalog, "utf8") : head;
  writeFileSync(catalog, `${cur.replace(/\n*$/, "\n")}${line}\n`);
  return catalog;
}

function main(argv: string[]): number {
  const a = parseArgs(argv);
  const root = findProjectRoot(str(a, "root") ?? process.cwd());
  const vocab = loadVocab(root);

  const unit: UnitInput = {
    substrate: str(a, "substrate") ?? "",
    kind: str(a, "kind") ?? "",
    status: str(a, "status") ?? "",
    title: (str(a, "title") ?? "").trim(),
    source: str(a, "source"),
    links: str(a, "links")?.split(",").map((s) => s.trim()).filter(Boolean),
  };

  const v = validate(vocab, unit);
  if (!v.ok) fail(v.error, v.allowed);

  const sub = vocab.substrates[unit.substrate];
  const dry = a["dry-run"] === true;
  const body = process.stdin.isTTY ? "" : readFileSync(0, "utf8").replace(/\s+$/, "");
  const id = mintId(sub.prefix, stampUTC(nowISO()), unit.title);
  const slug = slugify(unit.title);
  const links = Array.from(new Set([...(unit.links ?? []), ...extractLinks(body)]));
  const supersedes = str(a, "supersedes");

  let assembled: string;
  let unitFile: string;
  const writes: Array<[string, string]> = []; // [path, content] for the non-dry pass

  if (sub.envelope === "log") {
    const corr = supersedes ? `\n★CORRECTION to ${supersedes}.` : "";
    assembled = `### [${nowLocalStamp()}] ${unit.kind}/${statusDisplay(vocab, unit.status)} — ${unit.title}\n${body}${corr}\n`;
    unitFile = storePath(root, vocab, unit.substrate);
    if (!existsSync(unitFile)) fail(`ledger not found: ${rel(root, unitFile)} — run /promptus-init first`);
    writes.push([unitFile, insertBeforeSentinel(readFileSync(unitFile, "utf8"), assembled, vocab.sentinel)]);
  } else if (sub.envelope === "page") {
    const fm: Frontmatter = { id, substrate: unit.substrate, kind: unit.kind, status: unit.status, created: nowLocalStamp() };
    if (unit.source) fm.source = unit.source;
    if (str(a, "reuse")) fm.reuse = str(a, "reuse")!;
    if (supersedes) fm.supersedes = supersedes;
    if (links.length) fm.links = links;
    const related = links.length ? `\n\nRelated: ${links.map((l) => `[[${l}]]`).join(" · ")}` : "";
    assembled = `${serializeFrontmatter(fm)}# ${unit.title}\n\n${body}${related}\n`;
    unitFile = storePath(root, vocab, unit.substrate, slug);
    if (existsSync(unitFile)) fail(`a ${unit.substrate} already exists at ${rel(root, unitFile)} — pick a distinct title or edit it directly`);
    writes.push([unitFile, assembled]);
  } else {
    // memory: one file per fact + a pointer in the MEMORY.md index
    const fm: Frontmatter = { name: slug, description: str(a, "desc") ?? unit.title, type: unit.kind, status: unit.status };
    if (links.length) fm.links = links;
    assembled = `${serializeFrontmatter(fm)}\n${body}\n`;
    unitFile = storePath(root, vocab, unit.substrate, slug);
    if (existsSync(unitFile)) fail(`a memory unit already exists at ${rel(root, unitFile)}`);
    writes.push([unitFile, assembled]);
    const idx = indexPath(root, vocab, unit.substrate);
    if (idx && existsSync(idx)) {
      const pointer = `- [${unit.title}](${slug}.md) — ${str(a, "desc") ?? unit.title}`;
      const cur = readFileSync(idx, "utf8");
      writes.push([idx, cur.includes(vocab.sentinel) ? insertBeforeSentinel(cur, pointer, vocab.sentinel) : `${cur.replace(/\n*$/, "\n")}${pointer}\n`]);
    }
  }

  const catLine = catalogLine(unit.substrate, unit.status, unit.title, rel(root, unitFile), links);

  if (dry) {
    console.log(`[dry-run] would write ${rel(root, unitFile)}:`);
    console.log("----------------------------------------");
    console.log(assembled.replace(/\n$/, ""));
    console.log("----------------------------------------");
    console.log(`catalog += ${catLine}`);
    return 0;
  }

  for (const [p, c] of writes) {
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, c);
  }
  const catalog = appendCatalog(root, catLine);
  console.log(`kb-add: ${unit.substrate}:${unit.status} — ${unit.title}`);
  console.log(`  -> ${rel(root, unitFile)}  (id ${id})`);
  console.log(`  catalog: ${rel(root, catalog)}  ·  run \`bun scripts/kb-index.ts\` to rebuild authoritatively`);
  return 0;
}

process.exit(main(process.argv.slice(2)));
