#!/usr/bin/env bun
/**
 * validate-plugin.ts — offline structural validation of the Promptus plugin.
 *
 * Checks the manifests, the marketplace, and every command/skill/agent's
 * frontmatter, so CI and the pre-push hook can gate a change without needing the
 * Claude CLI, an account, or the network. Mirrors the structural half of
 * `claude plugin validate` (run that locally for the full check). Exits non-zero
 * on any problem, printing each one.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseFrontmatter } from "./lib/frontmatter.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const problems: string[] = [];
const pass = (m: string) => console.log(`  ok   ${m}`);
const fail = (m: string) => {
  problems.push(m);
  console.log(`  FAIL ${m}`);
};

function readJSON(rel: string): any | null {
  const p = join(root, rel);
  if (!existsSync(p)) {
    fail(`${rel} is missing`);
    return null;
  }
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch (e) {
    fail(`${rel} is not valid JSON — ${(e as Error).message}`);
    return null;
  }
}

function checkComponent(rel: string, required: string[]) {
  const { data } = parseFrontmatter(readFileSync(join(root, rel), "utf8"));
  const missing = required.filter((k) => !data[k] || String(data[k]).trim() === "");
  if (missing.length) fail(`${rel} frontmatter missing: ${missing.join(", ")}`);
  else pass(rel);
}

// 1. Plugin manifest.
const plugin = readJSON(".claude-plugin/plugin.json");
if (plugin) {
  for (const f of ["name", "version", "description"]) if (!plugin[f]) fail(`plugin.json missing "${f}"`);
  if (plugin.version && !/^\d+\.\d+\.\d+([-+].+)?$/.test(plugin.version))
    fail(`plugin.json version "${plugin.version}" is not semver`);
  if (plugin.name) pass(`plugin.json (${plugin.name} v${plugin.version})`);
}

// 2. Marketplace manifest — every plugin source must resolve on disk.
const mkt = readJSON(".claude-plugin/marketplace.json");
if (mkt) {
  if (!Array.isArray(mkt.plugins) || mkt.plugins.length === 0) {
    fail("marketplace.json has no plugins[]");
  } else {
    for (const pl of mkt.plugins) {
      if (!pl.name) fail("a marketplace plugin entry has no name");
      if (!pl.source) fail(`marketplace plugin "${pl.name}" has no source`);
      else {
        const src = pl.source === "./" ? root : join(root, pl.source);
        if (!existsSync(src)) fail(`marketplace plugin "${pl.name}" source "${pl.source}" does not resolve`);
      }
    }
    pass(`marketplace.json (${mkt.plugins.length} plugin(s))`);
  }
}

// 3. Components — commands take their name from the filename; skills and agents
//    must declare name + description in frontmatter.
const entries = (d: string) => (existsSync(join(root, d)) ? readdirSync(join(root, d)) : []);
for (const f of entries("commands")) if (f.endsWith(".md")) checkComponent(`commands/${f}`, ["description"]);
for (const f of entries("agents")) if (f.endsWith(".md")) checkComponent(`agents/${f}`, ["name", "description"]);
for (const s of entries("skills")) {
  const sk = join("skills", s, "SKILL.md");
  if (existsSync(join(root, sk))) checkComponent(sk.split("\\").join("/"), ["name", "description"]);
  else if (statSync(join(root, "skills", s)).isDirectory()) fail(`skills/${s}/ has no SKILL.md`);
}

// 4. Controlled vocabulary must parse.
if (readJSON("schema/kb-vocab.json")) pass("schema/kb-vocab.json");

// 5. Hooks (optional) — the manifest parses and every referenced script exists.
if (existsSync(join(root, "hooks", "hooks.json"))) {
  const hk = readJSON("hooks/hooks.json");
  if (hk && hk.hooks && typeof hk.hooks === "object") {
    let count = 0;
    for (const event of Object.keys(hk.hooks)) {
      for (const group of hk.hooks[event] || []) {
        for (const h of group.hooks || []) {
          count++;
          const m = typeof h.command === "string" && h.command.match(/\$\{CLAUDE_PLUGIN_ROOT\}\/([^"\s]+)/);
          if (m && !existsSync(join(root, m[1]))) fail(`hooks.json references missing ${m[1]}`);
        }
      }
    }
    pass(`hooks.json (${Object.keys(hk.hooks).length} event(s), ${count} hook(s))`);
  } else if (hk) {
    fail("hooks.json has no hooks object");
  }
}

console.log("");
if (problems.length) {
  console.error(`${problems.length} problem(s) found.`);
  process.exit(1);
}
console.log("All plugin checks passed.");
