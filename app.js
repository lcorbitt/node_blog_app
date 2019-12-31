var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	expressSanitizer = require('express-sanitizer'),
	mongoose = require('mongoose');

// DB CONNECTION
mongoose
	.connect('mongodb://localhost/restful_blog_app', {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(() => console.log('DB Connected!'))
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

// NEW USER
// var newUser = new User({
// 	email: 'charlie@brown.edu',
// 	name: 'Charlie Brown'
// });

// PUSH BLOG TO USER
// newUser.blogs.push({
// 	title: 'Pushed Blog TITLE',
// 	image: 'Pushed Blog Image URL',
// 	body: 'Pushed Blog BODY'
// });

// // TEST newUser
// newUser.save((err, user) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// RESTFUL ROUTES

// INDEX ROUTE
app.get('/', (req, res) => {
	res.redirect('/blogs');
});

// INDEX ROUTE
app.get('/blogs', (req, res) => {
	Blog.find({}, (err, blogs) => {
		if (err) {
			console.log('ERROR!');
		} else {
			res.render('index', { blogs: blogs });
		}
	});
});

// NEW ROUTE
app.get('/blogs/new', (req, res) => {
	res.render('new');
});

// CREATE ROUTE
app.post('/blogs', (req, res) => {
	// Sanitizer
	req.body.blog.body = req.sanitize(req.body.blog.body);
	// Create Blog
	Blog.create(req.body.blog, (err, newBlog) => {
		if (err) {
			res.render('new');
		} else {
			res.redirect('/blogs');
		}
	});
});

// SHOW ROUTE
app.get('/blogs/:id', (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.render('show', { blog: foundBlog });
		}
	});
});

// EDIT ROUTE
app.get('/blogs/:id/edit', (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.render('edit', { blog: foundBlog });
		}
	});
});

// UPDATE ROUTE
app.put('/blogs/:id', (req, res) => {
	// Sanitizer
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

// DESTROY ROUTE
app.delete('/blogs/:id', (req, res) => {
	Blog.findByIdAndDelete(req.params.id, (err) => {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs');
		}
	});
});

// SERVER LISTENER
app.listen(3000, () => {
	console.log('Server is running');
});
