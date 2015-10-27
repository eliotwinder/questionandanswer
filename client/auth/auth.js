angular.module('app.auth', [])
.controller('authController', ['$rootScope', '$scope', '$http', '$state', '$interpolate', function($rootScope, $scope, $http, $state, $interpolate){
  
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
        $rootScope.currentUser = {
          username: response.data.user,
          isAdmin: response.data.user.isAdmin
        };

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
        $rootScope.currentUser = {
          username: response.data.user,
          isAdmin: response.data.user.isAdmin
        };

        $state.go('questions');
      }, function errorCallback(response) {
          $scope.errorMessage = "Username taken, please try again";
      });
  };  
}])
.controller('logoutController', ['$rootScope', '$state', function($rootScope, $state){
  $rootScope.currentUser = null;
  $state.go('login');
}]);