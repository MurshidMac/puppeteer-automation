const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
    const page = await browser.newPage();

    await page.goto('https://dev.its.nebula.slr-sandbox.co.uk/Identity/Account/Login');

    //await page.type('#Input.Email', 'foo@example.com');
    //await page.type('#Input.Password', 'password');
    await page.type('input[name="Input.Email"]', 'admin@email.com')
    await page.type('input[name="Input.Password"]', 'Qwerty1@')
    await page.keyboard.press('Enter');

    await page.waitForNavigation();
    console.log('New Page URL:', page.url());

    const linkHandlers = await page.$x("//a[contains(text(), 'Customers')]");

    if (linkHandlers.length > 0) {
        await linkHandlers[0].click();
    } else {
        throw new Error("Link not found");
    }


    //await browser.close();
})();