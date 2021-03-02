const express = require("express");
const router = express.Router();
const dataBase = require("../DBClass");
const axios = require("axios");

router.get("/:shorturl-id", async (req, res) => {
  const id = req.params["shorturl-id"];
  const { urlArray } = dataBase.getUrls();
  const url = urlArray.filter((value) => value.shortUrlId === id);
  res.json(url);
});

router.get("/", (req, res) => {
  res.send("hi");
});
module.exports = router;
