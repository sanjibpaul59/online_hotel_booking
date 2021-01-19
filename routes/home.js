var express = require('express');
var router = express.Router();
var Hotel = require('../models/hotel.model');

/* GET Home page. */
router.get('/', function (req, res, next) {
  Hotel.find({}, (err, data) => {
    res.render('homePage', {
      hotels: data,
    });
  });
});

router.get('/profile', function (req, res, next) {
  res.render('profile');
});

module.exports = router;
