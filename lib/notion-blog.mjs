import {categories,publishedPosts} from "./blog.mjs";
const plain=a=>(a||[]).map(x=>x.plain_text||"").join("");
async function request(path,body){
 const response=await fetch("https://api.notion.com/v1/"+path,{method:body?"POST":"GET",headers:{Authorization:"Bearer "+process.env.NOTION_TOKEN,"Notion-Version":"2025-09-03","Content-Type":"application/json"},...(body?{body:JSON.stringify(body)}:{}),cache:"no-store"});
 if(!response.ok)throw new Error("Notion CMS unavailable: "+response.status);
 return response.json();
}
async function paginate(path,body){
 const items=[];let cursor;
 do{const data=await request(body?path:path+"?page_size=100"+(cursor?"&start_cursor="+encodeURIComponent(cursor):""),body?{...body,page_size:100,...(cursor?{start_cursor:cursor}:{})}:undefined);items.push(...data.results);cursor=data.has_more?data.next_cursor:null;}while(cursor);
 return items;
}
export async function getPosts(){
 if(!process.env.NOTION_TOKEN||!process.env.NOTION_DATA_SOURCE_ID)return publishedPosts();
 const rows=await paginate("data_sources/"+process.env.NOTION_DATA_SOURCE_ID+"/query",{filter:{property:"Status",select:{equals:"Publicado"}}});
 const posts=[];
 for(const row of rows){const p=row.properties;const slug=plain(p.Slug?.rich_text),title=plain(p["Título"]?.title),category=p.Categoria?.select?.name,date=p["Data de publicação"]?.date?.start?.slice(0,10);
 if(!/^[a-z0-9-]+$/.test(slug)||!title||!categories.includes(category)||!date||date>new Date().toISOString().slice(0,10))continue;
 const blocks=await paginate("blocks/"+row.id+"/children");const sections=[];let current={heading:"Introdução",text:""};
 for(const b of blocks){const value=plain(b[b.type]?.rich_text);if(/^heading_[123]$/.test(b.type)){if(current.text||current.code)sections.push(current);current={heading:value,text:""};}else if(b.type==="code"){if(current.code){sections.push(current);current={heading:"Exemplo de código",text:""};}current.code=value;}else if(["paragraph","bulleted_list_item","numbered_list_item","quote"].includes(b.type)){current.text+=(current.text?"\n":"")+(b.type==="bulleted_list_item"?"• ":"")+value;}}
 if(current.text||current.code)sections.push(current);
 if(sections.length)posts.push({slug,title,category,date,description:plain(p["Descrição"]?.rich_text),author:plain(p.Autor?.rich_text),featured:p.Destaque?.checkbox===true,sections,published:true});
 }
 const counts=new Map();for(const p of posts)counts.set(p.slug,(counts.get(p.slug)||0)+1);
 return posts.filter(p=>counts.get(p.slug)===1).sort((a,b)=>b.date.localeCompare(a.date));
}
