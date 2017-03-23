var offerController = require('../Database/Offer/OfferController.js')
var companyController = require('../Database/Company/CompanyController.js')
var CommentController = require('../Database/Comments/CommentController.js')


var passport = require('passport')


module.exports = function (app) {
/////////////////// user routs //////////////////////////

    // app.post('/api/users/signup', userController.signup)
    // app.post('/api/users/signin', userController.signin)
    // app.get('/api/users/', userController.getAll)

/////////////////// companies routes ////////////////////

    app.post('/api/companies/signup', companyController.handleUsers.signup)
    app.post('/api/companies/signin', companyController.handleUsers.signin)
    // app.post('/api/sendemail', companyController.sendemail);
    app.get('/api/companies/', companyController.handleUsers.getUsers)
    app.get('/api/companies/checkcode/:code',companyController.handleUsers.checkcode)

///////////////////// offer routes /////////////////////
    app.get('/api/offers/' , offerController.handleOffers.getAll)
    app.post('/api/delete', offerController.handleOffers.deleteOffer);
    app.post('/api/offers/addoffer' , offerController.handleOffers.addOffer)

//////////////////// Commnets routes ///////////////////

    app.post('/api/insertC',CommentController.insert);
		app.post('/api/allC/:id',CommentController.getAllCommentsByOfferID);


    // app.post('/api/getoffer',offerController.getOffer);
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
}
