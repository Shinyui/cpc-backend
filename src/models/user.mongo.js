const mongoose = require("mongoose");
const { Schema } = mongoose;

const registryModifiedHistorySchema = new Schema({
  modifier: {
    type: mongoose.Types.ObjectId,
    requried: true,
    ref: "user",
  },
  targetUser: {
    type: mongoose.Types.ObjectId,
    requried: true,
    ref: "user",
  },
  action: {
    type: String,
    requried: true,
    enum: ["created", "modified", "deleted"],
  },
  targetAttribue: {
    type: String,
    requried: true,
    enum: ["uid", "verified"],
  },
});

const bitgetRegistrySchema = new Schema({
  uid: {
    type: String,
    requried: true,
    default: null,
  },
  verificationStage: {
    type: String,
    enum: ["notReceived", "pending", "verified"],
    default: "notReceived",
  },
  modifiedHistory: registryModifiedHistorySchema,
});

const userRolesSchema = new Schema({
  user: {
    type: Boolean,
    default: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  vipSpot: {
    type: Boolean,
    default: false,
  },
  vipPerpetual: {
    type: Boolean,
    default: false,
  },
  vipCourse: {
    type: Boolean,
    default: false,
  },
  levelOneCourse: {
    type: Boolean,
    default: false,
  },
  levelTwoCourse: {
    type: Boolean,
    default: false,
  },
  levelThreeCourse: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    requried: true,
  },
  profilePhotoUrl: {
    type: String,
    requried: true,
  },
  userRoles: userRolesSchema,
  bitgetRegistry: bitgetRegistrySchema,
});

module.exports = mongoose.model("user", userSchema);
