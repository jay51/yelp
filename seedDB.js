const mongoose = require("mongoose");
const Campground = require("./models/campgrounds");
const Comment = require("./models/comments");



const data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    {
        name: "Desert Mesa",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
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
