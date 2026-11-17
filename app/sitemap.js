import {getPosts} from "@/lib/notion-blog.mjs";
export const dynamic = "force-dynamic";

import {projects} from "@/lib/projects.mjs"
const base="https://albericojr-portfolio-xi.vercel.app"
export default async function sitemap(){
 const paths=["/","/work","/services","/resume","/contact","/privacy","/blog",...(await getPosts()).map(p=>"/blog/"+p.slug),...projects.map(p=>"/work/"+p.slug)]
 return paths.map(path=>({url:base+path,changeFrequency:"monthly",priority:path==="/"?1:path.startsWith("/work/")?0.6:0.7}))
}
