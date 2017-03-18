var offerController = require('../Database/Offer/OfferController.js')
var companyController = require('../Database/Company/CompanyController.js')

var passport = require('passport')


module.exports = function (app) {
    app.post('/api/companies/signup', companyController.handleUsers.signup)
    app.post('/api/companies/signin', companyController.handleUsers.signin)
    app.get('/api/companies/', companyController.handleUsers.getUsers)
    app.get('/api/offers/' , offerController.handleOffers.getAll)
    
    // app.post('/api/getoffer',offerController.getOffer);
    app.post('/api/delete', offerController.handleOffers.deleteOffer);
    app.post('/api/offers/addoffer' , offerController.handleOffers.addOffer)
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
}
