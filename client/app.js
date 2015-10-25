var app = angular.module('app',[
  'ui.router',
  'app.question',
  'app.admin',
  'app.navbar',
  'app.auth'])
.controller('appController', ['$scope', '$http', function($scope, $http) {
  $scope.questions = [{
    text: 'are you',
    answers: ['yes','no']
  },{}];
}])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('questions', {
      url: '/questions',
      controller: 'questionController',
      templateUrl: 'question/questionView.html',
      data: {requireLogin: true}
    })
    .state('admin', {
      url: '/admin',
      controller: 'adminController',
      templateUrl: 'admin/adminView.html',
      data: {requireLogin: true}
    })
    .state('login',{
      url: '/login',
      controller: 'authController',
      templateUrl: 'auth/loginView.html',
      data: {requireLogin: false}
    })
    .state('signup',{
      url: '/signup',
      controller: 'authController',
      templateUrl: 'auth/signupView.html',
      data: {requireLogin: false}
    })
    .state('logout', {
      url: '/logout',
      controller: 'logoutController',
      templateUrl: 'auth/loginView.html',
      data: {requireLogin: false}
    });

})
.run(function ($rootScope, $state) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

    var requireLogin = toState.data.requireLogin;

    if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
      event.preventDefault();
      $state.go('login');
    }
  });

});;