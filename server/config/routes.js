var handlers=require('../handlers.js');
module.exports = function (app, express) {
	app.post('/api/users/signup', handlers.handleUsers.signup);
app.post('/api/users/signin', handlers.handleUsers.signin);
	
}


