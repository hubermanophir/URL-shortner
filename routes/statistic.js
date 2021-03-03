const express = require("express");
const router = express.Router();
const dataBase = require("../DBClass");
const axios = require("axios");

router.get("/:shorturl_id", async (req, res) => {
  const id = req.params["shorturl_id"];
  const { urlArray } = dataBase.getUrls();
  const url = urlArray.filter((value) => value.shortUrlId === id);
  return res.status(200).json(url[0]);
});

module.exports = router;
