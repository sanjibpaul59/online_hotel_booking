var express = require("express");
var router = express.Router();

/* GET Landing page. */
// router.get("/", function (req, res, next) {
//   res.render("landingPage", { title: "TravIngo" });
// });

router.get("/", function (req, res) {
  res.render("landingPage", { layout: false });
});
/* GET Home page. */
// router.get("/home", function (req, res, next) {
//   res.render("homePage", { title: "Home | TravIngo" });
// });

/* GET Register/Sign In page. */
// router.get("/register", function (req, res, next) {
//   res.render("signInUp", { title: "Sign In or Create Account" });
// });

module.exports = router;
