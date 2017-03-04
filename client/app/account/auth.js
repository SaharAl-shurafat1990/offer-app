angular.module('offers.auth', [])

.controller('AuthController', function ($scope, $window, $location, $rootScope, Auth, Users) {
  $scope.user = {};

 

  $scope.signin = function () {
      
  };

  $scope.signup = function () {
      
  };

  $scope.signout = function(){
    Auth.signout();
  }

  