const Campground = require("../models/campgrounds");
const Comment = require("../models/comments");

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "please Login first!");
	return res.redirect("/login");
}

function checkCampgroundOwnerShip(req, res, next) {
	// check for authentication
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if (err || !foundCampground) {
				req.flash("error", "Campground Not found!");
				return res.redirect("/campgrounds");
			} else {
				// check if campground belongs to authoer
				if (foundCampground.author.id.equals(req.user._id)) return next();
				else {
					req.flash("error", "You don't have permission to do that!");
					return res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "please Login first!");
		console.log("campground owner ship!");
		res.redirect("back");
	}
}

function checkCommentOwnerShip(req, res, next) {
	// check for authentication
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if (err || !foundComment) {
				req.flash("error", "Something went wrong!");
				return res.redirect("/campgrounds");
			} else {
				// check if Comment belongs to authoer
				if (foundComment.author.id.equals(req.user._id)) return next();
				else {
					req.flash("error", "You don't have permission to do that!");
					return res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "please Login first!");
		res.redirect("back");
	}
}

module.exports = {
	isLoggedIn,
	checkCampgroundOwnerShip,
	checkCommentOwnerShip
};
