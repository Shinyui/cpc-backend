const express = require("express");
const {
  httpGetAllUsers,
  httpGetUser,
  httpRevokeUserUid,
  httpPatchUserRoles,
  httpVerifyUserUid,
  httpPatchBlockUser,
} = require("../controllers/admin.controllers");

const hasRoles = require("../middlewares/hasRoles");
const checkJwtIsValid = require("../middlewares/checkJwtIsValid");

const _ = express.Router();

_.route("/users").get(checkJwtIsValid, hasRoles("admin"), httpGetAllUsers);

_.route("/user/:id").get(checkJwtIsValid, hasRoles("admin"), httpGetUser);

_.route("/user/:id/uid/revoke").patch(
  checkJwtIsValid,
  hasRoles("admin"),
  httpRevokeUserUid
);

_.route("/user/:id/block").patch(
  checkJwtIsValid,
  hasRoles("admin"),
  httpPatchBlockUser
);

_.route("/user/:id/uid/verify").patch(
  checkJwtIsValid,
  hasRoles("admin"),
  httpVerifyUserUid
);

_.route("/user/:id/user-roles").patch(
  checkJwtIsValid,
  hasRoles("admin"),
  httpPatchUserRoles
);

module.exports = _;
