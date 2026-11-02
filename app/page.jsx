import Link from "next/link"
import {FiArrowUpRight,FiDownload} from "react-icons/fi"
import Photo from "@/components/Photo"
import Socials from "@/components/Socials"
import Stats from "@/components/Stats"
export const metadata={alternates:{canonical:"/"}}
export default function Page(){
 return <main id="conteudo">
  <section className="site-shell grid min-h-[65vh] items-center gap-10 py-10 lg:grid-cols-[1.2fr_.8fr] lg:py-20">
    <div className="order-2 max-w-3xl text-center lg:order-1 lg:text-left">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-accent">Desenvolvedor Front-end & Mobile</p>
      <h1 className="h1 mb-6">Olá! Eu sou <span className="text-accent">Albérico Júnior.</span></h1>
      <p className="mb-8 max-w-[640px] text-base leading-relaxed text-white/70">Desenvolvo aplicações web e mobile com React, Next.js, TypeScript e React Native. Gosto de criar interfaces acessíveis, transformar ideias em produtos e resolver problemas com código.</p>
      <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
        <Link href="/work" className="site-link">Explorar projetos <FiArrowUpRight aria-hidden="true"/></Link>
        <Link href="/contact" className="inline-flex items-center rounded-xl border border-white/30 px-6 py-3 font-semibold transition-colors hover:border-accent hover:text-accent">Entrar em contato</Link>
        <a href="/Alb%C3%A9rico_Jr.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm text-white/75 hover:text-accent" aria-label="Abrir currículo em PDF">Currículo <FiDownload aria-hidden="true"/></a>
      </div>
      <div className="mt-8 flex justify-center lg:justify-start"><Socials containerStyles="flex gap-4" iconStyles="flex h-10 w-10 items-center justify-center rounded-full border border-accent text-accent transition-colors hover:bg-accent hover:text-primary"/></div>
    </div>
    <div className="order-1 mx-auto lg:order-2"><Photo/></div>
  </section>
  <Stats/>
 </main>
}
