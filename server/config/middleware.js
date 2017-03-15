var morgan = require('morgan')
var bodyParser = require('body-parser')
module.exports = function (app, express) {
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({ extended: true,limit: '50mb' }));
	app.use(bodyParser.json({limit: '50mb'}));
    app.use(express.static(__dirname + '/../../client'))
}
