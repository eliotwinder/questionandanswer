var Promise = require('bluebird');
module.exports = {
  // retrieve ten questions that the user hasn't answered 
  get: function(req, res, next) {
    var Question = req.app.get('models').Question;
    var User = req.app.get('models').User;
    var Answer = req.app.get('models').Answer;
    var sequelize = req.app.get('sequelize');

    var query = ["SELECT `Questions`.`id` FROM `Questions` ",
      "WHERE NOT EXISTS (SELECT * FROM `Answers` ",
      "LEFT OUTER JOIN `userAnswer` ",
      "ON `Answers`.`id`=`userAnswer`.`AnswerId` ",
      "WHERE `userAnswer`.`UserId`=5 ",
      "AND `Questions`.`id`=`Answers`.`QuestionId`)",
      "GROUP BY `Questions`.`id`;"].join('');
    
    return sequelize.query(query)
      .then(function(questionIds){
        var orClause = [];

        questionIds[0].forEach(function(questionId){
          orClause.push({id: questionId.id});
        });

        return Question.findAll({
          where: {
            $or: orClause
          },
          order: [
            [sequelize.fn('RAND', '')]
          ],
          limit: 10,
          include: [{
            model: Answer, 
            include: [User]
          }]
        });
      })
      .then(function(questionObjects){
        var response = [];

        questionObjects.forEach(function(questionObject){
          var newQuestion = {
            id: questionObject.id,
            totalAnswers: questionObject.getCount(),
            text: questionObject.text,
            answers: []
          };

          questionObject.Answers.forEach(function(answer){
            var newAnswer = {
              text: answer.text
            };

            newAnswer.count = answer.getCount();
            newQuestion.answers.push(newAnswer);
          });

          response.push(newQuestion);
        });

        // response.shuffle();

        res.json(response);
      })
      .catch(function(err){ 
        console.log(err);
      });
  },

  // add a questions to the db
  post: function(req, res, next) { 
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
      })
      .catch(function(error) {
        console.log('Error posting question',error);
      });

  }
};