var test = require('tape');
var url = 'http://localhost:' + require('../config').port;
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

var randomUser = function(users, isAdmin) {
  if (isAdmin) {
    users = users.filter(function(user){
      return user.isAdmin;
    });
  }

  return users[Math.floor(Math.random()*users.length)];
};

module.exports = function(models) {
  var options = {
    numberOfUsers: 10,
    numberOfQuestions: 30,
    percentageOfAnswered: 50,
  };

  var User = models.User;
  var Question = models.Question;
  var Answer = models.Answer;
  
  var fakeUsers = [];
  var fakeQuestions = [];

  var users;
  var questions;
  var answers;
  var adminIDs;

  // ADD USERS
  for (var i = 0; i < options.numberOfUsers; i++) {
    fakeUsers.push({
      username: 'user' + i,
      password: 'password' + i,
      isAdmin: Math.random() < 0.25
    });
  }

  Promise.map(fakeUsers, function(user){
    return request.postAsync({
        url: url + '/api/signup',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user),
      });
  })
    .then(function(users){
      return User.findAll({
        include: [Answer]
      });
    })
    .then(function(userObjects){
      
      // track users
      users = userObjects;

      // track admins
      adminIDs = users.filter(function(user){
        return user.isAdmin;
      }).map(function(admin) { 
          return admin.id;
      });

      // ADD QUESTIONS
      for (var i = 0; i < options.numberOfQuestions; i++) {
        var newQuestion = {
          text: 'question' + i,
          answers: []
        };

        for (var j = 0; j < 4; j++) {
          newQuestion.answers.push('answer #' + j +' to ' + i);
        }

        fakeQuestions.push(newQuestion);
      }

      return Promise.map(fakeQuestions, function(question) {
        question.UserId = adminIDs[Math.floor(Math.random()*adminIDs.length)];
        return Question.create(question);
      });
    })
    .then(function(questionObjects) {
      var questions = questionObjects; 
      var fakeAnswers = [];

      questions.forEach(function(question, index) {
        for (var i = 0; i < 4; i++) {
          fakeAnswers.push({
            text: 'answer #' + i +' to ' + index,
            QuestionId: question.id
          });
        }
      });

      return Promise.map(fakeAnswers, function(answer){
        return Answer.create(answer);
      });
    })
    .then(function(answerObjects){
      var answers = answerObjects;

      return Question.findAll({
        include: [Answer]
      });
    })
    .then(function(questionObjects){
      questions = questionObjects;

      var fakeUserAnswers = [];

      questions.forEach(function(question){
        users.forEach(function(user){
            if (Math.random() > 0.5) {
              var randomAnswer = question.Answers[Math.floor(Math.random()*question.Answers.length)];
              console.log('here', user.setAnswers);
              user.setAnswers(randomAnswer);
            }
        });


        console.log(users[0]);
      });
    })
    .catch(function(err){
      console.log(err);
    });
  
  
};