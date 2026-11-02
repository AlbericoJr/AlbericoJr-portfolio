import {projects} from "@/lib/projects.mjs"
const base="https://albericojr-portfolio-xi.vercel.app"
export default function sitemap(){
 const paths=["/","/work","/services","/resume","/contact","/privacy",...projects.map(p=>"/work/"+p.slug)]
 return paths.map(path=>({url:base+path,changeFrequency:"monthly",priority:path==="/"?1:path.startsWith("/work/")?0.6:0.7}))
}
