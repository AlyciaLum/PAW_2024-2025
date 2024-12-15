var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Stream = require('stream');
var fs = require('fs');
var mysql = require('mysql2');
var prismaClient = require('@prisma/client');
var bodyParser = require("express");

var postRouter = require("./routes/post");
var categoryRouter = require("./routes/category");
var commentRouter = require("./routes/comment");

const port = 3000;
const hostname = '127.0.0.1';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use("/posts", postRouter);
app.use("/category", categoryRouter);
app.use("/comments", commentRouter)

app.get('/', async (req, res) => {
  res.render('index', {title: 'Home'});
})

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

app.listen(port, hostname, () => {
  console.log(`Listening on ${hostname}:${port}`);
})

module.exports = app;
