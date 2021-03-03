const express = require("express");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// const dom = new JSDOM("./index.html");
const document = new JSDOM("./index.html").window.document;
// console.log(document);
const array = $("form").serializeArray();
// console.log(array);

// module.exports = formData;
