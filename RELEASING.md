# Releasing Promptus

A release is a Git tag `vX.Y.Z`. Pushing it runs `.github/workflows/release.yml`, which
re-checks everything, verifies the tag agrees with the manifest **and** the changelog, and
publishes a GitHub release whose notes come straight from `CHANGELOG.md`. Nothing is
published until the checks pass.

## Versioning ([SemVer](https://semver.org))

- **MAJOR** — incompatible change to the store layout, the controlled vocab, or a script's CLI.
- **MINOR** — a new substrate / skill / command / renderer, backward compatible.
- **PATCH** — fixes and docs that don't change the contracts.

While the project is pre-1.0, a breaking change may ride in a MINOR bump; the changelog
calls it out.

## Cutting a release

1. **Land everything on `main`** and confirm CI is green.
2. **Finalize the changelog.** Rename `## [Unreleased]` to `## [X.Y.Z] - YYYY-MM-DD`, open a
   fresh empty `## [Unreleased]` above it, and update the link references at the bottom (the
   `[Unreleased]` compare URL and a new `[X.Y.Z]` tag URL).
3. **Bump the manifest.** Set `version` in `.claude-plugin/plugin.json` to `X.Y.Z`.
4. **Sanity-check locally:**
   ```bash
   bun run check                          # plugin validator + tests
   bun scripts/changelog.ts check X.Y.Z   # release-note gate
   ```
5. **Commit** with `chore(release): vX.Y.Z` (scope required; flat `- ` bullet body).
6. **Tag and push:**
   ```bash
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```
7. **Watch the workflow.** It validates, checks the version + changelog, and creates the
   release. If the `[X.Y.Z]` changelog section is missing or empty, it stops *before* publishing.

## What the release workflow guards

- Plugin structure (`bun scripts/validate-plugin.ts`) and tests (`bun test`).
- The tag `vX.Y.Z` matches `plugin.json`'s `version`.
- `CHANGELOG.md` has a non-empty `## [X.Y.Z]` section — and that section *is* the release note.
