"use client";

import {useCallback,useEffect,useState} from "react";
import Script from "next/script";
import {MessageCircle,ShieldCheck} from "lucide-react";

const MAX_LENGTH=1200;
const time=iso=>new Intl.DateTimeFormat("pt-BR",{dateStyle:"medium"}).format(new Date(iso));

export default function BlogComments({slug,siteKey}){
 const [items,setItems]=useState([]);
 const [page,setPage]=useState(0);
 const [hasMore,setHasMore]=useState(false);
 const [text,setText]=useState("");
 const [sending,setSending]=useState(false);
 const [notice,setNotice]=useState("");
 const [error,setError]=useState("");
 const [loading,setLoading]=useState(true);

 const load=useCallback(async(targetPage,append=false)=>{
  try{
   const response=await fetch("/api/blog/comments/"+encodeURIComponent(slug)+"?page="+targetPage,{cache:"no-store"});
   if(!response.ok)throw new Error("Não foi possível carregar comentários.");
   const data=await response.json();
   setItems(previous=>append?[...previous,...data.comments]:data.comments);
   setHasMore(data.hasMore===true);
   setPage(targetPage);
   setError("");
  }catch{setError("Os comentários estão temporariamente indisponíveis.");}
  finally{setLoading(false);}
 },[slug]);

 useEffect(()=>{load(0);},[load]);

 async function submit(event){
  event.preventDefault();
  if(sending||!text.trim())return;
  setSending(true);setNotice("");setError("");
  const form=event.currentTarget;
  const turnstile=new FormData(form).get("cf-turnstile-response");
  try{
   const response=await fetch("/api/blog/comments/"+encodeURIComponent(slug),{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({text,turnstile,website:form.elements.namedItem("website")?.value||""})
   });
   const data=await response.json();
   if(!response.ok)throw new Error(data.error||"Não foi possível enviar.");
   setText("");setNotice(data.message||"Comentário enviado para aprovação.");
  }catch(e){setError(e.message||"Não foi possível enviar o comentário.");}
  finally{
   setSending(false);
   if(typeof window!=="undefined"&&window.turnstile?.reset)window.turnstile.reset();
  }
 }

 return <section id="comentarios" aria-labelledby="comentarios-titulo" className="mt-14 border-t border-white/15 pt-10">
  <div className="mb-3 flex items-center gap-3 text-accent"><MessageCircle size={24} aria-hidden="true"/><h2 id="comentarios-titulo" className="h3">Comentários e opiniões</h2></div>
  <p className="mb-6 text-sm leading-7 text-white/70">O que você achou deste artigo? Escreva sua opinião sem precisar criar uma conta ou informar um e-mail.</p>
  <div className="site-card mb-7 p-5 sm:p-6">
   <form onSubmit={submit} className="space-y-4">
    <label htmlFor="comentario-anonimo" className="block font-semibold">Sua opinião</label>
    <textarea id="comentario-anonimo" required minLength={10} maxLength={MAX_LENGTH} rows={5}
     value={text} onChange={e=>setText(e.target.value)}
     placeholder="Compartilhe suas ideias, dúvidas ou sugestões..." className="w-full resize-y rounded-lg border border-white/20 bg-primary p-4 text-white placeholder:text-white/45 focus:border-accent focus:outline-none"/>
    <div className="hidden" aria-hidden="true"><label>Deixe vazio<input tabIndex={-1} name="website" autoComplete="off"/></label></div>
    <div className="cf-turnstile" data-sitekey={siteKey} data-theme="dark" data-language="pt-BR"/>
    <div className="flex flex-wrap items-center justify-between gap-3">
     <p className="text-xs text-white/55">{text.length}/{MAX_LENGTH} caracteres · Publicação como Visitante</p>
     <button type="submit" disabled={sending||text.trim().length<10} className="site-link disabled:cursor-not-allowed disabled:opacity-60">{sending?"Enviando...":"Enviar comentário"}</button>
    </div>
    <p className="text-xs leading-6 text-white/55"><ShieldCheck size={15} className="mr-1 inline align-text-bottom" aria-hidden="true"/> O comentário será publicado após aprovação. A verificação antibot usa o Cloudflare Turnstile. Evite incluir dados pessoais.</p>
    {notice&&<p role="status" className="text-sm text-accent">{notice}</p>}
    {error&&<p role="alert" className="text-sm text-red-300">{error}</p>}
   </form>
  </div>
  <h3 className="mb-4 text-lg font-semibold">Opiniões dos leitores</h3>
  {loading?<p className="text-white/60">Carregando comentários...</p>:items.length===0?<p className="text-white/60">Ainda não há comentários aprovados. Seja a primeira pessoa a participar!</p>:
   <div className="space-y-4">{items.map(item=><article key={item.id} className="site-card p-5">
    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-white/55"><span className="font-semibold text-accent">Visitante</span><span aria-hidden="true">·</span><time dateTime={item.createdAt}>{time(item.createdAt)}</time></div>
    <p className="whitespace-pre-wrap break-words leading-7 text-white/80">{item.text}</p>
   </article>)}</div>}
  {hasMore&&<button type="button" disabled={loading} onClick={()=>{setLoading(true);load(page+1,true);}} className="mt-5 rounded-lg border border-accent px-4 py-2 text-accent hover:bg-accent hover:text-primary">Carregar mais comentários</button>}
  <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/>
 </section>;
}
