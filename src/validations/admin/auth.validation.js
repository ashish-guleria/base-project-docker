const Joi = require("joi");
const { joi } = require("../../config/appConstants");

exports.adminLogin = {
  body: Joi.object().keys({
    email: Joi.string().email().lowercase().trim().required(),
    password: joi.PASSWORD,
  }),
};

exports.changePassword = {
  body: Joi.object().keys({
    oldPassword: joi.PASSWORD,
    newPassword: joi.PASSWORD,
  }),
};
