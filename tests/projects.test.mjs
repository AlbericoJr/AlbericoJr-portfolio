import test from "node:test"
import assert from "node:assert/strict"
import {projects,categories} from "../lib/projects.mjs"

test("project slugs, titles and links are valid",()=>{
 assert.equal(projects.length>5,true)
 assert.equal(new Set(projects.map(p=>p.slug)).size,projects.length)
 for(const p of projects){
  assert.ok(p.title && p.description && p.category && p.github)
  assert.match(p.github,/^https:\/\/github\.com\/AlbericoJr\//)
  assert.ok(categories.includes(p.category))
  assert.ok(Array.isArray(p.stack) && p.stack.length>0)
 }
})
test("featured projects include key web and mobile examples",()=>{
 for(const id of ["upfit","granago","vice-city","nova","gym"])assert.ok(projects.some(p=>p.slug===id&&p.featured))
})

test("Vice City substitui Planej.ai com os links e imagem corretos",()=>{
 const p=projects.find(p=>p.slug==="vice-city")
 assert.equal(p.title,"Vice City After Hours")
 assert.equal(p.github,"https://github.com/AlbericoJr/Vice-city")
 assert.equal(p.live,"https://albericojr.github.io/Vice-city/")
 assert.equal(p.image,"/assets/work/vice-city.webp")
 assert.equal(projects.some(p=>p.slug==="planejai"),false)
})
