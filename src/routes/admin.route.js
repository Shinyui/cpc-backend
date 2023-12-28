const express = require("express");
const {
  httpGetAllUsers,
  httpGetUser,
  httpRevokeUserUid,
  httpPatchUserRoles,
  httpVerifyUserUid,
  httpPatchBlockUser,
} = require("../controllers/admin.controllers");

const _ = express.Router();

_.route("/users").get(httpGetAllUsers);

_.route("/user/:id").get(httpGetUser);

_.route("/user/:id/uid/revoke").patch(httpRevokeUserUid);

_.route("/user/:id/block").patch(httpPatchBlockUser);

_.route("/user/:id/uid/verify").patch(httpVerifyUserUid);

_.route("/user/:id/user-roles").patch(httpPatchUserRoles);

module.exports = _;
