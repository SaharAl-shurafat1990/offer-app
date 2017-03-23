'use strict';

describe('Routing', function () {
  var $route;
  beforeEach(module('offers'));

  beforeEach(inject(function ($injector) {
    $route = $injector.get('$route');
  }));
  //sign in and sign up for user
  it('Should have /signup route, template, and controller', function () {
    expect($route.routes['/signup']).to.be.defined;
    expect($route.routes['/signup'].controller).to.equal('AuthController');
    expect($route.routes['/signup'].templateUrl).to.equal('app/account/signup.html');
  });

  it('Should have /signin route, template, and controller', function () {
    expect($route.routes['/signin']).to.be.defined;
    expect($route.routes['/signin'].controller).to.equal('AuthController');
    expect($route.routes['/signin'].templateUrl).to.equal('app/account/signin.html');
  });
  it('Should have /signout route, template, and controller', function () {
    expect($route.routes['/signout']).to.be.defined;
    expect($route.routes['/signout'].controller).to.equal('AuthController');
    expect($route.routes['/signout'].templateUrl).to.equal('app/account/signout.html');
  });
  //sign in ans sign up for company
  it('Should have /signupCom route, template, and controller', function () {
    expect($route.routes['/signupCom']).to.be.defined;
    expect($route.routes['/signupCom'].controller).to.equal('comAuthController');
    expect($route.routes['/signupCom'].templateUrl).to.equal('app/account/signupCom.html');
  });
  it('Should have /signupCom route, template, and controller', function () {
    expect($route.routes['/signinCom']).to.be.defined;
    expect($route.routes['/signinCom'].controller).to.equal('comAuthController');
    expect($route.routes['/signinCom'].templateUrl).to.equal('app/account/signinCom.html');
  });
  it('Should have /addOffer route, template, and controller', function () {
    expect($route.routes['/addOffer']).to.be.defined;
    expect($route.routes['/addOffer'].controller).to.equal('addOfferContr');
    expect($route.routes['/addOffer'].templateUrl).to.equal('app/account/addOffer/addOffer.html');
  });
  it('Should have /showOffer route, template, and controller', function () {
    expect($route.routes['/showOffer']).to.be.defined;
    expect($route.routes['/showOffer'].controller).to.equal('addOfferContr');
    expect($route.routes['/showOffer'].templateUrl).to.equal('app/account/showOffer/showOffer.html');
  });
  it('Should have /verification route, template, and controller', function () {
    expect($route.routes['/verification']).to.be.defined;
    expect($route.routes['/verification'].controller).to.equal('verificationController');
    expect($route.routes['/verification'].templateUrl).to.equal('app/account/verification/verification.html');
  });
  it('Should have /profile route, template, and controller', function () {
    expect($route.routes['/profile']).to.be.defined;
    expect($route.routes['/profile'].controller).to.equal('ProfileController');
    expect($route.routes['/profile'].templateUrl).to.equal('app/account/profile/profile.html');
  });

});
