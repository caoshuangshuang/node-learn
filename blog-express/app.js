/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-01-18 09:59:01
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-21 18:06:41
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const RedisStore  = require('connect-redis')(session)

const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

var app = express();

const ENV = process.env.NODE_ENV
if(ENV!=='production'){
  app.use(logger('dev'))
}else{
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags:'a'
  })
  app.use(logger('combined', {
    stream:writeStream
  }))
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const redisClient  = require('./db/redis')
const sesstionStore = new RedisStore({
  client:redisClient
})
app.use(session({
  secret:'shumo_css',
  resave:false,
  saveUninitialized:false,
  cookie:{
    path:'/',//默认配置
    httpOnly:true,//默认配置
    maxAge:24 * 60 * 60 * 1000
  },
  store:sesstionStore
}))
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
