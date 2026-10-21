import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, queryOne, query } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb, bad, clean } from "@/lib/mesh-api";
import { logQuestionEvent } from "@/lib/mesh-lifecycle";
export async function POST(req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const user=await getCurrentUser(); if(!user) return NextResponse.json({error:"unauthorized"},{status:401});
  const qid=parseInt(params.id,10); const q=await queryOne<{status:string;deleted_at:string|null}>(`SELECT status, deleted_at FROM mesh_questions WHERE id=$1`,[qid]); if(!q || q.deleted_at) return NextResponse.json({error:"not_found"},{status:404});
  const body=await req.json().catch(()=>({})) as Record<string,unknown>; const text=clean(body.body,5000); if(!text) return bad("Answer cannot be empty");
  const wantsStaffUpdate = body.staffUpdate===true;
  const isStaff = user.role==="admin" || user.role==="mandoob";
  // Closed threads (resolved/locked) refuse normal answers. Staff (admin/mandoob) may append an official update without reopening.
  if(q.status!=="open" && !(wantsStaffUpdate && isStaff)) return NextResponse.json({error:"thread_closed"},{status:403});
  const staffUpdate = wantsStaffUpdate && isStaff;
  const row=await queryOne<{id:number}>(`INSERT INTO mesh_answers (question_id,author_id,body,is_staff_update) VALUES ($1,$2,$3,$4) RETURNING id`,[qid,user.id,text,staffUpdate]);
  if(staffUpdate){ await logQuestionEvent(qid, user.id, "staff_update"); await query(`UPDATE mesh_questions SET updated_at=now() WHERE id=$1`,[qid]); }
  return NextResponse.json({ id: row?.id, is_staff_update: staffUpdate }, { status: 201 });
}
