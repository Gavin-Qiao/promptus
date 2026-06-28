/**
 * lib.test.ts — real unit tests for the context-free utilities (clock/ids/links).
 * The store-spine round-trip cases live in kb.test.ts as todos. Run: `bun test`.
 */
import { test, expect } from "bun:test";
import { nowISO, stampUTC } from "../lib/clock.ts";
import { slugify, mintId } from "../lib/ids.ts";
import { extractLinks } from "../lib/links.ts";

test("nowISO returns a parseable ISO-8601 Z instant", () => {
  const iso = nowISO();
  expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  expect(Number.isNaN(Date.parse(iso))).toBe(false);
});

test("stampUTC compacts an ISO instant", () => {
  expect(stampUTC("2026-06-28T00:12:34.000Z")).toBe("20260628T001234Z");
});

test("slugify lowercases, hyphenates, strips punctuation, caps length", () => {
  expect(slugify("Chose Bun over Node!")).toBe("chose-bun-over-node");
  expect(slugify("  spaced__out  ")).toBe("spaced-out");
  expect(slugify("***")).toBe("untitled");
  expect(slugify("x".repeat(100)).length).toBeLessThanOrEqual(64);
});

test("mintId joins prefix, stamp, slug", () => {
  expect(mintId("event", "20260628T001234Z", "Chose Bun")).toBe(
    "event-20260628T001234Z-chose-bun",
  );
});

test("extractLinks returns unique targets, alias-stripped, first-seen order", () => {
  expect(
    extractLinks("see [[Telos]] and [[hard-problem|the hard problem]] and [[Telos]] again"),
  ).toEqual(["Telos", "hard-problem"]);
  expect(extractLinks("no links here")).toEqual([]);
});
