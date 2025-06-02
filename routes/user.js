const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middelware.js")

const UserController = require("../controllers/user.js")

router.route('/signup')
// sginup form  
.get(UserController.signupForm)
// signup user
.post(wrapAsync(UserController.signUser));

router.route('/login')
// login form
.get(UserController.loginForm)
// logged user
.post(saveRedirectUrl, 
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), UserController.loggedUser)

 // logout
router.get("/logout", UserController.logout)

module.exports = router;