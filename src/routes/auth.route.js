const express = require("express");
const {
  httpPostLogin,
  httpPostBindBitget,
} = require("../controllers/auth.controllers");

const _ = express.Router();

_.route("/login").post(httpPostLogin);

_.route("/bind/bitget").post(httpPostBindBitget);

module.exports = _;
