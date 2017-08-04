/*var mongoose = require('mongoose');

var reviewSchema =  new mongoose.Schema({
	name : {
		type : String,
		
	},
	ratings : {
		type : Number,
		min : 0,
		max : 5,
		
	},
	review : {
		type : String,
		required : true
	},
	createOn : {
		type : Date,
		"Default" : Date.now
	}

});

var room = new mongoose.Schema({
	type : String,
	number : Number,
	description : String,
	photo : [ String ],
	price : Number
});
var hotelSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	starts : {
		type : Number,
		min : 0,
		max : 5,
		"default" : 0
	},
	services : [ String ],
	descreption : String,
	photo : [ String ],
	currency : String,
	reviews : [ reviewSchema ],
	rooms : [ room ],
	
	location : {
	    address : String,
	    // Always store coordinates longitude (East/West), latitude (North/South) order.
	    coordinates : {
	      type : [Number],
	      index : '2dsphere'
	    }
	  }
});

mongoose.model("HotelsData", hotelSchema, 'hotelData');*/

var mongoose = require('mongoose');