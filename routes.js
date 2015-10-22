var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// controllers
var questionController = require('./controllers/questionController');
var userController = require('./controllers/userController');
var answerController = require('./controllers/answerController');

module.exports = function(express, app, passport) {
  // serve static files from client folder
  app.use(express.static(__dirname + '/client/'));

  // endpoint for questions
  app.get('/question', questionController.get);
  app.post('/question', questionController.post);

  // endpoint for users
  app.get('/user', userController.get);
  app.post('/user', userController.post);
  
  // endpoint for answers
  app.get('/answer', answerController.get);
  app.post('/answer', answerController.post);

};