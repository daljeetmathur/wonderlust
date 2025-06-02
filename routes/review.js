const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const  Review = require("../models/reviews.js");
const listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { validatereview ,isLoggedIn ,isReviewAuthor } = require("../middelware.js")

const ReviewController = require("../controllers/review.js")


// reviews routs 
router.post("/"  , isLoggedIn, validatereview ,  wrapAsync(ReviewController.creatReview ));

// reviews delete rout
router.delete("/:reviewId",  isLoggedIn, isReviewAuthor, wrapAsync(ReviewController.ReviewDestroye ))

module.exports = router ;

