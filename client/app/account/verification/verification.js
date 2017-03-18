angular.module('offers.verification', [])

.controller('verificationController',function($scope, $location, $window, comAuth){
  $scope.checkCode = function(){
    comAuth.checkcode($scope.user)
    .then(function (data) {
      var code = data.code
      console.log(data)
  $location.path('/profile');

    })
    .catch(function (error) {
      console.error(error);
    });
  }
})
