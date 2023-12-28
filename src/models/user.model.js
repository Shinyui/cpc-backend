const User = require("./user.mongo");

const httpPostNewUser = async (name, email, photoUrl) => {
  try {
    const user = await User.create({
      name,
      email,
      profilePhotoUrl: photoUrl,
      userRoles: {
        user: true,
        admin: false,
        vipSpot: false,
        vipPerpetual: false,
        vipCourse: false,
        levelOneCourse: false,
        levelTwoCourse: false,
        levelThreeCourse: false,
      },
      bitgetRegistry: {
        uid: null,
        verificationStage: "notReceived",
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

const httpGetFindUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

const httpGetFindUserById = async (id) => {
  const user = await User.findById(id);

  return user;
};

const httpGetAllUsers = async () => {
  const user = await User.find({});

  return user;
};

module.exports = {
  httpPostNewUser,
  httpGetFindUserByEmail,
  httpGetFindUserById,
  httpGetAllUsers,
};
