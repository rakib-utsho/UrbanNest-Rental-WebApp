const express = require("express");
const router = express.Router();
// user model
const User = require("../models/user.js");
// error handler
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// signup page route
router.get("/signup", userController.renderSignUpForm);

// signup form submit route
router.post("/signup", wrapAsync(userController.signUp));

// login page
router.get("/login", userController.renderLoginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.get("/logout", userController.logOut);

module.exports = router;
