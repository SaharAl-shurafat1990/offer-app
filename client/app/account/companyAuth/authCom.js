angular.module('offers.authCom', [])

.controller('comAuthController', function ($scope, $window, $location, $rootScope, comAuth) {
   $scope.company = {};
     if($window.localStorage.getItem("com.offers")) {
        $location.path('/');
      } 

  $scope.signin = function () {
    var passFlag = $scope.company.password;
    var userFlag = $scope.company.email;
    if(userFlag && passFlag){
      comAuth.signin($scope.company)
      .then(function (data) {
        console.log(data)
        $window.localStorage.setItem('com.offers', data.token);
        $window.localStorage.setItem('user.offers', $scope.company.username);
        $location.path('/');
        
        
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      if(!userFlag && !passFlag){
        $scope.msg = "Wrong input for user or Password  "
      } else if(!userFlag){
        $scope.msg = "please inter your username"
      } else if (!passFlag){
        $scope.msg = "please inter your password"
      }
    }
  }


  $scope.signup = function () {
    
    var passFlag = $scope.company.password;
    var userFlag = $scope.company.email;
    if(userFlag && passFlag){
      comAuth.signup($scope.company)
      .then(function (token) {
        $window.localStorage.setItem('com.offers', token);
        $window.localStorage.setItem('user.offers', $scope.company.email);
        console.log($scope.company)
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
    } else {
      if(!userFlag && !passFlag){
       $scope.msg = "Wrong input for user or Password"
     } else if(!userFlag){
      $scope.msg = "please inter all fild"
    } else if (!passFlag){
      $scope.msg = "please inter all fild"
    }
  }
}

$scope.signout = function(){
  comAuth.signout();
}
});
  