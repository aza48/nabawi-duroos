
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { verifyPassword, createSession, setSessionCookie } from "@/lib/mesh-auth";
import { noDb, clean } from "@/lib/mesh-api";
export async function POST(req: NextRequest){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const body=await req.json().catch(()=>({})) as Record<string,unknown>;
  const email=clean(body.email,200).toLowerCase(); const password=typeof body.password==="string"?body.password:"";
  const user=await queryOne<{id:number;display_name:string;role:string;password_hash:string}>(`SELECT id,display_name,role,password_hash FROM mesh_users WHERE email=$1`,[email]);
  if(!user || user.password_hash==="seed-no-login" || !verifyPassword(password,user.password_hash)) return NextResponse.json({error:"Invalid email or password"},{status:401});
  const token=await createSession(user.id); setSessionCookie(token);
  return NextResponse.json({ user: { id: user.id, display_name: user.display_name, role: user.role } });
}
