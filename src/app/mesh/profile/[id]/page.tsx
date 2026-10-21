
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { meshSeedQuestions, meshSeedUsers, seedQuestionToListItem } from "@/data/mesh-seed";
import { DiscussionList } from "@/components/mesh/DiscussionList";
export default function ProfilePage(){
  const params=useParams(); const id=Number(params.id);
  const [data,setData]=useState<{display_name:string;bio:string|null;created_at:string;questions:ReturnType<typeof seedQuestionToListItem>[];answersCount:number}|null>(null);
  useEffect(()=>{ fetch(`/api/mesh/users/${id}`).then(async r=>{ if(!r.ok) throw 0; setData(await r.json()); }).catch(()=>{
    const u=meshSeedUsers.find(x=>x.id===id); if(!u) return;
    const qs=meshSeedQuestions.filter(q=>q.authorId===id).map(seedQuestionToListItem);
    const ac=meshSeedQuestions.reduce((n,q)=>n+q.answers.filter(a=>a.authorId===id).length,0);
    setData({display_name:u.displayName,bio:u.bio,created_at:u.createdAt,questions:qs,answersCount:ac});
  }); },[id]);
  if(!data) return <div className="mesh-container" style={{padding:40}}><h1>Profile not found</h1><Link href="/mesh/browse">Browse discussions</Link></div>;
  const initials=data.display_name.split(" ").map(s=>s[0]).join("").slice(0,2).toUpperCase();
  return <div className="mesh-container" style={{padding:"32px 20px",maxWidth:860}}>
    <div style={{display:"flex",gap:18,alignItems:"center"}}>
      <div aria-hidden style={{width:64,height:64,borderRadius:999,background:"linear-gradient(135deg,#125934,#36B875)",color:"#fff",display:"grid",placeItems:"center",fontWeight:800,fontSize:20}}>{initials}</div>
      <div><h1 style={{margin:"0 0 4px",fontSize:28}}>{data.display_name}</h1><p style={{margin:0,color:"#8F8F8F",fontSize:13}}>Member since {new Date(data.created_at).toLocaleDateString("en-GB",{month:"long",year:"numeric"})} · {data.answersCount} answers contributed</p></div>
    </div>
    {data.bio&&<p style={{color:"#4D4D4D",maxWidth:640}}>{data.bio}</p>}
    <h2 style={{fontSize:20,marginTop:32}}>Questions posted ({data.questions.length})</h2>
    <DiscussionList items={data.questions}/>
  </div>;
}
