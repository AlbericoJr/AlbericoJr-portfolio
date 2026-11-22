import {NextResponse} from "next/server";
import {ADMIN_COOKIE,signSession,validAdminPassword} from "@/lib/comments-auth.mjs";
import {enabledConfig,sameOrigin} from "@/lib/comments-core.mjs";
import {allowRate,visitorKey} from "@/lib/comments-store.mjs";

export const runtime="nodejs";
export const dynamic="force-dynamic";

const json=(data,status=200)=>NextResponse.json(data,{status,headers:{"Cache-Control":"no-store"}});
export async function POST(request){
 if(!enabledConfig())return json({error:"Moderação indisponível"},503);
 if(!sameOrigin(request))return json({error:"Origem inválida"},403);
 if(Number(request.headers.get("content-length")||0)>3000)return json({error:"Dados inválidos"},413);
 try{
  const visitor=visitorKey(request);
  if(!await allowRate("admin-login:"+visitor,10,900))return json({error:"Muitas tentativas. Aguarde 15 minutos."},429);
  const body=await request.json();
  if(!validAdminPassword(body?.password))return json({error:"Acesso não autorizado"},401);
  const {token,maxAge}=signSession();
  const response=json({ok:true});
  response.cookies.set(ADMIN_COOKIE,token,{
   httpOnly:true,secure:process.env.NODE_ENV==="production",
   sameSite:"strict",path:"/api/admin/comments",maxAge
  });
  return response;
 }catch{return json({error:"Não foi possível autenticar"},503);}
}
export async function DELETE(request){
 if(!sameOrigin(request))return json({error:"Origem inválida"},403);
 const response=json({ok:true});
 response.cookies.set(ADMIN_COOKIE,"",{
  httpOnly:true,secure:process.env.NODE_ENV==="production",
  sameSite:"strict",path:"/api/admin/comments",maxAge:0
 });
 return response;
}
