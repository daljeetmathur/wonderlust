const User = require("../models/user.js");


// render form
module.exports.signupForm = (req, res) => {
    res.render("user/signup.ejs")
};

// signup
module.exports.signUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let registerdUser = new User({ username, email })
        let data = await User.register(registerdUser, password);
        console.log(data);
        req.login(registerdUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Wellcome to Wonderlust!");
            res.redirect("/listing")
        })
    } catch (e) {
        req.flash("errormsg", e.message);
        res.redirect("/signup");
    }

};

// login form
module.exports.loginForm = (req, res) => {
    res.render("user/login.ejs");
};

// logged user
module.exports.loggedUser = async (req, res) => {
    req.flash("success", "Wellcome Back To Wonderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listing"
    return res.redirect(redirectUrl);
};

// logout
module.exports.logout =  (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        req.flash("success", " you are logged out now!")
        res.redirect("/listing")
    })
};