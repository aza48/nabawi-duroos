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
  const id=parseInt(params.id,10);
  const a=await queryOne<{author_id:number;question_id:number;deleted_at:string|null}>(`SELECT author_id, question_id, deleted_at FROM mesh_answers WHERE id=$1`,[id]);
  if(!a || !a.deleted_at) return NextResponse.json({error:"not_found"},{status:404});
  if(a.author_id!==user.id && user.role!=="admin") return NextResponse.json({error:"forbidden"},{status:403});
  if(!withinRestoreWindow(a.deleted_at)) return NextResponse.json({error:"restore_window_expired"},{status:400});
  await query(`UPDATE mesh_answers SET deleted_at=NULL, deleted_by=NULL, updated_at=now() WHERE id=$1`,[id]);
  await logQuestionEvent(a.question_id, user.id, "restored", `answer:${id}`);
  if(user.role==="admin") await audit(user.id, "answer_restore", "answer", id, `question:${a.question_id}`);
  return NextResponse.json({ ok: true });
}
