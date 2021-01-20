var passport = require('passport');
var User = require('../models/user.model');
const newLocal = require('passport-local').Strategy;
var localStrategy = newLocal;


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


passport.use(
  'local.signup',
  new localStrategy(
    {
      usernameField: 'name',
      useremailField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
      User.findOne({ 'email': email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, { message: 'Email Already In Use' });
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
      })));


    passport.use('local.signin', new localStrategy({
      useremailField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
      User.findOne({'email': email},function(err, user){
        if(err){
          return done(err);
        }
        if(!user){
          return done(null, false, {message: 'No User Found'});
        }
        if(!user.validPassword(password)){
          return done(null, false, {message: 'Invalid Password'});
        }
        return done(null, user);
      })))






