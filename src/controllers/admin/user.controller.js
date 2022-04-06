const {
  adminUserService,
  tokenService,
  userProfileService,
} = require("../../services");
const { userType } = require("../../config/appConstants");
const { catchAsync, successMessage } = require("../../utils/universalFunction");
const { formatUser } = require("../../utils/formatResponse");
const { SUCCESS } = require("../../config/responseMessage");

const getUsers = catchAsync(async (req, res) => {
  const data = await adminUserService.getUsers(
    req.query.page,
    req.query.limit,
    req.query.search
  );
  return res.send(successMessage("en", SUCCESS.DEFAULT, data));
});

const getUser = catchAsync(async (req, res) => {
  const userdata = await userProfileService.getUserById(req.query.userId);
  let formatedUser = formatUser(userdata.toObject());
  return res.send(successMessage("en", SUCCESS.DEFAULT, formatedUser));
});

const block = catchAsync(async (req, res) => {
  const user = await userProfileService.getUserById(req.body.userId);
  user.isBlocked
    ? (updateBody = { isBlocked: false })
    : (updateBody = { isBlocked: true });
  const updatedUser = await userProfileService.findOneAndUpdate(
    req.body.userId,
    updateBody
  );
  await tokenService.deleteToken(updatedUser._id);

  return res.send(successMessage("en", SUCCESS.DEFAULT));
});

module.exports = {
  getUsers,
  getUser,
  block,
};
