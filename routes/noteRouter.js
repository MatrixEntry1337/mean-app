var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('express-jwt');

//Mongoose Models
var User = mongoose.model('User');

//Authenticate
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

////////////////////////////////// Notes ///////////////////////////////////////

//Create a new note
router.post('/create/new/note', auth, function(req, res, next){
  
  if(!req.body.title || !req.body.summary || !req.body.content){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  
  var query = User.findOne({username: req.payload.username});
  query.exec(function(err, user){
    if(err) return next(err); 
    if(!user) console.log('/createa/new/note - something went wrong with accessing the user in the database'); 
    else{
      user.notes.push({ title: req.body.title, summary: req.body.summary, content: req.body.content });
      user.save(function(err, user){
        if(err) return next(err);
        res.json(user.notes[(user.notes.length)-1]);
      });
    }
  });
});

module.exports = router;