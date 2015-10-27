module.exports = {
  get: function(req, res, next){
    var Question = req.app.get('models').Question;
    var Answer = req.app.get('models').Answer;
    var User = req.app.get('models').User;
    
    return Question.findAll({where: {
        UserId: req.user.id
      },
      include: [{
        model: Answer,
        include: [User]
      }]
    })
    .then(function(questionObjects){
      var response = [];

      // add counts for answers
      questionObjects.forEach(function(questionObject){
        var newQuestion = {
          id: questionObject.id,
          totalAnswers: questionObject.getCount(),
          text: questionObject.text,
          answers: []
        };

        questionObject.Answers.forEach(function(answer){
          var newAnswer = {
            text: answer.text,
            id: answer.id
          };

          newAnswer.count = answer.getCount();
          newQuestion.answers.push(newAnswer);
        });

        response.push(newQuestion);
      });

      res.status(200).json(response);
    });
  },

  post: function(req, res, next){
    var User = req.app.get('models').User;

    var answerId = parseInt(req.body.answerId);
    console.log(req.user.id);
    var userId = req.user.id;

    User.findOne({ where: {id: userId}})
      .then(function(user){
        user.addAnswer(answerId);
      })
      .then(function(user){
        res.status(201).send();
      })
      .catch(function(error) {
        res.status(401).send(error);
      });

  }
};