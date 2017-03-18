var offerController = require('../Database/Offer/OfferController.js')
var companyController = require('../Database/Company/CompanyController.js')

var passport = require('passport')


module.exports = function (app) {
/////////////////// user routs //////////////////////////

    app.post('/api/users/signup', userController.signup)
    app.post('/api/users/signin', userController.signin)
    app.get('/api/users/', userController.getAll)

/////////////////// companies routs ////////////////////

    app.post('/api/companies/signup', companyController.handleUsers.signup)
    app.post('/api/companies/signin', companyController.handleUsers.signin)
    app.get('/api/companies/', companyController.getAll)
    app.post('/api/sendemail', companyController.sendemail);
    app.get('/api/companies/', companyController.handleUsers.getUsers)
    app.post('/api/companies/delete', companyController.deleteD)
    app.post('/api/deactive', companyController.deactive);

///////////////////// offer rounts /////////////////////
    app.get('/api/offers/' , offerController.getAll)
    app.put('/api/updateOffer/:id',offerController.updateOffer);
    app.post('/api/delete', offerController.handleOffers.deleteOffer);
    app.post('/api/offers/addoffer' , offerController.handleOffers.addOffer)

    // app.post('/api/getoffer',offerController.getOffer);
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
}
