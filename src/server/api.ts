import { NextResponse } from "next/server";

const CACHE = "public, s-maxage=60, stale-while-revalidate=300";

export function ok<T>(data: T): NextResponse {
  return NextResponse.json({ data, generatedAt: new Date().toISOString() }, { headers: { "Cache-Control": CACHE } });
}

export function notFound(): NextResponse {
  return NextResponse.json({ error: "not_found" }, { status: 404 });
}
