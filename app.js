const express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	app = express(),
	seedDB = require("./seedDB"), // remove this later
	flash = require("connect-flash"),
	passport = require("passport"),
	localStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	User = require("./models/users");

const commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

mongoose.connect("mongodb://mongo:27017/yelp_camp");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// PASSPORT CONFIG
app.use(
	require("express-session")({
		secret: "random text to make the passport stronger and harder to guess",
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");

	next();
});

// ROUTES WILL FOWLL UNDER HERE!
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes); // the string in front will be appended to all campgroundRoutes
app.use("/", indexRoutes);
// app.get("/", function(req, res) {
// 	res.send("<h1> root page</h1>");
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("the server has started");
});
