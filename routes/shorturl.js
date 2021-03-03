const express = require("express");
const router = express.Router();
const dataBase = require("../DBClass");

router.get("/", (req, res) => {
  // dataBase.updateRedirects("3p5ek");
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

module.exports = router;
