import Link from "next/link"
import {FiArrowUpRight,FiBriefcase,FiBookOpen,FiCode} from "react-icons/fi"
export const metadata={title:"Experiência e formação",description:"Conheça a trajetória profissional, formação e tecnologias de Albérico Júnior.",alternates:{canonical:"/resume"}}

const experience=[
 {place:"UNINASSAU",position:"Assistente de EAD",period:"Desde dez. 2025"},
 {place:"Atesteme",position:"Desenvolvedor Front-end · Prestação de serviços",period:"Out. – dez. 2024"},
 {place:"G.Bombons",position:"Vendedor",period:"2014 – 2022"},
 {place:"Contax",position:"Atendimento",period:"2011 – 2013"},
]
const education=[
 {place:"UNIFG",course:"Bacharelado em Sistemas de Informação",period:"Em andamento"},
 {place:"Secretaria de Educação de Pernambuco",course:"Formação técnica em desenvolvimento de sistemas",period:"2019 – 2021"},
 {place:"UNIBRA",course:"Gestão de Recursos Humanos",period:"2011 – 2013"},
]
const stacks={
 "Front-end":["HTML","CSS","JavaScript","TypeScript","React","Next.js","Tailwind CSS"],
 "Mobile":["React Native","Expo"],
 "Back-end e dados":["Node.js","Express","MongoDB"],
 "Ferramentas":["Git","GitHub","Figma","Vite"]
}
export default function Resume(){
return <main id="conteudo" className="site-shell py-14 sm:py-20">
 <p className="text-sm font-semibold uppercase tracking-widest text-accent">Minha trajetória</p>
 <h1 className="h2 mt-3">Experiência, formação e competências</h1>
 <p className="mt-5 max-w-3xl text-white/70">Sou desenvolvedor focado em Front-end e Mobile e estudo Sistemas de Informação. Minha formação em Gestão de Recursos Humanos complementa habilidades de comunicação e colaboração.</p>
 <div className="mt-12 grid gap-10 lg:grid-cols-2">
   <section aria-labelledby="exp-title"><h2 id="exp-title" className="mb-6 flex items-center gap-3 text-2xl font-bold"><FiBriefcase className="text-accent"/> Experiência profissional</h2>
   <ol className="space-y-4">{experience.map(item=><li key={item.place+item.period} className="site-card p-5"><span className="text-xs text-accent">{item.period}</span><h3 className="mt-2 text-lg font-bold">{item.position}</h3><p className="mt-1 text-white/60">{item.place}</p></li>)}</ol></section>
   <section aria-labelledby="edu-title"><h2 id="edu-title" className="mb-6 flex items-center gap-3 text-2xl font-bold"><FiBookOpen className="text-accent"/> Formação</h2>
   <ol className="space-y-4">{education.map(item=><li key={item.place} className="site-card p-5"><span className="text-xs text-accent">{item.period}</span><h3 className="mt-2 text-lg font-bold">{item.course}</h3><p className="mt-1 text-white/60">{item.place}</p></li>)}</ol></section>
 </div>
 <section aria-labelledby="stack-title" className="mt-16"><h2 id="stack-title" className="flex items-center gap-3 text-2xl font-bold"><FiCode className="text-accent"/> Tecnologias e ferramentas</h2><p className="mt-3 text-sm text-white/55">Experiência em projetos e estudos; os níveis de domínio variam por ferramenta.</p>
  <div className="mt-6 grid gap-5 md:grid-cols-2">{Object.entries(stacks).map(([group,items])=><div key={group} className="site-card p-6"><h3 className="mb-4 text-lg font-semibold">{group}</h3><ul className="flex flex-wrap gap-2">{items.map(item=><li key={item} className="rounded-lg border border-white/15 bg-primary px-3 py-2 text-sm">{item}</li>)}</ul></div>)}</div>
 </section>
 <div className="mt-12 flex flex-wrap gap-3"><Link prefetch={false} href="/work" className="site-link">Conhecer meus projetos <FiArrowUpRight/></Link><Link prefetch={false} href="/contact" className="inline-flex items-center rounded-xl border border-white/25 px-6 py-3 hover:border-accent hover:text-accent">Entrar em contato</Link></div>
</main>}
