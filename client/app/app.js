angular.module('offers', [
  'offers.auth',
  'offers.services',
  'offers.authCom',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/account/userAuth/signin.html',
      controller: 'AuthController' 
    })
    .when('/signup', {
      templateUrl: 'app/account/userAuth/signup.html',
      controller: 'AuthController'
    })    
    .when('/signout', {
      templateUrl: 'app/account/userAuth/signout.html',
      controller: 'AuthController'
    })
    .when('/signupCom', {
      templateUrl: 'app/account/companyAuth/signupCom.html',
      controller: 'comAuthController'
    })
    .when('/signinCom', {
      templateUrl: 'app/account/companyAuth/signinCom.html',
      controller: 'comAuthController'
    })
    
    .otherwise({redirectTo:'/'});
 

})

