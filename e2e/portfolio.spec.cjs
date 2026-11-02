const {test, expect} = require("@playwright/test")
const pages=[
 {url:"/",title:/Albérico Júnior/i},
 {url:"/services",title:/Serviços e soluções/i},
 {url:"/resume",title:/Experiência, formação e competências/i},
 {url:"/work",title:/Projetos e experiências/i},
 {url:"/contact",title:/Vamos criar algo juntos/i},
 {url:"/work/planejai",title:/Planej\.ai/i}
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
 await expect(page.getByRole("heading",{name:"Planej.ai"})).toBeVisible()
 await page.getByRole("link",{name:/Ver detalhes do projeto Planej.ai/}).click()
 await expect(page).toHaveURL(/\/work\/planejai$/)
 await expect(page.getByRole("link",{name:/Ver código-fonte/})).toHaveAttribute("href",/github.com/)
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
