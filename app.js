"use strict";
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const expressValidator = require('express-validator');
const mongoConfig = require('./configs/mongo-config')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const adminRouter = require('./routes/Admin');

mongoose.connect(mongoConfig, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true},function(error){
  if(error) throw error
    console.log(`connect mongodb success`);
});
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // console.log(err);
  res.status(err.status || 500).json(err);
});
app.listen(8090);
module.exports = app;