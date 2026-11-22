import {createHash} from "node:crypto";
import {COMMENTS_KEY_PREFIX,COMMENTS_PAGE_SIZE,enabledConfig} from "./comments-core.mjs";

const k=key=>COMMENTS_KEY_PREFIX+":"+key;
const articleIndex=slug=>k("approved:"+slug);
const itemKey=id=>k("item:"+id);
const pendingKey=k("pending");
const approvedKey=k("all-approved");

function settings(){
 if(!enabledConfig())throw new Error("Comments storage unavailable");
 return {url:process.env.UPSTASH_REDIS_REST_URL.replace(/\/+$/,""),token:process.env.UPSTASH_REDIS_REST_TOKEN};
}
async function call(path,payload){
 const {url,token}=settings();
 const response=await fetch(url+path,{
  method:"POST",headers:{"Authorization":"Bearer "+token,"Content-Type":"application/json"},
  body:JSON.stringify(payload),cache:"no-store",signal:AbortSignal.timeout(8000)
 });
 if(!response.ok)throw new Error("Comments data unavailable");
 const body=await response.json();
 if(Array.isArray(body)){
  if(body.some(x=>x.error))throw new Error("Comments operation failed");
  return body.map(x=>x.result);
 }
 if(body.error)throw new Error("Comments operation failed");
 return body.result;
}
const redis=(...args)=>call("",args);
const transaction=commands=>call("/multi-exec",commands);

function decode(value){
 try{const obj=JSON.parse(value);return obj&&typeof obj.id==="string"?obj:null;}catch{return null;}
}
async function records(ids){
 if(!ids.length)return [];
 const values=await redis("MGET",...ids.map(itemKey));
 if(!Array.isArray(values))throw new Error("Comments data malformed");
 return values.map(decode).filter(Boolean);
}
export async function getApproved(slug,page=0){
 const start=page*COMMENTS_PAGE_SIZE;
 const ids=await redis("ZREVRANGE",articleIndex(slug),start,start+COMMENTS_PAGE_SIZE);
 const data=await records(ids.slice(0,COMMENTS_PAGE_SIZE));
 return {comments:data.filter(x=>x.status==="approved"&&x.slug===slug).map(({id,text,createdAt})=>({id,text,createdAt})),
  hasMore:ids.length>COMMENTS_PAGE_SIZE};
}
export async function addPending({id,slug,text,createdAt}){
 const record={id,slug,text,createdAt,status:"pending"};
 await transaction([["SET",itemKey(id),JSON.stringify(record)],["ZADD",pendingKey,Date.parse(createdAt),id]]);
}
export async function getModerationQueue(){
 const [pendingIds,approvedIds]=await Promise.all([
  redis("ZREVRANGE",pendingKey,0,99),redis("ZREVRANGE",approvedKey,0,99)
 ]);
 const [pending,approved]=await Promise.all([records(pendingIds),records(approvedIds)]);
 return {pending:pending.filter(x=>x.status==="pending"),approved:approved.filter(x=>x.status==="approved")};
}
export async function moderateComment(id,action){
 const raw=await redis("GET",itemKey(id));
 const value=decode(raw);
 if(!value)return false;
 if(action==="approve"&&value.status==="pending"){
  const updated={...value,status:"approved"};
  await transaction([
   ["SET",itemKey(id),JSON.stringify(updated)],["ZREM",pendingKey,id],
   ["ZADD",articleIndex(value.slug),Date.parse(value.createdAt),id],
   ["ZADD",approvedKey,Date.parse(value.createdAt),id]
  ]);
  return true;
 }
 if(action==="delete"){
  await transaction([
   ["DEL",itemKey(id)],["ZREM",pendingKey,id],
   ["ZREM",articleIndex(value.slug),id],["ZREM",approvedKey,id]
  ]);
  return true;
 }
 return false;
}
export function visitorKey(request){
 const ip=(request.headers.get("x-vercel-forwarded-for")||request.headers.get("x-forwarded-for")||"unknown").split(",")[0].trim().slice(0,90);
 return createHash("sha256").update(process.env.COMMENTS_ADMIN_SECRET||"").update(":").update(ip).digest("hex").slice(0,40);
}
export async function allowRate(key,limit,ttl){
 const script="local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],tonumber(ARGV[1])) end; return n";
 const count=await redis("EVAL",script,1,k("rate:"+key),ttl);
 return typeof count==="number"&&count<=limit;
}
export async function verifyTurnstile(response){
 if(typeof response!=="string"||!response||response.length>3000)return false;
 const body=new URLSearchParams({secret:process.env.TURNSTILE_SECRET_KEY,response});
 const result=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
  method:"POST",body,cache:"no-store",signal:AbortSignal.timeout(8000)
 });
 if(!result.ok)return false;
 const data=await result.json();
 return data.success===true;
}
