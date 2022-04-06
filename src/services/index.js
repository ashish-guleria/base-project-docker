//user Service
module.exports.authService = require("./app/auth.service");
module.exports.userProfileService = require("./app/user/profile.service");

//token Service
module.exports.tokenService = require("./token.service");

//admin service
module.exports.adminService = require("./admin/auth.service");
module.exports.adminUserService = require("./admin/user.service");
