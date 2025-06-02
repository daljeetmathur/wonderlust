const Joi = require('joi');
const reviews = require('./models/reviews');

module.exports.listingschema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        price : Joi.number().required().min(0),
        description : Joi.string().required(),
        country : Joi.string().required(),
        location : Joi.string().required(),
        image: Joi.string().allow("", null)
    }).required()
})

module.exports.reviewschema = Joi.object({
    Review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        Comment : Joi.string().required(),
    }).required()
})