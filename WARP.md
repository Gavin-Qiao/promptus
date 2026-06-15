# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## What this repo is
This repository is a **Claude Code skill** implemented entirely as Markdown. It is a fork of [blader/humanizer](https://github.com/blader/humanizer) (MIT) extended with positive "human factor" patterns.

The "runtime" artifact is `SKILL.md`: Claude Code reads the YAML frontmatter (metadata + allowed tools) and the prompt/instructions that follow.

`README.md` is for humans: installation, usage, and a compact overview of the patterns.

`human-factors-analysis.md` is the research write-up behind Part II of the skill (the positive patterns).

## Key files (and how they relate)
- `SKILL.md`
  - The actual skill definition and the source of truth for behavior.
  - Starts with YAML frontmatter (`---` ... `---`) containing `name`, `version`, `description`, and `allowed-tools`.
  - After the frontmatter: Part I (29 removal patterns, with before/after) and Part II (14 positive human patterns, P1-P14, each with a verbatim model excerpt), followed by the process and a full worked example.
- `README.md`
  - Installation and usage instructions.
  - A summarized table of the 29 removal patterns and the 14 positive patterns, plus a version history.
- `human-factors-analysis.md`
  - The analysis behind Part II: methodology, the calibration corpus, each factor with excerpts, and a cross-map from removal patterns to positive patterns.
- `LICENSE` / `NOTICE`
  - MIT license retaining the upstream copyright (Siqi Chen) and adding this fork's copyright. `NOTICE` records provenance and the list of modifications.

When changing behavior/content, treat `SKILL.md` as the source of truth, and update `README.md` (and, for Part II changes, `human-factors-analysis.md`) to stay consistent.

## Common commands
### Install the skill into Claude Code
Recommended (clone directly into Claude Code skills directory):
```bash
mkdir -p ~/.claude/skills
git clone https://github.com/Gavin-Qiao/humanizer.git ~/.claude/skills/humanizer
```

Manual install/update (only the skill file):
```bash
mkdir -p ~/.claude/skills/humanizer
cp SKILL.md ~/.claude/skills/humanizer/
```

## How to "run" it (Claude Code)
Invoke the skill:
- `/humanizer` then paste text

## Making changes safely
### Versioning (keep in sync)
- `SKILL.md` has a `version:` field in its YAML frontmatter.
- `README.md` has a "Version History" section.

If you bump the version, update both.

### Editing `SKILL.md`
- Preserve valid YAML frontmatter formatting and indentation.
- Keep the Part I pattern numbering (1-29) and the Part II numbering (P1-P14) stable unless you are intentionally re-numbering, since the README and the analysis doc reference the same numbering.

### Documenting non-obvious fixes
If you change the prompt to handle a tricky failure mode, add a short note to `README.md`'s version history describing what was fixed and why.
