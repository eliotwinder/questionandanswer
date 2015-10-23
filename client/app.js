var app = angular.module('app',['ui.router','app.question'])
.controller('appController', ['$scope', '$http', function($scope, $http) {
  $scope.questions = [{
    text: 'are you',
    answers: ['yes','no']
  },{}];
}])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/state1");
});