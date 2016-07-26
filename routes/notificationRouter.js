var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('express-jwt');

//Mongoose Models
var User = mongoose.model('User');

//Authenticate
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

//////////////////////// Comment ////////////////////////////

router.post('/remove/notification', auth, function(req, res, next){
	var query = User.findById(req.payload._id, 'notifications');
	
	query.exec(function(err, user){
		if(err) return next(err);
		if(!user) console.log("/remove/notification - There was an error in accessing this user in the db");
		else{
			var notification = user.notifications.findIndex(function(notification, index){
				if(notification._id === req.body._id)
					return index;
			});
			
			console.log("This is the " + user.notifications[notification]);
			
			user.notifications.splice(notification, 1);
			
			user.save(function(err, user){
				if(err) return next(err);
				if(!user) console.log("/remove/notification - There was an error in saving this user to the db");
				else{
					res.json({ 
						message: "Notification has been deleted.", 
						notification: notification 
					});
				}
			});
		}
	});
});


module.exports = router;