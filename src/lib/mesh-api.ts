
import { NextResponse } from "next/server";
export function noDb(){ return NextResponse.json({ error: "database_not_configured" }, { status: 503 }); }
export function bad(msg: string, status = 400){ return NextResponse.json({ error: msg }, { status }); }
export function clean(s: unknown, max: number): string { return typeof s === "string" ? s.trim().slice(0, max) : ""; }
