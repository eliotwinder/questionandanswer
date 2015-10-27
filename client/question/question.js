angular.module('app.question', [])
.controller('questionController', ['$scope', '$http', function($scope, $http){

  $scope.questions = [];

  $scope.sendAnswer = function(click){
    var answer = angular.element(click.target).text();

    $http({
      method: 'POST',
      url: window.location.origin + '/api/answer',
      data: JSON.stringify({

      })
    })
      .then(function(response) {
        console.log("answer posted");
      }, function(error){
        console.log("Error posting answer");
      });


  };

  var getQuestions = function(){
    $http({
      method: 'GET',
      url: window.location.origin + '/api/question',
    })
      .then(function (response){
        $scope.questions = response.data;
      }, function(error){
        console.log(error);
      });
  };

  getQuestions();

}]);