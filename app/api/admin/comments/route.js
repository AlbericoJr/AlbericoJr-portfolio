import {NextResponse} from "next/server";
import {isAdmin} from "@/lib/comments-auth.mjs";
import {enabledConfig,sameOrigin,validId} from "@/lib/comments-core.mjs";
import {getModerationQueue,moderateComment} from "@/lib/comments-store.mjs";

export const dynamic="force-dynamic";
export const runtime="nodejs";
const json=(data,status=200)=>NextResponse.json(data,{status,headers:{"Cache-Control":"no-store","X-Robots-Tag":"noindex"}});
export async function GET(request){
 if(!enabledConfig())return json({error:"Moderação indisponível"},503);
 if(!isAdmin(request))return json({error:"Acesso não autorizado"},401);
 try{return json(await getModerationQueue());}
 catch{return json({error:"Não foi possível listar os comentários"},503);}
}
export async function POST(request){
 if(!enabledConfig())return json({error:"Moderação indisponível"},503);
 if(!sameOrigin(request))return json({error:"Origem inválida"},403);
 if(!isAdmin(request))return json({error:"Acesso não autorizado"},401);
 if(Number(request.headers.get("content-length")||0)>1500)return json({error:"Dados inválidos"},413);
 let body;
 try{body=await request.json();}catch{return json({error:"Dados inválidos"},400);}
 if(!validId(body?.id)||!["approve","delete"].includes(body?.action))return json({error:"Operação inválida"},400);
 try{
  const ok=await moderateComment(body.id,body.action);
  return ok?json({ok:true}):json({error:"Comentário não encontrado ou já processado"},409);
 }catch{return json({error:"Não foi possível moderar o comentário"},503);}
}
