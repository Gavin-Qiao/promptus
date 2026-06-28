/**
 * kb.test.ts — the round-trip contract for the store spine, as `bun test` todos.
 * Fill these in as you implement kb-add / kb-index. Run: `bun test`.
 *
 * Each `test.todo` documents a behavior the implementation must satisfy; convert
 * it to `test(...)` with assertions once the relevant script is real.
 */
import { test } from "bun:test";

test.todo("kb-add round-trips a ledger unit, and kb-index lists it with event:STATUS");
test.todo("kb-add writes finding → docs/<slug>.md and lit → docs/lit/<slug>.md");
test.todo("kb-add rejects an unknown --status, printing the allowed set");
test.todo("kb-add rejects a lit unit with no --source");
test.todo("kb-add rejects an empty --title");
test.todo("kb-add --dry-run writes nothing but prints a well-formed unit");
test.todo("kb-add --supersedes flips the prior unit's catalog status to CORRECTION");
test.todo("kb-index rebuilds CATALOG.md + graph.json idempotently");
test.todo("kb-index flags a deliberately broken [[link]] and a true orphan");
test.todo("kb-find returns the right units with substrate:status + source#anchor");
