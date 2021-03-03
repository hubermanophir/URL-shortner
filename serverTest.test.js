const request = require("supertest");
const app = require("./app");
const database = require("./DBClass");

describe("Testing the database object methods", () => {
  it("should create a new url", async () => {
    const response = await request(app).get("/shorturl/");
    console.log(response.body);
    expect(response.status).toBe(200);
  });
});
