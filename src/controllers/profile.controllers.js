const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const { httpGetFindUserById } = require("../models/user.model");
const jwt = require("jsonwebtoken");

const httpGetUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.HASH_KEY);
    const user = await httpGetFindUserById(decoded._id);
    return res.status(StatusCodes.OK).send({ msg: ReasonPhrases.OK, user });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ msg: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { httpGetUserProfile };
