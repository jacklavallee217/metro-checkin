var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
  secret: 'secret',
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: false
}));

mongoose.connect('mongodb://localhost:27017/test');

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var customerRouter = require('./routes/customer');
var personalInfoRouter = require('./routes/personalInfo');
var purchaseRouter = require('./routes/purchase');
var purchaseHistoryRouter = require('./routes/purchaseHistory');
var waiverRouter = require('./routes/waiver');
var waiverQueueRouter = require('./routes/waiverQueue');

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/customer', customerRouter);
app.use('/customer/purchase', purchaseRouter);
app.use('/customer/purchaseHistory', purchaseHistoryRouter);
app.use('/customer/personalInfo', personalInfoRouter);
app.use('/anonymous/purchase', purchaseRouter);
app.use('/waiver', waiverRouter);
app.use('/waiverQueue', waiverQueueRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
