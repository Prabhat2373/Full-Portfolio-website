const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const webRouter = require('./routes/webRouter');

app.use(express.static('./static'));
app.use('./static', express.static('static'));
app.use(express.urlencoded({ extended: true }));

app.use('/', webRouter);

app.use('*', (req, res, next) => {
  res.status(404).send(`<h1>Can't find your url : ${req.originalUrl}</h1>`);

  next();
});

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
