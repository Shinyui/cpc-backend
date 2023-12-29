const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const {
  httpGetAllUsers: httpGetAllUsersMongo,
  httpGetFindUserById,
} = require("../models/user.model");

const httpGetAllUsers = async (req, res) => {
  const users = await httpGetAllUsersMongo();
  return res
    .status(StatusCodes.OK)
    .send({ msg: ReasonPhrases.OK, data: users });
};

const httpGetUser = async (req, res) => {
  const userID = req.params.id;
  const user = await httpGetFindUserById(userID);
  return res.status(StatusCodes.OK).send({ msg: ReasonPhrases.OK, data: user });
};

const httpRevokeUserUid = async (req, res) => {
  const userID = req.params.id;
  const user = await httpGetFindUserById(userID);

  user.bitgetRegistry.uid = null;
  user.bitgetRegistry.verificationStage = "notReceived";
  await user.save();

  return res.status(StatusCodes.OK).send({ msg: ReasonPhrases.OK });
};

const httpVerifyUserUid = async (req, res) => {
  const userID = req.params.id;
  const user = await httpGetFindUserById(userID);

  user.bitgetRegistry.verificationStage = "verified";
  await user.save();

  return res.status(StatusCodes.OK).send({ msg: ReasonPhrases.OK });
};

const httpPatchUserRoles = async (req, res) => {
  const userID = req.params.id;
  const { roles } = req.body;
  const user = await httpGetFindUserById(userID);
  user.userRoles = roles;

  await user.save();
  return res.status(StatusCodes.OK).send({ msg: ReasonPhrases.OK });
};

const httpPatchBlockUser = async (req, res) => {
  const userID = req.params.id;
  const user = await httpGetFindUserById(userID);

  user.bitgetRegistry.uid = null;
  user.bitgetRegistry.verificationStage = "notReceived";
  user.userRoles = {
    user: true,
    admin: false,
    vipSpot: false,
    vipPerpetual: false,
    vipCourse: false,
    levelOneCourse: false,
    levelTwoCourse: false,
    levelThreeCourse: false,
  };

  await user.save();
  return res.status(StatusCodes.OK).send({ msg: ReasonPhrases.OK });
};

module.exports = {
  httpGetAllUsers,
  httpGetUser,
  httpRevokeUserUid,
  httpPatchUserRoles,
  httpVerifyUserUid,
  httpPatchBlockUser,
};
