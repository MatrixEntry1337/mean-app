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
  var query = Friend.find({user: req.payload._id})
    .populate('friend', 'username firstName lastName discussions projects events friends');
    
  query.exec(function(err, friends){
    if(err) return next(err);
    if(!friends) console.log("/get/friends - There was an error in retrieving the friends of this user");
    else {
      console.log(friends);
      res.json(friends); 
    }
  });
});

//Retrieve friends for a given user - not complete
router.get('/get/user/friends', auth, function(req, res, next){
  
  var query = User.findById(req.payload._id, 'friends').populate('friends');
  console.log(req.payload._id);
  
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
    if(!users) return console.log("/find/friend - something went wrong!");
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
    { _id: req.body._id },
    { _id: req.payload._id }
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
      var user = users.findIndex(function(element){
        return element.username == req.payload.username;
      });
      
      var user2 = (user + 1) % 2;
      
      //friends
      var addUser2 = new Friend();
      addUser2.user = users[user]._id;
      addUser2.friend = users[user2]._id;
      addUser2.sent = true;
      
      var addUser = new Friend();
      addUser.user = users[user2]._id;
      addUser.friend =  users[user]._id;
      addUser.sent = false;
      
      users[user].friends.push(addUser2);
      users[user2].friends.push(addUser);
      
      //notifications
      users[user].notifications.push({
        user: users[user2]._id,
        username: users[user2].username,
        firstName: users[user2].firstName,
        lastName: users[user2].lastName,
        friend: addUser2._id,
        type: 0, 
        summary: "Your friend request has been sent to " + req.body.username +".",
        status: "Pending..."
      });
      
      users[user2].notifications.push({
        user: users[user]._id,
        username: users[user].username,
        firstName: users[user].firstName,
        lastName: users[user].lastName,
        friend: addUser._id,
        type: 1, 
        summary: "You have a new friend request from " + req.payload.username + ".",
        status: "Pending..."
      });
      
      //Save data
      users[user2].save(function(err){
        if(err) return next(err);
      });
      
      users[user].save(function(err){
        if(err) return next(err);
      });
      
      addUser.save(function(err){
        if(err) return next(err);
      });
      
      addUser2.save(function(err){
        if(err) return next(err);
      });
      
      process.nextTick(function(){
        
      });
      
      //Return data
      data.notification = users[user].notifications[users[user].notifications.length-1];
      data.friend = addUser2;
      
      data.message = "Friend request was successful";
      res.json(data);
    }
  });
});


//Accept Friend Request
router.post('/accept/friend/request', auth, function(req, res, next){
  
  var data = {};
  
  var query = User.find({$or: [
    {_id: req.body.user },
    {_id: req.payload._id}
    ]})
    .select('username friends notifications').populate('friends');
  
  query.exec(function(err, users){
    if(err) return next(err);
     if(users.length < 2){ 
      console.log('/accept/friend/request - There was an error in accessing the users from the db');
      res.sendStatus(400); 
     }
    else{
      
      //Identify users in array
      var user = users.findIndex(function(element){
        if(element._id == req.payload._id)
          return element;
      });
      var user2 = (user + 1) % 2;
      
      //friend
      var friend = users[user].friends.findIndex(function(friend){
        return friend.friend == req.body.user; 
      });
      users[user].friends[friend].accepted = true;
      
      var friend2 = users[user2].friends.findIndex(function(friend){
        return friend.friend == req.payload._id;
      });
      users[user2].friends[friend2].accepted = true;
      
      //notifications
      
      var not = users[user].notifications.find(function(notification){
        return notification.summary == "You have a new friend request from " + users[user2].username + ".";
      });
      if(not) not.status = "Accepted";
      
      var not2 = users[user2].notifications.find(function(notification){
        return notification.summary == "Your friend request has been sent to " + users[user].username +".";
      });
      
      if(not2) not2.status = "Accepted";
      
      users[user].notifications.push({
        user: users[user2]._id,
        friend: users[user].friends[friend]._id,
        username: users[user2].username,
        firstName: users[user2].firstName,
        lastName: users[user2].lastName,
        type: 3, 
        summary: "You are now friends with " + users[user2].username,
        status: "Accepted"
      });
      users[user2].notifications.push({
        user: users[user]._id,
        friend: users[user2].friends[friend2]._id,
        username: users[user].username,
        firstName: users[user].firstName,
        lastName: users[user].lastName,
        type: 3, 
        summary: "You are now friends with " + users[user].username,
        status: "Accepted"
      });
      
      //Save
      users[user].save(function(err){
        if(err) return next(err);
      });
      users[user2].save(function(err){
        if(err) return next(err);
      });
      users[user].friends[friend].save(function(err){
        if(err) return next(err); 
      });
      users[user2].friends[friend2].save(function(err){
        if(err) return next(err);
      });
     
      data.notification = users[user].notifications[users[user].notifications.length-1];
      data.friend = friend;
      data.message = "Friend was confirmed.";
      
      res.json(data);
      
    }
  });
});

/////////////////////////////////// Comment ////////////////////////////////////
// //Get all comments for user
// router.get('/all/user/comments', auth, function(req, res, next){
//   var query = User.findById(req.payload._id);
//   query.exec(function(err, user){
//     if(err) return next(err);
//     if(!user) console.log("/all/user/comments - something went wrong when accessing this user in the database");
//     res.json(user.comments);
//   });
// });

// //Get friend comments ****
// router.get('/friend/comments', auth, function(req, res, next){
// 	var query = User.findById(req.payload._id, 'latestFriendComments');
	
// 	query.exec(function(err, user){
// 		if(err) return next(err);
// 		if(!user) console.log("/friend/comments - something went wrong when trying to access this user in the database");
// 		else{
// 			res.json(user.latestFriendComments);
// 		}
// 	});
// });

// //Send comment to another user
// //public comments to profile******
// router.post('/send/friend/comment', auth, function(req, res, next){
// 	var query = User.findById(req.payload._id, 'friends');
// 	var query2 = User.findOne(req.body._id, 'friend');
	
// 	query.exec(function(err, user){
// 		if(err) return next(err);
// 		if(!user) console.log("/send/friend/comment - something went wrong when trying to access this user in the database");
// 		else{
// 			query2.exec(function(err,friend){
// 				if(err) return next(err);
// 				if(!friend) console.log("/send/friend/comment - something went wrong when trying to access this user in the database");
// 				else{
// 					//send comment to friend
// 					var dateNow = Date.now();
// 					friend.comments.push({sentBy: user, message: req.body.message, date: dateNow});
// 					friend.save(function(err){
// 						if(err) return next(err);
// 					});
// 					//notify other friends of comments
// 					user.populate('friends', function(err, user){
// 						if(err) return next(err);
// 						for(var i = 0; i < user.friends.length; i++){
// 							user.friends[i].latestFriendComments.push({sentBy: user, sentTo: friend, message: req.body.message, date: dateNow});
// 						}
// 					});
// 				}
// 		  });
// 		} 
// 	});
// });

module.exports = router; 