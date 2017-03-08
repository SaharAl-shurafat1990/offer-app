var express = require('express')
var mongoose = require('mongoose')
var app = express()

require('./config/middleware.js')(app, express)
require('./config/routes.js')(app, express)

//=============================================================================
/*									Database								 */
//=============================================================================

var mongoURI ='mongodb://localhost/offerDB'
var db = mongoose.connect(mongoURI)
db = mongoose.connection

db.once('open',function () {
	// console.log('mongoDB is open'); //ignore
})

//=============================================================================
/*									Server   								 */
//=============================================================================
var port = 8000
app.listen(port ,function () {
	// console.log('ready at ' + port);
})


module.exports = app
