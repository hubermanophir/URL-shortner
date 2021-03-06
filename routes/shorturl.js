const express = require("express");
const validator = require("validator");
const router = express.Router();
const dataBase = require("../DBClass");
const fetch = require("node-fetch");

//get a specific url
router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const originalUrl = dataBase.getOriginalUrl(id);
    dataBase.updateRedirects(id);
    res.status(302).redirect(originalUrl);
  } catch (err) {
    res.status(400).json({ error: "short url not found" });
  }
});

//get all urls array
router.get("/", (req, res) => {
  try {
    const { urlArray } = dataBase.getUrls();
    res.status(200).json(urlArray);
  } catch (err) {
    res.status(400).json({ error: "could not find url list" });
  }
});

//post a new url
router.post("/", async (req, res) => {
  const userUrl = req.body.url;
  const isRealUrl = await isUrlReal(userUrl);
  if (validator.isURL(userUrl) && includeHttp(userUrl) && isRealUrl) {
    dataBase.createNewUrl(userUrl);
    const shortUrl = dataBase.getShortUrl(userUrl);
    const { urlArray } = dataBase.getUrls();
    const url = urlArray.filter((value) => value.originalUrl === userUrl);
    return res.status(200).json(url[0]);
  } else if (!includeHttp(userUrl)) {
    res.status(400).json({ error: "invalid url" });
  } else {
    res.status(400).json({ error: "invalid hostname" });
  }
});

//--------------------------------functions----------------------------

//checking if string includes an http or https
function includeHttp(string) {
  if (/(http(s?)):\/\//i.test(string)) {
    return true;
  }
  return false;
}

//function that tries to fetch the users address by that its checking if the address is real or not
async function isUrlReal(url) {
  return await fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return true;
      }
    })
    .catch(() => {
      return false;
    });
}

module.exports = router;
