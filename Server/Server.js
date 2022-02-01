const express = require('express');
const app = express();
const path = require('path');
const body = require('body-parser');
const port = 8000;
const fs = require('fs');

const usersModel = require("./../model/userModel")

let index = fs.readFileSync('static/index.html', 'utf-8');
let style = fs.readFileSync('static/css/style.css', 'utf-8');
const redirect = fs.readFileSync("static/redirect.html","utf-8")

// const index = fs.readFileSync("/index.html","utf-8")

app.use(express.static('./static'));
app.use('./static', express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.send(index);
});

app.post('/contactForm', async (req, res) => {
  try {
    const newUser = await usersModel.create(req.body);
    newUser.save().then(()=>{
      res.send(redirect)
    })
  } catch (err) {
    res.status(404).json({
      status: 'Bad Request',
      message: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
