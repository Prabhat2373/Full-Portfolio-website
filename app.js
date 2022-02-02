const express = require('express');
const app = express();

const webRouter = require("./routes/webRouter");

app.use(express.static('./static'));
app.use('./static', express.static('static'));
app.use(express.urlencoded({ extended: true }));

app.use("/",webRouter);

module.exports = app;