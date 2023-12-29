const express = require("express");
const {
  httpPostLogin,
  httpPostBindBitget,
} = require("../controllers/auth.controllers");

const checkJwtIsValid = require("../middlewares/checkJwtIsValid");

const _ = express.Router();

_.route("/login").post(httpPostLogin);

_.route("/bind/bitget").post(checkJwtIsValid, httpPostBindBitget);

module.exports = _;
