const passport = require("passport");
const { ApiError } = require("../utils/universalFunction");
const { ERROR } = require("../config/responseMessage");
const { userType } = require("../config/appConstants");

const verifyCallback =
  (req, resolve, reject, role) => async (err, token, info) => {
    if (err || info || !token || !token.user) {
      return reject(new ApiError("en", ERROR.PLEASE_AUTHENTICATE));
    }

    if (role && token.role != role) {
      return reject(new ApiError("en", ERROR.UNAUTHORIZED));
    }

    if (role === userType.ADMIN) {
      req.token = token;
      resolve();
    }

    if (req.url == "/verifyOtp" || req.url == "/resendOtp") {
      req.token = token;
      resolve();
    }
    if (!token.user.isVerified) {
      return reject(new ApiError("en", ERROR.VERIFY_ACCOUNT));
    }

    if (token.user.isBlocked) {
      return reject(new ApiError("en", ERROR.BLOCK_USER));
    }
    req.token = token;
    resolve();
  };

const auth = (role) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject, role)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
