"use client";
import Link from "next/link";
export default function BlogError({reset}){return <main id="conteudo" className="site-shell py-20"><div className="site-card mx-auto max-w-xl p-8"><h1 className="h3">DevBlog temporariamente indisponível</h1><p className="my-4 text-white/70">Não foi possível carregar os artigos. Tente novamente em instantes.</p><button onClick={()=>reset()} className="site-link">Tentar novamente</button><Link href="/" className="ml-4 text-accent">Voltar ao portfólio</Link></div></main>}
