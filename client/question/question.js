angular.module('app.question', [])
.controller('questionController', ['$scope', '$http', function($scope, $http){

  $scope.questions = [];

  var getQuestions = function(){
        console.log(window.location.origin + '/api/question');
    $http({
      method: 'GET',
      url: window.location.origin + '/api/question'
    })
      .then(function (response){

        $scope.questions = $scope.questions.concat(response.data);

      }, function(error){
        console.log(error);
      });
  };

  $scope.sendAnswer = function(click){
    var answerId = angular.element(click.target).attr('data-answerid');
      $scope.questions.shift();

      if($scope.questions.length < 3) {
        getQuestions();
      }

    $http({
      method: 'POST',
      url: window.location.origin + '/api/answer',
      data: JSON.stringify({
        answerId: answerId
      })
    })
      .then(function(response) {
      }, function(error){
        console.log("Error posting answer");
      });
  };

  getQuestions();

}]);