var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('express-jwt');

//Mongoose Models
var User = mongoose.model('User');
var Discussion = mongoose.model('Discussion');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

///////////////////////////////// Discussion ///////////////////////////////////

//Create new Discussion
router.post('/create/new/discussion', auth, function(req, res, next){

  var discussion = new Discussion(req.body);
  
  var query = User.findOne({username: req.payload.username});
  query.exec(function(err, user){
    if(err) return next(err); 
    if(!user) console.log('/create/new/discussion - something went wrong with accessing the user in the database'); //test function
    else {
      user.discussions.push(discussion);
      discussion.createdBy = user;
      user.save(function(err){
        if(err) return next(err);
      });
      discussion.save(function(err,discussion){
        if(err) return next(err);
        res.json(discussion);
      });
    }
  });
});

//Create a new discussion comment
router.post('/create/discussion/comment', auth, function(req, res, next){
  
  var query = Discussion.findById( req.body.discussion );
  var query2 = User.findOne({ username: req.payload.username });
  
  query.exec(function(err, discussion){
    if(err) return next(err);
    if(!discussion) console.log('CreateDiscussionComment - something went wrong with accessing the discussion in the database');
    else{
      query2.exec(function(err, user){
        if(err) return next(err);
        if(!user) console.log('CreateDiscussionComment - something went wrong with accessing the user in the database');
        else{
          discussion.commments.push({ content: req.body.content,  postedBy: user });
          discussion.save(function(err, discussion){
            if(err) return next(err);
            res.json(discussion.comments);
          });
        }
      });
    }
  });
  
});

// Discussion param - test function
router.param('discussion', function(req, res, next, id){
  var query = Discussion.findById(id);
  
  query.exec(function(err, discussion){
    if(err) return next(err); 
    if(!discussion) return next(new Error('can\'t find discussion')); 
    req.discussion = discussion;
    return next();
  });
});


//Get all discussions - test function
router.get('/all/discussions', function(req, res, next){
  Discussion.find(function(err, discussions){
    if(err) return next(err); 
    res.json(discussions);
  });
});

//Create new discussion - test function
router.post('/create/:user/discussion', function(req, res, next){
  var discussion = new Discussion(req.body);
  discussion.user = req.user;
  
  discussion.save(function(err, discussion){
    if(err){ return next(err); }
    req.user.discussions.push(discussion);
    req.user.save(function(err, user){
      if(err){ return next(err); }
      console.log(user); //test
    });
    res.json(discussion);
  });
});

//////////// User Removal ///////////
router.post('/delete/:user/discussion', function(req, res, next){
  req.user.discussions.pull(req.body);
});

module.exports = router;