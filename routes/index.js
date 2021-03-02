const express = require("express");
const shorturlRouter = require("./shorturl");
const statisticRouter = require("./statistic");
const router = express.Router();

router.use("/statistic", statisticRouter);
router.use("/shorturl", shorturlRouter);

module.exports = router;
