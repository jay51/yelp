const mongoose = require("mongoose");
// const Comment = require("./comments");


// DB schema
const campgroundsSchema = mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

// DB model 
module.exports = mongoose.model("campgrounds", campgroundsSchema);

// // first campground
// Campground.create({
// 	name:"big hells",
// 	image:"https://cdn.pixabay.com/photo/2017/10/07/01/01/bach-leek-2825197__340.jpg",
// 	description:"nice view and water. No bath rooms but beatfull nature"

// }, (err, camp)=> console.log(err ? err : camp ));
