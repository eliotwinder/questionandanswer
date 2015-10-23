angular.module('app.question', [])
.directive('question', function(){
  return {
    scope: {
      question: '=questioninfo'
    },
    templateUrl: 'question.html'
  };
});