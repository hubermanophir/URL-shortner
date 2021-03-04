require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const api = require("./routes");
app.use("/api", api);
app.use(express.json());

app.use(cors());
app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
