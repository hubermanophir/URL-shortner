const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
  await page.goto("http://localhost:3000/");
});

afterEach(async () => {
  await browser.close();
});

test("entering the correct website", async () => {
  const url = await page.url();
  expect(url).toBe("http://localhost:3000/");
});

test("checking invalid url address error div should appear", async () => {
  await page.type("input#more-info-input", "htt://www.google.co.il/");
  await page.click("button#more-info");
  let errorMsg = page.$eval("div#info-div", (input) => {
    input.innerText;
  });
  expect(errorMsg).toBeDefined;
});
