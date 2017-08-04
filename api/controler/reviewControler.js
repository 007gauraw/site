var mongoose = require('mongoose');
var Hotel = mongoose.model('HotelsData');

module.exports.getAllReview = function(req, res) {

	var hotelId = req.params.hotelId;
	
	
	Hotel.findById(hotelId).select("reviews").exec(function(err, doc) {
		if (err) {
			console.log("  --> " + err);
		}

		console.log(doc);
		res.status(200).json(doc);
	});

};

module.exports.getSingleReview = function(req, res) {
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	Hotel.findById(hotelId).select("reviews").exec(function(err, hotel) {
		if (err) {
			console.log("  --> " + err);
		}
		var review = hotel.reviews.id(reviewId);
		console.log(review);
		res.status(200).json(review);
	});

};

var _addReview = function(req, res, hotel) {

	console.log("Name---> " +req.body.name);
	console.log("Ratings---> " +req.body.ratings);
	console.log("Review---> " +req.body.review);
	
	
	hotel.reviews.push({
		name : req.body.name,
		ratings : parseInt(req.body.ratings),
		review : req.body.review
	});
	
	/*hotel.reviews.push({
		name : "Name is awsome",
		ratings : parseInt("2"),
		review : "awsome as name"
	});*/
	

	hotel.save(function(err, updatedHotel) {
		if (err) {
			console.log("-----------------Hotel After Save updated-----------------");
			console.log(err);
			console.log("---------------------------------");
			
			res.status(500).json(err);
		} else {
			res.status(200).json(
					updatedHotel.reviews[updatedHotel.reviews.length - 1]);
		}
	});
};

module.exports.updateReview = function(req,res){

	  var hotelId = req.params.hotelId;
	  var reviewId = req.params.reviewId;
	  console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

	  Hotel
	    .findById(hotelId)
	    .select('reviews')
	    .exec(function(err, hotel) {
	      var thisReview;
	      var response = {
	        status : 200,
	        message : {}
	      };
	      if (err) {
	        console.log("Error finding hotel");
	        response.status = 500;
	        response.message = err;
	      } else if(!hotel) {
	        console.log("Hotel id not found in database", hotelId);
	        response.status = 404;
	        response.message = {
	          "message" : "Hotel ID not found " + hotelId
	        };
	      } else {
	        // Get the review
	        thisReview = hotel.reviews.id(reviewId);
	        // If the review doesn't exist Mongoose returns null
	        if (!thisReview) {
	          response.status = 404;
	          response.message = {
	            "message" : "Review ID not found " + reviewId
	          };
	        }
	      }
	      if (response.status !== 200) {
	        res
	          .status(response.status)
	          .json(response.message);
	      } else {
	        thisReview.name = req.body.name;
	        thisReview.rating = parseInt(req.body.rating, 10);
	        thisReview.review = req.body.review;
	        hotel.save(function(err, hotelUpdated) {
	          if (err) {
	            res
	              .status(500)
	              .json(err);
	          } else {
	            res
	              .status(204)
	              .json();
	          }
	        });
	      }
	    });
};

module.exports.saveReview = function(req, res) {

	var hotelId = req.params.hotelId;
	Hotel.findById(hotelId).select('reviews').exec(function(err, doc) {
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
		_addReview(req, res, doc);
	});

};


module.exports.deleteSingleReview = function(req,res){

	console.log("-------------going to delete review");
	  var hotelId = req.params.hotelId;
	  var reviewId = req.params.reviewId;
	  console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

	  Hotel
	    .findById(hotelId)
	    .select('reviews')
	    .exec(function(err, hotel) {
	      var thisReview;
	      var response = {
	        status : 200,
	        message : {}
	      };
	      if (err) {
	        console.log("Error finding hotel");
	        response.status = 500;
	        response.message = err;
	      } else if(!hotel) {
	        console.log("Hotel id not found in database", hotelId);
	        response.status = 404;
	        response.message = {
	          "message" : "Hotel ID not found " + hotelId
	        };
	      } else {
	        // Get the review
	        thisReview = hotel.reviews.id(reviewId);
	        // If the review doesn't exist Mongoose returns null
	        if (!thisReview) {
	          response.status = 404;
	          response.message = {
	            "message" : "Review ID not found " + reviewId
	          };
	        }
	      }
	      if (response.status !== 200) {
	        res
	          .status(response.status)
	          .json(response.message);
	      } else {
	    	  
	    	hotel.reviews.id(reviewId).remove();
	        hotel.save(function(err, hotelUpdated) {
	          if (err) {
	            res
	              .status(500)
	              .json(err);
	          } else {
	            res
	              .status(204)
	              .json();
	          }
	        });
	      }
	    });

};
