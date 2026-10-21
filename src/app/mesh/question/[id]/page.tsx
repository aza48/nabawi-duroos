
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Check, ChevronRight, Flag } from "lucide-react";
import { meshSeedQuestions, relativeTime, seedQuestionToListItem } from "@/data/mesh-seed";
import VoteButton from "@/components/mesh/VoteButton";
import { DiscussionList } from "@/components/mesh/DiscussionList";

type Ans = { id:number; body:string; author_id:number; author_name:string; vote_count:number; hasVoted?:boolean; created_at:string; is_seed?:boolean };
type QDetail = { id:number; title:string; body:string; author_id:number; author_name:string; category_slug:string; category_name:string; tags:string[]; vote_count:number; hasVoted?:boolean; accepted_answer_id:number|null; created_at:string; is_seed?:boolean; answers:Ans[] };

export default function QuestionPage(){
  const params=useParams(); const id=Number(params.id);
  const [q,setQ]=useState<QDetail|null>(null); const [demo,setDemo]=useState(false); const [me,setMe]=useState<{id:number;role:string}|null>(null);
  const [answerBody,setAnswerBody]=useState(""); const [err,setErr]=useState(""); const [reportFor,setReportFor]=useState<string|null>(null); const [reason,setReason]=useState("Spam");
  const seedQ = meshSeedQuestions.find(x=>x.id===id);
  function loadFromSeed(){
    if(!seedQ){ setQ(null); return; }
    setDemo(true);
    setQ({ id:seedQ.id, title:seedQ.title, body:seedQ.body, author_id:seedQ.authorId, author_name:seedQ.authorName, category_slug:seedQ.categorySlug, category_name:seedQ.categoryName, tags:seedQ.tags, vote_count:seedQ.voteCount, accepted_answer_id:seedQ.acceptedAnswerId, created_at:seedQ.createdAt, is_seed:true,
      answers:[...seedQ.answers].sort((a,b)=> (seedQ.acceptedAnswerId===a.id?-1:seedQ.acceptedAnswerId===b.id?1:b.voteCount-a.voteCount)).map(a=>({id:a.id,body:a.body,author_id:a.authorId,author_name:a.authorName,vote_count:a.voteCount,created_at:a.createdAt,is_seed:true})) });
  }
  useEffect(()=>{ fetch("/api/mesh/auth/me").then(r=>r.json()).then(d=>setMe(d.user)).catch(()=>{});
    fetch(`/api/mesh/questions/${id}`).then(async r=>{ if(!r.ok) throw 0; const d=await r.json(); setQ(d.question); setDemo(false); }).catch(()=>loadFromSeed());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id]);
  if(q===null && !seedQ) return <div className="mesh-container" style={{padding:40}}><h1>Question not found</h1><Link href="/mesh/browse">Browse discussions</Link></div>;
  if(!q) return <div className="mesh-container" style={{padding:40}}>Loading…</div>;
  const isAuthor = me?.id===q.author_id; const canModerate = isAuthor || me?.role==="moderator" || me?.role==="admin";
  async function postAnswer(e:React.FormEvent){ e.preventDefault(); setErr(""); if(!answerBody.trim()) return setErr("Answer cannot be empty.");
    if(demo) return setErr("Demonstration mode: posting activates when the database is connected.");
    const r=await fetch(`/api/mesh/questions/${id}/answers`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({body:answerBody.trim()})});
    if(!r.ok){ const d=await r.json().catch(()=>({})); return setErr(d.error||"Could not post answer."); }
    setAnswerBody(""); window.location.reload(); }
  async function accept(answerId:number|null){ if(demo) return; await fetch(`/api/mesh/questions/${id}/accept`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({answerId})}); window.location.reload(); }
  async function delAnswer(aid:number){ if(!confirm("Delete this answer?")) return; await fetch(`/api/mesh/answers/${aid}`,{method:"DELETE"}); window.location.reload(); }
  async function submitReport(targetType:string,targetId:number){ if(demo){ alert("Reporting activates when the database is connected."); return; } await fetch("/api/mesh/report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetType,targetId,reason})}); setReportFor(null); alert("Report submitted. Thank you."); }
  const related = meshSeedQuestions.filter(x=>x.categorySlug===q.category_slug && x.id!==q.id).slice(0,3).map(seedQuestionToListItem);
  return <div className="mesh-container" style={{padding:"28px 20px",maxWidth:860}}>
    <nav style={{fontSize:13,color:"#8F8F8F",display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}} aria-label="Breadcrumb"><Link href="/mesh" style={{color:"#125934"}}>Home</Link><ChevronRight size={13}/><Link href={`/mesh/category/${q.category_slug}`} style={{color:"#125934"}}>{q.category_name}</Link><ChevronRight size={13}/><span style={{color:"#4D4D4D"}}>{q.title.slice(0,50)}…</span></nav>
    {demo&&<p style={{fontSize:12,background:"#EDF7F0",border:"1px solid #D9F0E2",padding:"8px 12px",borderRadius:6}}>Sample / demonstration content — this question and its answers are seeded examples, not verified official guidance.</p>}
    <div style={{display:"flex",gap:18,marginTop:16}}>
      <VoteButton targetType="question" targetId={q.id} initialCount={q.vote_count} initialVoted={!!q.hasVoted} isLoggedIn={!!me} demoMode={demo}/>
      <div style={{flex:1,minWidth:0}}>
        <h1 style={{fontSize:"clamp(24px,4vw,32px)",lineHeight:1.25,margin:"0 0 10px"}}>{q.title}</h1>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}><Link href={`/mesh/category/${q.category_slug}`} className="mesh-chip">{q.category_name}</Link>{q.tags.map(t=><span key={t} className="mesh-chip mesh-chip-static">{t}</span>)}{q.accepted_answer_id&&<span className="mesh-solved"><Check size={12}/> Solved</span>}</div>
        <p style={{fontSize:13,color:"#8F8F8F"}}>Asked by <Link href={`/mesh/profile/${q.author_id}`} style={{color:"#125934",fontWeight:600}}>{q.author_name}</Link> · {relativeTime(q.created_at)}</p>
        <div style={{fontSize:15,lineHeight:1.7}}>{q.body.split("\n\n").map((p,i)=><p key={i}>{p}</p>)}</div>
        <button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={()=>setReportFor(reportFor==="q"?"null":"q")} aria-label="Report question"><Flag size={13}/> Report</button>
        {reportFor==="q"&&<ReportBox reason={reason} setReason={setReason} onSubmit={()=>submitReport("question",q.id)}/>}
      </div>
    </div>
    <h2 style={{fontSize:22,margin:"36px 0 8px"}}>{q.answers.length} Answer{q.answers.length!==1?"s":""}</h2>
    <div style={{display:"grid",gap:16}}>
      {q.answers.map(ans=>{ const accepted=q.accepted_answer_id===ans.id; return (
        <article key={ans.id} style={{border:`1px solid ${accepted?"#218653":"#EBEBEB"}`,background:accepted?"#EDF7F0":"#fff",borderRadius:12,padding:18,display:"flex",gap:16}}>
          <VoteButton targetType="answer" targetId={ans.id} initialCount={ans.vote_count} initialVoted={!!ans.hasVoted} isLoggedIn={!!me} demoMode={demo}/>
          <div style={{flex:1,minWidth:0}}>
            {accepted&&<span className="mesh-solved"><Check size={12}/> Accepted answer</span>}
            <div style={{fontSize:15,lineHeight:1.7,marginTop:6}}>{ans.body.split("\n\n").map((p,i)=><p key={i}>{p}</p>)}</div>
            <p style={{fontSize:13,color:"#8F8F8F"}}>— <Link href={`/mesh/profile/${ans.author_id}`} style={{color:"#125934",fontWeight:600}}>{ans.author_name}</Link> · {relativeTime(ans.created_at)}</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {canModerate&&!demo&&(accepted?<button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={()=>accept(null)}>Remove solution</button>:<button className="mesh-btn mesh-btn-primary mesh-btn-sm" onClick={()=>accept(ans.id)}>Mark as solution</button>)}
              {me?.id===ans.author_id&&!demo&&<button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={()=>delAnswer(ans.id)}>Delete</button>}
              <button className="mesh-btn mesh-btn-outline mesh-btn-sm" onClick={()=>setReportFor(reportFor===`a${ans.id}`?"null":`a${ans.id}`)}><Flag size={13}/> Report</button>
            </div>
            {reportFor===`a${ans.id}`&&<ReportBox reason={reason} setReason={setReason} onSubmit={()=>submitReport("answer",ans.id)}/>}
          </div>
        </article>);})}
      {q.answers.length===0&&<p style={{color:"#4D4D4D"}}>No answers yet. If you know this from experience, your answer could help the next student.</p>}
    </div>
    <section style={{marginTop:32}}><h3 style={{fontSize:18}}>Your answer</h3>
      {me&&!demo?(<form onSubmit={postAnswer} style={{display:"grid",gap:10}}><textarea className="mesh-textarea mesh-focus" rows={5} value={answerBody} onChange={e=>setAnswerBody(e.target.value)} placeholder="Share what worked for you, and note where people should check the official source." aria-label="Your answer"/>{err&&<p role="alert" style={{color:"#EE0000",fontSize:14}}>{err}</p>}<div><button className="mesh-btn mesh-btn-primary">Post Answer</button></div></form>)
      :(<div className="mesh-card" style={{padding:18}}><p style={{margin:"0 0 10px",fontSize:14,color:"#4D4D4D"}}>{demo?"Sign-in and posting activate when the database is connected. You can browse everything without an account.":"Sign in to answer this question."}</p><Link href={`/mesh/login?next=/mesh/question/${id}`} className="mesh-btn mesh-btn-primary mesh-btn-sm">Log in to answer</Link></div>)}
    </section>
    {related.length>0&&<section style={{marginTop:40}}><h3 style={{fontSize:18}}>Related discussions</h3><DiscussionList items={related}/></section>}
  </div>;
}
function ReportBox({reason,setReason,onSubmit}:{reason:string;setReason:(s:string)=>void;onSubmit:()=>void}){
  return <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}><select className="mesh-input" style={{width:"auto"}} value={reason} onChange={e=>setReason(e.target.value)} aria-label="Report reason"><option>Spam</option><option>Personal information</option><option>Harassment</option><option>Incorrect / unsafe advice</option><option>Other</option></select><button className="mesh-btn mesh-btn-primary mesh-btn-sm" onClick={onSubmit}>Submit report</button></div>;
}
