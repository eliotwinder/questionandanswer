var Promise = require('bluebird');
module.exports = {
  // retrieve ten questions that the user hasn't answered 
  get: function(req, res, next) {
    var Question = req.app.get('models').Question;
    var User = req.app.get('models').User;
    
    return Question.query();
  },

  // add a questions to the db
  post: function(req, res, next) { 
    console.log('here');
    // so that we have access to the created question throughout th promise chain
    var currentQuestion;
    var Question = req.app.get('models').Question;
    var Answer = req.app.get('models').Answer;

    Question.create({
      text: req.body.text,
      UserId: req.user.id
    })
      .then(function(question){
        // save 
        currentQuestion = question;
        
        // add answers to the answer table
        var answers = [];
        console.log(req.body.answers);
        for (var i = 0; i < req.body.answers.length; i++) {

          answers.push(Answer.create({
            text: req.body.answers[i],
            QuestionId: question.id
          }));
        }
        return Promise.all(answers); 
      })
      .then(function(answers){

        return Question.findOne({
          where: {
            id: currentQuestion.id
          },
          include: [{model: Answer}]
        });
      })
      .then(function(question){
        res.json(question);
        console.log('hello');
      })
      .catch(function(error) {
        console.log('Error posting question',error);
      });

  }
};