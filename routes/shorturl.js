const express = require("express");
const router = express.Router();
const dataBase = require("../DBClass");

router.get("/", (req, res) => {
  dataBase.updateRedirects("3p5ek");
  // dataBase.updateRedirects("3p5ek");
  res.json(dataBase.getUrls());
});

router.post("/", (req, res) => {
  dataBase.createNewUrl("https://www.goolge.co.il/");
  res.send("success");
});

module.exports = router;
