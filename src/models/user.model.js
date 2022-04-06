const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { userType } = require("../config/appConstants");

const userSchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true, unique: true },
    password: { type: String },
    phoneNumber: { type: Number },
    bio: { type: String },
    userType: {
      type: String,
      enum: [...Object.values(userType)],
      default: userType.USER,
    },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    facebookId: { type: String },
    appleId: { type: String },
    
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return user;
};

userSchema.statics.isPhoneNumberTaken = async function (
  phoneNumber,
  excludeUserId
) {
  const user = await this.findOne({ phoneNumber, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.isGoogleIdTaken = async function (googleId, excludeUserId) {
  const user = await this.findOne({ googleId, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  user.name =
    user.name.trim()[0].toUpperCase() + user.name.slice(1).toLowerCase();

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
