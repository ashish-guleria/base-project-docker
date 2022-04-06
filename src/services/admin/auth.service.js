const { User } = require("../../models");
const { ApiError } = require("../../utils/universalFunction");
const { userType } = require("../../config/appConstants");
const { ERROR } = require("../../config/responseMessage");

const adminLogin = async (email, password) => {
  const admin = await User.findOne({ email, userType: userType.ADMIN });

  if (!admin) {
    throw new ApiError("en", ERROR.EMAIL_NOT_FOUND);
  }
  if (!(await admin.isPasswordMatch(password))) {
    throw new ApiError("en", ERROR.WRONG_PASSWORD);
  }
  return admin;
};

const changePassword = async (adminId, oldPassword, newPassword) => {
  const admin = await User.findById(adminId);
  if (!(await admin.isPasswordMatch(oldPassword))) {
    throw new ApiError("en", ERROR.WRONG_PASSWORD);
  }
  let updatedPassword = { password: newPassword };
  Object.assign(admin, updatedPassword);
  await admin.save();
  return admin;
};

const dashBoard = async () => {
  const [users] = await Promise.all([
    User.countDocuments({ userType: userType.USER }),
  ]);
  return { users };
};

module.exports = {
  adminLogin,
  changePassword,
  dashBoard,
};
