import {randomUUID} from "node:crypto";
import {NextResponse} from "next/server";
import {getPosts} from "@/lib/notion-blog.mjs";
import {COMMENTS_MAX_LENGTH,enabledConfig,normalizeComment,sameOrigin,validSlug} from "@/lib/comments-core.mjs";
import {addPending,allowRate,getApproved,verifyTurnstile,visitorKey} from "@/lib/comments-store.mjs";

export const dynamic="force-dynamic";
export const runtime="nodejs";

function response(payload,status=200){
 return NextResponse.json(payload,{status,headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
}
async function published(slug){
 return (await getPosts()).some(p=>p.slug===slug);
}
export async function GET(request,{params}){
 const {slug}=await params;
 if(!validSlug(slug))return response({error:"Artigo inválido"},404);
 if(!enabledConfig())return response({error:"Comentários indisponíveis"},503);
 try{
  if(!await published(slug))return response({error:"Artigo não encontrado"},404);
  const raw=new URL(request.url).searchParams.get("page")||"0";
  if(!/^\d{1,3}$/.test(raw)||Number(raw)>100)return response({error:"Página inválida"},400);
  return response(await getApproved(slug,Number(raw)));
 }catch{return response({error:"Não foi possível carregar os comentários"},503);}
}
export async function POST(request,{params}){
 const {slug}=await params;
 if(!validSlug(slug))return response({error:"Artigo inválido"},404);
 if(!enabledConfig())return response({error:"Comentários indisponíveis"},503);
 if(!sameOrigin(request))return response({error:"Origem inválida"},403);
 if(!(request.headers.get("content-type")||"").includes("application/json"))return response({error:"Formato inválido"},415);
 if(Number(request.headers.get("content-length")||0)>6000)return response({error:"Mensagem muito longa"},413);
 let body;
 try{body=await request.json();}catch{return response({error:"Dados inválidos"},400);}
 if(!body||typeof body!=="object"||Array.isArray(body))return response({error:"Dados inválidos"},400);
 if(body.website)return response({message:"Comentário recebido para avaliação"},202);
 const text=normalizeComment(body.text);
 if(!text)return response({error:"Escreva entre 10 e "+COMMENTS_MAX_LENGTH+" caracteres"},400);
 try {
  if(!await published(slug))return response({error:"Artigo não encontrado"},404);
  const visitor=visitorKey(request);
  if(!await allowRate("comment-hour:"+visitor,5,3600)||!await allowRate("comment-minute:"+visitor,1,90)){
   return response({error:"Limite de envios atingido. Tente novamente mais tarde."},429);
  }
  if(!await verifyTurnstile(body.turnstile))return response({error:"Verificação de segurança não concluída. Tente novamente."},400);
  await addPending({id:randomUUID(),slug,text,createdAt:new Date().toISOString()});
  return response({message:"Comentário recebido! Ele será exibido após aprovação."},202);
 }catch{return response({error:"Não foi possível enviar o comentário. Tente novamente."},503);}
}
