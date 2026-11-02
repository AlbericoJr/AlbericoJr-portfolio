"use client"
import {useState,Suspense} from "react"
import {useSearchParams} from "next/navigation"
import Link from "next/link"
import {FaEnvelope,FaMapMarkedAlt} from "react-icons/fa"
const endpoint="https://formspree.io/f/mdknzqra"
function ContactForm(){
 const search=useSearchParams()
 const [status,setStatus]=useState({kind:"idle",message:""})
 async function submit(event){
  event.preventDefault()
  const form=event.currentTarget
  if(!form.reportValidity())return
  setStatus({kind:"loading",message:"Enviando sua mensagem..."})
  try{
   const response=await fetch(endpoint,{method:"POST",body:new FormData(form),headers:{Accept:"application/json"}})
   if(!response.ok)throw new Error("Erro no envio")
   form.reset()
   setStatus({kind:"success",message:"Mensagem enviada! Obrigado pelo contato."})
  }catch{setStatus({kind:"error",message:"Não foi possível enviar agora. Envie diretamente para alberico14@live.com."})}
 }
 const field="mt-2 w-full rounded-lg border border-white/15 bg-primary px-4 py-3 text-white placeholder:text-white/40 focus:border-accent"
 return <form onSubmit={submit} className="site-card space-y-5 p-6 sm:p-9">
  <h2 className="text-2xl font-bold text-accent">Vamos conversar?</h2><p className="text-sm text-white/70">Conte o que você precisa. Responderei pelo e-mail informado.</p>
  <div className="grid gap-5 sm:grid-cols-2">
   <label className="block text-sm font-medium">Nome *<input name="name" autoComplete="name" required maxLength={100} className={field} placeholder="Como posso chamar você?"/></label>
   <label className="block text-sm font-medium">E-mail *<input type="email" name="email" autoComplete="email" required maxLength={180} className={field} placeholder="seu@email.com"/></label>
  </div>
  <label className="block text-sm font-medium">Telefone (opcional)<input type="tel" name="phone" autoComplete="tel" maxLength={24} className={field} placeholder="DDD + número"/></label>
  <label className="block text-sm font-medium">Assunto *<input key={search.get("assunto")||""} name="subject" required maxLength={120} defaultValue={search.get("assunto")||""} className={field} placeholder="Sobre o que vamos conversar?"/></label>
  <label className="block text-sm font-medium">Mensagem *<textarea name="message" required minLength={10} maxLength={2500} rows={6} className={field+" resize-y"} placeholder="Explique brevemente sua ideia, necessidade ou dúvida."/></label>
  <div className="hidden" aria-hidden="true"><label>Não preencha<input tabIndex={-1} autoComplete="off" name="_gotcha"/></label></div>
  <p className="text-xs leading-6 text-white/50">Ao enviar, seus dados são processados pelo Formspree para viabilizar a resposta. Não envie senhas nem informações sensíveis. <Link href="/privacy" className="underline hover:text-accent">Como os dados são utilizados</Link>.</p>
  <button type="submit" disabled={status.kind==="loading"} className="site-link w-full disabled:cursor-wait disabled:opacity-60">{status.kind==="loading"?"Enviando...":"Enviar mensagem"}</button>
  <p className={(status.kind==="error"?"text-red-300":"text-accent")+" min-h-5 text-sm"} role="status" aria-live="polite">{status.message}</p>
 </form>
}
export default function Contact(){return <main id="conteudo" className="site-shell py-14 sm:py-20"><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
 <section><p className="text-sm font-semibold uppercase tracking-widest text-accent">Contato</p><h1 className="h2 mt-4">Vamos criar algo juntos?</h1><p className="mt-6 text-white/65">Projetos, oportunidades profissionais e colaborações. Entre em contato para conversarmos sobre sua ideia.</p>
 <div className="mt-10 space-y-6"><a className="flex items-center gap-4 text-white/80 hover:text-accent" href="mailto:alberico14@live.com"><FaEnvelope className="text-accent" aria-hidden="true"/> alberico14@live.com</a><p className="flex items-center gap-4 text-white/70"><FaMapMarkedAlt className="text-accent" aria-hidden="true"/> Pernambuco, Brasil</p></div></section>
 <Suspense fallback={<p className="text-white/60">Carregando formulário...</p>}><ContactForm/></Suspense>
 </div></main>}
