var mongoose = require("mongoose");
var dbUrl = "mongodb://localhost:27017/hotelData";
var _connection;

mongoose.connect(dbUrl);

mongoose.connection.on('connected', function(){
	console.log("Connected succesfilly ");
});

mongoose.connection.on('disconnected', function(){
	console.log("Disconnected Succesfully");
});

mongoose.connection.on('error', function(err){
	console.log("errrrr Succesfully" + err);
});

process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		console.log("Disconnected");
		process.exit(0);
	});
	
});

//Bring Svhema

//require('./hotelModule');
//require('./userModule');