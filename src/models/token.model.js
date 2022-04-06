const mongoose = require("mongoose");
const { tokenTypes, deviceType } = require("../config/appConstants");

const tokenSchema = mongoose.Schema(
  {
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "users", required: true },
    type: {
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.ACCESS, tokenTypes.RESET_PASSWORD],
      required: true,
    },
    expires: { type: Date, required: true },
    otp: {
      code: { type: Number },
      expiresAt: { type: Date },
      isNumberUpdate: { type: Boolean },
    },
    device: {
      type: {
        type: String,
        enum: [...Object.values(deviceType)],
      },
      token: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Token
 */
const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
