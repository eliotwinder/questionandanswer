// EXPRESS
var config = require('./config');
var express = require('express');
var passport = require('passport');
var http = require('http');
var app = express();
var dummyData = require('./tests/dummyData'); //TODO: COMMENT OUT

// MIDDLEWARE
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sequelize = require('./models/index').sequelize;
var models = require('./models/index');

// add all our models to the app so they are always on the request
app.set('models', models);

// UTILITIES
var fs = require('fs');

// CONFIG
var port = config.port || 8080;
// require('./controllers/auth')(passport, app);

// ROUTES
var routes = require('./routes');

// sync sequelize with db, then add routes and start server
sequelize.sync().then(function() {
  app.use(bodyParser.json());
  app.use(cookieParser());
  // configure passport
  require('./middleware/auth')(passport, app); // pass passport for configuration
  app.use(session({ secret: config.secret})); // session secret
  app.use(passport.initialize());
  app.use(passport.session());

  // serve static files from client folder
  app.use(express.static(__dirname + '/client/'));

  routes(express, app, passport);
  http.createServer(app).listen(port);

  // TODO: COMMENT OUT insert dummyData
  dummyData(models);
});