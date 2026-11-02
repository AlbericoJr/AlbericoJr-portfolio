"use client"
import Link from "next/link"
import {usePathname} from "next/navigation"
const links=[{name:"Início",path:"/"},{name:"Serviços",path:"/services"},{name:"Experiência",path:"/resume"},{name:"Projetos",path:"/work"},{name:"Contato",path:"/contact"}]
export default function Nav(){
 const pathname=usePathname()
 return <nav aria-label="Navegação principal" className="flex gap-7">{links.map(link=><Link key={link.path} href={link.path} aria-current={pathname===link.path?"page":undefined} className={(pathname===link.path?"border-b-2 border-accent text-accent":"text-white")+" font-medium transition-colors hover:text-accent"}>{link.name}</Link>)}</nav>
}
