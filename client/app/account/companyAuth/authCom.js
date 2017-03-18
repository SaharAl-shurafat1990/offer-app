angular.module('offers.authCom', [])

.controller('comAuthController', function ($scope, $window, $location, $rootScope, comAuth) {
  $scope.user = {};

  if($window.localStorage.getItem('com.offer')) {
        $location.path('/');
      }

  $scope.signin = function () {
    var passFlag = $scope.user.password;
    var userFlag = $scope.user.username;
    if(userFlag && passFlag){
      comAuth.signin($scope.user)
      .then(function (data) {
        // console.log(data);


        $window.localStorage.setItem('com.offer', data.token);
        $window.localStorage.setItem('user.offer', $scope.user.username);
        $window.localStorage.setItem('userId',data['user']['_id']);
        console.log(data['user']['_id']);
        if($window.localStorage.setItem('userId',data['user']['_id'])!==null){
           $location.path('/profile');
       $window.location.reload();
        }else{
         //$window.location.reload();
         $location.path('/');
        }


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
      comAuth.signup($scope.user)
      .then(function (data) {



    $location.path('/verification');

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

})
