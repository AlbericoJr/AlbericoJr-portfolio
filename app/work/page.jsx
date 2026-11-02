"use client"
import {useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {FiArrowUpRight,FiGithub} from "react-icons/fi"
import {projects,categories} from "@/lib/projects.mjs"

export default function Work(){
 const [filter,setFilter]=useState("Todos")
 const visible=filter==="Todos"?projects:projects.filter(p=>p.category===filter)
 return <main id="conteudo" className="site-shell pb-20 pt-12 sm:pt-20">
   <div className="max-w-3xl"><p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Portfólio</p><h1 className="h2">Projetos e experiências</h1><p className="mt-5 text-white/70">Aplicações mobile, interfaces web e estudos. Veja os detalhes, tecnologias e códigos de cada projeto.</p></div>
   <div className="mt-10 flex flex-wrap gap-3" role="group" aria-label="Filtrar projetos">
    {categories.map(c=><button key={c} type="button" aria-pressed={filter===c} onClick={()=>setFilter(c)} className={(filter===c?"bg-accent text-primary":"border border-white/20 bg-[#27272c] text-white hover:border-accent")+" rounded-full px-5 py-2 text-sm font-semibold transition-colors"}>{c}</button>)}
   </div>
   <p role="status" className="mt-5 text-sm text-white/60">{visible.length} {visible.length===1?"projeto":"projetos"}</p>
   <div className="mt-7 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
    {visible.map(p=><article key={p.slug} className="site-card group flex flex-col overflow-hidden">
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-[#393a43] to-[#18181e]">
       {p.image?<Image src={p.image} alt={"Captura do projeto "+p.title} fill sizes="(max-width:768px) 100vw,(max-width:1280px) 50vw,33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"/>:<span className="text-4xl font-extrabold tracking-tight text-accent">Planej.ai</span>}
      </div>
      <div className="flex flex-1 flex-col p-6"><div className="flex items-center justify-between gap-2"><span className="text-xs uppercase tracking-widest text-accent">{p.role}</span>{p.featured&&<span className="text-xs text-white/50">Destaque</span>}</div>
      <h2 className="mt-3 text-2xl font-bold">{p.title}</h2><p className="mt-3 flex-1 text-sm leading-7 text-white/65">{p.description}</p>
      <ul aria-label={"Tecnologias do projeto "+p.title} className="mt-5 flex flex-wrap gap-2">{p.stack.map(t=><li key={t} className="rounded bg-white/10 px-2.5 py-1 text-xs text-white/80">{t}</li>)}</ul>
      <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
       <Link href={"/work/"+p.slug} className="inline-flex items-center rounded-lg border border-accent/60 px-4 py-2 text-sm font-semibold text-accent hover:bg-accent hover:text-primary" aria-label={"Ver detalhes do projeto "+p.title}>Detalhes</Link>
       <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2 text-sm font-semibold hover:border-accent hover:text-accent" aria-label={"Ver código do projeto "+p.title}><FiGithub aria-hidden="true"/> Código</a>
       {p.live&&<a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-primary hover:bg-accent-hover" aria-label={"Ver demonstração de "+p.title}>Demo <FiArrowUpRight aria-hidden="true"/></a>}
      </div></div>
     </article>)}
   </div>
 </main>
}
