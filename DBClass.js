const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
let path;
if (process.env.NODE_ENV === "test") {
  path = "test";
} else {
  path = "urlJson";
}

class DataBase {
  constructor() {
    const data = fs.readFileSync(`./data/${path}.json`);
    this.urlObject = JSON.parse(data);
    // return new Promise((resolve, reject) => {
    //   fs.readFile(`./data/${path}.json`, (err, data) => {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       resolve((this.urlObject = JSON.parse(data)));
    //     }
    //   });
    // });
    // fs.readFile(`./data/${path}.json`, (err, data) => {
    //   if (err) {
    //     throw new Error(err);
    //   }
    //   this.urlObject = JSON.parse(data);
    //   console.log(this.urlObject);
    // });
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
      `./data/${path}.json`,
      JSON.stringify(this.urlObject, null, 4),
      (err) => {
        if (err) {
          throw new Error("Cant find file:" + err);
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
      `./data/${path}.json`,
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
    return url[0].originalUrl;
  }
  getShortUrl(originalUrl) {
    const url = this.urlObject.urlArray.filter((url) => {
      return url.originalUrl === originalUrl;
    });
    return url[0].shortUrlId;
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
