const express = require("express");
const router = express.Router();
const dataBase = require("../DBClass");

router.get("/", (req, res) => {
  // dataBase.updateRedirects("3p5ek");
  res.json(dataBase.getUrls());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.redirect;
});

router.post("/", (req, res) => {
  dataBase.createNewUrl("https://www.goolge.co.il/");
  res.send("success");
});

module.exports = router;
