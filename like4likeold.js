const express = require("express");
const app = express();
const puppeteer = require("puppeteer-extra");
const {executablePath} = require("puppeteer");
const stealth = require("puppeteer-extra-plugin-stealth");
puppeteer.use(stealth())
const fp = require("puppeteer-afp");
const userAgents = require("user-agents");
const users = [
    {name:"codin.g123456",pwd:"Sikkim"},
    {name:"sujata9907",pwd:"Sikkim01,"},
    {name:"haxer77",pwd:"Sikkim01,"},
    {name:"noob.coder1",pwd:"Sikkim01,"},
    {name:"ajay123456789464",pwd:"Sikkim"}
]
let width = 1920;
let height = 1080;
let run = 0;
let unameSelect = "#username";
let pwdSelect = "#password";
let subBtnSelect = "#login > fieldset > table > tbody > tr:nth-child(8) > td > span";
let igname = "codin.g123456";
let igpwd = "Sikkim";
let igselect1 = "#loginForm > div > div:nth-child(1) > div > label > input";
let igselect2 = "#loginForm > div > div:nth-child(2) > div > label > input";
folselect = ".earn_pages_button";
let done = 0;
async function start(){
    // non docker
    // {headless:true,slowMo:250,executablePath:executablePath()}
    let browser = await puppeteer.launch({
        headless: false,
        slowMo:Math.floor((Math.random()*150)+150),
        executablePath: executablePath(),
        args: [
          "--no-sandbox",
          '--window-size=1920,1080'
        ],
        defaultViewport: null
      })
    let page  = await browser.newPage();
    await fp(page)
    let pages = await browser.pages();
    await pages[0].close();
    await page.setDefaultNavigationTimeout(0);
    await page.setUserAgent(userAgents.random().toString());
    await page.goto("https://like4like.org/login");
    await page.waitForSelector(unameSelect);
    await page.type(unameSelect,"sundeepsharma01");
    await page.type(pwdSelect,"xfmCcniL");
    await page.click(subBtnSelect);
    let page1 = await browser.newPage();
    await fp(page1)
    await page1.setDefaultNavigationTimeout(0);
    await page1.setUserAgent(userAgents.random.toString());
    await page1.goto("https://www.instagram.com/");
    console.log("opening instagram..");
    await page1.waitForSelector(igselect1);
    await page1.waitForTimeout(Math.floor((Math.random()*500)+2000))
    if(run<=4){
        igname = users[run].name;
        igpwd = users[run].pwd;
        console.log("Setting password and username");
    }else{
        browser.close()
        console.log("Everything done succesfully!");
    }
    await page1.type(igselect1,igname);
    await page1.type(igselect2,igpwd);
    await page1.keyboard.press("Enter");
    console.log("login in instagram..");
    await page.bringToFront();
    await page.goto("https://www.like4like.org/earn-credits.php?feature=instagramfol");
    console.log("opening like4like followpage");
    async function looping(){
        let newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
         await page.waitForTimeout(10000);
        await page.waitForSelector(folselect);
        await page.click(folselect);
        let newPage = await newPagePromise;
        await fp(newPage)
        console.log("target created..");
        await newPage.setUserAgent(userAgents.random().toString());
        await newPage.setDefaultNavigationTimeout(0);
        await newPage.waitForTimeout(10000);
        console.log("waiting 10s..");
        try{
        await newPage.evaluate(()=>{
            document.querySelectorAll("button")[0].classList.add("namaste-robot");
        })
        console.log("evaluating..");
        await newPage.click(".namaste-robot");
        await newPage.waitForTimeout(Math.floor((Math.random()*2000)+2000));
        await newPage.close();
        console.log("closing instance..");
        await page.evaluate(()=>{
            document.querySelector(".pulse-checkBox").click();
        })
        await page.waitForTimeout(15000);
        done = done+1;
        if(done==100){
            browser.close()
            run = run+1;
            done = 0;
            console.log("credit earned succesfully");
            console.log("Total done: "+done);
            console.log("Restarting with another account");
            await start()
        }else{
            console.log("credit earned succesfully");
            console.log("Total done: "+done);
            await looping();
        }
    }catch(err){
        await newPage.waitForTimeout(3000);
        await newPage.close();
        await page.evaluate(()=>{
            document.querySelector(".pulse-checkBox").click();
        })
        await page.waitForTimeout(15000);
        done = done+1;
        if(done==100){
            browser.close()
            run = run+1;
            done = 0;
            console.log("This is an error credits may not be earned");
            console.log("Total done: "+done);
            console.log("Restarting with another account");
            await start()
        }else{
            console.log("This is an error credits may not be earned");
            console.log("Total done: "+done);
            await looping();
        }
    }
    }
    await looping();

    
}
async function checker(){
    try{
        await start()
    }catch(err){
        console.log(err);
    }
}
checker()
app.get("/",(req,res)=>{
    res.send("app started")
})
app.listen("3000")
