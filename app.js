var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var bodyParser=require("body-parser")
var app = express();
var mongoose=require("mongoose")
var productFindRoute=require("./routes/ProductFindRoute")
var specificProductRoute=require("./routes/SpecificProductRoute")
var finalRoute=require("./routes/FinalRoute")
var checkRoute=require("./routes/CheckRoute")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect("mongodb://localhost/flipkart_data",{ useNewUrlParser: true });



app.use('/', indexRouter);
app.use("/product_find",productFindRoute);
app.use("/specific_product",specificProductRoute);
app.use("/final_result",finalRoute)
app.use("/checking",checkRoute)
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
