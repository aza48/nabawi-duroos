import { NextResponse } from "next/server";
import { getDb } from "@/server/db/client";
import { subscribePush } from "@/server/push";
import { allow, clientIp } from "@/server/rate-limit";

export const dynamic = "force-dynamic";

/** A phone subscribes once and changes its topics now and then; more than this from one address is a script. */
export const SUBSCRIBE_LIMIT = { max: 10, windowMs: 10 * 60_000 };

export async function POST(req: Request) {
  if (!allow(`push:${clientIp(req)}`, SUBSCRIBE_LIMIT.max, SUBSCRIBE_LIMIT.windowMs)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429, headers: { "retry-after": "600" } });
  }
  try {
    await subscribePush(await getDb(), await req.json());
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "invalid_subscription" }, { status: 400 });
  }
}
