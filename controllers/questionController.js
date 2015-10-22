module.exports = {
  
  // retrieve ten questions that the user hasn't answered 
  get: function(req, res, next) {
    var Question = req.app.get('models').Question;
    var User = req.app.get('models').User;
    
    return Question.query();
  },

  post: function() {

  }
};