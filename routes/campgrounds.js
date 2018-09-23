let express = require("express"),
	Campground = require("../models/campgrounds"),
	mid = require("../middleware");

const router = express.Router();
// GET /campgrounds
router.get("/", function(req, res) {
	// find campgrounds from DB
	Campground.find({}, (err, campgrounds) => {
		if (err) return err;
		res.render("campgrounds/index", { campgrounds });
	});
});

// GET FORM /campgrounds/new
router.get("/new", mid.isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
});

// POST create new campground and redirect to index page
router.post("/", mid.isLoggedIn, function(req, res) {
	//get data from form and add to campgrounds DB
	let name = req.body.name;
	let image = req.body.image;
	let description = req.body.description;
	let author = { username: req.user.username, id: req.user._id };
	// add campground to DB
	Campground.create(
		{
			name,
			image,
			description,
			author
		},
		(err, camp) => (err ? res.redirect("back") : camp)
	);
	//redirect back to index page
	res.redirect("/campgrounds");
});

// GET EDIT CAMPGROUND
router.get("/:id/edit", mid.checkCampgroundOwnerShip, function(req, res) {
	// find campground to update
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err || !foundCampground) {
			return res.redirect("back");
		} else {
			res.render("campgrounds/edit", { foundCampground });
		}
	});
});

// PUT UPDATE CAMPGROUND
router.put("/:id", mid.checkCampgroundOwnerShip, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
		err,
		updatedCampground
	) {
		if (err) return res.redirect("/campgrounds");

		res.redirect(`/campgrounds/${req.params.id}`);
	});
});

// DELETE DESTORY CAMPGROUND
router.delete("/:id", mid.checkCampgroundOwnerShip, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if (err) return console.log(err) || res.redirect("/campgrounds");
		return res.redirect("/campgrounds");
	});
});

// GET get spesific campground
router.get("/:id", function(req, res) {
	Campground.findById(req.params.id)
		.populate("comments")
		.exec((err, foundCampground) => {
			if (err || !foundCampground) {
				req.flash("error", "Campground Not found !");
				return res.redirect("/campgrounds");
			} else {
				res.render("campgrounds/show", { foundCampground });
			}
		});
});

module.exports = router;
