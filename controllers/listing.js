const listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


//  index routs
module.exports.index = async (req, res) => {
    let allListing = await listing.find({});
    res.render("listings/index.ejs", { allListing });
}

// new routs
module.exports.renderform = (req, res) => {
    res.render("listings/new.ejs")
}

// creat routs
module.exports.creatlisting = async (req, res, next) => {
    let risponse = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 2
    })
        .send()

    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "..", filename)
    let { id } = req.params;
    let newdata = new listing(req.body.listing);
    console.log(req.user)
    newdata.owner = req.user._id;
    newdata.image = { url, filename }
    newdata.geometry = risponse.body.features[0].geometry;
    let result = await newdata.save()
    console.log(result);

    req.flash('success', "listnig is created");
    return res.redirect("/listing");
    console.log(newdata)
};


// show routs
module.exports.showlisting = async (req, res) => {
    let { id } = req.params;
    let listings = await listing.findById(id).populate({ path: 'reviews', populate: { path: "author" } }).populate("owner");
    if (!listings) {
        req.flash('errormsg', "listnig is not found");
        return res.redirect("/listing")
    }
    console.log(listings);
    res.render("listings/show.ejs", { listings })
};

// edit routs
module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let listings = await listing.findById(id);
    if (!listings) {
        req.flash('errormsg', "listnig is not found");
        return res.redirect("/listing")
    }
    let orignalImage = listings.image.url;
    orignalImage = orignalImage.replace("/upload", "/upload/h_250,w_250");

    return res.render("listings/edit.ejs", { listings, orignalImage });
};

// upate routs
module.exports.upadteListing = async (req, res) => {
    if (!req.body) {
        throw new ExpressError(400, "send valid data for listing")
    }

    let { id } = req.params;
    let updatelisting = await listing.findByIdAndUpdate(id, { ...req.body.listing })
    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        updatelisting.image = { url, filename }
        await updatelisting.save();
    }
    req.flash('success', "listnig is Edited");
    res.redirect(`/listing/${id}`)
};

// destroye routs
module.exports.destroyeListing = async (req, res) => {
    let { id } = req.params;
    let deledata = await listing.findByIdAndDelete(id);
    console.log(deledata);
    req.flash('success', "listnig is Deleted");
    res.redirect("/listing")

};