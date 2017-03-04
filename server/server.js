var express = require('express');
var app = express();
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);


//=============================================================================
/*									Server   								 */
//=============================================================================
	var port = 8000;
	app.listen(port , function () {
		console.log('...Server now listening on port ' + port);
	});


module.exports = app;