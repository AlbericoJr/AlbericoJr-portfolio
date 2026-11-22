const {test, expect} = require("@playwright/test")
const pages=[
 {url:"/",title:/Albérico Júnior/i},
 {url:"/services",title:/Serviços e soluções/i},
 {url:"/resume",title:/Experiência, formação e competências/i},
 {url:"/work",title:/Projetos e experiências/i},
 {url:"/contact",title:/Vamos criar algo juntos/i},
 {url:"/work/vice-city",title:/Vice City After Hours/i}
]
test("rotas, headings, idioma, viewport e screenshots",async({page},testInfo)=>{
 const errors=[]
 page.on("pageerror",e=>errors.push(e.message))
 for(const p of pages){
  const resp=await page.goto(p.url,{waitUntil:"domcontentloaded"})
  expect(resp.status(),p.url).toBeLessThan(400)
  await expect(page.locator("main#conteudo")).toBeVisible()
  await expect(page.getByRole("heading",{level:1})).toContainText(p.title)
  expect(await page.locator("html").getAttribute("lang")).toBe("pt-BR")
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth),p.url).toBeLessThanOrEqual(2)
 }
 expect(errors).toEqual([])
 await page.goto("/")
 await page.screenshot({path:testInfo.outputPath("home.png"),fullPage:true,animations:"disabled"})
})
test("filtros e páginas de detalhes dos projetos",async({page})=>{
 await page.goto("/work")
 await page.getByRole("button",{name:"Mobile"}).click()
 await expect(page.getByRole("heading",{name:"UpFit"})).toBeVisible()
 await expect(page.getByRole("heading",{name:"Nova"})).toHaveCount(0)
 await page.getByRole("button",{name:"Web",exact:true}).click()
 await expect(page.getByRole("heading",{name:"Vice City After Hours"})).toBeVisible()
 await page.getByRole("link",{name:/Ver detalhes do projeto Vice City After Hours/}).click()
 await expect(page).toHaveURL(/\/work\/vice-city$/)
 await expect(page.getByRole("link",{name:/Ver código-fonte/})).toHaveAttribute("href","https://github.com/AlbericoJr/Vice-city")
 await expect(page.getByRole("link",{name:/Abrir demonstração/})).toHaveAttribute("href","https://albericojr.github.io/Vice-city/")
})
test("contato: envio simulado e falha",async({page})=>{
 await page.goto("/contact")
 const submit=page.getByRole("button",{name:"Enviar mensagem"})
 await submit.click()
 expect(await page.locator("input[name=name]").evaluate(e=>e.validity.valueMissing)).toBe(true)
 const fill=async()=>{
  await page.getByLabel("Nome *").fill("Pessoa Teste")
  await page.getByLabel("E-mail *").fill("teste@example.com")
  await page.getByLabel("Assunto *").fill("Consulta")
  await page.getByLabel("Mensagem *").fill("Mensagem de teste sem envio real.")
 }
 await fill()
 let captured=""
 await page.route("https://formspree.io/f/mdknzqra",async route=>{
  captured=route.request().postData()||""
  await route.fulfill({status:200,contentType:"application/json",body:'{"ok":true}'})
 })
 await submit.click()
 await expect(page.getByRole("status")).toContainText(/Mensagem enviada/i)
 expect(captured).toContain("teste@example.com")
 await page.unroute("https://formspree.io/f/mdknzqra")
 await fill()
 await page.route("https://formspree.io/f/mdknzqra",route=>route.fulfill({status:503,body:"offline"}))
 await submit.click()
 await expect(page.getByRole("status")).toContainText(/Não foi possível enviar agora/i)
})
test("currículo e metadados essenciais estão disponíveis",async({request})=>{
 const pdf=await request.get("/Alb%C3%A9rico_Jr.pdf")
 expect(pdf.ok()).toBeTruthy()
 expect((await pdf.body()).subarray(0,4).toString()).toBe("%PDF")
 for(const p of ["/robots.txt","/sitemap.xml"]){
  const r=await request.get(p)
  expect(r.ok(),p).toBeTruthy()
 }
})
test("navegação mobile fecha corretamente",async({page,isMobile})=>{
 test.skip(!isMobile,"somente celulares")
 await page.goto("/")
 await page.getByRole("button",{name:"Abrir menu de navegação"}).click()
 await expect(page.getByRole("navigation",{name:"Navegação mobile"})).toBeVisible()
 await page.getByRole("navigation",{name:"Navegação mobile"}).getByRole("link",{name:"Projetos"}).click()
 await expect(page).toHaveURL(/\/work$/)
 await expect(page.getByRole("navigation",{name:"Navegação mobile"})).toHaveCount(0)
})

test("DevBlog: navegação, pesquisa, filtros e RSS",async({page,request})=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/");
 await page.getByRole("link",{name:"Ler artigos",exact:true}).click();
 await expect(page).toHaveURL(/\/blog$/);
 await expect(page.getByRole("heading",{level:1})).toContainText(/Compartilhando conhecimento/);
 await expect(page.getByRole("searchbox",{name:"Pesquisar artigos"})).toBeVisible();
 await page.getByRole("button",{name:"Mobile",exact:true}).click();
 await expect(page.getByRole("button",{name:"Mobile",exact:true})).toHaveAttribute("aria-pressed","true");
 await page.getByRole("searchbox",{name:"Pesquisar artigos"}).fill("termo-sem-correspondencia");
 await expect(page.getByText(/0 artigo\(s\)/)).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)).toBeLessThanOrEqual(2);
 const rss=await request.get("/blog/rss.xml");
 expect(rss.ok()).toBeTruthy();
 expect(rss.headers()["content-type"]).toContain("application/rss+xml");
 expect(await rss.text()).toContain("<rss");
 expect(errors).toEqual([]);
});
test("cabeçalhos básicos de segurança",async({request})=>{
 const response=await request.get("/");
 expect(response.headers()["x-content-type-options"]).toBe("nosniff");
 expect(response.headers()["x-frame-options"]).toBe("DENY");
 expect(response.headers()["x-powered-by"]).toBeUndefined();
});

test("Finanças AI aparece no catálogo web e abre seus detalhes",async({page})=>{
 await page.goto("/work")
 await expect(page.getByRole("heading",{name:/Zingen/})).toHaveCount(0)
 await page.getByRole("button",{name:"Web",exact:true}).click()
 await expect(page.getByRole("heading",{name:"Finanças AI",exact:true})).toBeVisible()
 await page.getByRole("link",{name:"Ver detalhes do projeto Finanças AI",exact:true}).click()
 await expect(page).toHaveURL(/\/work\/financas-ai$/)
 await expect(page.getByRole("heading",{level:1})).toHaveText("Finanças AI")
 await expect(page.getByRole("link",{name:/Ver código-fonte/})).toHaveAttribute("href","https://github.com/AlbericoJr/financas-ai")
 await expect(page.getByRole("link",{name:/Abrir demonstração/})).toHaveAttribute("href","https://financas-ai-theta.vercel.app")
})

test("moderação não publica nem exige GitHub quando o armazenamento não está configurado",async({page,request})=>{
 const r=await request.get("/admin/devblog-comments");
 expect(r.ok()).toBeTruthy();
 await page.goto("/admin/devblog-comments");
 await expect(page.getByRole("heading",{level:1})).toHaveText(/Moderação de comentários/);
 const api=await request.get("/api/blog/comments/artigo-de-teste");
 expect([503,404,200]).toContain(api.status());
});
