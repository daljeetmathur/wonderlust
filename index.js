if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}
// console.log(process.env.SECRET) 

const express = require("express")
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")

// Raouter 
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

let dburl = process.env.MONGO_URL;

main().then((res) => {
    console.log(" DB connnection is connected")
}).catch(err => console.log(err));

async function main() {
    return await mongoose.connect(dburl);
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// MongoStore session
const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
})

store.on("error",()=>{
    console.log("mongo url session store error", err);
})

// express session
let sessionoption = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7000 * 24 * 60 * 60 * 1000,
        maxAge: 7000 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

// express-session
app.use(session(sessionoption));
app.use(flash());

// passport
app.use(passport.initialize());
app.use(passport.session());

// passport-local-mongoose
passport.use(new LocalStrategy(User.authenticate()));
// passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.successmsg = req.flash("success");
    res.locals.errormsg = req.flash("errormsg");
    res.locals.currtuser = req.user;
    next();
})

// Raouter Middlerware
app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewRouter);
app.use("/", userRouter)


// Catch-all route for undefined routes
app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 404, message = "something went wrong" } = err;
    res.status(statusCode).render("listings/error.ejs", { message })
});


app.listen(8080, (req, res) => {
    console.log("port is listinig")
})