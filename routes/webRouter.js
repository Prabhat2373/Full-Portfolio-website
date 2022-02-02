const express = require('express');
const usersController = require("./../controller/usersController");
const route = express.Router();

const {homePage , submitUser} = usersController;

route.route("/").get(homePage);
route.route("/contactForm").post(submitUser);

module.exports = route;