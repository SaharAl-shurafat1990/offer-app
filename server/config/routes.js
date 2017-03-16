var userController = require('../Database/User/UserController.js')
var offerController = require('../Database/Offer/OfferController.js')
var companyController = require('../Database/Company/CompanyController.js')
var passport = require('passport')

module.exports = function (app) {
    app.post('/api/users/signup', userController.signup)
    app.post('/api/users/signin', userController.signin)
    app.get('/api/users/', userController.getAll)
    app.post('/api/companies/signup', companyController.signup)
    app.post('/api/companies/signin', companyController.signin)
    app.post('/api/companies/delete', companyController.deleteD)
    app.get('/api/companies/', companyController.getAll)
    app.get('/api/offers/' , offerController.getAll)
    app.put('/api/updateOffer/:id',offerController.updateOffer);
    // app.post('/api/getoffer',offerController.getOffer);
    app.delete('/api/deleteoffer/:id', offerController.deleteOffer);
    app.post('/api/offers/addoffer' , offerController.addOffer)
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
}
