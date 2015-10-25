// middleware
var isLoggedIn = require('./middleware/isLoggedIn');

// controllers
var questionController = require('./controllers/questionController');
var userController = require('./controllers/userController');
var answerController = require('./controllers/answerController');

module.exports = function(express, app, passport) {
  
  // QUESTIONS
  // get a new set of questions
  app.get('/api/question', isLoggedIn, questionController.get);
  // add a new question
  app.post('/api/question', questionController.post);

  // USERS
  // signup new user
  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect : '/index', 
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
  // user login
  app.post('/api/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
};