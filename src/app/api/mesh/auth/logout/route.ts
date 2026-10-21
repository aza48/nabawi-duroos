
import { NextResponse } from "next/server";
import { dbConfigured } from "@/lib/db";
import { destroySession } from "@/lib/mesh-auth";
import { noDb } from "@/lib/mesh-api";
export async function POST(){ if(!dbConfigured()){ /* still clear cookie */ } await destroySession(); return NextResponse.json({ ok: true }); }
