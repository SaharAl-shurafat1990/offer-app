angular.module('offers.services', [])

.factory('Users', function ($http) {
  return {

    
}});
.factory('Auth', function ($http, $location, $window,$rootScope) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };          

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.offers');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.offers');
    $window.localStorage.removeItem('user.offers');
    $rootScope.isLoggedIn = false;
    $rootScope.isCooker = false;
    $rootScope.UserName = undefined;
    $rootScope.UserID = undefined;
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})
