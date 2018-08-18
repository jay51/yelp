const express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	app = express(),
	Campground = require("./models/campgrounds"),
	Comment = require("./models/comments"),
	seedDB = require("./seedDB"),
	passport = require("passport"),
	localStrategy = require("passport-local"),
	User = require("./models/users");


mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
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
// redirect to index page
app.get("/", function(req, res) {
	console.log("redirect To campgrounds");
	res.redirect("/campgrounds");
});

// GET /campgrounds
app.get("/campgrounds", function(req, res) {
	// find campgrounds from DB
	Campground.find({}, (err, campgrounds) => {
		if (err) return err;
		res.render("campgrounds/index", { campgrounds });
	});
});

// GET FORM /campgrounds/new
app.get("/campgrounds/new", function(req, res) {
	res.render("campgrounds/new");
});

// POST create new campground and redirect to index page
app.post("/campgrounds", function(req, res) {
	//get data from form and add to campgrounds DB
	let name = req.body.name;
	let image = req.body.image;
	// add campground to DB
	Campground.create({
		name,
		image
	}, (err, camp) => console.log(err ? err : camp));

	//redirect back to index page
	res.redirect("/campgrounds");
});


// GET get spesific campground
app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id)
		.populate("comments")
		.exec((err, foundCampground) => {
			if (err) return err;
			console.log(foundCampground);
			res.render("campgrounds/show", { foundCampground });
		});
});


// =====================
// COMMENTS ROUTES
// =====================
// GET /campgrounds/camp/commments/new
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, (err, campground) => {
		if (err) return err;
		res.render("comments/new", { campground });
	});
});


app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
	// find campground
	Campground.findById(req.params.id, (err, campground) => {
		if (err) return err; // need to handle err better
		// add comment to DB
		Comment.create(req.body.comments, (err, comment) => {
			if (err) return err;
			campground.comments.push(comment);
			campground.save();
			res.redirect(`/campgrounds/${req.params.id}`);
		});
	});
});


// =====================
//  Auth Routes
// =====================

// GET /register
app.get("/register", function(req, res) {
	res.render("auth/register");
});
// POST /register
app.post("/register", function(req, res) {
	const newUser = new User({ username: req.body.username, email: req.body.email });

	User.register(newUser, req.body.password, function(err, user) {
		if (err) return console.log(err) || res.render("auth/register");

		passport.authenticate("local")(req, res, function() {
			res.redirect("/campgrounds");
		});
	});
});


// GET /login
app.get("/login", function(req, res) {
	res.render("auth/login");
});

// POST /login
app.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res) {

});

// GET /logout
app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/campgrounds");
});


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.redirect("/login");
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("the server has started");
});
