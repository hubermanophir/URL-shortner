const express = require("express");
const validator = require("validator");
const router = express.Router();
const dataBase = require("../DBClass");

router.get("/", (req, res) => {
  res.status(200).json(dataBase.getUrls());
});

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

router.post("/new", (req, res) => {
  const userUrl = req.body.url;
  if (validator.isURL(userUrl) && includeHttp(userUrl)) {
    dataBase.createNewUrl(userUrl);
    const shortUrl = dataBase.getShortUrl(userUrl);
    const messageObj = { original_url: userUrl, short_url: shortUrl };
    return res.status(200).json(messageObj);
  } else {
    const messageObj = { error: "Invalid Url" };
    return res.status(400).json(messageObj);
  }
});

function includeHttp(string) {
  if (/(http(s?)):\/\//i.test(string)) {
    return true;
  }
  return false;
}

module.exports = router;
