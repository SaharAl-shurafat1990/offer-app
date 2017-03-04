var mongoose = require('mongoose');

var mongoURI = process.env.MONGODB_URI ||'mongodb://localhost/offerDB';
mongoose.connect(mongoURI);
db = mongoose.connection;

db.once('open',function () {
	console.log('mongoDB is open');
});
