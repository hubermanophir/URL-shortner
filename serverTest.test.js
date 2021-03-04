const { json } = require("body-parser");
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

describe("check post route to /api/shorturl/new", () => {
  it("should return original url and short url", async () => {
    const response = await request(app)
      .post("/api/shorturl/new")
      .type("form")
      .send({ url: "https://www.youtube.com/feed/subscriptions" });
    expect(response.status).toBe(200);
    expect(response.body["original_url"]).toBe(
      "https://www.youtube.com/feed/subscriptions"
    );
    // console.log(response.body);
    expect(response.body["short_url"]).toBeDefined;
  });
  it("should return an error for invalid url", async () => {
    const response = await request(app)
      .post("/api/shorturl/new")
      .type("form")
      .send({ url: "//www.youtube.com/feed/subscriptions" });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid Url");
  });
});
