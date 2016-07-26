var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('express-jwt');

//Mongoose Models
var User = mongoose.model('User');
var Event = mongoose.model('Event');


//Authenticate
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

////////////////////////////////// Event //////////////////////////////////////
//Create a new event
router.post('/create/new/event', auth, function(req, res, next){
  
  if(!req.body.title || !req.body.summary || !req.body.content){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  
  var event = new Event(req.body);
  
  var query = User.findById(req.payload._id, 'events');
  query.exec(function(err, user){
    if(err) return next(err); 
    if(!user) console.log('/create/new/event - something went wrong with accessing the user in the database'); 
    user.events.push(event);
    event.createdBy = user;
    user.save(function(err){
      if(err) return next(err);
    });
    event.save(function(err,event){
      if(err) return next(err);
      res.json(event);
    });
  });
});

//Delete an event
router.post('/delte/event', auth, function(req, res, next){
  
  var query = User.findById( req.payload._id, 'events');
  var query2 = Event.findById(req.body._id).remove();
  
  query.exec(function(err, user){
    if(err) return next(err);
    if(!user) console.log("/delete/event - something went wrong when trying to connect to this user" + req.payload.username);
    else{
      var toDelete = user.events.findIndex(function(event){
        return event === req.body._idl;
      });
      user.events.splice(toDelete, 1);
      user.save(function(err){
        if(err) return next(err);
      });
      query2.exec(function(err, user){
        if(err) return next(err);
        if(!user) console.log("/delete/event - something went wrong when tryint to connect to this event");
        else return res.message("The event was deleted.");
      });
    }
  });
});

//Create a new event comment
router.post('/create/event/comment', auth, function(req, res, next){
  
  var query = Event.findById( req.body._id );
  
  query.exec(function(err, event){
    if(err) return next(err);
    if(!event) console.log('create/event/comment - something went wrong with accessing the event in the database');
    else{
      event.comments.push({ content: req.body.content, user: req.payload._id});
      res.json(event.comments[event.comments.length-1]);
    }
  });
});

//Invite friend to event****
router.post('/invite/friend/event', auth, function(req, res, next){
	var query = User.findOne({username: req.payload.username}, '_id');
	var query2 = User.findOne({username: req.body.friend}, 'eventInvites');
	
	 query.exec(function(err, user){
		if(err) return next(err);
		if(!user) console.log("/send/friend/comment - something went wrong when trying to access this user in the database");
		else{
			query2.exec(function(err, friend){
			  if(err) return next(err);
				friend.eventInvites.push({sentBy: User, eventRef: req.body.event});
			});
		}
  });
});

/******* Test Functions ******/
//Get all events - test function
router.get('/all/events', function(req, res, next){
  Event.find(function(err, events){
    if(err){ return next(err); }
    res.json(events);
  });
});

//Create a new event - test function
router.post('/create/:user/event', function(req, res, next){
  var event = new Event(req.body);
  event.user = req.user;
  
  event.save(function(err, event){
    if(err){ return next(err); }
    req.user.events.push(event);
    req.user.save(function(err){
      if(err){ return next(err); }
    });
    res.json(event);
  });
});



module.exports = router;