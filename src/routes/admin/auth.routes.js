const express = require("express");
const { validate } = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const userController = require("../../controllers/admin/auth.controller");
const userValidation = require("../../validations/admin/auth.validation");
const { userType } = require("../../config/appConstants");

const router = express.Router();

router.post(
  "/login",
  validate(userValidation.adminLogin),
  userController.adminLogin
);

router.put(
  "/changePassword",
  auth(userType.ADMIN),
  validate(userValidation.changePassword),
  userController.changePassword
);

router.get("/dashboard", auth(userType.ADMIN), userController.dashBoard);

module.exports = router;
