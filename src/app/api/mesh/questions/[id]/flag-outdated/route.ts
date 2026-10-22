import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb, clean } from "@/lib/mesh-api";
import { logQuestionEvent, createNotification } from "@/lib/mesh-lifecycle";
import { sendMeshEmail, meshOutdatedEmail } from "@/lib/mesh-email";

export async function POST(req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const user=await getCurrentUser(); if(!user) return NextResponse.json({error:"unauthorized"},{status:401});
  const qid=parseInt(params.id,10);
  const q=await queryOne<{author_id:number;title:string;status:string;deleted_at:string|null}>(`SELECT author_id, title, status, deleted_at FROM mesh_questions WHERE id=$1`,[qid]);
  if(!q || q.deleted_at) return NextResponse.json({error:"not_found"},{status:404});
  if(q.status!=="resolved") return NextResponse.json({error:"not_resolved"},{status:400});
  // One open flag per member per question per 24 hours.
  const recent=await queryOne(`SELECT id FROM mesh_question_events WHERE question_id=$1 AND actor_id=$2 AND type='outdated_flagged' AND created_at > now() - interval '24 hours' LIMIT 1`,[qid,user.id]);
  if(recent) return NextResponse.json({error:"already_flagged"},{status:429});
  const body=await req.json().catch(()=>({})) as Record<string,unknown>;
  const note=clean(body.note, 300) || null;
  await logQuestionEvent(qid, user.id, "outdated_flagged", note);
  // Notify the OP and every real (non-seed) mandoob/contributor — except the flagger. One notification + one email per recipient.
  const recipients=await query<{id:number;email:string}>(`SELECT id, email FROM mesh_users WHERE (id=$1 OR (role IN ('mandoob','contributor') AND is_seed=false)) AND id<>$2`,[q.author_id, user.id]);
  const mail = meshOutdatedEmail(qid, q.title);
  for(const r of recipients){
    await createNotification(r.id, "outdated_flag", qid, null, user.id);
    if(r.email && !r.email.endsWith("@mesh.local")) { try{ await sendMeshEmail(r.email, mail.subject, mail.html); }catch{ /* email must never fail the request */ } }
  }
  return NextResponse.json({ ok: true, notified: recipients.length });
}
