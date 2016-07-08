var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('express-jwt');

//Mongoose Models
var User = mongoose.model('User');

//Authenticate
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/////////////////////////////////// Friend ///////////////////////////////////

//Retrieve friends for a given user
router.get('/retrieve/user/friends', auth, function(req, res, next){
  
  var query = User.findOne({username : req.payload.username});
  query.exec(function(err, user){
    if(err){ return next(err); }
    if(!user){ console.log('/retrieve/user/friends - something went wrong!'); }
    else{    
      user.populate('friends', function(err, friends){
      if(err) return next(err); 
      res.json(user.friends);
      });
    }
  });
});

//Find a friend
router.post('/find/friend', auth, function(req, res, next){
 
  var query = User.find().and([
      {username: new RegExp( req.body.entry + '+', 'i' )},
      {username: { $ne: req.payload.username}}]).select( 'username firstName lastName');
 
  query.exec(function(err, users){
    if(err) return next(err);
    if(!users) return console.log("No users found!");
    else res.json(users);
  });
 
  // var firstNameQuery = User.findOne({ firstName: req.body.entry });
  // var lastNameQuery = User.findOne({ lastName: req.body.entry });
  // var emailQuery = User.findOne({ email: req.body.entry });
  // var usernameQuery = User.findOne({ username: req.body.entry});
  
  
  // var userFound = [];
  
  // firstNameQuery.exec(function(err, user){
  //   if(err) return next(err);
  //   if(!user) console.log('/find/friend - unable to find user by first name');
  //   else{
  //     userFound.push({firstName: user.firstName, lastName: user.lastName});
     
     
  //   }
  // });
  
  // lastNameQuery.exec(function(err, user){
  //   if(err) return next(err);
  //   if(!user) console.log('/find/friend - unable to find user by last name');
  //   else{
  //     userFound.push({firstName: user.firstName, lastName: user.lastName});
     
   
  //   }
  // });
  
  // emailQuery.exec(function(err, user){
  //   if(err) return next(err);
  //   if(!user) console.log('/find/friend - unable to find user by email');
  //   else{
  //     userFound.push({firstName: user.firstName, lastName: user.lastName});
   
    
  //   }
  // });
  
  // usernameQuery.exec(function(err, user){
  //   if(err) return next(err);
  //   if(!user) console.log('/find/friend - unable to find user by username');
  //   else{
  //     userFound.push({firstName: user.firstName, lastName: user.lastName});
  //   }
  // });
  
});

//Send Friend Request
router.post('/send/friend/request', auth, function(req, res, next){
  
  var query = User.findOne({username: req.body.username}, 'notifications');
  var query2 = User.findOne({username: req.payload.username}, 'notifications');
  
  query.exec(function(err, requestUser){
    if(err) return next(err);
    if(!requestUser) return console.log('Something went wrong with accessing the user to be added account');
    else{
      requestUser.notifications.push({
        user: req.payload.username,  
        type: 1, 
        summary: "You have a new friend request from " + req.payload.username + ".",
        status: "Pending..."
      });
      requestUser.save(function(){
        if(err) return next(err);
      }); 
    }
  });
  
  query2.exec(function(err, user){
    if(err) return next(err);
    if(!user) console.log('Something went wrong with accessing the user account');
    else{
      user.notifications.push({ 
        user: req.body.username,  
        type: 0, 
        summary: "Your friend request has been sent to " + req.body.username +".",
        status: "Pending..."
      });
      user.save(function(err, user){
        if(err) return next(err);
        res.json(user.notifications[user.notifications.length-1]);
      });
    }
  });
  
});

/////////////////////////////////// Comment ////////////////////////////////////
//Get all comments for user
router.get('/all/user/comments', auth, function(req, res, next){
  var query = User.findOne({username: req.payload.username});
  query.exec(function(err, user){
    if(err) return next(err);
    if(!user) console.log("/all/user/comments - something went wrong when accessing this user in the database");
    res.json(user.comments);
  });
});

//Get friend comments ****
router.get('/friend/comments', auth, function(req, res, next){
	var query = User.findOne({username: req.payload.username}, 'latestFriendComments');
	
	query.exec(function(err, user){
		if(err) return next(err);
		if(!user) console.log("/friend/comments - something went wrong when trying to access this user in the database");
		else{
			res.json(user.latestFriendComments);
		}
	});
});

//Send comment to another user
//public comments to profile******
router.post('/send/friend/comment', auth, function(req, res, next){
	var query = User.findOne({username: req.payload.username}, 'friends');
	var query2 = User.findOne({username: req.body.friend});
	
	query.exec(function(err, user){
		if(err) return next(err);
		if(!user) console.log("/send/friend/comment - something went wrong when trying to access this user in the database");
		else{
			query2.exec(function(err,friend){
				if(err) return next(err);
				if(!friend) console.log("/send/friend/comment - something went wrong when trying to access this user in the database");
				else{
					//send comment to friend
					var dateNow = Date.now();
					friend.comments.push({sentBy: user, message: req.body.message, date: dateNow});
					friend.save(function(err){
						if(err) return next(err);
					});
					//notify other friends of comments
					user.populate('friends', function(err, user){
						if(err) return next(err);
						for(var i = 0; i < user.friends.length; i++){
							user.friends[i].latestFriendComments.push({sentBy: user, sentTo: friend, message: req.body.message, date: dateNow});
						}
					});
				}
		  });
		} 
	});
});

module.exports = router; 