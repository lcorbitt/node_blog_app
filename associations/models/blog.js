var mongoose = require('mongoose');

// BLOG -  title, image, body, created_at
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Blog', blogSchema);
