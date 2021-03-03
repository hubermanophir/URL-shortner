const express = require("express");
const validator = require("validator");
const router = express.Router();
const dataBase = require("../DBClass");

router.get("/", (req, res) => {
  res.json(dataBase.getUrls());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const originalUrl = dataBase.getOriginalUrl(id);
  dataBase.updateRedirects(id);
  res.redirect(originalUrl);
});

router.post("/", (req, res) => {
  res.send("success");
});

router.post("/new", (req, res) => {
  const userUrl = req.body.url;
  if (validator.isURL(userUrl)) {
    dataBase.createNewUrl(userUrl);
    const shortUrl = dataBase.getShortUrl(userUrl);
    const messageObj = { original_url: userUrl, short_url: shortUrl };
    return res.json(messageObj);
  } else if (!validator.isURL(userUrl)) {
    const messageObj = { error: "Invalid Url" };
    return res.json(messageObj);
  }
});

module.exports = router;
