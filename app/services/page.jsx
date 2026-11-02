import Link from "next/link"
import {FiArrowUpRight,FiCode,FiSmartphone,FiLayout,FiTool} from "react-icons/fi"
export const metadata={title:"Serviços",description:"Desenvolvimento de websites, interfaces e aplicações mobile com React e React Native.",alternates:{canonical:"/services"}}
const services=[
 {Icon:FiCode,title:"Desenvolvimento web",description:"Landing pages, portfólios e websites responsivos com foco em organização, desempenho e comunicação da sua marca."},
 {Icon:FiLayout,title:"Interfaces e UX/UI",description:"Planejamento e implementação de interfaces claras, acessíveis e adaptadas a diferentes telas."},
 {Icon:FiSmartphone,title:"Aplicações mobile",description:"Protótipos e aplicações com React Native e Expo, com navegação e integração a serviços."},
 {Icon:FiTool,title:"Evolução e manutenção",description:"Melhorias de páginas existentes, ajustes de interface e manutenção conforme o escopo."}
]
export default function ServicesPage(){return <main id="conteudo" className="site-shell min-h-[70vh] py-14 sm:py-20">
 <p className="text-sm font-semibold uppercase tracking-widest text-accent">O que posso desenvolver</p><h1 className="h2 mt-3">Serviços e soluções</h1><p className="mt-4 max-w-3xl text-white/70">Do conceito à implementação, priorizo experiências úteis e comunicação clara sobre o que será entregue.</p>
 <div className="mt-12 grid gap-6 md:grid-cols-2">{services.map(({Icon,title,description},i)=><article key={title} className="site-card p-7">
 <div className="flex items-center justify-between"><Icon aria-hidden="true" className="text-3xl text-accent"/><span className="text-sm text-white/45">{String(i+1).padStart(2,"0")}</span></div>
 <h2 className="mt-6 text-2xl font-bold">{title}</h2><p className="mt-3 text-white/65">{description}</p>
 <Link prefetch={false} href={"/contact?assunto="+encodeURIComponent(title)} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">Conversar sobre este serviço <FiArrowUpRight aria-hidden="true"/></Link></article>)}</div>
 </main>}
