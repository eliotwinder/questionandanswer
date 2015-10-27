angular.module('app.navbar', ['ui.bootstrap'])
.controller('navbarController', [ '$scope', function($scope){
  $scope.isCollapsed = true;
}])
.directive('navbar', function(){
  return {
    controller: "navbarController",
    templateUrl: 'navbar/navbarView.html'
  };
});
