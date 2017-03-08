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
});
