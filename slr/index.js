const puppeteer = require('puppeteer');


const escapeXpathString = str => {
    const splitedQuotes = str.replace(/'/g, `', "'", '`);
    console.log("I am here")
    return `concat('${splitedQuotes}', '')`;
};

const clickByText = async (page, text) => {
    const escapedText = escapeXpathString(text);
    console.log("Visiting page ", escapedText)
    const linkHandlers = await page.$x(`//*[contains(text(), '${escapedText}')]`);
    console.log("Link header ", linkHandlers)
    if (linkHandlers.length > 0) {
      await linkHandlers[0].click();
    } else {
      throw new Error(`Link not found: ${text}`);
    }
    // element = element || 'a';
    // const escapedText = escapeXpathString(text);
    // xpath = `//*[text()[contains(., ${escapedText})]]`;
    // const elements = await page.$x(xpath);
    // if(elements.length > 0) {
    //     for(i in elements) {
    //         e = elements[i];
    //         if(await e.isIntersectingViewport()) {
    //             await e.click();
    //             return;
    //         }
    //     }
    // }
    // else {
    //     console.log(xpath);
    // }
    // throw new Error(`Link not found: ${text}`);
};

const logErrorAndExit = err => {
    console.log(err);
    process.exit();
};

(async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
    const page = await browser.newPage();

    await page.goto('https://dev.its.nebula.slr-sandbox.co.uk/Identity/Account/Login');
    await page.screenshot({path:'screenshots/slrlogin.png', fullPage:true});
    //await page.type('#Input.Email', 'foo@example.com');
    //await page.type('#Input.Password', 'password');
    await page.type('input[name="Input.Email"]', 'admin@email.com')
    await page.type('input[name="Input.Password"]', 'Qwerty1@')

    await page.keyboard.press('Enter');

    await page.waitForNavigation({waitUntil: 'load'});
    console.log('New Page URL:', page.url());

    // const linkHandlers = await page.$x("//a[contains(text(), 'Customers')]");

    // if (linkHandlers.length > 0) {
    //     await linkHandlers[0].click();
    // } else {
    //     throw new Error("Link not found");
    // }
    await clickByText(page, "Customers");


    //await browser.close();
})().catch(logErrorAndExit);