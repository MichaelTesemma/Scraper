const puppeteer = require("puppeteer");
const scrape = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("http://localhost/blog");

  // Pull out the links from the first page
  const assetUrls = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div.post-preview > a")).map(
      (link) => link.href
    )
  );
  const results = [];

  // Loop through every link, go to the page and add scraped data to results array
  for (assetUrl of assetUrls) {
    await page.goto(assetUrl);
    const header = await page.$eval("h1", (h1) => h1.innerText.trim());
    const article = await page.$eval("article", (p) => p.innerText.trim());

    results.push([{ header, article }]);
  }
  console.log(results);
  await browser.close();
};
scrape();
