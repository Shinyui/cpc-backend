const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongo = async (mongo_url) => {
  mongoose.connection.on("connecting", () => {
    console.log(`establishing connection to ${mongo_url}`);
  });

  mongoose.connection.on("connected", () => {
    console.log(`established connection to ${mongo_url}`);
  });

  mongoose.connection.on("open", () => {
    console.log(`${mongo_url} is ready`);
  });

  try {
    await mongoose.connect(mongo_url);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
