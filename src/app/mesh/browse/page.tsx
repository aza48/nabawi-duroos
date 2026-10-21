
"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { meshCategories, meshSeedQuestions, seedQuestionToListItem, type MeshListItem } from "@/data/mesh-seed";
import { DiscussionList } from "@/components/mesh/DiscussionList";
function Inner(){
  const sp = useSearchParams();
  const [items,setItems]=useState<MeshListItem[]>(()=>meshSeedQuestions.map(seedQuestionToListItem));
  const [demo,setDemo]=useState(true);
  const [search,setSearch]=useState(sp.get("q")||"");
  const [cat,setCat]=useState("all"); const [sub,setSub]=useState("all"); const [sort,setSort]=useState("recent"); const [visible,setVisible]=useState(10);
  useEffect(()=>{ fetch("/api/mesh/questions?limit=100").then(async r=>{ if(!r.ok) throw 0; const d=await r.json(); if(d.questions?.length){setItems(d.questions); setDemo(false);} }).catch(()=>setDemo(true)); },[]);
  const subs = useMemo(()=> meshCategories.filter(c=>!c.isMain && (cat==="all"||c.parentSlug===cat)),[cat]);
  const filtered=useMemo(()=>{ let list=[...items];
    if(cat!=="all") list=list.filter(i=>{ const s=meshSeedQuestions.find(x=>x.id===i.id); return i.category_slug===cat||s?.categorySlug===cat||s?.subcategorySlug===cat; });
    if(sub!=="all") list=list.filter(i=>{ const s=meshSeedQuestions.find(x=>x.id===i.id); return s?.subcategorySlug===sub||i.category_slug===sub; });
    if(search.trim()){ const t=search.toLowerCase(); list=list.filter(i=>(i.title+i.body+(i.tags||[]).join(" ")+i.category_name).toLowerCase().includes(t)); }
    if(sort==="top") list.sort((a,b)=>b.vote_count-a.vote_count); else if(sort==="unanswered") list=list.filter(i=>i.answer_count===0); else list.sort((a,b)=>+new Date(b.created_at)-+new Date(a.created_at));
    return list; },[items,cat,sub,search,sort]);
  return <div className="mesh-container" style={{padding:"32px 20px"}}>
    <h1 style={{fontSize:32,margin:"0 0 6px"}}>Browse Discussions</h1>
    <p style={{color:"#4D4D4D",margin:"0 0 20px"}}>Search and filter questions from students in Madinah. {demo&&<span>Showing sample / demonstration content.</span>}</p>
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:12}}>
      <div style={{position:"relative",flex:1,minWidth:220}}><Search size={16} style={{position:"absolute",left:10,top:14,color:"#8F8F8F"}}/><input className="mesh-input mesh-focus" style={{paddingLeft:34}} placeholder="Search titles, answers, tags…" aria-label="Search" value={search} onChange={e=>setSearch(e.target.value)}/></div>
      <select className="mesh-input mesh-focus" style={{width:"auto"}} aria-label="Sort" value={sort} onChange={e=>setSort(e.target.value)}><option value="recent">Recent</option><option value="top">Most Upvoted</option><option value="unanswered">Unanswered</option></select>
      <Link href="/mesh/ask" className="mesh-btn mesh-btn-primary">Ask a Question</Link>
    </div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>{[["all","All"],...meshCategories.filter(c=>c.isMain).map(c=>[c.slug,c.name] as const)].map(([v,l])=><button key={v} onClick={()=>{setCat(v);setSub("all");}} className={`mesh-chip mesh-focus ${cat===v?"mesh-chip-active":""}`}>{l}</button>)}</div>
    {subs.length>0 && <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}><button onClick={()=>setSub("all")} className={`mesh-chip ${sub==="all"?"mesh-chip-active":""}`}>All subcategories</button>{subs.map(s=><button key={s.slug} onClick={()=>setSub(s.slug)} className={`mesh-chip ${sub===s.slug?"mesh-chip-active":""}`}>{s.name}</button>)}</div>}
    <DiscussionList items={filtered.slice(0,visible)}/>
    {visible<filtered.length && <button className="mesh-btn mesh-btn-outline" style={{marginTop:16}} onClick={()=>setVisible(v=>v+10)}>Load more ({filtered.length-visible} remaining)</button>}
  </div>;
}
export default function BrowsePage(){ return <Suspense fallback={<div className="mesh-container" style={{padding:32}}>Loading…</div>}><Inner/></Suspense>; }
