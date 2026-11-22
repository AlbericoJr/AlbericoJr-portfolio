"use client";

import {useEffect,useRef,useState} from "react";
import {MessageCircle,ShieldCheck} from "lucide-react";
import {isGiscusConfigured} from "@/lib/giscus-config.mjs";

const category=process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
const categoryId=process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
const enabled=isGiscusConfigured(category,categoryId);

// Os identificadores do repositório são públicos; a autenticação fica com o GitHub.
const repo="AlbericoJr/AlbericoJr-portfolio";
const repoId="R_kgDOMgNY0A";

export default function BlogComments({slug}){
 const [loaded,setLoaded]=useState(false);
 const [failed,setFailed]=useState(false);
 const container=useRef(null);

 useEffect(()=>{
  if(!enabled||!loaded||!container.current)return;
  const root=container.current;
  root.replaceChildren();
  const script=document.createElement("script");
  script.src="https://giscus.app/client.js";
  script.async=true;
  script.crossOrigin="anonymous";
  const attributes={
   repo,"repo-id":repoId,category,"category-id":categoryId,
   mapping:"pathname",strict:"1","reactions-enabled":"1",
   "emit-metadata":"0","input-position":"top",theme:"dark",
   lang:"pt",loading:"lazy"
  };
  for(const [name,value] of Object.entries(attributes)){
   script.setAttribute("data-"+name,value);
  }
  script.onerror=()=>setFailed(true);
  root.appendChild(script);
  return ()=>{script.onerror=null;root.replaceChildren();};
 },[loaded,slug]);

 if(!enabled)return null;
 return <section id="comentarios" aria-labelledby="comentarios-titulo" className="mt-14 border-t border-white/15 pt-8">
  <div className="mb-4 flex items-center gap-3 text-accent"><MessageCircle size={24} aria-hidden="true"/><h2 id="comentarios-titulo" className="h3">Comentários e opiniões</h2></div>
  <p className="mb-5 text-sm leading-7 text-white/70">Compartilhe sua experiência, deixe uma dúvida ou contribua com novas ideias. Mantenha uma conversa respeitosa e evite publicar dados pessoais.</p>
  {!loaded&&<div className="site-card space-y-4 p-5">
   <p className="text-sm text-white/70">Os comentários são hospedados pelo GitHub Discussions. Para participar, você precisa entrar com sua conta GitHub. O serviço só será carregado após seu clique.</p>
   <button type="button" className="site-link" onClick={()=>setLoaded(true)}>Carregar comentários</button>
  </div>}
  {loaded&&<>
   {failed&&<div role="alert" className="site-card mb-4 p-4 text-sm text-white/80">Não foi possível carregar os comentários. Verifique a conexão ou tente novamente mais tarde.</div>}
   <div ref={container} role="region" aria-label="Discussão deste artigo" className="min-h-24"/>
   <p className="mt-3 flex items-start gap-2 text-xs leading-6 text-white/55"><ShieldCheck size={16} className="mt-1 shrink-0" aria-hidden="true"/> Ao carregar, você utiliza um serviço externo sujeito à <a className="text-accent underline" href="https://docs.github.com/pt/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">política de privacidade do GitHub</a>.</p>
  </>}
 </section>;
}
