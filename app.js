const express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	app = express(),
	seedDB = require("./seedDB"),
	passport = require("passport"),
	localStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	User = require("./models/users");

const commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.use(methodOverride("_method"));
// seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
	secret: "random text to make the passport stronger and harder to guess",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});


// ROUTES WILL FOWLL UNDER HERE!
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes); // the string in front will be appended to all campgroundRoutes
app.use("/", indexRoutes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("the server has started");
});
