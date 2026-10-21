// End-to-end check of the live behaviour: both languages, the language switch, the menu, the opening-hours sign
// and the phone layout. Usage: npm run build && npx vite preview --port 4173 & node tests/smoke.mjs http://localhost:4173
import { chromium } from "playwright";
import assert from "node:assert/strict";

const base = (process.argv[2] ?? "http://localhost:4173").replace(/\/$/, "");
const browser = await chromium.launch();
const errors = [];
const outside = new Set();
const results = [];
const check = async (name, fn) => {
  try {
    await fn();
    results.push(`PASS ${name}`);
  } catch (e) {
    results.push(`FAIL ${name}: ${e.message.replace(/\s+/g, " ").slice(0, 200)}`);
  }
};
const newPage = async (options = {}) => {
  const ctx = await browser.newContext({ timezoneId: "America/Los_Angeles", locale: "en-US", ...options });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("request", (r) => { if (!r.url().startsWith(base) && !r.url().startsWith("data:")) outside.add(new URL(r.url()).host); });
  return page;
};
const meta = (page, selector, attribute = "content") => page.locator(selector).getAttribute(attribute);

const page = await newPage();

await check("English page is the default, with its own title and description", async () => {
  await page.goto(`${base}/`);
  assert.equal(await page.evaluate(() => document.documentElement.lang), "en");
  assert.match(await page.locator("h1").innerText(), /drinks till late/i);
  assert.match(await page.title(), /cocktail bar in Pula/);
  assert.match(await meta(page, 'meta[name="description"]'), /Concept website for a cocktail bar in Pula/);
});

await check("Croatian page lives at /hr/", async () => {
  await page.goto(`${base}/hr/`);
  assert.equal(await page.evaluate(() => document.documentElement.lang), "hr");
  assert.match(await page.locator("h1").innerText(), /kokteli do kasno/i);
  assert.match(await page.title(), /koktel bar u Puli/);
});

await check("each page points search engines to both languages", async () => {
  for (const [path, own] of [["/", "/"], ["/hr/", "/hr/"]]) {
    await page.goto(base + path);
    assert.ok((await meta(page, 'link[rel="canonical"]', "href")).endsWith(own));
    assert.ok((await meta(page, 'link[hreflang="en"]', "href")).endsWith("/"));
    assert.ok((await meta(page, 'link[hreflang="hr"]', "href")).endsWith("/hr/"));
    assert.match(await meta(page, 'meta[property="og:image"]'), /^https:\/\/.+\/og-image-(en|hr)\.jpg$/);
  }
});

await check("language switch keeps the section the visitor is on", async () => {
  await page.goto(`${base}/#menu`);
  await page.locator(".desktop-nav a[hreflang=hr]").click();
  await page.waitForURL(/\/hr\/#menu$/);
  await page.getByRole("heading", { name: "Koktel karta" }).waitFor();
  await page.locator(".desktop-nav a[hreflang=en]").click();
  await page.waitForURL(/\/#menu$/);
});

await check("picking a drink shows its photo and name", async () => {
  await page.goto(`${base}/`);
  await page.getByRole("tab", { name: "Classics" }).click();
  await page.getByRole("radio", { name: "Negroni" }).check();
  await page.locator('.cocktail-preview[data-drink="Negroni"]').waitFor();
});

await check("open/closed sign uses Pula time, not the visitor's", async () => {
  // Wednesday 19:30 in Pula is 10:30 in Los Angeles, where the browser thinks it is.
  const visitor = await newPage();
  await visitor.clock.setFixedTime(new Date("2026-07-15T17:30:00Z"));
  await visitor.goto(`${base}/#visit`);
  await visitor.locator(".contact-sign-label").waitFor();
  assert.equal(await visitor.locator(".contact-sign-label").innerText(), "OPEN");
  assert.match(await visitor.locator(".contact-sign-countdown").innerText(), /closing in 5 h 30 min/i);
  await visitor.context().close();
});

await check("phone layout: no sideways scrolling, headline on two lines", async () => {
  const phone = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  for (const path of ["/", "/hr/"]) {
    await phone.goto(base + path);
    const overflow = await phone.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert.ok(overflow <= 0, `${path} overflows by ${overflow}px`);
    const lines = await phone.evaluate(() => {
      const h1 = document.querySelector("h1");
      return Math.round(h1.getBoundingClientRect().height / parseFloat(getComputedStyle(h1).lineHeight));
    });
    assert.equal(lines, 2, `${path} headline has ${lines} lines`);
    assert.ok(await phone.locator(".navbar-end a[hreflang]").isVisible(), "language switch is visible on phones");
  }
  await phone.context().close();
});

await check("sitemap and robots list both languages", async () => {
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.match(sitemap, /<loc>https:\/\/[^<]+\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/[^<]+\/hr\/<\/loc>/);
  assert.match(await (await fetch(`${base}/robots.txt`)).text(), /Sitemap: https:\/\/.+\/sitemap\.xml/);
});

await check("no JavaScript errors and no requests to other sites (fonts are self-hosted)", async () => {
  assert.deepEqual(errors, []);
  assert.deepEqual([...outside], []);
});

await browser.close();
console.log(results.join("\n"));
process.exit(results.some((r) => r.startsWith("FAIL")) ? 1 : 0);
