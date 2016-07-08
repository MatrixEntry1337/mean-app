var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('express-jwt');

//Mongoose Models
var User = mongoose.model('User');

//Authenticate
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.post('/add/school', auth, function(req, res, next){
	var query = User.findOne({ username: req.payload.username });
	var data = {};
	
	query.exec(function(err, user){
		if(err) return next(err);
		if(!user) console.log('/add/School/ - something went wrong with accessing the user');
		else{
			user.education.push(req.body);
			user.save(function(err){
				if(err) return next(err);
				data.class = req.body;
				data.message = 'School successfully added.';
				res.json(data);
			});
		}
	});
});

router.post('/remove/school', auth,  function(req, res, next){
	var query = User.findOne({ username: req.payload.username });
	
	query.exec(function(err, user){
		if(err) return next(err);
		if(!user) console.log('/add/School/ - something went wrong with accessing the user');
		else{ 
			user.education.splice(req.body.index, 1);
			user.save(function(err){
				if(err) return next(err);	
			});
		}
	});
});

module.exports = router;
