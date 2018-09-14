const Campground = require("../models/campgrounds");
const Comment = require("../models/comments");

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/login");
}

function checkCampgroundOwnerShip(req, res, next) {
    // check for authentication
    if (req.isAuthenticated()) {

        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) return res.redirect("back")
            else {
                // check if campground belongs to authoer
                if (foundCampground.author.id.equals(req.user._id)) return next();
                else { return res.redirect("back") }
            }
        });
    }
    else {
        res.redirect("back")
    }
}

function checkCommentOwnerShip(req, res, next) {
    // check for authentication
    if (req.isAuthenticated()) {

        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) return res.redirect("back")
            else {
                // check if Comment belongs to authoer
                if (foundComment.author.id.equals(req.user._id)) return next();
                else { return res.redirect("back") }
            }
        });
    }
    else {
        res.redirect("back")
    }


}


module.exports = {
    isLoggedIn,
    checkCampgroundOwnerShip,
    checkCommentOwnerShip
};
