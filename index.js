//var con = require("./api/data/db_connection").openDbConnection();
var con = require("./api/data/dbCon.js");
var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
var rout = require('./api/router/router');

app.set('port', 8080);


//

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules',express.static(__dirname + '/node_modules' ));
app.use(bodyParser.urlencoded({
	extended : false
}));
app.use(bodyParser.json());

// order is very importanr now we are using body parser to run before any rout
// execute

app.use('/api', rout);

var server = app.listen(app.get('port'), function() {
	console.log("listing on port " + server.address().port);
});