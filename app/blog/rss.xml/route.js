import {getPosts} from "@/lib/notion-blog.mjs";
export const dynamic = "force-dynamic";
import {blogName,siteUrl} from "@/lib/blog.mjs";
const escape=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[c]));
export async function GET(){const items=(await getPosts()).map(p=>{const url=escape(siteUrl+"/blog/"+p.slug);return "<item><title>"+escape(p.title)+"</title><link>"+url+"</link><guid>"+url+"</guid><description>"+escape(p.description)+"</description><pubDate>"+new Date(p.date).toUTCString()+"</pubDate></item>"}).join("");return new Response('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>'+escape(blogName)+'</title><link>'+siteUrl+'/blog</link><description>Artigos sobre tecnologia e desenvolvimento</description>'+items+'</channel></rss>',{headers:{"Content-Type":"application/rss+xml; charset=utf-8"}})}
