const { object } = require("joi");
const Joi = require("joi");
const { objectId } = require("../validations/custom.validation");

const tokenTypes = {
  ACCESS: "access",
  REFRESH: "refresh",
  RESET_PASSWORD: "resetPassword",
};

const userType = {
  ADMIN: "Admin",
  USER: "User",
};

const deviceType = {
  IPHONE: "iPhone",
  ANDROID: "Android",
  WEB: "Web",
};

const linkType = {
  PUBLIC: "Public",
  BUSINESS: "Business",
  PRIVATE: "Private",
};

const status = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

const joi = {
  EMAIL: Joi.string().email().lowercase().trim().required(),
  PASSWORD: Joi.string().min(6).required(),
  PHONENUMBER: Joi.string()
    .max(10)
    .min(10)
    .message("Please enter a valid phone number"),
  LIMIT: Joi.number().default(10),
  PAGE: Joi.number().default(0),
  OBJECTID: Joi.string().custom(objectId).required(),
  DEVICE_TYPE: Joi.string()
    .valid(...Object.values(deviceType))
    .required(),
};

const loginType = {
  FACEBOOK: "Facebook",
  APPLE: "Apple",
};

module.exports = {
  tokenTypes,
  userType,
  linkType,
  status,
  joi,
  loginType,
  deviceType,
};
