angular.module('offers.verification', [])

.controller('verificationController',function($scope, $location, $window, comAuth){
  $scope.checkCode = function(){
    comAuth.checkcode($scope.user)
    .then(function (data) {
      var code = data.code
  $location.path('/signin');

    })
    .catch(function (error) {
      console.error(error);
    });
  }
})
