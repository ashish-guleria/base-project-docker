exports.ERROR = {
  NOT_FOUND: {
    statusCode: 400,
    customMessage: {
      en: "Not found",
      // ar: "كلمة المرور غير صحيحة.",
    },
  },
  UNAUTHORIZED: {
    statusCode: 401,
    customMessage: {
      en: "You are not authorized to perform this action",
      // ar: "كلمة المرور غير صحيحة.",
    },
  },
  PLEASE_AUTHENTICATE: {
    statusCode: 401,
    customMessage: {
      en: "Please authenticate",
      // ar: "كلمة المرور غير صحيحة.",
    },
  },
  EMAIL_ALREADY_EXIST: {
    statusCode: 400,
    customMessage: {
      en: "This email already exist. Please try with other email",
      // ar: "مة المرور غير صحيحة.",
    },
    type: "EMAIL_ALREADY_EXIST",
  },
  NUMBER_ALREADY_EXIST: {
    statusCode: 400,
    customMessage: {
      en: "This phone number already exist. Please try with other phone number",
      // ar: "مة المرور غير صحيحة.",
    },
    type: "EMAIL_ALREADY_EXIST",
  },
  WRONG_PASSWORD: {
    statusCode: 400,
    customMessage: {
      en: "Password is Incorrect.",
      ar: "كلمة المرور غير صحيحة.",
    },
  },
  ACCOUNT_ALREADY_VERIFY: {
    statusCode: 400,
    customMessage: {
      en: "Your account alreay verified",
      ar: "كلمة المرور غير صحيحة.",
    },
  },
  BLOCK_USER: {
    statusCode: 410,
    customMessage: {
      en: "Your account has been blocked by Admin.",
      // ar : 'لا تملك الصلاحية لتنفيذ هذا الإجراء'
    },
  },
  VERIFY_ACCOUNT: {
    statusCode: 400,
    customMessage: {
      en: "Please verify your account first.",
      // ar : 'لا تملك الصلاحية لتنفيذ هذا الإجراء'
    },
  },
  EMAIL_NOT_FOUND: {
    statusCode: 400,
    customMessage: {
      en: "Email not found",
      // ar : 'لا تملك الصلاحية لتنفيذ هذا الإجراء'
    },
    type: "EMAIL_NOT_FOUND",
  },
  INCORRECT_OTP: {
    statusCode: 400,
    customMessage: {
      en: "Invalid OTP",
      // ar : 'لا تملك الصلاحية لتنفيذ هذا الإجراء'
    },
    type: "EMAIL_NOT_FOUND",
  },
  USER_NOT_EXIST: {
    statusCode: 404,
    customMessage: {
      en: "User does not exist",
      // ar : 'لا تملك الصلاحية لتنفيذ هذا الإجراء'
    },
  },
};

exports.SUCCESS = {
  DEFAULT: {
    statusCode: 200,
    customMessage: {
      en: "Success",
      // ar: "نجاح",
    },
  },

  VERIFY_OTP: {
    statusCode: 200,
    customMessage: {
      en: "OTP successfully verified",
      // ar: "نجاح",
    },
  },
  RESEND_OTP: {
    statusCode: 200,
    customMessage: {
      en: "OTP successfully resended",
      //ar: "نجاح",
    },
  },
  USER_LOGOUT: {
    statusCode: 200,
    customMessage: {
      en: "You are successfully logged out",
      //  ar: "نجاح",
    },
  },
  USER_BLOCKED: {
    statusCode: 200,
    customMessage: {
      en: "User successfully blocked",
      //  ar: "نجاح",
    },
  },
  PASSWORD_CHANGED: {
    statusCode: 200,
    customMessage: {
      en: "Password successfully changed",
      //  ar: "نجاح",
    },
  },
};
