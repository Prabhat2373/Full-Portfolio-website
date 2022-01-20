const express = require('express');
const app = express();
const path = require('path');
const body = require('body-parser');
const dotenv = require('dotenv');
const port = 8000;
const fs = require('fs');
const mongoose = require('mongoose');

let index = fs.readFileSync('static/index.html');
let style = fs.readFileSync('static/css/style.css');

app.use(express.static('./static'));
app.use('./static', express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.send(index);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(
    'mongodb+srv://prabhat10:prabhat2373@cluster0.2owkf.mongodb.net/userInfo',
    // .connect(DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    // console.log(conn.connection);
    console.log('DB connection SUCCESS!');
  }).catch((err)=>{
    console.log("ERROR : " + err.message)
  })

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  feedBack: String,
});

const users = mongoose.model('Users', userSchema);

app.post('/contactForm', (req, res) => {
  let myData = new users(req.body);
  myData
    .save()
    .then(() => {
      res.send('Thanks for showing Your interest');
    })
    .catch((err) => {
      console.log('ERROR : ' + err.message);
    });
});

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
