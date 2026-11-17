import test from "node:test";
import assert from "node:assert/strict";
import {parseRow,uniquePosts,safeUrl,normalizeBlock,richText,blockText,getPosts,getArticle} from "../lib/notion-blog.mjs";
const rt=text=>[{plain_text:text}];
const row=(overrides={})=>({id:"page-1",properties:{Slug:{rich_text:rt("primeiro-artigo")},"Título":{title:rt("Primeiro artigo")},Categoria:{select:{name:"Engenharia de Software"}},"Data de publicação":{date:{start:"2020-01-01"}},Status:{select:{name:"Publicado"}},"Descrição":{rich_text:rt("Resumo")},...overrides}});
test("somente publicações válidas e não futuras",()=>{
 assert.equal(parseRow(row(),"2020-01-01").title,"Primeiro artigo");
 for(const status of ["Rascunho","Revisão"])assert.equal(parseRow(row({Status:{select:{name:status}}})),null);
 assert.equal(parseRow(row(),"2019-12-31"),null);
 assert.equal(parseRow(row({"Data de publicação":{date:{start:"2020-02-30"}}})),null);
 assert.equal(parseRow(row({Slug:{rich_text:rt("../privado")}})),null);
 assert.equal(parseRow({...row(),archived:true}),null);
 assert.equal(parseRow({...row(),in_trash:true}),null);
});
test("slugs duplicados não são publicados",()=>assert.deepEqual(uniquePosts([row(),{...row(),id:"page-2"}]),[]));
test("capa de arquivo tem prioridade e capa da página é alternativa",()=>{
 const photo={type:"external",external:{url:"https://example.com/photo.png"}};
 assert.equal(parseRow({...row(),cover:photo}).cover,photo.external.url);
 assert.equal(parseRow({...row({Capa:{files:[{type:"file",file:{url:"https://example.com/upload.png"}}]}}),cover:photo}).cover,"https://example.com/upload.png");
 assert.equal(parseRow(row()).cover,null);
});
test("links perigosos são ignorados",()=>{
 for(const url of ["javascript:alert(1)","data:text/html,x","https://user:password@example.com"])assert.equal(safeUrl(url),null);
 assert.equal(safeUrl("http://example.com",true),null);
 assert.equal(safeUrl("https://example.com",true),"https://example.com/");
});
test("formatação e blocos aninhados são preservados",()=>{
 const text=richText([{plain_text:"Exemplo",annotations:{bold:true,italic:true},href:"javascript:alert(1)"}]);
 assert.equal(text[0].bold,true);assert.equal(text[0].italic,true);assert.equal(text[0].href,null);
 const block=normalizeBlock({id:"p",type:"paragraph",paragraph:{rich_text:rt("Texto")}},[normalizeBlock({id:"c",type:"code",code:{rich_text:rt("const x = 1"),language:"javascript"}})]);
 assert.match(blockText([block]),/const x = 1/);
 const table=normalizeBlock({id:"r",type:"table_row",table_row:{cells:[rt("Valor")]}});
 assert.equal(table.cells[0][0].text,"Valor");
});
test("integração simulada: consulta paginada e busca apenas do artigo solicitado",async t=>{
 t.mock.method(globalThis,"fetch",async (url,opts)=>{
  assert.equal(opts.headers["Notion-Version"],"2025-09-03");
  if(url.includes("/query")){
   const body=JSON.parse(opts.body);assert.equal(body.filter.select.equals,"Publicado");
   return Response.json(body.start_cursor?{results:[row({Status:{select:{name:"Rascunho"}}})],has_more:false}:{results:[row()],has_more:true,next_cursor:"page2"});
  }
  assert.match(url,/blocks\/page-1\/children/);
  return Response.json({results:[{id:"h",type:"heading_2",heading_2:{rich_text:rt("Introdução")}}],has_more:false});
 });
 const old={token:process.env.NOTION_TOKEN,id:process.env.NOTION_DATA_SOURCE_ID};
 process.env.NOTION_TOKEN="test-only";process.env.NOTION_DATA_SOURCE_ID="00000000-0000-0000-0000-000000000001";
 try{const posts=await getPosts();assert.equal(posts.length,1);assert.equal((await getArticle("primeiro-artigo",posts)).blocks[0].type,"heading_2");assert.equal(await getArticle("privado",posts),null);}
 finally{for(const [key,value] of [["NOTION_TOKEN",old.token],["NOTION_DATA_SOURCE_ID",old.id]]){if(value===undefined)delete process.env[key];else process.env[key]=value;}}
});
