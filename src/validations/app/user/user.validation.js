const Joi = require("joi");
const { joi } = require("../../../config/appConstants");

exports.editProfile = {
  body: Joi.object().keys({
   
    name: Joi.string().required(),
    email: joi.EMAIL,
    phoneNumber: Joi.number().max(9999999999).min(1000000000).required(),
    boi: Joi.string().allow("").required(),
  }),
};

exports.changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
  }),
};

/////////////////////////////////////////////////////////////////////////////////////////
exports.forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().lowercase().trim().required(),
  }),
};

exports.forgotPage = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

exports.resetForgotPassword = {
  body: Joi.object().keys({
    newPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.any()
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({ "any.only": "Password does not match" }),
  }),
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};
/////////////////////////////////////////////////////////////////////////////////////////
