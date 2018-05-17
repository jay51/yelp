const express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	app = express(),
	Campground = require("./modules/campgrounds"),
	seedDB = require("./seedDB");


mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(express.static("public"));
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
		res.render("index", { campgrounds });
	});
});

// post route that create new campground and redirect to index page
app.post("/campgrounds", function(req, res) {
	//get data from form and add to campgrounds DB
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.descreption;
	// add campground to DB
	Campground.create({
		name: name,
		image: image
	}, (err, camp) => console.log(err ? err : camp));

	//redirect back to index page
	res.redirect("/campgrounds");
});

// get the form for new campground
app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});


// show a spesific campground
app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id)
		.populate("comments")
		.exec((err, foundCampground) => {
			if (err) return err;
			console.log(foundCampground);
			res.render("show", { foundCampground });
		});
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("the server has started");
});
