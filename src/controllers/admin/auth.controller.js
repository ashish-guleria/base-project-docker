const { adminService, tokenService, userService } = require("../../services");
const { userType } = require("../../config/appConstants");
const { catchAsync, successMessage } = require("../../utils/universalFunction");
const { SUCCESS } = require("../../config/responseMessage");

const adminLogin = catchAsync(async (req, res) => {
  let { email, password } = req.body;
  const admin = await adminService.adminLogin(email, password);
  const token = await tokenService.generateAuthToken(admin, userType.ADMIN);
  return res.send(successMessage("en", SUCCESS.DEFAULT, token));
});

const changePassword = catchAsync(async (req, res) => {
  await adminService.changePassword(
    req.token.user._id,
    req.body.oldPassword,
    req.body.newPassword
  );
  return res.send(successMessage("en", SUCCESS.PASSWORD_CHANGED));
});

const dashBoard = catchAsync(async (req, res) => {
  const data = await adminService.dashBoard();
  return res.send(successMessage("en", SUCCESS.DEFAULT, data));
});

module.exports = {
  adminLogin,
  changePassword,
  dashBoard,
};
