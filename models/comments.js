const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});
// if you need to import this, import it as Comment, so you don't lose track of what's happening.
module.exports = mongoose.model("Comment", commentsSchema);
