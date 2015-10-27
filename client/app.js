var app = angular.module('app',[
  'ui.router',
  'app.question',
  'app.admin',
  'app.navbar',
  'app.auth'])
.controller('appController', ['$rootScope', '$scope', '$window', '$http', function($rootScope, $scope, $window, $http) {

  //check if user is stored
  function init() {
    if ($window.sessionStorage["currentUserName"]) {
      $rootScope.currentUser = {
        username: $window.sessionStorage["currentUserName"],
        isAdmin: $window.sessionStorage["currentUserIsAdmin"]
      }
    }
  }

  init();
}])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/login');
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
      data: {loggedIn: true}
    })
    .state('signup',{
      url: '/signup',
      controller: 'authController',
      templateUrl: 'auth/signupView.html',
      data: {loggedIn: true}
    })
    .state('logout', {
      url: '/logout',
      controller: 'logoutController',
      data: {requireLogin: false}
    });
})
.run(function ($rootScope, $window, $state) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    // clear cookie if logging out
    if (toState.name === 'logout') {
      $window.sessionStorage.removeItem('currentUserName');
      $window.sessionStorage.removeItem('currentUserIsAdmin');
    }
    
    // check if the user is loggedin
    if ($window.sessionStorage['currentUser']) {
      console.log($window.sessionStorage);
      $rootScope.currentUser = {
        username: $window.sessionStorage['currentUserName'],
        isAdmin: $window.sessionStorage['currentUserIsAdmin']
      }
    }

    // reroute to login if a user is not logged in
    if (toState.data.requireLogin && !$rootScope.currentUser) {
      event.preventDefault();
      $state.go('login');
    }

    // reroute to questions if a user is logged in
    if (toState.data.loggedIn && $rootScope.currentUser) {
      event.preventDefault();
      $state.go('questions');
    }
  });

});;