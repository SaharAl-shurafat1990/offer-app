angular.module('offers.services', [])

.factory('Auth', function ($http, $location, $window) {
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
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.offers');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.offers');
    $location.path('/');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})
.factory('comAuth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (company) {
    return $http({
      method: 'POST',
      url: '/api/companies/signin',
      data: company
    })
    .then(function (resp) {
      console.log(company)
      return resp.data.token;
    });
  };

  var signup = function (company) {
    return $http({
      method: 'POST',
      url: '/api/companies/signup',
      data: company
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.offers');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.offers');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})
.factory('Offer',function ($http, $location) {

  var insert = function (offer) {
    return $http({
      method : 'POST',
      url : '/api/offers/addoffer',
      data : offer
    }).then(function (resp) {
      return resp.data
    })
  }

  var getAll = function () {
    return $http({
      method : 'GET',
      url : '/api/offers/'
    }).then(function (resp) {
      console.log(resp.data)
      return resp.data
    })
  }

 //// edit service
  var edit=function(service){
     return $http({
      method : 'POST',
      url : '/api/updateOffer',
      data : service
    }).then(function (resp) {
      return resp.data
    })
  }
  
  return {
    insert : insert,
    getAll : getAll,
    edit : edit
   
  }
})