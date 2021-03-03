const express = require("express");
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
  const postBody = req.body;
  console.log(postBody);
  res.json(postBody.url);
});

module.exports = router;
