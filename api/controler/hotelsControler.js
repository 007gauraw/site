var mongo = require('mongodb'), Server = mongo.Server, Db = mongo.Db, ObjectID = require('mongodb').ObjectID;
var objectid = require('objectid');
var mongoose = require('mongoose');
var Hotel = mongoose.model('HotelsData');

var dbConnection = require("../data/db_connection");
var hotelsData = require("../data/hotel-data.json");

var runGeoQuery = function(req, res) {

	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);

	// A geoJSON point
	var point = {
		type : "Point",
		coordinates : [ lng, lat ]
	};

	var geoOptions = {
		spherical : true,
		maxDistance : 2000,
		num : 5
	};

	Hotel.geoNear(point, geoOptions, function(err, results, stats) {
		console.log('Geo Results', results);
		console.log('Geo stats', stats);
		res.status(200).json(results);
	});

};

module.exports.updateSingleHotel = function(req,res){


	var hotelId = req.params.hotelId;
	
	Hotel.findById(hotelId)
	.select("-reviews -rooms")
	.exec(function(err, doc) {
		if (err) {
			console.log("SHIIIIIIT HAPPENS");
			res.status(500).json(err);
			return;
		}
		if (!doc) {
			res.status(404).json({
				data : "no hotel found"
			});
			return;
		}
		
		doc.name = req.body.name;
		doc.starts = parseInt(req.body.starts);
		doc.services = _spliteArry(req.body.services);
		doc.descreption = req.body.descreption;
		doc.photo = _spliteArry(req.body.photo);
		doc.currency = req.body.currency;
		doc.location = {
			address : req.body.address,
			coordinates : [
			               parseFloat(req.body.lat),
			               parseFloat(req.body.lng)]
		};
		
		
		doc.save(function(err, hotelUpdated){
			if(err){
				res.status(500).json(err);
			}
			res.status(204).json();
			
		});
	});

};

module.exports.getAllHotels = function(req, res) {
	var offSet = 0;
	var count = 5;
	var maxCount = 10;
	if (req.query && req.query.lng && req.query.lat) {
		runGeoQuery(req, res);
		return;

	}

	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);

	}

	if (req.query && req.query.OFSET) {
		offSet = parseInt(req.query.OFSET, 10);
		console.log(offSet);

	}
	if (isNaN(count) || isNaN(offSet)) {
		res.status(400).json({
			error : "Bad query Parameter"
		});
	}
	if (count > maxCount) {
		res.status(400).json({
			error : "got you"
		});
		return;
	}

	Hotel.find().skip(offSet).limit(count).exec(function(err, data) {
		if (err) {
			console.log("SHIIIIIIT HAPPENS");
			res.status(500).json(err);
		}
		console.log(data.length);
		res.json(data);
	});

};

module.exports.getSingleHotel = function(req, res) {

	var hotelId = req.params.hotelId;
	
	Hotel.findById(hotelId).exec(function(err, doc) {
		if (err) {
			console.log("SHIIIIIIT HAPPENS");
			res.status(500).json(err);
			return;
		}
		if (!doc) {
			res.status(404).json({
				data : "no hotel found"
			});
			return;
		}
		
		res.status(200).json(doc);
	});
};

module.exports.addNewHotel = function(req, res) {

	var con = dbConnection.getDbConnection();
	var collection = con.collection("hotelData");
	var newhotel;
	if (req.body && req.body.name && req.body.stars) {
		newhotel = req.body;
		newhotel.stars = parseInt(newhotel.stars, 10);
		collection.insertOne(newhotel, function(err, resdata) {
			if (err) {
				console.log(err);
			}
			console.log(resdata);
			res.json(resdata.ops);

		});

	} else {
		res.status(400).json({
			"err" : "Data missing BC"
		});
	}

};

var _spliteArry = function(input) {
	var output;
	if (input && input.length) {
		output = input.split(":");
	} else {
		output = [];
	}
	return output;
};

module.exports.addNewHotel = function(req, res) {

	Hotel.create(
			{
				name : req.body.name,
				starts : parseInt(req.body.starts),
				services : _spliteArry(req.body.services),
				descreption : req.body.descreption,
				photo : _spliteArry(req.body.photo),
				currency : req.body.currency,
				location : {
					address : req.body.address,
					coordinates : [ parseFloat(req.body.lat),
							parseFloat(req.body.lng) ]

				}
			}, function(err, doc) {
				if (err) {
					res.status(400).json(err);
					return;
				}

				res.status(201).json(doc);

			});
};

module.exports.deleteSingleHotel = function(req, res){
	console.log("-------------going To delete hotel");
	var hotelId = req.params.hotelId;
	
	Hotel.findByIdAndRemove(hotelId)
	.exec(function(err, hotel){
		if(err){
			res.status(404).json(err);
			return;
		}  
		console.log("deleted Hotel Id" + hotelId);
		res.status(204).json();
		
	});
};