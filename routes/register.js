var csrf = require('csurf');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var csrfProtection = csrf({ cookie: true });

router.use(csrfProtection);

router.get('/', function (req, res, next) {
  res.render('signInUp', {
    layout: false,
    csrfToken: req.csrfToken(),
  });
});

router.post(
  '/',
  passport.authenticate('local.signUp', {
    successRedirect: '/users',
    failureRedirect: '/register',
    failureFlash: true,
  })
);

module.exports = router;
