
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { meshCategories } from "@/data/mesh-seed";
export default function AskPage(){
  const router=useRouter();
  const [me,setMe]=useState<null|{id:number}>(null); const [dbChecked,setDbChecked]=useState(false); const [dbOk,setDbOk]=useState(true);
  const [title,setTitle]=useState(""); const [cat,setCat]=useState("getting-started"); const [sub,setSub]=useState(""); const [body,setBody]=useState(""); const [tags,setTags]=useState("");
  const [err,setErr]=useState(""); const [busy,setBusy]=useState(false);
  useEffect(()=>{ fetch("/api/mesh/auth/me").then(r=>r.json()).then(d=>{ setMe(d.user); setDbOk(d.dbConfigured!==false); setDbChecked(true); }).catch(()=>setDbChecked(true)); },[]);
  const subs=meshCategories.filter(c=>c.parentSlug===cat);
  async function submit(e:React.FormEvent){ e.preventDefault(); setErr("");
    if(title.trim().length<10) return setErr("Title must be at least 10 characters — be specific about what you need.");
    if(body.trim().length<20) return setErr("Please add more detail (at least 20 characters).");
    if(busy) return; setBusy(true);
    try{ const r=await fetch("/api/mesh/questions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:title.trim(),categorySlug:cat,subcategorySlug:sub||undefined,body:body.trim(),tags:tags.split(",").map(s=>s.trim()).filter(Boolean)})});
      const d=await r.json().catch(()=>({}));
      if(r.status===503) setErr("Demonstration mode: live posting activates when the database is connected. Your question was not saved.");
      else if(r.status===401) setErr("Please sign in to post a question.");
      else if(!r.ok) setErr(d.error||"Could not post question.");
      else router.push(`/mesh/question/${d.id}`);
    } finally{ setBusy(false); } }
  if(dbChecked && !me) return <div className="mesh-container" style={{padding:"40px 20px",maxWidth:640}}><h1>Ask a Question</h1><p style={{color:"#4D4D4D"}}>You need an account to post, so answers and votes stay trustworthy.</p><Link href="/mesh/login?next=/mesh/ask" className="mesh-btn mesh-btn-primary">Log in to ask</Link> <Link href="/mesh/signup?next=/mesh/ask" className="mesh-btn mesh-btn-outline">Create account</Link>{!dbOk&&<p style={{fontSize:13,color:"#8F8F8F",marginTop:16}}>Note: the database is not connected yet, so posting is in demonstration mode.</p>}</div>;
  return <div className="mesh-container" style={{padding:"32px 20px",maxWidth:760}}>
    <h1 style={{fontSize:30,margin:"0 0 6px"}}>Ask a Question</h1>
    <p style={{color:"#4D4D4D",fontSize:14}}>Describe your situation, what you've tried, and what you need help with. Avoid sharing private documents or sensitive personal information.</p>
    <form onSubmit={submit} style={{display:"grid",gap:16,marginTop:20}}>
      <label style={{display:"grid",gap:6,fontWeight:600,fontSize:14}}>Question title<input className="mesh-input mesh-focus" value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Can I complete Nafath registration before my Iqama is issued?" required/><span style={{fontWeight:400,color:"#8F8F8F",fontSize:12}}>A specific title helps the right students find and answer your question.</span></label>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <label style={{display:"grid",gap:6,fontWeight:600,fontSize:14}}>Main category<select className="mesh-input" value={cat} onChange={e=>{setCat(e.target.value);setSub("");}}>{meshCategories.filter(c=>c.isMain).map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
        <label style={{display:"grid",gap:6,fontWeight:600,fontSize:14}}>Subcategory (optional)<select className="mesh-input" value={sub} onChange={e=>setSub(e.target.value)}><option value="">— None —</option>{subs.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
      </div>
      <label style={{display:"grid",gap:6,fontWeight:600,fontSize:14}}>Details<textarea className="mesh-textarea mesh-focus" rows={8} value={body} onChange={e=>setBody(e.target.value)} required/></label>
      <label style={{display:"grid",gap:6,fontWeight:600,fontSize:14}}>Tags (comma separated, optional)<input className="mesh-input" value={tags} onChange={e=>setTags(e.target.value)} placeholder="Nafath, Absher"/></label>
      {err&&<p role="alert" style={{color:"#EE0000",fontSize:14,background:"#fff",border:"1px solid #EE0000",borderRadius:6,padding:"10px 12px"}}>{err}</p>}
      <div><button disabled={busy} className="mesh-btn mesh-btn-primary mesh-focus">{busy?"Posting…":"Post Question"}</button></div>
    </form>
  </div>;
}
