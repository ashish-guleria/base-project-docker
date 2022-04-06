const express = require("express");
const { validate } = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const userController = require("../../controllers/admin/user.controller");
const userValidation = require("../../validations/admin/user.validation");
const { userType } = require("../../config/appConstants");

const router = express.Router();

router.get(
  "/",
  auth(userType.ADMIN),
  validate(userValidation.getUsers),
  userController.getUsers
);
router.get(
  "/single",
  auth(userType.ADMIN),
  validate(userValidation.getUser),
  userController.getUser
);
router.put(
  "/block",
  auth(userType.ADMIN),
  validate(userValidation.block),
  userController.block
);

module.exports = router;
