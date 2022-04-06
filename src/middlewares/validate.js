const Joi = require("joi");
const pick = require("../utils/pick");
const { ApiError } = require("../utils/universalFunction");
const config = require("../config/config");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  if (error) {
    console.error(error);
    let errorMessage = error.details
      .map((details) => details.message)
      .join(", ")
      .replace(/"/g, "");
    const newErrorMessage =
      errorMessage.trim()[0].toUpperCase() +
      errorMessage.slice(1).toLowerCase();
    return next(new ApiError("en", newErrorMessage));
  }
  Object.assign(req, value);
  return next();
};

const validateView = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return res.render("./commonMessage", {
      title: "Some thing went wrong",
      errorMessage,
      projectName: config.projectName,
    });
  }
  Object.assign(req, value);
  return next();
};

module.exports = { validate, validateView };
