
import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, queryOne } from "@/lib/db";
import { ensureMesh } from "@/lib/mesh-db";
import { hashPassword, createSession, setSessionCookie } from "@/lib/mesh-auth";
import { noDb, bad, clean } from "@/lib/mesh-api";
export async function POST(req: NextRequest){
  if(!dbConfigured()) return noDb(); try{ await ensureMesh(); }catch{ return noDb(); }
  const body=await req.json().catch(()=>({})) as Record<string,unknown>;
  const displayName=clean(body.displayName,60); const email=clean(body.email,200).toLowerCase(); const password=typeof body.password==="string"?body.password:"";
  if(!displayName) return bad("Display name is required"); if(!email.includes("@")) return bad("Valid email is required"); if(password.length<8) return bad("Password must be at least 8 characters");
  const existing=await queryOne(`SELECT id FROM mesh_users WHERE email=$1`,[email]); if(existing) return NextResponse.json({error:"Email already registered"},{status:409});
  const user=await queryOne<{id:number;display_name:string;role:string}>(`INSERT INTO mesh_users (email,display_name,password_hash) VALUES ($1,$2,$3) RETURNING id,display_name,role`,[email,displayName,hashPassword(password)]);
  if(!user) return bad("Could not create account",500);
  const token=await createSession(user.id); setSessionCookie(token);
  return NextResponse.json({ user: { id: user.id, display_name: user.display_name, role: user.role } }, { status: 201 });
}
