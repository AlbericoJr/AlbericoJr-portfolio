import {cache} from "react";
import {getArticle,getPosts,blockText} from "@/lib/notion-blog.mjs";
import BlogCode from "@/components/BlogCode";
import BlogCover from "@/components/BlogCover";
import BlogContent,{headings} from "@/components/BlogContent";
import {notFound} from "next/navigation";
import Link from "next/link";
import {readingTime,siteUrl} from "@/lib/blog.mjs";
export const dynamic="force-dynamic";
const postsForRequest=cache(getPosts);
const articleForRequest=cache(async slug=>getArticle(slug,await postsForRequest()));
export async function generateMetadata({params}){
 const {slug}=await params,p=await articleForRequest(slug);if(!p)return {title:"Artigo não encontrado",robots:{index:false,follow:false}};
 const url=siteUrl+"/blog/"+p.slug;
 return {title:p.title,description:p.description,alternates:{canonical:url},openGraph:{type:"article",title:p.title,description:p.description,url,publishedTime:p.date,authors:p.author?[p.author]:[],tags:p.tags||[],images:[{url:siteUrl+"/assets/albericojr.png",alt:"DevBlog"}]},twitter:{card:"summary_large_image",title:p.title,description:p.description,images:[siteUrl+"/assets/albericojr.png"]}};
}
export default async function Article({params}){
 const {slug}=await params,p=await articleForRequest(slug);if(!p)notFound();
 const url=siteUrl+"/blog/"+p.slug,related=(await postsForRequest()).filter(x=>x.slug!==p.slug).sort((a,b)=>Number(b.category===p.category)-Number(a.category===p.category)).slice(0,3);
 const sections=p.sections||[],toc=p.blocks?headings(p.blocks):sections.map((s,i)=>({id:"secao-"+i,text:s.heading}));
 const minutes=p.blocks?Math.max(1,Math.ceil(blockText(p.blocks).trim().split(/\s+/).length/200)):readingTime(p);
 return <main id="conteudo" className="site-shell py-12"><article className="mx-auto max-w-3xl"><Link prefetch={false} href="/blog" className="text-accent">← Todos os artigos</Link><p className="mt-8 text-accent">{p.category}</p><h1 className="h2 my-4 break-words">{p.title}</h1><p className="text-white/70">{p.description}</p><p className="my-5 text-sm text-white/60">{p.author&&<span>{p.author} · </span>}<time dateTime={p.date}>{p.date.split("-").reverse().join("/")}</time> · {minutes} min de leitura</p><BlogCover category={p.category} cover={p.cover} title={p.title}/><div className="my-4 flex flex-wrap gap-2">{(p.tags||[]).map(tag=><span key={tag} className="rounded border border-white/15 px-2 py-1 text-xs">#{tag}</span>)}</div>{toc.length>0&&<nav aria-label="Sumário" className="site-card my-8 space-y-2 p-5"><h2 className="font-bold">Sumário</h2>{toc.map(s=><a key={s.id} className="block break-words text-accent" href={"#"+s.id}>{s.text}</a>)}</nav>}<div className="my-8">{p.blocks?<BlogContent blocks={p.blocks}/>:sections.map((s,i)=><section className="my-8 scroll-mt-8" id={"secao-"+i} key={i}><h2 className="h3 mb-4">{s.heading}</h2><p className="whitespace-pre-wrap text-white/80">{s.text}</p>{s.code&&<BlogCode code={s.code}/>}</section>)}</div><div className="my-8 flex flex-wrap gap-4"><a className="text-accent" href={"https://www.linkedin.com/sharing/share-offsite/?url="+encodeURIComponent(url)} target="_blank" rel="noopener noreferrer">Compartilhar no LinkedIn</a><a className="text-accent" href={"https://wa.me/?text="+encodeURIComponent(p.title+" "+url)} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>{related.length>0&&<section className="space-y-3"><h2 className="h3">Artigos relacionados</h2>{related.map(x=><Link prefetch={false} className="site-card block p-4 hover:border-accent" key={x.slug} href={"/blog/"+x.slug}>{x.title}</Link>)}</section>}<Link href="/contact" className="site-link mt-8">Vamos conversar</Link></article></main>;
}
