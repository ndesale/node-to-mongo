var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://nayan:Ujjwal2910@2001@demonode-fssl0.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "nayandesale";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(8000, () => {
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
      throw error;
    }
    database = client.db(DATABASE_NAME);
    collection = database.collection("nayan");
    console.log("Connected to `" + DATABASE_NAME + "`!");

  });
});
app.get("/mongodb", (request, response) => {
  collection.find({}).toArray((error, result) => {
    if(error) {
      return response.status(500).send(error);
    }
    console.log("Here");
    response.render('pages/mongodb.ejs',{results: result});
  });
});
module.exports = app;
