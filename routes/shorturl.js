const express = require("express");
const router = express.Router();
const dataBase = require("../DBClass");

router.get("/", (req, res) => {
  res.json(dataBase.getUrls());
});

router.post("/", (req, res) => {
  dataBase.createNewUrl("https://www.google.co.il/");
  res.send("success");
});

module.exports = router;
