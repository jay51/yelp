const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", commentsSchema);
