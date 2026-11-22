import test from "node:test";
import assert from "node:assert/strict";
import {allowRate,addPending,getApproved,getModerationQueue,moderateComment} from "../lib/comments-store.mjs";

const env={
 COMMENTS_ENABLED:"true",UPSTASH_REDIS_REST_URL:"https://redis.example.com",UPSTASH_REDIS_REST_TOKEN:"fake-test-token",
 NEXT_PUBLIC_TURNSTILE_SITE_KEY:"test-site-key",TURNSTILE_SECRET_KEY:"test-secret-key",
 COMMENTS_ADMIN_SECRET:"a".repeat(32)
};
function withEnv(values,fn){
 const old=Object.fromEntries(Object.keys(values).map(k=>[k,process.env[k]]));
 Object.assign(process.env,values);
 return Promise.resolve().then(fn).finally(()=>{for(const [key,value] of Object.entries(old)){if(value===undefined)delete process.env[key];else process.env[key]=value;}});
}
test("grava mensagem pendente sem publicá-la automaticamente",async t=>withEnv(env,async()=>{
 let commands;
 t.mock.method(globalThis,"fetch",async(url,opts)=>{
  assert.match(url,/\/multi-exec$/);
  assert.equal(opts.headers.Authorization,"Bearer fake-test-token");
  commands=JSON.parse(opts.body);
  return Response.json([{result:"OK"},{result:1}]);
 });
 await addPending({id:"12345678-1234-1234-1234-123456789abc",slug:"meu-artigo",text:"Comentário de exemplo",createdAt:"2026-11-22T15:00:00.000Z"});
 assert.equal(commands[0][0],"SET");assert.match(commands[0][2],/"status":"pending"/);
 assert.equal(commands[1][0],"ZADD");assert.match(commands[1][1],/pending$/);
}));
test("lista pública filtra comentários não aprovados",async t=>withEnv(env,async()=>{
 let calls=0;
 t.mock.method(globalThis,"fetch",async(_url,opts)=>{
  const command=JSON.parse(opts.body);calls++;
  if(command[0]==="ZREVRANGE")return Response.json({result:["id1","id2"]});
  return Response.json({result:[
   JSON.stringify({id:"id1",slug:"meu-artigo",status:"approved",text:"Texto público",createdAt:"2026-11-22T15:00:00Z"}),
   JSON.stringify({id:"id2",slug:"meu-artigo",status:"pending",text:"Privado",createdAt:"2026-11-22T15:00:00Z"})
  ]});
 });
 const data=await getApproved("meu-artigo");
 assert.equal(calls,2);assert.deepEqual(data.comments.map(x=>x.text),["Texto público"]);
 assert.equal(data.hasMore,false);
}));
test("aprovação transfere item da fila pendente para índices públicos",async t=>withEnv(env,async()=>{
 const captured=[];
 t.mock.method(globalThis,"fetch",async(url,opts)=>{
  const body=JSON.parse(opts.body);captured.push({url,body});
  if(Array.isArray(body)&&body[0]==="GET")return Response.json({result:JSON.stringify({id:"123",slug:"teste",status:"pending",text:"Texto",createdAt:"2026-11-22T15:00:00.000Z"})});
  return Response.json(body.map(()=>({result:1})));
 });
 assert.equal(await moderateComment("123","approve"),true);
 assert.deepEqual(captured[1].body.map(x=>x[0]),["SET","ZREM","ZADD","ZADD"]);
}));
test("limite de envios usa contador remoto",async t=>withEnv(env,async()=>{
 t.mock.method(globalThis,"fetch",async(_url,opts)=>{
  const cmd=JSON.parse(opts.body);assert.equal(cmd[0],"EVAL");
  return Response.json({result:2});
 });
 assert.equal(await allowRate("visitante",1,90),false);
 assert.equal(await allowRate("visitante",3,90),true);
}));
