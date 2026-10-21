import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb } from "@/lib/mesh-api";
import { logQuestionEvent, withinRestoreWindow } from "@/lib/mesh-lifecycle";
import { audit } from "@/lib/mesh-admin";

export async function POST(_req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const user=await getCurrentUser(); if(!user) return NextResponse.json({error:"unauthorized"},{status:401});
  const qid=parseInt(params.id,10);
  const q=await queryOne<{author_id:number;deleted_at:string|null}>(`SELECT author_id, deleted_at FROM mesh_questions WHERE id=$1`,[qid]);
  if(!q || !q.deleted_at) return NextResponse.json({error:"not_found"},{status:404});
  if(q.author_id!==user.id && user.role!=="admin") return NextResponse.json({error:"forbidden"},{status:403});
  if(!withinRestoreWindow(q.deleted_at)) return NextResponse.json({error:"restore_window_expired"},{status:400});
  await query(`UPDATE mesh_questions SET deleted_at=NULL, deleted_by=NULL, updated_at=now() WHERE id=$1`,[qid]);
  await logQuestionEvent(qid, user.id, "restored");
  if(user.role==="admin") await audit(user.id, "question_restore", "question", qid, null);
  return NextResponse.json({ ok: true });
}
