const listing = require("./models/listing.js");
const { listingschema , reviewschema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const  Review = require("./models/reviews.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("errormsg" , "you must be logged in to creat listing! ");
        return res.redirect("/login");
    }
    next();
}

// servereside validation...
 module.exports.validatelisting = (req, res, next) => {
    let { error } = listingschema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg)
    } else {
        next();
    }
}



// save url for orignal path
module.exports.saveRedirectUrl = (req,res,next) =>{
    if( req.session.redirectUrl){
        res.locals.redirectUrl =  req.session.redirectUrl;
    }
    next();
}

// authorization for listings
module.exports.isOwener = async (req,res,next)=>{
     let { id } = req.params;
     let listings = await listing.findById(id);
     if(!listings.owner.equals(res.locals.currtuser._id)){
         req.flash("errormsg", "You are not owner of this listing!");
        return res.redirect(`/listing/${id}`)
     }
     next();
}


// validatereview middelware
module.exports.validatereview =  (req, res, next) => {
    let { error } = reviewschema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
}


// authorization for listings
module.exports.isReviewAuthor = async (req,res,next)=>{
     let { id , reviewId } = req.params;
     let newreview = await Review.findById(reviewId);
     if(!newreview.author.equals(res.locals.currtuser._id)){
         req.flash("errormsg", "You are not author of this review!");
        return res.redirect(`/listing/${id}`)
     }
     next();
}
