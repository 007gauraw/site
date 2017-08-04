var mongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://localhost:27017/hotelData";
var _connection;

var openConnection = function() {
	mongoClient.connect(dbUrl, function(err, db){
		if(err){
			console.log(err);
		}
		_connection = db;
		console.log("Coonection open succesfully ");
	});
};

var getConnection = function() {
	return _connection;
};

module.exports = {
	openDbConnection : openConnection,
	getDbConnection : getConnection
};