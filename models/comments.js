const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
    author: String,
    text: String
});
// if you need to import this, import it as Comment, so you don't lose track of what's happening.
module.exports = mongoose.model("Comment", commentsSchema);
