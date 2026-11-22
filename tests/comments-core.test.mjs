import test from "node:test";
import assert from "node:assert/strict";
import {validSlug,validId,normalizeComment,enabledConfig,sameOrigin,COMMENTS_MAX_LENGTH} from "../lib/comments-core.mjs";
import {signSession,validSession,validAdminPassword} from "../lib/comments-auth.mjs";

test("validar slug e id sem aceitar rotas arbitrárias",()=>{
 assert.equal(validSlug("react-typescript"),true);
 for(const slug of ["../admin","x/y","","A-Z","hi ".repeat(60)])assert.equal(validSlug(slug),false);
 assert.equal(validId("12345678-1234-1234-1234-123456789abc"),true);
 assert.equal(validId("../1"),false);
});
test("comentários permitem apenas textos do tamanho correto",()=>{
 assert.equal(normalizeComment("  Excelente artigo!  "),"Excelente artigo!");
 assert.equal(normalizeComment("curto"),null);
 assert.equal(normalizeComment("a".repeat(COMMENTS_MAX_LENGTH+1)),null);
 assert.equal(normalizeComment("<script>teste</script>"),"<script>teste</script>");
 assert.equal(normalizeComment("Olá\u0000 mundo!!!"),null);
 assert.equal(normalizeComment({text:"foo"}),null);
});
test("recurso só liga após receber credenciais completas e opt-in",()=>{
 const config={COMMENTS_ENABLED:"true",UPSTASH_REDIS_REST_URL:"https://example.upstash.io",UPSTASH_REDIS_REST_TOKEN:"token",NEXT_PUBLIC_TURNSTILE_SITE_KEY:"site",TURNSTILE_SECRET_KEY:"secret",COMMENTS_ADMIN_SECRET:"a".repeat(32)};
 assert.equal(enabledConfig(config),true);
 assert.equal(enabledConfig({...config,COMMENTS_ENABLED:"false"}),false);
 assert.equal(enabledConfig({...config,UPSTASH_REDIS_REST_URL:"http://example.com"}),false);
 assert.equal(enabledConfig({...config,TURNSTILE_SECRET_KEY:""}),false);
 assert.equal(enabledConfig({...config,COMMENTS_ADMIN_SECRET:"short"}),false);
});
test("origem de escrita precisa coincidir com o site",()=>{
 const request=(origin,url="https://site.com/api/blog/comments/post")=>({url,headers:new Headers(origin?{origin}:{})});
 assert.equal(sameOrigin(request("https://site.com")),true);
 assert.equal(sameOrigin(request("https://other.com")),false);
 assert.equal(sameOrigin(request(null)),false);
 assert.equal(sameOrigin(request("http://site.com")),false);
 assert.equal(sameOrigin(request("http://localhost:3000","http://localhost:3000/api/comments")),true);
});
test("senha e cookie de moderação expiram e dependem do segredo",()=>{
 const secret="segredo-grande-de-producao-".repeat(2),now=Date.UTC(2026,10,22);
 const session=signSession(secret,now);
 assert.equal(validAdminPassword(secret,secret),true);
 assert.equal(validAdminPassword("errada",secret),false);
 assert.equal(validSession(session.token,secret,now),true);
 assert.equal(validSession(session.token,secret,now+6*60*60*1000+1000),false);
 assert.equal(validSession(session.token,"outro-segredo-comprido-de-seguranca",now),false);
 assert.equal(validSession(session.token+"x",secret,now),false);
});
