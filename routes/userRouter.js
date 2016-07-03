var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var jwt = require('express-jwt');

//Mongoose Models
var User = mongoose.model('User');

//Authenticate
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

///////////////////////////////// User /////////////////////////////////////////

//Creates a new user 
router.post('/user/register', function(req, res, next){
  
  if(!req.body.username || !req.body.password){
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  
  //check for other users with the same email address and username
  var query = User.findOne({ email: req.body.email });
  var query2 = User.findOne({ username: req.body.username });
  
  query.exec(function(err, user){
    if(err) return next(err);
    query2.exec(function(err2, user2){
      if(err2) return next(err2);
      if(user) {
        return res.status(400).json({ message: "This email address is already in use by another account: " + req.body.email });
      }
      else if(user2){ 
        return res.status(400).json({ message: "This username is already taken: " + req.body.username });
      }
      else{
        var user = new User();
  
        user.username = req.body.username;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        user.save(function(err, user){
          if(err) return next(err);
          console.log("/user/register - still get to here");
          return res.json({ token: user.generateJWT() });
        });
      }
    });
  });
});

//User Login
router.post('/user/login', function(req, res, next){
  
  if(!req.body.username || !req.body.password)
    return res.status(400).json({message: 'Please fill out all fields'});
  
  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({ token: user.generateJWT() });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

//Populate User Info - events, discussions and projects
router.get('/retrieve/user/populate', auth, function(req, res, next) {

  var query = User.findOne({username: req.payload.username});

  query.exec(function(err, user){
    if(err) return next(err); 
    if(!user) console.log('/retrieve/user/populate - something went wrong with accessing the user account'); 
    else{
      user.populate('events discussions projects', function(err, user){
        if(err) return next(err); 
        res.json(user);
      });
    }
  });
});

//Change Password
router.post('/change/password', auth, function(req, res, next){
  var query = User.findOne({ username: req.payload.username });
  
  query.exec(function(err, user){
    if(err) return next(err);
    if(!user) return console.log('/change/password - something went wrong with access this user account ');
    if(user.username === req.body.username &&
      user.email === req.body.email &&
      user.validPassword(req.body.originalPassword)){
        user.setPassword(req.body.newPassword);
        user.save(function(err){
          if(err) return next(err);
          return res.json({ message: "Password has been changed." });
        });
    }
    else
      return res.status(400).json({ message: "Unable to verify user." });
  });
});

//Account Info
router.post('/update/account', auth, function(req, res, next){

  var data = {};
  
  var query = User.findOne({username: req.payload.username}, 'firstName lastName');
  
  query.exec(function(err, user){
    if(err) return next(err);
    if(!user) return next(new Error('user can\'t be found'));
    
    //name
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    //email
    user.email = req.body.email;
    //company name
    user.companyName = req.body.companyName;
    //mobile phone
    user.cellPhone = req.body.cellPhone;
    //office Phone
    user.officePhone = req.body.officePhone;
    //address
    user.line1 = req.body.line1;
    user.line2 = req.body.line2;
    user.city = req.body.city;
    user.state = req.body.state;
    user.zip = req.body.zip;
    //commit
    user.save(function(err, user){
      if(err) return next(err);
      data.message = "Saved Changes";
      data.user = user;
      res.json(data); 
    });
  });
});



module.exports = router;
