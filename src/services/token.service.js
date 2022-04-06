const jwt = require("jsonwebtoken");
const moment = require("moment");
var ObjectID = require("mongodb").ObjectID;

const config = require("../config/config");
const { tokenTypes } = require("../config/appConstants");
const { Token, User } = require("../models");
const { userProfileService } = require("../services");
const { ApiError } = require("../utils/universalFunction");
const { ERROR } = require("../config/responseMessage");

const generateToken = (data, secret = config.jwt.secret) => {
  const payload = {
    user: data.user,
    iat: moment().unix(),
    exp: data.tokenExpires.unix(),
    type: data.tokenTypes,
    id: data.tokenId,
    role: data.userType,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (data) => {
  const tokenDoc = await Token.create({
    user: data.userId,
    expires: data.tokenExpires.toDate(),
    type: data.tokenType,
    _id: data.tokenId,
    otp: data.otpData,
    device: { type: data.deviceType, token: data.deviceToken },
  });
  return tokenDoc;
};

const generateAuthToken = async (
  user,
  userType,
  deviceToken,
  deviceType,
  otpData
) => {
  const tokenExpires = moment().add(config.jwt.accessExpirationMinutes, "days");
  var tokenId = new ObjectID();
  const accessToken = generateToken({
    user: user.id,
    tokenExpires,
    tokenTypes: tokenTypes.ACCESS,
    userType,
    tokenId,
  });

  await saveToken({
    userId: user.id,
    tokenExpires,
    tokenId,
    otpData,
    deviceToken,
    deviceType,
    tokenType: tokenTypes.ACCESS,
  });
  return {
    token: accessToken,
    expires: tokenExpires.toDate(),
  };
};

const verifyToken = async (token) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({
    token,
    type: payload.type,
    user: payload.userId,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

const refreshAuth = async (userId, tokenId, device) => {
  const user = await userProfileService.getUserById(userId);
  await Token.deleteOne({ _id: tokenId });
  return generateAuthToken(user, user.userType, device.token, device.type);
};

const logout = async (tokenId) => {
  const token = await Token.findById(tokenId);
  if (!token) {
    throw new ApiError("en", ERROR.NOT_FOUND);
  }
  return await token.remove();
};

//////////////////////////////////////////////////////////////////////////////////////////////////
const generateResetPasswordToken = async (email) => {
  const user = await userProfileService.getUserByEmail(email);
  var tokenId = new ObjectID();
  const expires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    "day"
  );
  const resetPasswordToken = generateToken({
    user: user.id,
    tokenId,
    tokenExpires: expires,
    tokenTypes: tokenTypes.RESET_PASSWORD,
  });
  await saveToken({
    tokenId,
    resetPasswordToken,
    userId: user.id,
    tokenExpires: expires,
    tokenType: tokenTypes.RESET_PASSWORD,
  });
  return resetPasswordToken;
};

const verifyResetPasswordToken = async (token) => {
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenData = await Token.findOne({
      _id: payload.id,
      // expires: { $gte: new Date() },
    });
    return tokenData;
  } catch (error) {
    throw error;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////

const deleteToken = async (userId) => {
  await Token.deleteMany({ user: userId });
};

module.exports = {
  generateAuthToken,
  saveToken,
  refreshAuth,
  logout,
  generateResetPasswordToken,
  verifyResetPasswordToken,
  deleteToken,
  verifyToken,
};
