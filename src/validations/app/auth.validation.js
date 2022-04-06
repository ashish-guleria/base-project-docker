const Joi = require("joi");
const { joi, loginType } = require("../../config/appConstants");

exports.signup = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: joi.EMAIL,
    password: joi.PASSWORD,
    phoneNumber: joi.PHONENUMBER,
    deviceType: joi.DEVICE_TYPE,
    deviceToken: Joi.string(),
  }),
};

exports.socialLogin = {
  body: Joi.object().keys({
    loginType: Joi.string()
      .valid(...Object.values(loginType))
      .required(),
    socialId: Joi.string().required(),
    name: Joi.string().allow(""),
    email: Joi.string().allow("").email().lowercase().trim(),
  }),
};

exports.userLogin = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    deviceType: joi.DEVICE_TYPE,
    deviceToken: Joi.string(),
  }),
};

exports.verifyOtp = {
  body: Joi.object().keys({
    otp: Joi.number().min(000000).max(999999).required(),
  }),
};
