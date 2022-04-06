const express = require("express");
const auth = require("../../../middlewares/auth");
const { validate, validateView } = require("../../../middlewares/validate");
const userValidation = require("../../../validations/app/user/user.validation");
const userController = require("../../../controllers/app/user/user.controller");
const { userType } = require("../../../config/appConstants");

const router = express.Router();

router
  .route("/")
  .get(auth(userType.USER), userController.getUser)
  .put(
    auth(userType.USER),
    validate(userValidation.editProfile),
    userController.editProfile
  );

router.put(
  "/changePassword",
  auth(userType.USER),
  validate(userValidation.changePassword),
  userController.changePassword
);

////////////////////////////////////////////////Forgot Password API//////////////////////////////////////////////////

router.post(
  "/forgotPassword",
  validate(userValidation.forgotPassword),
  userController.forgotPassword
);

router
  .route("/resetPassword")
  .get(validateView(userValidation.forgotPage), userController.forgotPage)
  .post(
    validateView(userValidation.resetForgotPassword),
    userController.resetForgotPassword
  );
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = router;
