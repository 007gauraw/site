var mongooes = require('mongoose');

/*
var userSchema = new mongooes.Schema({
	username : {
		type : String,
		
		required : true
	},

	password : {
		type : String,
		required : true
	}
});
*/
mongooes.model('User',userSchema);