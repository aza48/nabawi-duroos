import { NextResponse } from "next/server";
import { dbConfigured, query } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb } from "@/lib/mesh-api";

export async function POST(){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const user=await getCurrentUser(); if(!user) return NextResponse.json({error:"unauthorized"},{status:401});
  await query(`UPDATE mesh_notifications SET read_at=now() WHERE user_id=$1 AND read_at IS NULL`,[user.id]);
  return NextResponse.json({ ok: true });
}
