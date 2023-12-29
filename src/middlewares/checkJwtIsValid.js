const jwt = require("jsonwebtoken");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const checkJwtIsValid = async (req, res, next) => {
  try {
    const decodedClaims = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.HASH_KEY
    );
    req.user = decodedClaims;
    next();
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: ReasonPhrases.BAD_REQUEST });
  }
};

module.exports = checkJwtIsValid;
