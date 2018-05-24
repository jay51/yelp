const express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	app = express(),
	Campground = require("./modules/campgrounds"),
	Comment = require("./modules/comments"),
	seedDB = require("./seedDB");


mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

// seedDB
// seedDB();

// redirect to index page
app.get("/", function(req, res) {
	console.log("redirect To campgrounds");
	res.redirect("/campgrounds");
});

// index page
app.get("/campgrounds", function(req, res) {
	// find campgrounds from DB
	Campground.find({}, (err, campgrounds) => {
		if (err) return err;
		res.render("campgrounds/index", { campgrounds });
	});
});

// get the form for new campground
app.get("/campgrounds/new", function(req, res) {
	res.render("campgrounds/new");
});


// post route that create new campground and redirect to index page
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


// show a spesific campground
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


app.get("/campgrounds/:id/comments/new", function(req, res) {
	Campground.findById(req.params.id, (err, campground) => {
		if (err) return err;
		res.render("comments/new", { campground });
	});
});


app.post("/campgrounds/:id/comments", function(req, res) {
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



const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("the server has started");
});
