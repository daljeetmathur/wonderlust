const  Review = require("../models/reviews.js");
const listing = require("../models/listing.js");

// creat review raout
module.exports.creatReview = async (req,res) =>{
    let list = await listing.findById(req.params.id)
    let newreview =  new Review(req.body.Review);
    newreview.author = req.user._id
    console.log(newreview)
    list.reviews.push(newreview);
    await list.save();
    await newreview.save();
    req.flash('success', "review is Add");
    res.redirect(`/listing/${list.id}`)
};

module.exports.ReviewDestroye = async (req ,res) => {
  let { id, reviewId } = req.params ;
    await  listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId  }});
    await  Review.findByIdAndDelete(reviewId);
     req.flash('success', "review is Delete");
    res.redirect(`/listing/${id}`)
};