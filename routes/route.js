const express = require('express');
const router = express.Router();
const { Post } = require('../models/post')
const app = express();

router.get('/', function(req, res){
	res.render('index');
});

router.get('/about', (req, res) => {
	res.render('about')
});

let error = [{msg: ""}];

router.get('/contact', (req, res) => {
	res.render('contact', {errors: error})
})

router.post('/contact', (req, res) => {
	let errors = [];
	const { title, content, nameFrom } = req.body;

	// Check required fields
	if(!title || !content || !nameFrom){
		errors.push({msg: 'Please fill in all the fields'})
	}
	if(title < 8){
		errors.push({msg: 'Title must be 8 character or more'})
	}

	if(errors.length > 0){
		res.render('contact', {
			errors,
			nameFrom,
			title,
			content,
		});

	} else {
		// Validation passed 
		Post.findOne({title: title})
		.then(titleP => {
			if(titleP){
				//User Exists
					errors.push({msg: 'Title is already taken'})
					res.render('contact', {
						errors,
						nameFrom,
						title,
						content,
					});
			} else {
				// Stored data in user
				const newPost = new Post({
					nameFrom,
					title,
					content,
				});

				newPost.save()
							.then(titleH => {
								req.flash('success_msg', 'Message has been Sent! Thank you! :)');
								res.redirect('/contact');
							})
							.catch(err => console.log(err))
				
			}// if end tag
		}); // thnd end tag
	}
});

const { Pic } = require('../fbPic.js')

router.get('/photo', (req, res) => {
	res.render('photo', {Pic : Pic})
});

router.get('/viewMessage', (req, res) => {
	Post.find({}, (err, found) => {
		if(err){ console.log(err)};
		res.render('viewPost', {message: found})
	})	
})

module.exports = router;