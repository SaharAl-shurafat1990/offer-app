angular.module('offers.auth', [])

.controller('AuthController', function ($scope, $window, $location, $rootScope, Auth) {
   $scope.user = {};
     if($window.localStorage.getItem("com.offers")) {
        $location.path('/');
      }
      $scope.FBlogin = function (){

      }

  $scope.signin = function () {
    var passFlag = $scope.user.password;
    var userFlag = $scope.user.username;
    console.log( $scope.user)
    if(userFlag && passFlag){
      Auth.signin($scope.user)
      .then(function (data) {
        console.log(data)
        $window.localStorage.setItem('com.offers', data.token);
        $window.localStorage.setItem('user.offers', $scope.user.username);
        $rootScope.isLoggedIn = true;
        $window.location.reload();
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
    var passFlag = $scope.user.password;
    var userFlag = $scope.user.username;
    if(userFlag && passFlag){
      Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.offers', token);
        $window.localStorage.setItem('user.offers', $scope.user.username);
        $window.location.reload();
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
  $window.location.reload();
  Auth.signout();
}
});
