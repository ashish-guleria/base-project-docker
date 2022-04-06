const { SUCCESS } = require("../config/responseMessage");
class ApiError extends Error {
  constructor(language, errorMsg) {
    if (
      typeof errorMsg == "object" &&
      errorMsg.hasOwnProperty("statusCode") &&
      errorMsg.hasOwnProperty("customMessage")
    ) {
      if (language && language == "ar") {
        super(errorMsg.customMessage.ar);
      } else {
        super(errorMsg.customMessage.en);
      }
      this.statusCode = errorMsg.statusCode;
    } else {
      super(errorMsg);
      this.statusCode = 400;
    }
  }
}

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.log(err);
    next(err);
  });
};

const successMessage = (language, successMsg, data) => {
  if (
    typeof successMsg == "object" &&
    successMsg.hasOwnProperty("statusCode") &&
    successMsg.hasOwnProperty("customMessage")
  ) {
    let message = successMsg.customMessage.en;
    if (language && language == "ar") {
      message = successMsg.customMessage.ar;
    }
    return { code: successMsg.statusCode, message, data };
  } else {
    successMsg = SUCCESS.DEFAULT.customMessage.en;
    if (language && language == "ar") {
      message = successMsg.customMessage.ar;
    }
    return { code: 200, message: successMsg, data };
  }
};

const paginationOptions = (page, limit) => {
  return { sort: { _id: -1 }, skip: page * limit, limit: limit, lean: true };
};

module.exports = { ApiError, catchAsync, successMessage, paginationOptions };
