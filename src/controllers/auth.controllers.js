const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const {
  httpPostNewUser,
  httpGetFindUserByEmail,
  httpGetFindUserById,
} = require("../models/user.model");

const jwt = require("jsonwebtoken");

const httpPostLogin = async (req, res) => {
  const { name, email, picture } = req.body;

  const user = await httpGetFindUserByEmail(email);

  if (!user) {
    const user = await httpPostNewUser(name, email, picture);

    const accessToken = jwt.sign({ _id: user._id }, process.env.HASH_KEY, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign({ _id: user._id }, process.env.HASH_KEY, {
      algorithm: "HS256",
      expiresIn: "7d",
    });

    return res
      .status(StatusCodes.CREATED)
      .send({ msg: ReasonPhrases.CREATED, accessToken, refreshToken });
  }

  const accessToken = jwt.sign({ _id: user._id }, process.env.HASH_KEY, {
    algorithm: "HS256",
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign({ _id: user._id }, process.env.HASH_KEY, {
    algorithm: "HS256",
    expiresIn: "7d",
  });

  return res
    .status(StatusCodes.CREATED)
    .send({ msg: ReasonPhrases.CREATED, accessToken, refreshToken });
};

const httpPostBindBitget = async (req, res) => {
  const { uid } = req.body;

  const decodedClaims = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.HASH_KEY
  );

  const user = await httpGetFindUserById(decodedClaims._id);
  user.bitgetRegistry.uid = uid;
  user.bitgetRegistry.verificationStage = "pending";
  await user.save();

  return res.status(StatusCodes.CREATED).send({ msg: ReasonPhrases.CREATED });
};

module.exports = { httpPostLogin, httpPostBindBitget };
