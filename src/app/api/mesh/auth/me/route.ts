
import { NextResponse } from "next/server";
import { dbConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/mesh-auth";
import { ensureMesh } from "@/lib/mesh-db";
export async function GET(){ if(!dbConfigured()) return NextResponse.json({ user: null, dbConfigured: false });
  try{ await ensureMesh(); }catch{ return NextResponse.json({ user: null, dbConfigured: false }); }
  const user=await getCurrentUser();
  return NextResponse.json({ user: user ? { id: user.id, display_name: user.display_name, role: user.role, bio: user.bio } : null, dbConfigured: true }); }
