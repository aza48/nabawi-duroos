import { NextResponse } from "next/server";
import { getDb } from "@/server/db/client";
import { subscribePush } from "@/server/push";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await subscribePush(await getDb(), await req.json());
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "invalid_subscription" }, { status: 400 });
  }
}
