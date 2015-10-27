// middleware
var isLoggedIn = require('./middleware/isLoggedIn');
var isAdmin = require('./middleware/isAdmin');

// controllers
var questionController = require('./controllers/questionController');
var userController = require('./controllers/userController');
var answerController = require('./controllers/answerController');

module.exports = function(express, app, passport) {
  
  // QUESTIONS
  // get a new set of questions to answer
  app.get('/api/question', isLoggedIn,questionController.get);
  
  // add a new question
  app.post('/api/question', isAdmin, questionController.post);

  // get results for all questions the user asked
  app.get('/api/answer', isAdmin, answerController.get);

  // answer a question
  app.post('/api/answer', isLoggedIn, answerController.post);

  
  // USERS
  // signup new user 
  app.post('/api/signup', passport.authenticate('local-signup'), 
    function(req, res, next){
      if(req.user) {
        res.status(201).send({user: {
          username: req.user.username,
          isAdmin: req.user.isAdmin
        }});
      } else {
        res.status(422).send('user already exists');
      }
    });

  // user login
  app.post('/api/login', passport.authenticate('local-login'),function(req, res, next){
      if(req.user) {
        res.status(200).send({user: {
          username: req.user.username,
          isAdmin: req.user.isAdmin
        }});
      } else {
        res.status(422).send('wrong name or password, try again!');
      }
    });
};


