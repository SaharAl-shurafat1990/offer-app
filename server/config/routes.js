var userController = require('../Database/User/UserController.js');
module.exports = function (app, express) {
app.post('/api/users/signup', userController.signup);
app.post('/api/users/signin', userController.signin);
	
}


