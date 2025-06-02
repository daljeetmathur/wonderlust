const express = require("express");
const router = express.Router();
const listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn ,isOwener ,validatelisting } = require("../middelware.js")

const listingController = require("../controllers/listing.js");
const {storage} = require("../CloudConfig.js")
const multer  = require('multer');
const upload = multer({ storage });

// router.route('/users/:user_id')
router.route('/')
 // index rout
 .get(wrapAsync(listingController.index))
 // creat method 1
 .post(isLoggedIn ,   upload.single('listing[image]'), validatelisting, wrapAsync(listingController.creatlisting));


// creat rout..
router.get("/new", isLoggedIn , listingController.renderform);

// Edit Rout...
router.get("/:id/edit",  isLoggedIn ,   isOwener, wrapAsync(listingController.editListing))

router.route('/:id')
//   show rout..
.get(wrapAsync(listingController.showlisting))
// update  rout
.put(isLoggedIn , isOwener,  upload.single('listing[image]'), wrapAsync(listingController.upadteListing))
// delete rout..
.delete(isLoggedIn ,  isOwener , wrapAsync(listingController.destroyeListing));

module.exports = router;