angular.module('offers.services', [])
.factory('comAuth', function ($http, $location, $window) {
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
      url: '/api/companies/signin',
      data: user
    })
    .then(function (resp) {
      //console.log(user)
      return resp.data;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/companies/signup',
      data: user
    })
    .then(function (resp) {
      //console.log(user)
      return resp.data;
    });
  };

  var signout = function () {
    $window.localStorage.removeItem('com.offer');
    $window.localStorage.removeItem('user.offer');
    $window.localStorage.removeItem('userId');

    $location.path('/signin');
    $window.location.reload();
  };


  return {
    signin: signin,
    signup: signup,
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
      //console.log(resp.data)
      return resp.data
    })
  }

 
  var deleteOffer=function (deleteid) {
     return $http({
      method : 'POST',
      url : '/api/delete',
      data : deleteid
    }).then(function (resp) {
      return resp.data
    })
  }
  return {
    insert : insert,
    getAll : getAll,
    deleteOffer:deleteOffer
   
  }
})