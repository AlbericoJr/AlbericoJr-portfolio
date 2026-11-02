"use client"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { CiMenuFries } from "react-icons/ci"
const links=[{name:"Início",path:"/"},{name:"Serviços",path:"/services"},{name:"Experiência",path:"/resume"},{name:"Projetos",path:"/work"},{name:"Contato",path:"/contact"}]
export default function MobileNav() {
  const pathname=usePathname()
  const [open,setOpen]=useState(false)
  return <Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger aria-label="Abrir menu de navegação" className="flex items-center justify-center rounded-md p-2 focus-visible:ring-2 focus-visible:ring-accent"><CiMenuFries aria-hidden="true" className="text-[32px] text-accent"/></SheetTrigger>
    <SheetContent className="flex flex-col">
      <SheetTitle className="mt-14 text-center text-2xl text-white">Albérico <span className="text-accent">Jr.</span></SheetTitle>
      <SheetDescription className="text-center text-white/60">Navegação do portfólio</SheetDescription>
      <nav aria-label="Navegação mobile" className="mt-10 flex flex-col items-center gap-7">
        {links.map(link=><Link key={link.path} onClick={()=>setOpen(false)} href={link.path} aria-current={pathname===link.path?"page":undefined} className={(pathname===link.path?"border-b-2 border-accent text-accent":"text-white")+" capitalize text-lg hover:text-accent"}>{link.name}</Link>)}
      </nav>
    </SheetContent>
  </Sheet>
}
