const fs = require("fs");

class DataBase {
  constructor() {
    fs.readFile("./data/urlJson.json", (err, data) => {
      if (err) {
        throw new Error(err);
      } else {
        this.urlObject = JSON.parse(data);
      }
    });
  }
  createNewUrl(originalUrl) {
    for (const item of this.urlObject.urlArray) {
      if (item.originalUrl === originalUrl) {
        return item;
      }
    }
    const url = {};
    url.date = createDate();
    url.originalUrl = originalUrl;
    url.shortUrlId = createRandomSequence();
    url.redirects = 0;
    this.urlObject.urlArray.push(url);
    fs.writeFile(
      "./data/urlJson.json",
      JSON.stringify(this.urlObject, null, 4),
      (err) => {
        if (err) {
          throw new Error(err);
        }
      }
    );
    return url;
  }
  getUrls() {
    return this.urlObject;
  }
  updateRedirects(shortUrlId) {
    const index = this.urlObject.urlArray.findIndex((url) => {
      return url.shortUrlId === shortUrlId;
    });
    this.urlObject.urlArray[index].redirects += 1;
    fs.writeFile(
      "./data/urlJson.json",
      JSON.stringify(this.urlObject, null, 4),
      (err) => {
        if (err) {
          throw new Error(err);
        }
      }
    );
  }
  getOriginalUrl(shortUrlId) {
    const url = this.urlObject.urlArray.filter((url) => {
      return url.shortUrlId === shortUrlId;
    });
    return url.originalUrl;
  }
}

function createDate() {
  const date = new Date();
  let newDate = date.toISOString().split(".")[0];
  return newDate.split("T")[0] + " " + newDate.split("T")[1];
}

const charters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  0,
];
const numbers = [];
function createRandomSequence() {
  let randomString = "";
  for (let i = 0; i < 5; i++) {
    const char = charters[Math.floor(Math.random() * charters.length)];
    randomString += char;
  }
  return randomString;
}

const dataBase = new DataBase();

module.exports = dataBase;
