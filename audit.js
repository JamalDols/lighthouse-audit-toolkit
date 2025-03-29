import fs from "fs";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer";

let urls;
try {
  urls = fs.readFileSync("urls.txt", "utf-8").split("\n").filter(Boolean);
} catch (error) {
  console.error("\n🚨 ERROR: File 'urls.txt' not found!");
  console.error("👉 Please create 'urls.txt' with the list of URLs (one per line) and try again.\n");
  process.exit(1);
}
const outputCsv = "lighthouse-results.csv";

fs.writeFileSync(
  outputCsv,
  "URL,PerformanceMobile,AccessibilityMobile,BestPracticesMobile,SEOMobile,PerformanceDesktop,AccessibilityDesktop,BestPracticesDesktop,SEODesktop,Title,H1,H2,MetaDescription\n"
);

(async () => {
  for (const url of urls) {
    console.log(`Auditing: ${url}`);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const title = await page.title();
    const h1 = await page.$eval("h1", (el) => el.textContent).catch(() => "");
    const h2s = await page.$$eval("h2", (els) => els.map((el) => el.textContent.trim()).join(" | ")).catch(() => "");
    const metaDescription = await page.$eval("head > meta[name='description']", (el) => el.content).catch(() => "");

    const chrome = await chromeLauncher.launch({
      chromeFlags: ["--headless"],
    });

    try {
      const mobileResult = await lighthouse(url, {
        logLevel: "info",
        output: "json",
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
        port: chrome.port,
      });

      const m = mobileResult.lhr.categories;

      const desktopResult = await lighthouse(url, {
        logLevel: "info",
        output: "json",
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
        port: chrome.port,
        preset: "desktop",
      });

      const d = desktopResult.lhr.categories;

      const row = [
        url,
        m.performance.score * 100,
        m.accessibility.score * 100,
        m["best-practices"].score * 100,
        m.seo.score * 100,
        d.performance.score * 100,
        d.accessibility.score * 100,
        d["best-practices"].score * 100,
        d.seo.score * 100,
        JSON.stringify(title),
        JSON.stringify(h1),
        JSON.stringify(h2s),
        JSON.stringify(metaDescription),
      ];

      fs.appendFileSync(outputCsv, row.join(",") + "\n");
    } catch (error) {
      console.error(`❌ Error with ${url}`);
      console.error(error.message || error);
    } finally {
      await chrome.kill();
      await browser.close();
    }
  }

  console.log(`✅ Audit completed. Results in: ${outputCsv}`);
})();
