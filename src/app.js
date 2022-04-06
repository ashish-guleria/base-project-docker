const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const passport = require("passport");
const compression = require("compression");

const { jwtStrategy } = require("./config/passport");
const routes = require("./routes");
const { errorConverter, errorHandler } = require("./middlewares/error");
const scheduler = require("./libs/scheduler");
const helmet = require("helmet");
const { authLimiter } = require("./middlewares/rateLimiter");
const { ApiError } = require("./utils/universalFunction");
const { ERROR } = require("./config/responseMessage");

const app = express();

app.set("view engine", "hbs");

//initialize swagger

//initialize baseroute
app.use(express.static(__dirname + "/uploader"));
app.use(express.static(__dirname + "/public"));

// set security HTTP headers

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
app.use("/users", authLimiter);

// v1 api routes
app.use("/", routes);

//send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError("en", ERROR.NOT_FOUND));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error

app.use(errorHandler);

module.exports = app;
