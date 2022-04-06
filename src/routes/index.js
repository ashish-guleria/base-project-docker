const express = require("express");
const userAuth = require("./app/auth.routes");
const userProfile = require("./app/user/profile.routes");

const adminAuth = require("./admin/auth.routes");
const adminUser = require("./admin/user.routes");

const staticRoutes = require("./static.routes");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/app/user/profile",
    route: userProfile,
  },
  {
    path: "/app/user/auth",
    route: userAuth,
  },
  {
    path: "/admin/auth",
    route: adminAuth,
  },
  {
    path: "/admin/user",
    route: adminUser,
  },

  {
    path: "/",
    route: staticRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
