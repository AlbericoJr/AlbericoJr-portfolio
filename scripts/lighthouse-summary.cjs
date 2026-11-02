const fs=require("node:fs")
for(const device of ["mobile","desktop"]){
 const file="qa-artifacts/lighthouse-"+device+".report.json"
 if(!fs.existsSync(file)){console.log(device+": relatório indisponível");continue}
 const obj=JSON.parse(fs.readFileSync(file,"utf8"))
 const score=(key)=>obj.categories?.[key]?.score==null ? "N/A" : Math.round(obj.categories[key].score*100)
 console.log(device+": Performance "+score("performance")+" | Acessibilidade "+score("accessibility")+" | SEO "+score("seo")+" | Boas práticas "+score("best-practices"))
}
