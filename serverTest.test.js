const request = require("supertest");
const app = require("./app");
const database = require("./DBClass");
const fs = require("fs");

afterAll(() => {
  database.urlObject.urlArray.pop();
  fs.writeFile(
    `./data/test.json`,
    JSON.stringify(
      {
        urlArray: [],
      },
      null,
      4
    ),
    (err) => {
      if (err) {
        throw new Error("Cant find file:" + err);
      }
    }
  );
});

describe("check post route to /api/shorturl/", () => {
  it("should return original url and short url", async () => {
    const response = await request(app)
      .post("/api/shorturl/")
      .send({ url: "https://www.youtube.com/feed/subscriptions" });
    const shortUrl = response.body;
    const originalUrl = database.getOriginalUrl(shortUrl);
    expect(response.status).toBe(200);
    expect(originalUrl).toBe("https://www.youtube.com/feed/subscriptions");
    expect(response.body["short_url"]).toBeDefined;
  });
  it("should be saved in the database", async () => {
    const data = fs.readFileSync(`./data/test.json`);
    const url = JSON.parse(data).urlArray[0].originalUrl;
    expect(url).toBe("https://www.youtube.com/feed/subscriptions");
  });
  it("should return an error for invalid url", async () => {
    const response = await request(app)
      .post("/api/shorturl/")
      .send({ url: "www.youtube.com/feed/subscriptions" });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("invalid url");
  });
});

describe("testing GET route shorted url's ", () => {
  it("should return status 302, redirect and increase redirect count to 1", async () => {
    const shortUrl = database.getShortUrl(
      "https://www.youtube.com/feed/subscriptions"
    );
    const response = await request(app).get(`/api/shorturl/${shortUrl}`);
    expect(response.status).toBe(302);
    expect(response.redirect).toBeTruthy;
    const redirects = database.getRedirects(
      "https://www.youtube.com/feed/subscriptions"
    );
    expect(redirects).toBe(1);
  });
  it("should return status 400 and not redirect", async () => {
    const response = await request(app).get(`/api/shorturl/1`);
    expect(response.status).toBe(400);
    expect(response.redirect).toBeFalsy;
  });
});

describe("testing GET route statistic", () => {
  it("should return the statistics of a specific url with date, shorturl, originalurl,redirects", async () => {
    const shortUrl = database.getShortUrl(
      "https://www.youtube.com/feed/subscriptions"
    );
    const response = await request(app).get(`/api/statistic/${shortUrl}`);
    expect(response.status).toBe(200);
    expect(response.body.date).toBeDefined;
    expect(response.body.originalUrl).toBeDefined;
    expect(response.body.shortUrlId).toBeDefined;
    expect(response.body.shortUrlId).toBeDefined;
  });
  it("should return status 400 for invalid short url", async () => {
    const response = await request(app).get(`/api/statistic/1`);
    expect(response.status).toBe(400);
  });
});
