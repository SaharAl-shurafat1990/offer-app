angular.module('offers', [
  'offers.auth','offers.services',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/account/signin.html',
      controller: 'AuthController' 
    })
    .when('/signup', {
      templateUrl: 'app/account/signup.html',
      controller: 'AuthController'
    })    
    .when('/signout', {
      templateUrl: 'app/account/signout.html',
      controller: 'AuthController'
    })
    
    .otherwise({redirectTo:'/'});
 

})

