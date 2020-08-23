const puppeteer = require("puppeteer");

// Async Function to Just get a screenshot
(async () => {
    const browser = await puppeteer.launch({ headless: false, devtools: true});
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    await page.screenshot({path: 'google.png'})

    await browser.close();
})();   // Always call the function
