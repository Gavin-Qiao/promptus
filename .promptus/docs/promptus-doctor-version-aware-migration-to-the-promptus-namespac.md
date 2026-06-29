---
id: finding-20260629T012549Z-promptus-doctor-version-aware-migration-to-the-promptus-namespac
substrate: finding
kind: METHOD
status: VALIDATED
created: "2026-06-28 21:25:49"
links: [adoption]
---
# promptus-doctor: version-aware migration to the .promptus namespace

The doctor turns the 0.1.x→0.2.0 namespace migration (formerly a by-hand checklist in [[adoption]]) into a version-aware tool. It is **vocab-driven**: the old `schema/kb-vocab.json` declares where each store currently lives, so the doctor reads those paths and plans moves to the canonical `.promptus/` homes — it never guesses.

## Two modes
- `check` (read-only): name the layout (`current` / `legacy-root` / `custom`), the vocab version, and the health hazards — an **unreachable gate** (scripts look under `.promptus/schema/`; a 0.1.x repo keeps the vocab at the root, so `kb-add` silently dies) and a **`.gitignore` that broadly ignores `.promptus/`**.
- `migrate`: dry-run by default; `--apply` performs the plan.

## What migrate does — and never does
It moves store files; rewrites and upgrades the vocab (preserving custom blessed kinds/statuses); routes a `docs/`-intermingled ledger and `telos.md` to `.promptus/ledger/` and `.promptus/TELOS.md`; narrows the `.gitignore` to `/.promptus/cache/`; drops the stale 0.1.x derived cache; and rebuilds the index. It **never edits a unit's content** — only its location.

## The .promptus/ collision (the load-bearing detail)
0.1.x used `.promptus/` for the *gitignored derived cache*; 0.2.0 uses it for the *committed namespace*. Migrating naively would leave the old `/.promptus/` ignore rule in place and silently un-commit the entire migrated knowledge base. Narrowing that rule is therefore essential, not cosmetic.

## Why everything stays retrievable
`kb-index` tolerates frontmatter-less files (tagging them `finding:?` with the H1 as title), so a project's own research notes become parseable and retrievable the moment they sit under `.promptus/docs/` — without rewriting a byte. Dogfooded on Psi (191 units) and Probatio (248 units): all needles retrievable.

Related: [[adoption]]
