const { json } = require("body-parser");
const request = require("supertest");
const app = require("./app");
const database = require("./DBClass");

describe("check post route to /api/", () => {
  it("should create a new url", async () => {
    const response = await request(app)
      .post("/api/shorturl/new")
      .type("form")
      .send({ url: "https://www.youtube.com/feed/subscriptions" });
    expect(response.status).toBe(200);
    expect(response.body["original_url"]).toBe(
      "https://www.youtube.com/feed/subscriptions"
    );
  });
});
