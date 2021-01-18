var passport = require("passport");
var localStrategy = require("passport-local").Strategy;

var User = require("../models/user.model");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  "local-signup",
  new localStrategy(
    {
      nameField: "name",
      emailField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, name, email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, { message: "Email Already In Use" });
        }
        var newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function (err, result) {
          if (err) {
            return done(err);
          }
          return done(null, newUser);
        });
      });
    }
  )
);
