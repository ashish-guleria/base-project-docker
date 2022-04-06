const { ERROR } = require("../../../config/responseMessage");
const { User } = require("../../../models");
const { ApiError } = require("../../../utils/universalFunction");

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError("en", ERROR.EMAIL_NOT_FOUND);
  }
  return user;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError("en", ERROR.USER_NOT_EXIST);
  }
  return user;
};

const updateUserById = async (userData, updateBody) => {
  if (userData.email != updateBody.emai) {
    if (await User.isEmailTaken(updateBody.email, userData._id)) {
      throw new ApiError("en", ERROR.EMAIL_ALREADY_EXIST);
    }
  }
  if (userData.phoneNumber != updateBody.phoneNumber) {
    if (await User.isPhoneNumberTaken(updateBody.phoneNumber, userData._id)) {
      throw new ApiError("en", ERROR.NUMBER_ALREADY_EXIST);
    }
  }
 
  const user = await User.findByIdAndUpdate(userData._id, updateBody, {
    new: true,
    lean: true,
  });
  return user;
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await getUserById(userId);
  if (!(await user.isPasswordMatch(oldPassword))) {
    throw new ApiError("en", ERROR.WRONG_PASSWORD);
  }
  let updatedPassword = { password: newPassword };
  Object.assign(user, updatedPassword);
  await user.save();
  return user;
};

const resetPassword = async (userId, password) => {
  const user = await getUserById(userId);
  let newPassword = password;
  Object.assign(user, newPassword);
  await user.save();
  return user;
};

const findOneAndUpdate = async (_id, updateBody) => {
  const result = User.findOneAndUpdate({ _id }, updateBody, { new: true });
  return result;
};

module.exports = {
  getUserById,
  updateUserById,
  changePassword,
  getUserByEmail,
  findOneAndUpdate,
  resetPassword,
};
