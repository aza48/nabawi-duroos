
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb, bad, clean } from "@/lib/mesh-api";
export async function POST(req: NextRequest){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const user=await getCurrentUser(); if(!user) return NextResponse.json({error:"unauthorized"},{status:401});
  const body=await req.json().catch(()=>({})) as Record<string,unknown>;
  const tt=clean(body.targetType,20); const tid=Number(body.targetId); const reason=clean(body.reason,500);
  if((tt!=="question"&&tt!=="answer")||!tid||!reason) return bad("Invalid report");
  await query(`INSERT INTO mesh_reports (reporter_id,target_type,target_id,reason) VALUES ($1,$2,$3,$4)`,[user.id,tt,tid,reason]);
  return NextResponse.json({ ok: true }, { status: 201 });
}
