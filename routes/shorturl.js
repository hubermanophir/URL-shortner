const express = require("express");
const validator = require("validator");
const router = express.Router();
const dataBase = require("../DBClass");
const fetch = require("node-fetch");

router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const originalUrl = dataBase.getOriginalUrl(id);
    dataBase.updateRedirects(id);
    res.status(302).redirect(originalUrl);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

router.post("/", async (req, res) => {
  const userUrl = req.headers.url;
  const isRealUrl = await isUrlReal(userUrl);
  if (validator.isURL(userUrl) && includeHttp(userUrl) && isRealUrl) {
    dataBase.createNewUrl(userUrl);
    const shortUrl = dataBase.getShortUrl(userUrl);
    return res.status(200).json(shortUrl);
  } else if (!includeHttp(userUrl)) {
    res.status(400).json({ error: "invalid url" });
  }
  {
    res.status(400).json({ error: "invalid hostname" });
  }
});

function includeHttp(string) {
  if (/(http(s?)):\/\//i.test(string)) {
    return true;
  }
  return false;
}
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
