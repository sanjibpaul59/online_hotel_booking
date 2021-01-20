var express = require('express');
var path = require('path');
var http = require('http');
var createError = require('http-errors');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); 
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
const { body, validationResult } = require('express-validator');


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();
var server = http.Server(app);

//DB connection

mongoose.Promise = global.Promise;
var dbURL = 'mongodb://localhost:27017/travIngo'; //change this if you are using Atlas
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', function (err) {
  console.log(err);
});

require('./config/passport');

// view engine setup
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
  session({ secret: 'secretKey', resave: false, saveUninitialized: false })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  next();
})


app.use('/', indexRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



server.listen(
  process.env.PORT || 3000,
  process.env.IP || 'localhost',
  function () {
    console.log('Server running');
  }
);

module.exports = {app, server, mongoose};
