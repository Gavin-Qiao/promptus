/**
 * clock.ts — the script owns the timestamp; the LLM never types it.
 * This is the drift fix: freehand timestamps are how the old ledger lost a day.
 *
 * Contract:
 *   nowISO():       ISO-8601 UTC instant, e.g. "2026-06-28T00:12:34.000Z".
 *   stampUTC(iso?): compact id-safe stamp derived from an ISO string,
 *                   e.g. "20260628T001234Z" (defaults to nowISO()).
 */

export function nowISO(): string {
  return new Date().toISOString();
}

export function stampUTC(iso: string = nowISO()): string {
  // "2026-06-28T00:12:34.000Z" -> "20260628T001234Z"
  return iso.replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
}
