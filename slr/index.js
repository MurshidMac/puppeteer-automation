const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://qa.its.nebula.slr-sandbox.co.uk/Identity/Account/Login');

  await page.type('#Input.Email', 'foo@example.com');
  await page.type('#Input.Password', 'password');
  await page.keyboard.press('Enter');

  await page.waitForNavigation();
  console.log('New Page URL:', page.url());
  await browser.close();
})();