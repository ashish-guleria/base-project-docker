const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const config = require("./config");
const { tokenTypes, userType } = require("./appConstants");
const { Token } = require("../models");

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }

    const token = await Token.findOne({ _id: payload.id })
      .populate({ path: "user" })
      .lean();
    token.role = payload.role;
    if (!token) {
      return done(null, false);
    }
    done(null, token);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
