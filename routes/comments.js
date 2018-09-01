const express = require("express"),
    Campground = require("../models/campgrounds"),
    Comment = require("../models/comments"),
    mid = require("../middleware");

const router = express.Router({ mergeParams: true }); // mergeParams wiil enable us to accesse the params inside our routes.

router.get("/new", mid.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) return err;
        res.render("comments/new", { campground });
    });
});


router.post("/", mid.isLoggedIn, function(req, res) {
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



module.exports = router;
