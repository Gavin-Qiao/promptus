#!/usr/bin/env bun
/**
 * changelog.ts — read the section for a version out of CHANGELOG.md.
 *
 *   bun scripts/changelog.ts extract <version>   print the section body (release notes)
 *   bun scripts/changelog.ts check   <version>   assert the section exists and is non-empty
 *
 * <version> may be given with or without a leading "v" (the release tag is vX.Y.Z;
 * the changelog heading is "## [X.Y.Z]"). Exits non-zero when the section is absent
 * or empty — the release-note sanity gate the release workflow relies on.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const [cmd, rawVersion] = process.argv.slice(2);

if (!cmd || !["extract", "check"].includes(cmd) || !rawVersion) {
  console.error("usage: changelog.ts <extract|check> <version>");
  process.exit(2);
}

const version = rawVersion.replace(/^v/, "");
const lines = readFileSync(join(root, "CHANGELOG.md"), "utf8").split(/\r?\n/);

const headRe = new RegExp(`^## \\[${version.replace(/\./g, "\\.")}\\]`);
const start = lines.findIndex((l) => headRe.test(l));
if (start === -1) {
  console.error(`CHANGELOG.md has no "## [${version}]" section — add one before releasing.`);
  process.exit(1);
}

let end = lines.length;
for (let i = start + 1; i < lines.length; i++) {
  if (/^## /.test(lines[i]) || /^\[[^\]]+\]:/.test(lines[i])) {
    end = i;
    break;
  }
}

const body = lines.slice(start + 1, end).join("\n").trim();
if (!body) {
  console.error(`CHANGELOG.md section "## [${version}]" is empty — write the release notes before releasing.`);
  process.exit(1);
}

if (cmd === "extract") {
  process.stdout.write(body + "\n");
} else {
  console.log(`CHANGELOG.md [${version}] is present and non-empty (${body.split("\n").length} lines).`);
}
