import {publishedPosts} from "./blog.mjs";
export const plain = a => (a || []).map(x => x.plain_text || x.text?.content || "").join("");
export function safeUrl(value, image=false) {
  try { const url=new URL(value); return (image ? url.protocol==="https:" : ["https:","http:","mailto:"].includes(url.protocol)) && !url.username && !url.password ? url.href : null; } catch { return null; }
}
const fileUrl = file => safeUrl(file?.[file?.type]?.url,true);
export function parseRow(row, today=new Intl.DateTimeFormat("sv-SE",{timeZone:"America/Recife"}).format(new Date())) {
  const p=row.properties || {};
  const slug=plain(p.Slug?.rich_text), title=plain(p["Título"]?.title), category=p.Categoria?.select?.name;
  const date=p["Data de publicação"]?.date?.start?.slice(0,10);
  if(row.archived || row.in_trash || p.Status?.select?.name!=="Publicado" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length>120 || !title.trim() || !category || !/^\d{4}-\d{2}-\d{2}$/.test(date||"") || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0,10)!==date || date>today) return null;
  return {id:row.id,slug,title,category,date,description:plain(p["Descrição"]?.rich_text),author:plain(p.Autor?.rich_text),cover:fileUrl(p.Capa?.files?.[0])||fileUrl(row.cover),tags:(p.Tags?.multi_select||[]).map(t=>t.name),featured:p.Destaque?.checkbox===true,published:true};
}
export function uniquePosts(rows) {
  const posts=rows.map(r=>parseRow(r)).filter(Boolean), counts=new Map();
  for(const p of posts) counts.set(p.slug,(counts.get(p.slug)||0)+1);
  return posts.filter(p=>counts.get(p.slug)===1).sort((a,b)=>b.date.localeCompare(a.date));
}
export function richText(items) {
 return (items||[]).map(x=>({text:x.plain_text||x.text?.content||"",href:safeUrl(x.href||x.text?.link?.url),bold:!!x.annotations?.bold,italic:!!x.annotations?.italic,underline:!!x.annotations?.underline,strikethrough:!!x.annotations?.strikethrough,code:!!x.annotations?.code}));
}
export function normalizeBlock(b, children=[]) {
 const v=b[b.type]||{};
 const base={id:b.id,type:b.type,text:richText(v.rich_text),children};
 switch(b.type){
 case "image":return {...base,url:fileUrl(v),caption:richText(v.caption)};
 case "code":return {...base,code:plain(v.rich_text),language:v.language||"plain text",caption:richText(v.caption)};
 case "table":return {...base,header:!!v.has_column_header,rowHeader:!!v.has_row_header};
 case "table_row":return {...base,cells:(v.cells||[]).map(richText)};
 case "bookmark":return {...base,url:safeUrl(v.url),caption:richText(v.caption)};
 case "paragraph":case "heading_1":case "heading_2":case "heading_3":case "bulleted_list_item":case "numbered_list_item":case "quote":case "callout":case "toggle":case "divider":case "to_do":return {...base,checked:!!v.checked};
 default:return null;
 }
}
function config(){if(typeof window!=="undefined")throw new Error("Server only");
 const token=process.env.NOTION_TOKEN?.trim(),id=process.env.NOTION_DATA_SOURCE_ID?.trim();
 if(!token&&!id)return null;
 if(!token||!id||! /^(?:[0-9a-f]{32}|[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})$/i.test(id)) throw new Error("CMS configuration incomplete");
 return {token,id};
}
async function request(path,body){
 const {token}=config();
 for(let attempt=0;attempt<2;attempt++){
  const response=await fetch("https://api.notion.com/v1/"+path,{method:body?"POST":"GET",headers:{Authorization:"Bearer "+token,"Notion-Version":"2025-09-03","Content-Type":"application/json"},...(body?{body:JSON.stringify(body)}:{}),cache:"no-store",signal:AbortSignal.timeout(8000)});
  if(response.ok)return response.json();
  if(attempt===0&&(response.status===429||response.status>=500)){const delay=Math.min(2000,Math.max(300,Number(response.headers.get("retry-after")||0)*1000));await new Promise(r=>setTimeout(r,delay));continue;}
  throw new Error("CMS temporarily unavailable ("+response.status+")");
 }
}
async function paginate(path,body){
 const items=[];let cursor=null;const seen=new Set();
 do {const data=await request(body?path:path+"?page_size=100"+(cursor?"&start_cursor="+encodeURIComponent(cursor):""),body?{...body,page_size:100,...(cursor?{start_cursor:cursor}:{})}:undefined);
 if(!Array.isArray(data.results)||(data.has_more&&!data.next_cursor))throw new Error("CMS pagination invalid");
 items.push(...data.results);cursor=data.has_more?data.next_cursor:null;
 if(cursor&&seen.has(cursor))throw new Error("CMS pagination invalid");seen.add(cursor);
 if(seen.size>100)throw new Error("CMS pagination limit");
 }while(cursor);
 return items;
}
export async function getPosts(){
 const cfg=config();if(!cfg)return publishedPosts();
 const rows=await paginate("data_sources/"+cfg.id+"/query",{filter:{property:"Status",select:{equals:"Publicado"}}});
 return uniquePosts(rows);
}
async function getBlocks(id,depth=0){
 if(depth>8)throw new Error("CMS nesting limit");
 const rows=await paginate("blocks/"+id+"/children"),out=[];
 for(const b of rows){if(!normalizeBlock(b))continue;
 const normalized=normalizeBlock(b,b.has_children?await getBlocks(b.id,depth+1):[]);
 out.push(normalized);
 }return out;
}
export async function getArticle(slug,posts){
 const post=(posts||await getPosts()).find(p=>p.slug===slug);
 if(!post)return null;
 if(!config())return post;
 return {...post,blocks:await getBlocks(post.id)};
}
export function blockText(blocks){return (blocks||[]).map(b=>[...(b.text||[]).map(t=>t.text),b.code||"",...(b.cells||[]).flat().map(t=>t.text),blockText(b.children)].join(" ")).join(" ");}
