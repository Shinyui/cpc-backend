const express = require("express");
const authRouter = require("./auth.route");
const profileRouter = require("./profile.route");
const adminRouter = require("./admin.route");

const _ = express.Router();

_.use("/auth", authRouter);
_.use("/profile", profileRouter);
_.use("/admin", adminRouter);

module.exports = _;
