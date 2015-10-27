angular.module('app.auth', [])
.controller('authController', ['$rootScope', '$scope', '$http', '$state', '$window', function($rootScope, $scope, $http, $state, $window){
  
  $scope.user = {
    username: "",
    password: ""
  };
  $scope.errorMessage = "";

  $scope.login = function(){
    $http({
      method: 'POST',
      url: window.location.origin + '/api/login',
      data: JSON.stringify({
        username: $scope.user.username,
        password: $scope.user.password        
      })
    })
      .then(function (response) {

        // save user info to rootscope
        $rootScope.currentUser = {
          username: response.data.user,
          isAdmin: response.data.user.isAdmin
        };

        // save user info for persistent login
        $window.sessionStorage['currentUserName'] = $rootScope.currentUser.username;
        $window.sessionStorage['currentUserIsAdmin'] = $rootScope.currentUser.isAdmin
        

        if (response.data.user.isAdmin) {
          $state.go('admin');
        } else {
          $state.go('questions');
        }
      }, function (response) {
        $scope.errorMessage = "No user by that name, try again!";
        console.log('login error:', response );
      });
  };

  $scope.signup = function(){
    $http.post(window.location.origin + '/api/signup',{
        "username": $scope.user.username,
        "password": $scope.user.password        
      }
    )
      .then(function successCallback(response) {
        console.log(response.data);
        $rootScope.currentUser = {
          username: response.data.user,
          isAdmin: response.data.user.isAdmin
        };

        // save user info for persistent login
        $window.sessionStorage['currentUserName'] = $rootScope.currentUser.username;
        $window.sessionStorage['currentUserIsAdmin'] = $rootScope.currentUser.isAdmin

        $state.go('questions');
      }, function errorCallback(response) {
          $scope.errorMessage = "Username taken, please try again";
      });
  };  
}])
.controller('logoutController', ['$rootScope', '$window', '$state', function($rootScope, $window, $state){
  $rootScope.currentUser = null;
  $window.sessionStorage.removeItem('currentUser');
  $state.go('login');
}]);