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
 for(const id of ["upfit","granago","planejai","nova","gym"])assert.ok(projects.some(p=>p.slug===id&&p.featured))
})
