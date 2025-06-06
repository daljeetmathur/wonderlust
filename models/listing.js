const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  Review = require("./reviews.js");
const listingschema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: String,
        filename: String
    },

    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    reviews : [
        { type: Schema.Types.ObjectId, ref: 'Review' }
    ],
    owner: {
        type : Schema.Types.ObjectId , ref: 'User'
    },
    geometry :  {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});


listingschema.post("findOneAndDelete" , async (listing) =>{
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews  }})
  }
})

const listing = mongoose.model("listing", listingschema)

module.exports = listing;

