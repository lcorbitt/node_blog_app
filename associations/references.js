var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	expressSanitizer = require('express-sanitizer'),
	mongoose = require('mongoose');

// DB CONNECTION
mongoose
	.connect('mongodb://localhost/blog_demo_2', {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(() => console.log('Database connected succesfully!'))
	.catch((err) => {
		console.log('DB Connection Error: ${err.message}');
	});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

var Blog = require('./models/blog');
var User = require('./models/user');

// BLOG -  title, image, body, created_at
// var blogSchema = new mongoose.Schema({
// 	title: String,
// 	image: String,
// 	body: String,
// 	created_at: { type: Date, default: Date.now }
// });
// var Blog = mongoose.model('Blog', blogSchema);

// NEW BLOG
// var newBlog = new Blog({
// 	title: 'EMBEDDED TITLE',
// 	image: ' EMBEDDED IMAGE URL',
// 	body: 'EMBEDDED BODY Lorem ipsum'
// });

// // SAVE newBlog
// newUser.save((err, user) => {
// err ? console.log(err) : console.log(user);
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// USER -  email, name, image, blogs, created_at
// var userSchema = new mongoose.Schema({
// 	email: String,
// 	name: String,
// 	image: String,
// 	blogs: [
// 		{
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: 'Blog'
// 		}
// 	],
// 	created_at: { type: Date, default: Date.now }
// });
// var User = mongoose.model('User', userSchema);

// NEW USER
// var newUser = new User({
// 	email: 'charlie@brown.edu',
// 	name: 'Charlie Brown'
// });

// PUSH BLOG TO USER
// newUser.blogs.push({
// 	title: 'LETS GET THIS MONEY',
// 	image: 'WORKING',
// 	body: 'DO IT'
// });

// SAVE newUser
// newUser.save((err, user) => {
// 	err ? console.log(err) : console.log(user);
// });

// NEW USER
// User.create({
// 	email: 'bob@gmail.com',
// 	name: 'Bob Belcher'
// });

// NEW BLOG
Blog.create(
	{
		title: 'How to cook the best burger',
		image: 'MODULAR IMAGE URL',
		body: 'MODULAR BODY'
	},
	(err, blog) => {
		err
			? console.log(err)
			: User.findOne({ email: 'bob@gmail.com' }, (err, foundUser) => {
					err ? console.log(err) : foundUser.blogs.push(blog);
					foundUser.save((err, data) => {
						err ? console.log(err) : console.log(data);
					});
				});
	}
);

// Find user and find user's posts
// User.findOne({ email: 'bob@gmail.com' }).populate('blogs').exec((err, user) => {
// 	err ? console.log(err) : console.log(user);
// });
