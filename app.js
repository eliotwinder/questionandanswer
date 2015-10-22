// EXPRESS
var config = require('./config');
var express = require('express');
var passport = require('passport');
var http = require('http');
var app = express();

// MIDDLEWARE
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// var middleware = require('./middleware');
// 
var sequelize = require('./models/index').sequelize;
var models = require('./models/index');

// add all our models to the app so they are always on the request
app.set('models', models);

// UTILITIES
var fs = require('fs');

// CONFIG
var port = config.port || 8080;

// ROUTES
var routes = require('./routes');

// sync sequelize with db, then add routes and start server
sequelize.sync().then(function() {
  app.use(cookieParser());
  app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  routes(express, app);
  http.createServer(app).listen(port);
});