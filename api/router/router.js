var express = require("express");
//var hotelCntrl = require("../controler/hotelsControler.js");


var router = express.Router();

/*router.route('/hotels')
	.get(hotelCntrl.getAllHotels)
	.post(hotelCntrl.addNewHotel);

router.route('/hotels/:hotelId')
	.get(hotelCntrl.getSingleHotel)
	.put(hotelCntrl.updateSingleHotel);

router.route('/hotels/:hotelId/delete').get(hotelCntrl.deleteSingleHotel);

router.route('/hotels/:hotelId/review')
	.get(reviewCntrl.getAllReview)
	.post(userCntrl.authenticate ,reviewCntrl.saveReview)
	.put(reviewCntrl.updateReview);
	
router.route('/hotels/:hotelId/review/:reviewId/delete').get(reviewCntrl.deleteSingleReview);

router.route('/hotels/:hotelId/review/:reviewId')
	.get(reviewCntrl.getSingleReview);

router.route('/users/register')
.post(userCntrl.register);

router.route('/users/login')
.post(userCntrl.login);

*/
module.exports = router;
