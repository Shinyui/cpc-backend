const express = require("express");
const { httpGetUserProfile } = require("../controllers/profile.controllers.js");

const _ = express.Router();

_.route("/").get(httpGetUserProfile);

module.exports = _;
