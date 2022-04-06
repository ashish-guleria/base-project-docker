const { tokenService, authService } = require("../../services");
const { userType } = require("../../config/appConstants");
const {
  catchAsync,
  ApiError,
  successMessage,
} = require("../../utils/universalFunction");
const config = require("../../config/config");
const sendOtp = require("../../libs/sendOtp");
const { SUCCESS, ERROR } = require("../../config/responseMessage");
const { formatUser } = require("../../utils/formatResponse");

const signup = catchAsync(async (req, res) => {
  const otpData = await sendOtp(req.body.phoneNumber);
  req.body.otp = otpData;

  const user = await authService.createUser(req.body);
  const accessToken = await tokenService.generateAuthToken(
    user,
    userType.USER,
    req.body.deviceToken,
    req.body.deviceType,
    otpData
  );

  let formatedUser = formatUser(user.toObject(), req.headers.timezone);
  return res.send(
    successMessage("en", SUCCESS.DEFAULT, { accessToken, user: formatedUser })
  );
});

const verifyOtp = catchAsync(async (req, res) => {
  if (!req.token.otp) {
    throw new ApiError("en", ERROR.ACCOUNT_ALREADY_VERIFY);
  }
  await authService.verifyOtp(req.token._id, req.token.otp.code, req.body.otp);
  res.send(successMessage("", SUCCESS.VERIFY_OTP));
});

const resendOtp = catchAsync(async (req, res) => {
  const otpData = await sendOtp(req.token.user.phoneNumber);
  await authService.resendOtp(req.token._id, otpData);
  res.send(successMessage("en", SUCCESS.RESEND_OTP));
});

const socialLogin = catchAsync(async (req, res) => {
  const user = await authService.socialLogin(req.body);
  const token = await tokenService.generateAuthToken(user, userType.USER);
  let formatedUser = formatUser(user.toObject());
  return res.send(
    successMessage("en", SUCCESS.DEFAULT, { token, user: formatedUser })
  );
});

const login = catchAsync(async (req, res) => {
  let { email, password } = req.body;
  const user = await authService.userLogin(email, password);

  if (user.isBlocked) {
    throw new ApiError("en", ERROR.BLOCK_USER);
  }
  if (!user.isVerified) {
    throw new ApiError("en", ERROR.VERIFY_ACCOUNT);
  }
  const token = await tokenService.generateAuthToken(
    user,
    userType.USER,
    req.body.deviceToken,
    req.body.deviceType
  );
  let formatedUser = formatUser(user.toObject());
  return res.send(
    successMessage("en", SUCCESS.DEFAULT, { token, user: formatedUser })
  );
});

const refreshTokens = catchAsync(async (req, res) => {
  const token = await tokenService.refreshAuth(
    req.token.user._id,
    req.token._id,
    req.token.device
  );
  return res.send(successMessage("en", SUCCESS.DEFAULT, token));
});

const logOut = catchAsync(async (req, res) => {
  await tokenService.logout(req.token._id);
  return res.send(successMessage("en", SUCCESS.USER_LOGOUT));
});

module.exports = {
  signup,
  login,
  refreshTokens,
  logOut,
  socialLogin,
  verifyOtp,
  resendOtp,
};
