const { User } = require("../../models");
const {
  ApiError,
  paginationOptions,
} = require("../../utils/universalFunction");
const { userType } = require("../../config/appConstants");

const getUsers = async (page, limit, search) => {
  var query = { userType: userType.USER };
  if (search) {
    let searchRegex = RegExp(search, "i");

    query = {
      ...query,
      $or: [
        { name: { $regex: searchRegex } },
        // { phone: { $regex: search } }
      ],
    };
  }

  const [users, count] = await Promise.all([
    User.find(query, {}, paginationOptions(page, limit)),
    User.countDocuments(query),
  ]);

  return { users, count };
};

module.exports = {
  getUsers,
};
