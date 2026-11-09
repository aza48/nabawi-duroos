import { NextResponse } from "next/server";

const CACHE = "public, s-maxage=60, stale-while-revalidate=300";

/** Bumped when a response shape changes in a way a native app must know about. */
export const API_VERSION = 1;

/**
 * One envelope for every /api/v1 reply: `{ data, error, generatedAt, version }`.
 * Successes carry `data` and a null `error`; failures carry a null `data` and an error code.
 */
export function ok<T>(data: T): NextResponse {
  return NextResponse.json({ data, error: null, generatedAt: new Date().toISOString(), version: API_VERSION }, { headers: { "Cache-Control": CACHE } });
}

export function fail(error: string, status: number, message?: string): NextResponse {
  return NextResponse.json({ data: null, error, message: message ?? null, generatedAt: new Date().toISOString(), version: API_VERSION }, { status, headers: { "Cache-Control": "no-store" } });
}

export function notFound(): NextResponse {
  return fail("not_found", 404);
}

export function badRequest(message: string): NextResponse {
  return fail("bad_request", 400, message);
}

/** A YYYY-MM-DD query value within `days` of today, or null when absent; throws on a bad value. */
export function dateParam(url: URL, today: string, days = 60): string | null {
  const v = url.searchParams.get("date");
  if (!v) return null;
  const ms = Date.parse(`${v}T00:00:00Z`);
  // Date.parse rolls impossible days forward (2026-11-31 becomes 1 December): require a round trip.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v) || Number.isNaN(ms) || new Date(ms).toISOString().slice(0, 10) !== v) throw new Error("date must be YYYY-MM-DD");
  const gap = Math.abs(Date.parse(`${v}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000;
  if (gap > days) throw new Error(`date must be within ${days} days of today`);
  return v;
}
