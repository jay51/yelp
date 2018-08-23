let express = require("express"),
    Campground = require("../models/campgrounds");

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
router.get("/new", function(req, res) {
    res.render("campgrounds/new");
});

// POST create new campground and redirect to index page
router.post("/", function(req, res) {
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
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id)
        .populate("comments")
        .exec((err, foundCampground) => {
            if (err) return err;
            res.render("campgrounds/show", { foundCampground });
        });
});


module.exports = router;
