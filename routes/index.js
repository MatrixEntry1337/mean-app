var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kyle\'s-Mean-Application' });
});

//Mongoose Models
var User = mongoose.model('User');
var UserComment = mongoose.model('UserComment');
var Friend = mongoose.model('Friend');
var Discussion = mongoose.model('Discussion');
var DiscussionComment = mongoose.model('DiscussionComment');
var ProjectComment = mongoose.model('ProjectComment');
var Note = mongoose.model('Note');
var Event = mongoose.model('Event');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

///////////////////////////////// User /////////////////////////////////////////
// User param - test function
router.param('user', function(req, res, next, id){
  var query = User.findById(id);
  
  query.exec(function(err, user){
    if(err){ return res.send('An error occured'); } 
    if(!user){ return next(new Error('user can\'t be found')); }
    
    req.user = user;
    return next();
  });
});

// Get all users - test function
router.get('/all/users', function(req, res, next) {
   User.find(function(err, users){
    if(err){ return next(err); }
    res.json(users);
  });
});


//Creates a new user and it's necessary collections
router.post('/user/register', function(req, res, next){
  
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  
  var friend = new Friend();
  var comment = new UserComment();
  var user = new User();
  
  user.username = req.body.username;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.friends = friend;
  
  friend.owner = user;
  comment.user = user;
  
  user.save(function(err){
    if(err){ return next(err); }
    return res.json({token: user.generateJWT()});
  });
  friend.save(function(err){
    if(err){ return next(err); }
  });
  comment.save(function(err){
    if(err){ return next(err); }
  });
  
});

//User login
router.post('/user/login', function(req, res, next){
  
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

//Retrieve User Info - notes
router.get('/retrieve/user/notes-events-discussions', auth, function(req, res, next) {

  var query = User.findOne({username: req.payload.username});

  query.exec(function(err, user){
    if(err){ return next(err); }
    if(!user){ console.log('Something went wrong with accessing the user account'); }
    
    user.populate('notes events discussions', function(err, user){
      if(err){ return next(err); }
      res.json(user);
    });
  });
});

//Update user profile with additional info - test function
router.put('/update/:user/profile', function(req, res, next){
  req.user.line1 = req.body.line1;
  req.user.line2 = req.body.line2;
  req.user.city = req.body.city;
  req.user.state = req.body.state;
  req.user.zip = req.body.zip;
  
  req.user.save(function(err, user){
    if(err){ return next(err); }
    res.json(user);
  });
});

//Update user password - test function
router.put('update/:user/password', function(req, res, next){
  req.user.update(req.body, function(err, user){
    if(err){ return next(err); }
    res.json(user);
  });
});


///////////////////////////////// Discussion ///////////////////////////////////

//Create new Discussion
router.post('/create/new/discussion', auth, function(req, res, next){

  var discussion = new Discussion(req.body);
  
  var query = User.findOne({username: req.payload.username});
  query.exec(function(err, user){
    if(err) return next(err); 
    if(!user) console.log('Something went wrong with accessing the user account'); 
    user.discussions.push(discussion);
    discussion.user = user;
    user.save(function(err){
      if(err) return next(err);
    });
    discussion.save(function(err,discussion){
      if(err) return next(err);
      res.json(discussion);
    });
  });
});

//Create a new discussion comment
router.post('/create/discussion/comment', auth, function(req, res, next){
  var discussion;
  var query = User.findOne({username: req.payload.username});
  var discussionComment = new Discussion();
  
  query.exec(function(err, user){
    if(err) return next(err);
    if(!user) console.log('Something went wrong with the ');
    else{
      discussion.user = user;
      discussionComment.discussion = req.body.discussion;
      discussionComment.text = req.body.text;
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


///////////////////////////////// Project //////////////////////////////////////

/////Change!/////

// Project param
// router.param('project', function(req, res, next, id){
//   var query = Project.findById(id);
  
//   query.exec(function(err, project){
//     if(err){ return next(err); }
//     if(!project){ return next(new Error('can\'t find project')); }
    
//     req.project = project;
//     return next();
//   });
// });

// //Create a new project
// router.post('/create/:user/project', function(req, res, next){
//   var project = new Project(req.body);
//   project.user = req.user;
  
//   project.save(function(err, project){
//     if(err){ return next(err); }
//     req.user.projects.push(project);
//     req.json(project);
//   });
// });

////////////////////////////////// Event //////////////////////////////////////
//Create a new event
router.post('/create/new/event', auth, function(req, res, next){

  var event = new Event(req.body);
  
  var query = User.findOne({username: req.payload.username});
  query.exec(function(err, user){
    if(err) return next(err); 
    if(!user) console.log('Something went wrong with accessing the user account'); 
    user.events.push(event);
    event.user = user;
    user.save(function(err){
      if(err) return next(err);
    });
    event.save(function(err,event){
      if(err) return next(err);
      res.json(event);
    });
  });
});

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

////////////////////////////// Social Contact //////////////////////////////////

/////Change/////

// Social Contact param
// router.param('socialcontact', function(req, res, next, id){
//   var query = SocialContact.findById(id);
  
//   query.exec(function(err, contact){
//     if(err){ return next(err); }
//     if(!contact){ return next(new Error('can\'t find contact')); }
    
//     req.contact = contact;
//     return next();
//   });
// });

// //Create a new social contact
// router.post('/create/:user/socialcontact', function(req, res, next){
//   var socialcontact = new SocialContact(req.body);
//   socialcontact.user = req.user;
  
//   socialcontact.save(function(err, socialcontact){
//     if(err){ return next(err); }
//     req.user.socialcontacts.push(socialcontact);
//     req.user.save(function(err){
//       if(err){ return next(err); }
//     });
//     res.json(socialcontact);
//   });
// });

///////////////////////////////// Experience ///////////////////////////////////

//////Change!//////

// Experience param
// router.param('experience', function(req, res, next, id){
//   var query = Experience.findById(id);
  
//   query.exec(function(err, experience){
//     if(err){ return next(err); }
//     if(!experience) { return next(new Error('can\'t find experience')); }
    
//     req.experience = experience;
//     return next();
//   });
// });

// //Create a new experience
// router.post('/create/:user/experience', function(req, res, next){
//   var experience = new Experience(req.body);
//   experience.user = req.user;
  
//   experience.save(function(err, experience){
//     if(err){ return next(err); }
//     req.user.experiences.push(experience);
//     res.json(experience);
//   });
// });


/////////////////////////////// Education /////////////////////////////////////

//////Change//////

//Create a new education
// router.post('/create/:user/education', function(req, res, next){
//   var education = new Education(req.body);
//   education.user = req.user;
  
//   education.save(function(err, education){
//     if(err){ return next(err); }
//     req.user.education.push(education);
//     res.json(education);
//   });
// });

////////////////////////////////// Notes ///////////////////////////////////////
// Note param - test fucntion
router.param('note', function(req, res, next, id){
  var query = Note.findById(id);
  
  query.exec(function(err, note){
    if(err){ return next(err); }
    if(!note) { return next(new Error('can\'t find note')); }
    
    req.note = note;
    return next();
  });
});

//Create a new note
router.post('/create/new/note', auth, function(req, res, next){

  var note = new Note(req.body);
  
  var query = User.findOne({username: req.payload.username});
  query.exec(function(err, user){
    if(err) return next(err); 
    if(!user) console.log('Something went wrong with accessing the user account'); 
    user.notes.push(note);
    note.user = user;
    user.save(function(err){
      if(err) return next(err);
    });
    note.save(function(err,note){
      if(err) return next(err);
      res.json(note);
    });
  });
});

//Create a new note - test function
router.post('/create/:user/note', function(req, res, next){
  var note = new Note(req.body);
  note.user = req.user;
  
  note.save(function(err, note){
    if(err){ return next(err); }
    req.user.notes.push(note);
    req.user.save(function(err){
      if(err){ return next(err); }
    });
    res.json(req.user);
  });
});

//Remove the top note from user - test function
router.put('/pop/:user/note', function(req, res, next){
    req.user.notes.pop();
  req.user.save(function(err){
    if(err){ return next(err); }
    res.json(req.user);
  });
});

//Get all notes - test function
router.get('/notes', function(req, res, next){
  Note.find(function(err, notes){
    if(err){ return next(err); }
    res.json(notes);
  });
});


/////////////////////////////////// Friend ///////////////////////////////////

//Friend param - test function
router.param('friend', function(req, res, next, id){
  var query = Friend.findById(id);
  
  query.exec(function(err, friend){
    if(err){ return res.send('An error occured'); } 
    if(!friend){ return next(new Error('user can\'t be found')); }
    
    req.friend = friend;
    return next();
  });
});

//Get all friends - test function
router.get('/all/friends', function(req, res, next){
  Friend.find(function(err, friends){
    if(err){ return next(err); }
    res.json(friends);
  });
});

//Add a friend - test function
router.post('/add/:user/friend', function(req, res, next){
  var query = Friend.findOne(req.user.friends);
  var addUser;
  
  User.findById(req.body.user, function(err, user){
    if(err){ return next(err); }
    addUser = user;
  });
  
  query.exec(function(err, friend){
    if(err){ return next(err); }
    req.user.addUser(function(err){
      if(err){ return next(err); }
    });
    friend.friends.push(addUser);
    friend.save(function(err){
      if(err){ return next(err); }
    });
      res.json(friend);
  });
});

//Retrieve friends for a given user
router.get('/retrieve/user/friends', auth, function(req, res, next){
  
  var query = User.findOne({username : req.payload.username});
  query.exec(function(err, user){
    if(err){ return next(err); }
    if(!user){ console.log('Something went wrong!'); }
    
    Friend.findOne({owner: user._id}, function(err, friend){
      if(err){ return next(err); }
      if(!friend){ console.log('No friends!'); }
      else{
        friend.populate('friends', function(err, friends){
          if(err){ return next(err); }
          res.json(friends);
        });
      }
    });
  });
});

//Find a friend
router.get('/find/friend', auth, function(req, res, next){
  var query = User.find(req.body.searchParams);
  
  query.exec(function(err, users){
    if(err) return next(err);
    console.log(users);
    res.json(users);
  });
});

//Send Friend Request
router.post('/send/friend/request', auth, function(req, res, next){
  var current;
  
  var query = User.findOne({username: req.payload.username});
  var query2 = User.findById(req.body._id);
    
  query.exec(function(err, user){
    if(err) return next(err);
    if(!user) console.log('Something went wrong with accessing the user account');
    else{
      if(!user.notifications) current = 0;
      else current = user.notifications.length;
      query2.exec(function(err, user2){
        if(err) return next(err);
        if(!user) return console.log('Something went wrong with accessing the user to be added account');
        else{
          user.notifications[current].user = user2;
          user.notifications[current].notType = 0;
          user.notifiacations[current].notSummary = "You have sent the user "  +  user2.username + " a friend request.";
          user.notifications[current].notStatus = "Sent";
        }
      });
    }
  });
});


//Remove the recently added friend - test function
router.put('/pop/:friend/user', function(req, res, next){
  req.friend.friends.pop();
  req.friend.save(function(err){
    if(err){ return next(err); }
  });
  res.json(req.friend);
});

/////////////////////////////////// Comment ////////////////////////////////////
//Get all comments - test function
router.get('/all/comments', function(req, res, next){
  UserComment.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});

//Send comment to another user - test function
router.post('/send/:user/comment', function(req, res, next){
  var user = User.findOne({email: req.body.email}, function(err){
    if(err){ return next(err); }
  });
  
  UserComment.update(user, {$push: {'comments': { text: req.body.text, user: user._id }}}, { multi: false }, 
  function(err, comment){
    if(err){ return next(err); }
    res.json(comment);
  });
});
  

module.exports = router; 