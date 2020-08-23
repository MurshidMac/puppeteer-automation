const puppeteer = require("puppeteer");

// Async Function to Just get a screenshot
(async () => {
    //const headless = process.argv[2];
    //const devtools = process.argv[3];
    //console.log(headless)

    // if(headless == "true"){
    //     const browser = await ChromePuppeteer(headless)
    //     await browser.close();
    // }

    // if(headless == "false"){
    //     const browser = await ChromePuppeteer(headless)
    //     await browser.close();
    // }
    let headless = false;
    await ChromePuppeteerPNG(headless);
    await ChromePuppeteerPDF();
    await ChromePuppeteerSingleElement();
    await ChromePuppeteerMeasureMetrics();
})();   // Always call the function

// screenshot function with headless option false
async function ChromePuppeteerPNG(headless){
    console.log(headless)
    const browser = await puppeteer.launch({ headless: headless, devtools: false});
    const page = await browser.newPage();
    await page.goto('https://www.google.com',{waitUntil: 'networkidle2'});
    await page.screenshot({path: 'screenshots/google.png', fullPage: true})
    console.log("Save the Screenshot")
    await browser.close();
}
// PDF function with headless option true
async function ChromePuppeteerPDF(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://google.com', {waitUntil: 'networkidle2'});
    await page.pdf({path: 'pdfs/hn.pdf', format: 'A4'});  
    console.log("Save the PDF")
    await browser.close();
}

// Single element screenshot and pdf both
async function ChromePuppeteerSingleElement(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://google.com', {waitUntil: 'networkidle2'});
    
    const searchTab = await page.$('.SDkEP');
    await searchTab.screenshot({path: 'screenshots/searchtab.png'});

    await page.pdf({path: 'pdfs/searchtab.pdf', format: 'A4'});  
    console.log("Save the PDF")
    await browser.close();
}

// SET CUSTOM Viewport screenshot and pdf both
async function ChromePuppeteerViewPort(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://google.com', {waitUntil: 'networkidle2'});
    
    const searchTab = await page.$('.SDkEP');
    await page.setViewport({
        width: 320,
        height: 800
    });

    await searchTab.screenshot({path: 'screenshots/searchtab.png'});

    await page.pdf({path: 'pdfs/searchtab.pdf', format: 'A4'});  
    console.log("Save the PDF")
    await browser.close();
}

// SET AGENTs screenshot and pdf both
async function ChromePuppeteerAgents(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://google.com', {waitUntil: 'networkidle2'});
    
    const searchTab = await page.$('.SDkEP');
    await page.setUserAgent(
        ''
    );

    await searchTab.screenshot({path: 'screenshots/searchtab.png'});

    await page.pdf({path: 'pdfs/searchtab.pdf', format: 'A4'});  
    console.log("Save the PDF")
    await browser.close();
}

// Puppeteer CodeCoverage
async function ChromePuppeteerCodeCoverage(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await Promise.all([
        page.coverage.startJSCoverage(),
        page.coverage.startCSSCoverage()
    ])    
    await page.goto('https://google.com', {waitUntil: 'networkidle2'});
    
    const [jsCoverage, cssCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
        page.coverage.stopCSSCoverage()
    ])
    
    
    
    await browser.close();
}

// Measure metrics
async function ChromePuppeteerMeasureMetrics(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // await Promise.all([
    //     page.coverage.startJSCoverage(),
    //     page.coverage.startCSSCoverage()
    // ])    
    await page.goto('https://google.com', {waitUntil: 'networkidle2'});
    
    // const [jsCoverage, cssCoverage] = await Promise.all([
    //     page.coverage.stopJSCoverage(),
    //     page.coverage.stopCSSCoverage()
    // ])
    
    const paints = await page.evaluate(() => {
        const result = {}
        performance.getEntriesByType('paint').map(entry =>{
            result[entry.name] = entry.startTime
        })
        return result;
    })
    for (const [key, val] of Object.entries(paints)){
        console.log(`${key}: ${ Math.round (val)}ms`)
    }
    
    await browser.close();
}
