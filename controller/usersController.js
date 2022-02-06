const fs = require('fs');
const usersModel = require('./../model/userModel');

const home = fs.readFileSync('static/index.html', 'utf-8');
const redirect = fs.readFileSync('static/redirect.html', 'utf-8');

exports.homePage = (req, res) => {
  res.send(home);
};
exports.submitUser = async (req, res) => {
  try {
    const newUser = await usersModel.create(req.body);
    newUser.save().then(() => {
      res.send(redirect);
    });
  } catch (err) {
    res.status(404).json({
      status: 'Bad Request',
      message: err.message,
    });
  }
};

