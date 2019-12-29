var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
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
app.use(methodOverride('_method'));

// MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created_at: { type: Date, default: Date.now }
});

var Blog = mongoose.model('Blog', blogSchema);

// RESTFUL ROUTES
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
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

// SERVER LISTENER
app.listen(3000, () => {
	console.log('Server is running');
});
