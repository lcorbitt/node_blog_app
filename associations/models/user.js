var mongoose = require('mongoose');

// USER -  email, name, image, blogs, created_at
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	image: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		}
	],
	created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', userSchema);
