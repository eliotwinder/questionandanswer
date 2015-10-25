angular.module('app.admin', [])
.controller('adminController', ['$scope', '$http', function($scope, $http){
  
  $scope.newQuestion = {
    text: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: ""
  };

  $scope.questions = [{
    text: 'sample question 1',
    answers: [{
        text: 'a',
        score: 43
      }, {
        text: 'b',
        score: 22
      },{
        text: 'c',
        score: 13
      },{
        text: 'd',
        score: 50
      }]
  },{
    text: 'sample question 2',
    answers: [{
        text: '2a',
        score: 43
      }, {
        text: '2b',
        score: 22
      },{
        text: '2c',
        score: 13
      },{
        text: '2d',
        score: 50
      }]
  }];

  var postQuestion = function() {
    
    var newQuestion = {
      text: $scope.newQuestion.text,
      answers: [
        $scope.newQuestion1,
        $scope.newQuestion2,
        $scope.newQuestion3,
        $scope.newQuestion4,
      ]
    };
    console.log('Posting question');
    $http({
      method: 'POST',
      url: windown.location.origin + 'api/question',
      data: JSON.stringify({
        question: newQuestion
      })
    })
      .then(function successCallback(response) {
        console.log('Question Added!');
      }, function errorCallback(response) {

      });
  };

}]);