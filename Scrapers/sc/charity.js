const puppeteer = require("puppeteer");

const scrape = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("http://localhost/bcharity/blog.html");

  // Pull out the links from the first page

  const assetUrls = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        ".blog_left_sidebar > article > .blog_details > .d-inline-block"
      )
    ).map((link) => link.href)
  );
  results = [];
  for (assetUrl of assetUrls) {
    await page.goto(assetUrl);
    const title = await page.$eval(".blog_details > h2", (h2) =>
      h2.innerText.trim()
    );
    const article = await page.$eval(".blog_details > p", (p) =>
      p.innerText.trim()
    );
    results.push([{ title, article }]);
  }
  console.log(results);
  await browser.close();
};
setInterval(scrape, 20000);
