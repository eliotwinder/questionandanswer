angular.module('app.auth', [])
.controller('authController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http){
  
  $scope.user = {
    username: "",
    password: ""
  };

  $scope.login = function(){
    console.log('logging in');
    $http({
      method: 'POST',
      url: window.location.origin + '/api/login',
      data: JSON.stringify({
        username: $scope.username,
        password: $scope.password        
      })
    })
      .then(function successCallback(response) {
        console.log('login response:', response);
      }, function errorCallback(response) {
        console.log('login error:', response );
      });
  };

  $scope.signup = function(){
    $http({
      method: 'POST',
      url: window.location.origin + '/api/signup',
      data: JSON.stringify({
        username: $scope.username,
        password: $scope.password        
      })
    })
      .then(function successCallback(response) {
        console.log(response);
        //$rootScope.currentUser = response.body?
      }, function errorCallback(response) {

      });
  };  
}])
.controller('logoutController', ['$rootScope', '$state', function($rootScope, $state){
  $rootScope.currentUser = null;
  $state.go('login');
}]);