
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, query, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { noDb, bad, clean } from "@/lib/mesh-api";
async function guard(id:number){ const user=await getCurrentUser(); if(!user) return {err:NextResponse.json({error:"unauthorized"},{status:401})};
  const a=await queryOne<{author_id:number}>(`SELECT author_id FROM mesh_answers WHERE id=$1`,[id]); if(!a) return {err:NextResponse.json({error:"not_found"},{status:404})};
  if(a.author_id!==user.id && user.role!=="moderator" && user.role!=="admin") return {err:NextResponse.json({error:"forbidden"},{status:403})}; return {user}; }
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const id=parseInt(params.id,10); const g=await guard(id); if("err" in g && g.err) return g.err;
  const body=await req.json().catch(()=>({})) as Record<string,unknown>; const text=clean(body.body,5000); if(!text) return bad("Body cannot be empty");
  await query(`UPDATE mesh_answers SET body=$1, updated_at=now() WHERE id=$2`,[text,id]); return NextResponse.json({ok:true}); }
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const id=parseInt(params.id,10); const g=await guard(id); if("err" in g && g.err) return g.err;
  await query(`UPDATE mesh_questions SET accepted_answer_id=NULL WHERE accepted_answer_id=$1`,[id]);
  await query(`DELETE FROM mesh_answers WHERE id=$1`,[id]); return NextResponse.json({ok:true}); }
