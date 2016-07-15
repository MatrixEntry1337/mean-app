var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('express-jwt');

//Mongoose Models
var User = mongoose.model('User');
var Friend = mongoose.model('Friend');

//Authenticate
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/////////////////////////////////// Friend ///////////////////////////////////

//test - all friends
router.get('/all/friends', function(req, res, next){
  var query = Friend.find().populate('user');
  
  query.exec(function(err, friends){
    if(err) return next(err);
    res.json(friends);
  });
  
});

//Retrieve friends
router.get('/get/friends', auth, function(req, res, next){
  var query = Friend.find({ username: req.payload.username })
    .populate('user', 'firstName lastName discussions projects events friends');
  
  query.exec(function(err, friends){
    if(err) return next(err);
    if(!friends) console.log("/get/freinds - There was an error in retrieving the friends of this user");
    else { 
      console.log(friends);
      res.json(friends); 
    }
  });
});

//Retrieve friends for a given user
router.get('/get/user/friends', auth, function(req, res, next){
  
  var query = User.findOne({username : req.payload.username}, 'friends').populate('friends');
  query.exec(function(err, user){
    if(err){ return next(err); }
    if(!user){ console.log('/retrieve/user/friends - something went wrong!'); }
    else res.json(user.friends);
  });
});

//Find a friend
router.post('/find/friend', auth, function(req, res, next){
 
  var query = User.find({ $and: [
        {username: new RegExp( req.body.entry + '+', 'i' )},
        {username: { $ne: req.payload.username}}
      ]})
      .select( 'username firstName lastName');
      
  query.exec(function(err, users){
    if(err) return next(err);
    if(!users) return console.log("No users found!");
    else res.json(users);
  });
 
  // var firstNameQuery = User.findOne({ firstName: req.body.entry });
  // var lastNameQuery = User.findOne({ lastName: req.body.entry });
  // var emailQuery = User.findOne({ email: req.body.entry });
  // var usernameQuery = User.findOne({ username: req.body.entry});
  
});

//Send Friend Request
router.post('/send/friend/request', auth, function(req, res, next){

  var data = {};
  
  var query = User.find({$or: [
    {username: req.body.username},
    {username: req.payload.username}
    ]})
    .select('username friends notifications');
    
  query.exec(function(err, users){
    if(err) return next(err);
    if(users.length < 2) {
      console.log('/send/friend/request - There was an error in accessing the users from the db');
      res.sendStatus(400);
    }
    else{
      
      //Identify users in array
      var user = users.findIndex(function(element, index){
        if(element.username === req.payload.username)
          return element;
      });
      
      var requestUser = (user + 1) % 2;
      
      //create friend document
      var addRequestUser = new Friend();
      addRequestUser.user = users[user];
      addRequestUser.username = users[user].username;
      addRequestUser.friend = users[requestUser];
      addRequestUser.sent = true;
      
      var addUser = new Friend();
      addUser.user = users[requestUser];
      addUser.username = users[requestUser].username;
      addUser.friend =  users[user];
      addUser.sent = false;
      
      //addFriends
      users[user].friends.push(addRequestUser);
      users[requestUser].friends.push(addUser);
      
      //notifications
      users[user].notifications.push({ 
        username: req.body.username,  
        type: 0, 
        summary: "Your friend request has been sent to " + req.body.username +".",
        status: "Pending..."
      });
      
      users[requestUser].notifications.push({
        username: req.payload.username,  
        type: 1, 
        summary: "You have a new friend request from " + req.payload.username + ".",
        status: "Pending..."
      });
      
      //Save data
      users[requestUser].save(function(err){
        if(err) return next(err);
      });
      
      users[user].save(function(err){
        if(err) return next(err);
      });
      
      addUser.save(function(err){
        if(err) return next(err);
      });
      
      addRequestUser.save(function(err){
        if(err) return next(err);
      });
      
      //Return data
      data.notification = {
        type: 0, 
        summary: "Your friend request has been sent to " + req.body.username +".",
        status: "Pending..."
      };
      
      data.message = "Friend request was successful";
      res.json(data);
    }
  });
});


//Accept Friend Request
router.post('/accept/friend/request', auth, function(req, res, next){
  
  var query = User.findOne({ username: req.payload.username }, 'friends notifications');
  var query2 = User.findOne({ username: req.body.user }, 'friends notifications');
 
  query.exec(function(err, user){
    if(err) return next(err);
    if(!user) console.log("/accept/friend/request - Something went wrong with trying to access the user account.");
    else{
      query2.exec(function(err, friend){
        if(err) {  return next(err); }
        if(!friend) console.log("/accept/friend/request - Something went wrong with trying to access the friend's account.");
        else{
          //Friends
          user.friends.push({ user: friend, accepted: true });
          friend.friends.push({ user: user, accepted: true });
          
          //Notifications
          var notifyUser = user.notifications.find(function(notification){
          if(notification.user === req.body.user && notification.type === 1)
              return notification;
          });
          
          if(notifyUser){
            notifyUser.type = 2;
            notifyUser.summary = "You are now friends with " + req.body.user;
            notifyUser.status = "Accepted";
            notifyUser.date = Date.now();
          }
          
          var notifyFriend = friend.notifications.find(function(notification){
            if(notification.user === req.payload.username && notification.type === 0)
              return notification;
          });
          
          if(notifyFriend){
            notifyFriend.type = 3;
            notifyFriend.summary = "You are now friends with " + req.payload.username;
            notifyFriend.status = "Accepted";
            notifyFriend.date = Date.now();
          }
          
          //Save changes
          user.save(function(err){
            if(err) return next(err);
          });
          friend.save(function(err){
            if(err) return next(err);
          });
          
          res.send("User added to friend's list");
        }
      });
      return true;
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