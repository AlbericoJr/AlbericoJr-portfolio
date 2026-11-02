import Image from "next/image"
import Link from "next/link"
import {notFound} from "next/navigation"
import {projects} from "@/lib/projects.mjs"
import {caseStudies} from "@/lib/case-studies.mjs"
import {FiArrowUpRight,FiGithub,FiArrowLeft} from "react-icons/fi"

export function generateStaticParams(){return projects.map(project=>({slug:project.slug}))}
export async function generateMetadata({params}){const {slug}=await params;const p=projects.find(item=>item.slug===slug);return p?{title:p.title,description:p.description,alternates:{canonical:"/work/"+slug}}:{title:"Projeto não encontrado"}}
export default async function ProjectDetail({params}){
 const {slug}=await params
 const p=projects.find(item=>item.slug===slug)
 if(!p)notFound()
 const study=caseStudies[p.slug]
 return <main id="conteudo" className="site-shell max-w-5xl py-14 sm:py-20">
 <Link href="/work" className="mb-8 inline-flex items-center gap-2 text-sm text-accent hover:underline"><FiArrowLeft aria-hidden="true"/> Voltar aos projetos</Link>
 <p className="text-sm font-semibold uppercase tracking-widest text-accent">{p.role}</p><h1 className="h2 mt-3">{p.title}</h1><p className="mt-5 max-w-3xl text-lg text-white/70">{p.description}</p>
 <div className="relative mt-10 flex h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-[#27272c] sm:h-[460px]">{p.image?<Image src={p.image} alt={"Imagem do projeto "+p.title} fill sizes="(max-width:768px) 100vw,960px" className="object-contain"/>:<strong className="text-5xl text-accent">{p.title}</strong>}</div>
 <div className="mt-10 grid gap-6 md:grid-cols-2">
  <section className="site-card p-6"><h2 className="text-xl font-semibold">Visão geral</h2><p className="mt-3 leading-relaxed text-white/70">Projeto classificado como {p.role.toLowerCase()}. Explore o repositório para conferir implementação, organização do código, documentação e evolução do trabalho.</p></section>
  <section className="site-card p-6"><h2 className="text-xl font-semibold">Tecnologias utilizadas</h2><ul className="mt-4 flex flex-wrap gap-2">{p.stack.map(t=><li key={t} className="rounded-lg border border-white/15 px-3 py-2 text-sm">{t}</li>)}</ul></section>
 </div>
 {study&&<section aria-label="Estudo de caso" className="mt-8 grid gap-6 md:grid-cols-2">
   <div className="site-card p-6"><h2 className="text-xl font-bold">Problema abordado</h2><p className="mt-3 text-white/70">{study.challenge}</p><h2 className="mt-6 text-xl font-bold">Abordagem técnica</h2><p className="mt-3 text-white/70">{study.approach}</p></div>
   <div className="site-card p-6"><h2 className="text-xl font-bold">Destaques da implementação</h2><ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-white/70">{study.highlights.map(item=><li key={item}>{item}</li>)}</ul></div>
   <p className="text-sm leading-7 text-white/60 md:col-span-2"><strong className="text-accent">Escopo e limitações:</strong> {study.status}</p>
  </section>}
 <div className="mt-9 flex flex-wrap gap-3">
  <a href={p.github} target="_blank" rel="noopener noreferrer" className="site-link"><FiGithub aria-hidden="true"/> Ver código-fonte</a>
  {p.live&&<a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-accent px-6 py-3 text-accent hover:bg-accent hover:text-primary">Abrir demonstração <FiArrowUpRight aria-hidden="true"/></a>}
 </div>
 </main>
}
