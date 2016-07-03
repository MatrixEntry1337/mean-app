var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('express-jwt');

//Mongoose Models
var User = mongoose.model('User');

//Authenticate
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.post('/add/experience', auth, function(req, res, next){
	var query = User.findOne({username: req.payload.username});
	var data = {};
	
	query.exec(function(err, user){
		if(err) return next(err);
		if(!user) console.log('/add/School/ - something went wrong with accessing the user');
		else{
			user.experiences.push(req.body);
			user.save(function(err){
				if(err) return next(err);
				data.exp = req.body;
				data.message = 'Experience successfully added.';
				res.json(data);
			});
		}
	});
});

module.exports = router;
