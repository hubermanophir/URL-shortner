const { default: axios } = require("axios");
const fs = require("fs");
const jsonBinId = `6041eedb81087a6a8b96a651`;
const testUrl = `6041f7ad81087a6a8b96aaa8`;

let address;
if (process.env.NODE_ENV === "test") {
  address = testUrl;
} else {
  address = jsonBinId;
}

let path;
if (process.env.NODE_ENV === "test") {
  path = "test";
} else {
  path = "urlJson";
}

class DataBase {
  constructor() {
    try {
      axios.get(`https://api.jsonbin.io/v3/b/${address}/latest`).then((res) => {
        const json = res.data.record;
        this.urlObject = json;
      });
      fs.writeFile(
        `./data/${path}.json`,
        JSON.stringify(this.urlObject, null, 4),
        (err) => {
          if (err) {
            throw new Error("Cant find file:" + err);
          }
        }
      );
      if (process.env.NODE_ENV === "test") {
        try {
          const data = fs.readFileSync(`./data/${path}.json`);
          this.urlObject = JSON.parse(data);
        } catch (err) {
          throw new Error(err);
        }
      }
    } catch (err) {
      try {
        const data = fs.readFileSync(`./data/${path}.json`);
        this.urlObject = JSON.parse(data);
      } catch (err) {
        throw new Error(err);
      }
    }
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
    try {
      axios.put(
        `https://api.jsonbin.io/v3/b/${address}`,
        JSON.stringify(this.urlObject, null, 4),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fs.writeFile(
        `./data/${path}.json`,
        JSON.stringify(this.urlObject, null, 4),
        (err) => {
          if (err) {
            throw new Error("Cant find file:" + err);
          }
        }
      );
    } catch (err) {
      fs.writeFile(
        `./data/${path}.json`,
        JSON.stringify(this.urlObject, null, 4),
        (err) => {
          if (err) {
            throw new Error("Cant find file:" + err);
          }
        }
      );
      throw new Error("could not update json" + err);
    }
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
    try {
      axios.put(
        `https://api.jsonbin.io/v3/b/${address}`,
        JSON.stringify(this.urlObject, null, 4),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fs.writeFile(
        `./data/${path}.json`,
        JSON.stringify(this.urlObject, null, 4),
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
    } catch (err) {
      fs.writeFile(
        `./data/${path}.json`,
        JSON.stringify(this.urlObject, null, 4),
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
      throw new Error("could not update json" + err);
    }
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
  getRedirects(originalUrl) {
    const url = this.urlObject.urlArray.filter((url) => {
      return url.originalUrl === originalUrl;
    });
    return url[0].redirects;
  }
  getDate(originalUrl) {
    const url = this.urlObject.urlArray.filter((url) => {
      return url.originalUrl === originalUrl;
    });
    return url[0].date;
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
