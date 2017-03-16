angular.module('offers', [
  'offers.auth',
  'offers.services',
  'offers.authCom',
  'addOffer',
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
    .when('/addOffer', {
      templateUrl: 'app/account/addOffer/addOffer.html',
      controller: 'addOfferContr'
    })
    .when('/showOffer', {
      templateUrl: 'app/account/showOffer/showOffer.html',
      controller: 'addOfferContr'
    })

    .otherwise({redirectTo:'/'});


})
window.fbAsyncInit = function() {
   FB.init({
     appId      : 'your-app-id',
     xfbml      : true,
     version    : 'v2.8'
   });
   FB.AppEvents.logPageView();
 };

 (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
