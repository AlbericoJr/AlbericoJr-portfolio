import test from "node:test";
import assert from "node:assert/strict";
import {isGiscusConfigured} from "../lib/giscus-config.mjs";

test("comentários só são ativados quando a categoria e o ID são válidos",()=>{
 assert.equal(isGiscusConfigured("Comentários","DIC_kwDOG1L2fM4B-hVS"),true);
 for(const [category,id] of [[undefined,undefined],["", "DIC_abc"],["Comentários",undefined],["Comentários","cat"],["Comentários",""],["Comentários","DIC_%"],["x".repeat(101),"DIC_abc"]]){
  assert.equal(isGiscusConfigured(category,id),false);
 }
});
