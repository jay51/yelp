const express = require("express"),
	passport = require("passport"),
	User = require("../models/users");

const router = express.Router();

// GET /register
router.get("/register", function(req, res) {
	res.render("auth/register");
});
// POST /register
router.post("/register", function(req, res) {
	const newUser = new User({
		username: req.body.username,
		email: req.body.email
	});

	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			req.flash("error", err.message);
			return res.redirect("register");
		}
		passport.authenticate("local")(req, res, function() {
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

// GET /login
router.get("/login", function(req, res) {
	res.render("auth/login");
});

// POST /login
router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	})
);

// GET /logout
router.get("/logout", function(req, res) {
	req.logout();
	req.flash("success", "Logged out");
	res.redirect("/campgrounds");
});

module.exports = router;
