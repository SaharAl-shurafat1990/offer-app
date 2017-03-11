angular.module('offers', [
  'offers.auth',
  'offers.services',
  'offers.authCom',
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
    .when('/signupCom', {
      templateUrl: 'app/account/signupCom.html',
      controller: 'comAuthController'
    })
    .when('/signinCom', {
      templateUrl: 'app/account/signinCom.html',
      controller: 'comAuthController'
    })
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    })
    
    .otherwise({redirectTo:'/'});
 

})

