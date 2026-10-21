
"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
function Inner(){
  const router=useRouter(); const sp=useSearchParams(); const next=sp.get("next")||"/mesh";
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [name,setName]=useState(""); const [err,setErr]=useState(""); const [busy,setBusy]=useState(false);
  const isSignup = true;
  async function submit(e:React.FormEvent){ e.preventDefault(); setErr(""); if(busy) return; setBusy(true);
    try{ const url=isSignup?"/api/mesh/auth/signup":"/api/mesh/auth/login"; const payload=isSignup?{displayName:name,email,password}:{email,password};
      const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}); const d=await r.json().catch(()=>({}));
      if(r.status===503) setErr("Accounts activate when the database is connected. You can still browse all sample discussions without an account.");
      else if(!r.ok) setErr(d.error||"Something went wrong.");
      else router.push(next);
    } finally{ setBusy(false); } }
  return <div className="mesh-container" style={{padding:"40px 20px",maxWidth:460}}>
    <h1 style={{fontSize:28}}>{isSignup?"Create your MESH account":"Log in to MESH"}</h1>
    <p style={{color:"#4D4D4D",fontSize:14}}>{isSignup?"Use any display name — you do not need to use your legal name.":"Welcome back."}</p>
    <form onSubmit={submit} style={{display:"grid",gap:14,marginTop:20}}>
      {isSignup&&<label style={{display:"grid",gap:6,fontWeight:600,fontSize:14}}>Display name<input className="mesh-input mesh-focus" value={name} onChange={e=>setName(e.target.value)} required/></label>}
      <label style={{display:"grid",gap:6,fontWeight:600,fontSize:14}}>Email<input className="mesh-input mesh-focus" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
      <label style={{display:"grid",gap:6,fontWeight:600,fontSize:14}}>Password<input className="mesh-input mesh-focus" type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8}/>{isSignup&&<span style={{fontWeight:400,fontSize:12,color:"#8F8F8F"}}>At least 8 characters.</span>}</label>
      {err&&<p role="alert" style={{color:"#EE0000",fontSize:14}}>{err}</p>}
      <button disabled={busy} className="mesh-btn mesh-btn-primary mesh-focus">{busy?"Please wait…":(isSignup?"Create account":"Log in")}</button>
    </form>
    <p style={{fontSize:14,color:"#4D4D4D",marginTop:16}}>{isSignup?<><span>Already have an account? </span><Link href={`/mesh/login?next=${encodeURIComponent(next)}`} style={{color:"#125934",fontWeight:600}}>Log in</Link></>:<><span>New to MESH? </span><Link href={`/mesh/signup?next=${encodeURIComponent(next)}`} style={{color:"#125934",fontWeight:600}}>Create an account</Link></>}</p>
    {!isSignup&&<p style={{fontSize:13,color:"#8F8F8F"}}>Password reset is handled by the site administrator while the community is in its early phase — contact us via the About page.</p>}
  </div>;
}
export default function Page(){ return <Suspense fallback={<div className="mesh-container" style={{padding:40}}>Loading…</div>}><Inner/></Suspense>; }
