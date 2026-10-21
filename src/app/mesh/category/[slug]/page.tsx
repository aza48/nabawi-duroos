
"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { meshCategories, meshSeedQuestions, seedQuestionToListItem, type MeshListItem } from "@/data/mesh-seed";
import { DiscussionList } from "@/components/mesh/DiscussionList";
export default function CategoryPage(){
  const params=useParams(); const slug=String(params.slug||"");
  const cat=meshCategories.find(c=>c.slug===slug);
  const subs=meshCategories.filter(c=>c.parentSlug===slug);
  const [items,setItems]=useState<MeshListItem[]>(()=>meshSeedQuestions.map(seedQuestionToListItem));
  const [search,setSearch]=useState(""); const [sub,setSub]=useState("all"); const [sort,setSort]=useState("recent"); const [visible,setVisible]=useState(10);
  useEffect(()=>{ fetch(`/api/mesh/questions?category=${encodeURIComponent(slug)}&limit=100`).then(async r=>{ if(!r.ok) throw 0; const d=await r.json(); if(d.questions){setItems(d.questions);} }).catch(()=>{}); },[slug]);
  const filtered=useMemo(()=>{ let list=items.filter(i=>{ const s=meshSeedQuestions.find(x=>x.id===i.id); if(!s) return i.category_slug===slug; return s.categorySlug===slug||s.subcategorySlug===slug; });
    if(sub!=="all") list=list.filter(i=>meshSeedQuestions.find(x=>x.id===i.id)?.subcategorySlug===sub);
    if(search.trim()){ const t=search.toLowerCase(); list=list.filter(i=>(i.title+i.body).toLowerCase().includes(t)); }
    if(sort==="top") list.sort((a,b)=>b.vote_count-a.vote_count); else if(sort==="unanswered") list=list.filter(i=>i.answer_count===0); else list.sort((a,b)=>+new Date(b.created_at)-+new Date(a.created_at));
    return list; },[items,slug,sub,search,sort]);
  if(!cat) return <div className="mesh-container" style={{padding:40}}><h1>Category not found</h1><Link href="/mesh/browse">Back to browse</Link></div>;
  return <div className="mesh-container" style={{padding:"32px 20px"}}>
    <nav style={{fontSize:13,color:"#8F8F8F",marginBottom:12}}><Link href="/mesh" style={{color:"#125934"}}>Home</Link> / {cat.name}</nav>
    {cat.isMain && <div style={{background:"linear-gradient(135deg,#171717,#212121)",borderRadius:16,padding:24,color:"#fff",marginBottom:24}}><div className="mesh-glass"><h1 style={{margin:"0 0 6px",fontSize:28}}>{cat.name}</h1><p style={{color:"rgba(255,255,255,.75)",margin:0}}>{cat.description}</p></div></div>}
    {!cat.isMain && <><h1 style={{fontSize:30,margin:"0 0 6px"}}>{cat.name}</h1><p style={{color:"#4D4D4D"}}>{cat.description}</p></>}
    <div style={{display:"flex",gap:10,flexWrap:"wrap",margin:"18px 0"}}>
      <div style={{position:"relative",flex:1,minWidth:200}}><Search size={16} style={{position:"absolute",left:10,top:14,color:"#8F8F8F"}}/><input className="mesh-input mesh-focus" style={{paddingLeft:34}} placeholder="Search within this category…" aria-label="Search in category" value={search} onChange={e=>setSearch(e.target.value)}/></div>
      <select className="mesh-input" style={{width:"auto"}} aria-label="Sort" value={sort} onChange={e=>setSort(e.target.value)}><option value="recent">Recent</option><option value="top">Most Upvoted</option><option value="unanswered">Unanswered</option></select>
      <Link href="/mesh/ask" className="mesh-btn mesh-btn-primary">Ask a Question</Link>
    </div>
    {subs.length>0 && <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}><button onClick={()=>setSub("all")} className={`mesh-chip ${sub==="all"?"mesh-chip-active":""}`}>All</button>{subs.map(s=><button key={s.slug} onClick={()=>setSub(s.slug)} className={`mesh-chip ${sub===s.slug?"mesh-chip-active":""}`}>{s.name}</button>)}</div>}
    {slug==="getting-started" && <p style={{fontSize:13,color:"#4D4D4D",background:"#EDF7F0",border:"1px solid #D9F0E2",borderRadius:8,padding:"10px 14px"}}>MESH is a student community and is not affiliated with or endorsed by Nafath, Absher, any university, or any government service. Always confirm procedures on the official source.</p>}
    <DiscussionList items={filtered.slice(0,visible)}/>
    {visible<filtered.length && <button className="mesh-btn mesh-btn-outline" style={{marginTop:16}} onClick={()=>setVisible(v=>v+10)}>Load more</button>}
  </div>;
}
