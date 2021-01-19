var http = require('http');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var express = require('express');
var app = express();
var server = http.Server(app);
var passport = require('passport');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var flash = require('connect-flash');

//DB connection
var mongoose = require('mongoose');
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

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');

app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);

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
