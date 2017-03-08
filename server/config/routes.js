var userController = require('../Database/User/UserController.js')
var companyController = require('../Database/Company/CompanyController.js')

module.exports = function (app) {
    app.post('/api/users/signup', userController.signup)
    app.post('/api/users/signin', userController.signin)
    app.get('/api/users/', userController.getAll)
    app.post('/api/companies/signup', companyController.signup)
    app.post('/api/companies/signin', companyController.signin)
    app.post('/api/companies/delete', companyController.deleteD)
    app.get('/api/companies/', companyController.getAll)
}
