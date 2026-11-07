import { NextResponse } from "next/server";
import { getDb } from "@/server/db/client";
import { unsubscribePush } from "@/server/push";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { endpoint?: unknown };
  if (typeof body.endpoint !== "string" || body.endpoint.length > 1000) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await unsubscribePush(await getDb(), body.endpoint);
  return NextResponse.json({ ok: true });
}
