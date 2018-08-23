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
    const newUser = new User({ username: req.body.username, email: req.body.email });

    User.register(newUser, req.body.password, function(err, user) {
        if (err) return console.log(err) || res.render("auth/register");

        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        });
    });
});


// GET /login
router.get("/login", function(req, res) {
    res.render("auth/login");
});

// POST /login
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {

});

// GET /logout
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/login");
}

module.exports = router;
