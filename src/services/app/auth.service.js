const { User, Token } = require("../../models");
const { ApiError } = require("../../utils/universalFunction");
const { joi, loginType } = require("../../config/appConstants");
const { ERROR } = require("../../config/responseMessage");

const socialLogin = (userBody) => {
  if (userBody.loginType == loginType.FACEBOOK) {
    return User.findOneAndUpdate(
      {
        $or: [{ email: userBody.email }, { facebookId: userBody.socialId }],
      },
      {
        $set: { facebookId: userBody.socialId },
        $setOnInsert: {
          email: userBody.email,
          name: userBody.name,
          isVerified: true,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  return User.findOneAndUpdate(
    {
      $or: [{ email: userBody.email }, { appleId: userBody.socialId }],
    },
    {
      $set: { appleId: userBody.socialId },
      $setOnInsert: {
        email: userBody.email,
        name: userBody.name,
        userName: username,
        isVerified: true,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError("", ERROR.EMAIL_ALREADY_EXIST);
  }
  if (await User.isPhoneNumberTaken(userBody.phoneNumber)) {
    throw new ApiError("", ERROR.NUMBER_ALREADY_EXIST);
  }
  const user = await User.create(userBody);
  return user;
};

const userLogin = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError("en", ERROR.EMAIL_NOT_FOUND);
  }
  if (!(await user.isPasswordMatch(password))) {
    throw new ApiError("en", ERROR.WRONG_PASSWORD);
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

const findOneAndUpdate = async (_id, updateBody) => {
  const result = User.findOneAndUpdate({ _id }, updateBody, { new: true });
  return result;
};

const verifyUser = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isVerified: true },
    { new: true, lean: true }
  );
  return user;
};

const verifyOtp = async (tokenId, enterOtp, savedOtp) => {
  if (enterOtp != savedOtp) {
    throw new ApiError("en", ERROR.INCORRECT_OTP);
  }
  const token = await Token.findByIdAndUpdate(
    tokenId,
    {
      $unset: { otp: "" },
    },
    { new: true, lean: true }
  );
  const user = await User.findByIdAndUpdate(token.user, { isVerified: true });

  return user;
};

const resendOtp = async (userId, otpdata) => {
  const user = await Token.findByIdAndUpdate(
    userId,
    {
      $set: { otp: otpdata },
    },
    { new: true, lean: true }
  );
  return user;
};

module.exports = {
  socialLogin,
  userLogin,
  getUserById,
  createUser,
  findOneAndUpdate,
  verifyUser,
  verifyOtp,
  resendOtp,
};
