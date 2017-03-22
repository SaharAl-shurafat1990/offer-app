angular.module('offers', [
  'offers.verification',
  'offers.services',
  'app.main',
  'offers.authCom',
  'addOffer',
  'showOffer',
  'geolocation',
  'app.profile',
  'angularMoment',
  'timer',
  'ngRoute'
])

.config(function ($routeProvider) {
  $routeProvider

    .when('/signout', {
      templateUrl: 'app/account/companyAuth/signout.html',
      controller: 'comAuthController'
    })
    .when('/signup', {
      templateUrl: 'app/account/companyAuth/signupCom.html',
      controller: 'comAuthController'
    })
    .when('/signin', {
      templateUrl: 'app/account/companyAuth/signinCom.html',
      controller: 'comAuthController'
    })
    .when('/addOffer', {
      templateUrl: 'app/account/addOffer/addOffer.html',
      controller: 'addOfferContr'
    })
    .when('/showOffer', {
      templateUrl: 'app/account/showOffer/showOffer.html',
      controller: 'showfferContr'
    })
    .when('/verification', {
      templateUrl: 'app/account/verification/verification.html',
      controller: 'verificationController'
    })
    .when('/profile',{
      templateUrl:'app/account/profile/profile.html',
      controller:'ProfileController'
      })
    .when('/map', {
      templateUrl: 'app/account/main/main.html',
      controller: 'addOfferContr'
    })
    .when('/', {
      templateUrl: 'app/account/showOffer/showOffer.html',
      controller: 'showfferContr'
    })
    
    
    .otherwise({redirectTo:'/'})
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
