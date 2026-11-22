"use client";

import {useCallback,useEffect,useState} from "react";
import Link from "next/link";

const getJson=async(response)=>{
 const data=await response.json().catch(()=>({}));
 if(!response.ok)throw new Error(data.error||"Falha na comunicação com o servidor.");
 return data;
};

function CommentCard({item,onModerate,busy}){
 return <article className="site-card space-y-3 p-5">
  <p className="break-words text-xs text-accent">/blog/{item.slug}</p>
  <p className="text-xs text-white/55">{new Date(item.createdAt).toLocaleString("pt-BR")}</p>
  <p className="whitespace-pre-wrap break-words text-white/85">{item.text}</p>
  <div className="flex flex-wrap gap-3">
   {item.status==="pending"&&<button type="button" disabled={busy} onClick={()=>onModerate(item.id,"approve")} className="rounded-lg bg-accent px-4 py-2 text-primary disabled:opacity-60">Aprovar</button>}
   <button type="button" disabled={busy} onClick={()=>onModerate(item.id,"delete")} className="rounded-lg border border-red-300/60 px-4 py-2 text-red-300 disabled:opacity-60">Excluir</button>
  </div>
 </article>;
}
export default function CommentsAdmin({enabled}){
 const [password,setPassword]=useState("");
 const [authorized,setAuthorized]=useState(false);
 const [pending,setPending]=useState([]);
 const [approved,setApproved]=useState([]);
 const [loading,setLoading]=useState(true);
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState("");

 const refresh=useCallback(async()=>{
  try{
   const result=await getJson(await fetch("/api/admin/comments",{cache:"no-store"}));
   setPending(result.pending);setApproved(result.approved);setAuthorized(true);setMessage("");
  }catch(e){
   setAuthorized(false);
   if(!e.message.includes("não autorizado"))setMessage(e.message);
  }finally{setLoading(false);}
 },[]);
 useEffect(()=>{if(enabled)refresh();else setLoading(false);},[enabled,refresh]);

 async function login(event){
  event.preventDefault();setBusy(true);setMessage("");
  try{
   await getJson(await fetch("/api/admin/comments/session",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})}));
   setPassword("");await refresh();
  }catch(e){setMessage(e.message);}finally{setBusy(false);}
 }
 async function moderate(id,action){
  if(action==="delete"&&!window.confirm("Excluir permanentemente este comentário?"))return;
  setBusy(true);setMessage("");
  try{
   await getJson(await fetch("/api/admin/comments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,action})}));
   await refresh();
  }catch(e){setMessage(e.message);}finally{setBusy(false);}
 }
 async function logout(){
  setBusy(true);
  try{await fetch("/api/admin/comments/session",{method:"DELETE"});}
  finally{setAuthorized(false);setApproved([]);setPending([]);setBusy(false);}
 }

 if(!enabled)return <div className="site-card p-6"><p className="text-white/75">A moderação estará disponível depois da configuração segura do armazenamento, da verificação antibot e da senha administrativa na Vercel.</p></div>;
 if(loading)return <p className="text-white/60">Verificando acesso...</p>;
 return <div className="space-y-8">
  {!authorized?<form onSubmit={login} className="site-card max-w-lg space-y-4 p-6">
   <label htmlFor="admin-senha" className="block font-semibold">Senha de moderação</label>
   <input id="admin-senha" type="password" required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)}
    className="w-full rounded-lg border border-white/20 bg-primary p-3 text-white" placeholder="Senha administrativa"/>
   <button type="submit" disabled={busy} className="site-link disabled:opacity-60">{busy?"Verificando...":"Entrar"}</button>
  </form>:<>
   <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-white/70">Comentários são exibidos publicamente somente após aprovação.</p><button onClick={logout} disabled={busy} className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:text-accent">Sair</button></div>
   <section className="space-y-4" aria-labelledby="pending-title"><h2 id="pending-title" className="h3">Aguardando aprovação ({pending.length})</h2>
    {pending.length?pending.map(item=><CommentCard key={item.id} item={item} onModerate={moderate} busy={busy}/>):<p className="text-white/55">Nenhum comentário pendente.</p>}
   </section>
   <section className="space-y-4" aria-labelledby="approved-title"><h2 id="approved-title" className="h3">Publicados recentemente ({approved.length})</h2>
    {approved.length?approved.map(item=><CommentCard key={item.id} item={item} onModerate={moderate} busy={busy}/>):<p className="text-white/55">Nenhum comentário publicado.</p>}
   </section>
  </>}
  {message&&<p role="alert" className="text-red-300">{message}</p>}
  <p className="text-sm text-white/55">Administrar artigos: <Link href="https://app.notion.com/p/41b468bac2c7819bb6fed5be19d639bb" target="_blank" rel="noopener noreferrer" className="text-accent underline">Notion · DevBlog</Link></p>
 </div>;
}
