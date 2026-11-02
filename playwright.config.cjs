const {defineConfig,devices}=require("@playwright/test")
module.exports=defineConfig({
 testDir:"./e2e",timeout:45000,expect:{timeout:10000},retries:1,workers:2,
 reporter:[["list"],["html",{outputFolder:"playwright-report",open:"never"}]],
 use:{baseURL:"http://127.0.0.1:3000",trace:"retain-on-failure",screenshot:"only-on-failure"},
 projects:[
  {name:"desktop-chromium",use:{...devices["Desktop Chrome"],viewport:{width:1440,height:900}}},
  {name:"desktop-firefox",use:{...devices["Desktop Firefox"],viewport:{width:1440,height:900}}},
  {name:"desktop-webkit",use:{...devices["Desktop Safari"],viewport:{width:1440,height:900}}},
  {name:"tablet-chromium",use:{...devices["Desktop Chrome"],viewport:{width:768,height:1024}}},
  {name:"mobile-chromium",use:{...devices["Pixel 5"]}}
 ],
 webServer:{command:"npm run start -- -H 127.0.0.1 -p 3000",url:"http://127.0.0.1:3000",reuseExistingServer:false,timeout:120000}
})
