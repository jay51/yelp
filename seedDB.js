const mongoose = require("mongoose");
const Campground = require("./modules/campgrounds");
const Comment = require("./modules/comments");



const data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    }
]

// make comment and push it to the campground passed
const makeComment = campground => Comment.create({
    author: "jay",
    text: "this place is awesome but i wish there was internet in here!",
}, (err, newComment) => {

    err ? console.log(err) : console.log("new comment created");
    // push comments
    campground.comments.push(newComment);
    campground.save();
});

// make campground and call makeComment on each campground
const makeCampgrounds = () => data.map((camp) =>

    Campground.create(camp, (err, newCamp) => {

        err ? console.log(err) : console.log("created campgrounds")

        // make the comments
        console.log("making comments");
        makeComment(newCamp);

    })
);

// main- Removes and addes new campgrounds and comments
const seedDB = () => {
    Campground.remove({}, err => {
        err ? console.log(err) : console.log("removed all campgrounds");
        makeCampgrounds();

    });
}


module.exports = seedDB;
