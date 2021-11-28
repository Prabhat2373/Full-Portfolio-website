const express = require("express");
const app = express();
const path = require("path");
const body = require("body-parser");
const port = 8080;
const fs = require("fs");

let index = fs.readFileSync("static/index.html");
let index1 = fs.readFileSync("index.html");
let style = fs.readFileSync("static/style.css");

app.use(express.static("/static"))
app.use('/static', express.static('static'))
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    res.end(index1);
})
app.post('/contactForm', (req, res) => {
    name1 = req.name;
    email = req.email;
    feed = req.feedBack;
    // let data =
    // {
    //     name: req.name,
    //     email: req.email,
    //     feed: req.feedBack
    // }
    let outputtowrite = `name is ${name1}, email is ${email}, feed is ${feed}`
    // let dataD = JSON.stringify(data);
    fs.writeFileSync("data.txt", outputtowrite)
    let para = { 'Message': 'Your feedback WasSent' }
    res.render(index, para);
})
app.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`)
})