var express = require("express");
var router = express.Router();
var csrf = require("csurf");
var session = require("express-session");
const passport = require("passport");

var csrfProtection = csrf();

router.use(
  csrfProtection,
  session({ secret: "secretKey", resave: false, saveUninitialized: false })
);

router.get("/", function (req, res, next) {
  res.render("signInUp", {
    layout: false,
    csrfToken: req.csrfToken(),
  });
});

router.post(
  "/",
  passport.authenticate("local.signup", {
    successRedirect: "/home",
    failureRedirect: "/register",
    failureFlash: true,
  })
);

router.get("/profile", function (res, req, next) {
  res.render("/user/profile");
});

router.get("/logIn", function (req, res) {
  res.render("user/signInUp", { layout: false });
});

module.exports = router;
