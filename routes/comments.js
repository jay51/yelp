const express = require("express"),
	Campground = require("../models/campgrounds"),
	Comment = require("../models/comments"),
	mid = require("../middleware");

const router = express.Router({ mergeParams: true }); // mergeParams enable us to accesse the params inside our routes.
// GET /new form
router.get("/new", mid.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, (err, campground) => {
		if (err || !campground) {
			req.flash("error", "campground not found");
			res.redirect("..");
		} else {
			res.render("comments/new", { campground });
		}
	});
});

// POST /  create new comment
router.post("/", mid.isLoggedIn, function(req, res) {
	// find campground
	Campground.findById(req.params.id, (err, campground) => {
		if (err || !campground) {
			req.flash("error", "Something went wrong!");
			return res.redirect("/campgrounds");
		} else {
			// add comment to DB
			Comment.create(req.body.comment, (err, comment) => {
				if (err) return err;
				console.log(req.user);
				// save the current user info
				comment.author.id = req.user._id;
				comment.author.username = req.user.username;
				comment.save();

				campground.comments.push(comment);
				campground.save();
				req.flash("success", "Successfully added comment");
				res.redirect(`/campgrounds/${req.params.id}`);
			});
		}
	});
});

// GET edit form
router.get("/:comment_id/edit", mid.checkCommentOwnerShip, function(req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if (err) return res.redirect("/campgrounds");
		else {
			return res.render("comments/edit", {
				campgroundId: req.params.id,
				comment: foundComment
			});
		}
	});
});

// POST /comment_id edit comments
router.put("/:comment_id", mid.checkCommentOwnerShip, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(
		err,
		comment
	) {
		if (err) return res.redirect("back");
		else {
			return res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});

router.delete("/:comment_id", mid.checkCommentOwnerShip, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if (err) return res.redirect("back");
		else {
			req.flash("success", "Comment deleted");
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});

module.exports = router;
