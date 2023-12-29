const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const { httpGetFindUserById } = require("../models/user.model");

const hasRoles = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const { userRoles } = await httpGetFindUserById(req?.user?._id);

      if (userRoles[requiredRole] || userRoles["admin"]) {
        next();
      } else {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .send({ msg: ReasonPhrases.UNAUTHORIZED });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports = hasRoles;
