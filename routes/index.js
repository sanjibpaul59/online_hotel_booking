var express = require('express');
var router = express.Router();

var Hotel = require('../models/hotel.model');

/* GET Home page. */
router.get('/home', function (req, res, next) {
  Hotel.find({}, (err, data) => {
    var hotelChunks = [];
    var chunkSize = 3;
    for(let i = 0; i<data.length ; i+=chunkSize){
      hotelChunks.push(data.slice(i, i+chunkSize));
    }
    res.render('homePage', {
      hotels: hotelChunks,
    });
  });
});


/* Landing Page */
router.get('/', function (req, res) {
  res.render('landingPage', { layout: false });
});


module.exports = router;
