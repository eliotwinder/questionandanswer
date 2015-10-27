angular.module('app.admin', [])
.controller('adminController', ['$scope', '$http', function($scope, $http){
  
  $scope.showForm = false;
  
  $scope.newQuestion = {
    text: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: ""
  };

  $scope.questions = [];

  // for the add question form's ng-show
  $scope.toggleForm = function(){
    $scope.showForm = !$scope.showForm;
  };

  // calculate percentage of votes per answer
  $scope.formatCount = function(answer, question) {
    var percent = parseInt(answer.count / question.totalAnswers * 100);

    if (isNaN(percent)) {
      percent = 0;
    }

    return percent;
  }

  // add a new question
  $scope.postQuestion = function() {
    
    var newQuestion = {
      text: $scope.newQuestion.text,
      answers: [
        $scope.newQuestion.answer1,
        $scope.newQuestion.answer2,
        $scope.newQuestion.answer3,
        $scope.newQuestion.answer4,
      ]
    };
    console.log('Posting question');

    $scope.showForm = false;

    $http({
      method: 'POST',
      url: window.location.origin + '/api/question',
      data: JSON.stringify({
        question: newQuestion
      })
    })
      .then(function successCallback(response) {
        console.log('Question Added!');
      }, function errorCallback(response) {

      });
  };

  // get all the results for questions this admin has posted
  var getResults = function(){
    $http({
      method: 'GET',
      url: window.location.origin + '/api/answer',
    })
    .then(function(data){
      console.log(data.data[0])
      $scope.questions = data.data;
      }, function(error){
        console.log(error);
    });
  };

  getResults();
}]);