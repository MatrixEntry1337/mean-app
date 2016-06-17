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
var Discussion = mongoose.model('Discussion');
var Event = mongoose.model('Event');
var Project = mongoose.model('Project');

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
  var user = new User();
  
  user.username = req.body.username;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save(function(err, user){
    if(err) return next(err); 
    return res.json({ token: user.generateJWT() });
  });
  
});

//User login
router.post('/user/login', function(req, res, next){
  
  if(!req.body.username || !req.body.password){
      console.log("It is somewhere here");
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

//Populate User Info - events, discussions and projects
router.get('/retrieve/user/populate', auth, function(req, res, next) {

  var query = User.findOne({username: req.payload.username});

  query.exec(function(err, user){
    if(err){ return next(err); }
    if(!user){ console.log('/retrieve/user/populate - something went wrong with accessing the user account'); }
    else{
      user.populate('events discussions projects', function(err, user){
        if(err) return next(err); 
        res.json(user);
      });
    }
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


///////////////////////////////// Project //////////////////////////////////////


//Create new Project
router.post('/create/new/project', auth, function(req, res, next){

  var project = new Project(req.body);
  
  var query = User.findOne({username: req.payload.username});
  query.exec(function(err, user){
    if(err) return next(err); 
    if(!user) console.log('/create/new/project - something went wrong with accessing the user in the database'); //test function
    else {
      user.projects.push(project);
      project.createdBy = user;
      user.save(function(err){
        if(err) return next(err);
      });
      project.save(function(err,project){
        if(err) return next(err);
        res.json(project);
      });
    }
  });
});

//Create a new project comment
router.post('/create/project/comment', auth, function(req, res, next){
  
  var query = Project.findById(req.body.project);
  var query2 = User.findOne({ username: req.payload.username });
  
  query.exec(function(err, project){
    if(err) return next(err);
    if(!project) console.log('CreateProjectComment - something went wrong with accessing the project in the database');
    else{
      query2.exec(function(err, user){
        if(err) return next(err);
        if(!user) console.log('CreateProjectComment - something went wrong with accessing the user in the database');
        else{
          project.commments.push({ content: req.body.content,  postedBy: user });
          project.save(function(err, project){
            if(err) return next(err); 
            res.json(project.comments);
          });
        }
      });
    }
  });
  
});

//Project param - test function
router.param('project', function(req, res, next, id){
  var query = Project.findById(id);
  
  query.exec(function(err, project){
    if(err){ return next(err); }
    if(!project){ return next(new Error('can\'t find project')); }
    
    req.project = project;
    return next();
  });
});

//Create a new project - test function
router.post('/create/:user/project', function(req, res, next){
  var project = new Project(req.body);
  project.user = req.user;
  
  project.save(function(err, project){
    if(err){ return next(err); }
    req.user.projects.push(project);
    req.json(project);
  });
});

////////////////////////////////// Event //////////////////////////////////////
//Create a new event
router.post('/create/new/event', auth, function(req, res, next){

  var event = new Event(req.body);
  
  var query = User.findOne({username: req.payload.username});
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

//Create a new event comment
router.post('/create/event/comment', auth, function(req, res, next){
  
  var query = Event.findById( req.body.event );
  var query2 = User.findOne({username: req.payload.username });
  
  query.exec(function(err, event){
    if(err) return next(err);
    if(!event) console.log('create/event/comment - something went wrong with accessing the event in the database');
    else{
      query2.exec(function(err, user){
        if(err) return next(err);
        if(!user) console.log('create/event/comment - something went wrong with accessing the user in the database');
        else{
          event.commments.push({ content: req.body.content,  postedBy: user });
          event.save(function(err, event){
            if(err) return next(err);
            res.json(event.comments);
          });
        }
      });
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

//Create a new note
router.post('/create/new/note', auth, function(req, res, next){
  
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
router.post('/find/friend', function(req, res, next){
 
  
  // var firstNameQuery = User.findOne({ firstName: req.body.entry });
  // var lastNameQuery = User.findOne({ lastName: req.body.entry });
  // var emailQuery = User.findOne({ email: req.body.entry });
  // var usernameQuery = User.findOne({ username: req.body.entry});
  
  var query = User.find({ username: new RegExp( req.body.entry + '+', 'i' )}, 'username firstName lastName');
  
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
  
  
  query.exec(function(err, users){
    if(err) return next(err);
    if(!users) return console.log("No users found!");
    else
      res.json(users);
  });
  
  
});

//Send Friend Request
router.post('/send/friend/request', auth, function(req, res, next){
  console.log("here");
  console.log(req.body.username);
  var query = User.findOne({username: req.payload.username});
  var query2 = User.findOne({username: req.body.username});
    
  query.exec(function(err, user){
    if(err) return next(err);
    if(!user) console.log('Something went wrong with accessing the user account');
    else{
      query2.exec(function(err, requestUser){
        if(err) return next(err);
        if(!requestUser) return console.log('Something went wrong with accessing the user to be added account');
        else{
          user.notifications.push({ 
            user: requestUser,  
            type: 0, 
            summary: "Your friend request has been sent.",
            status: "Pending..."
          });
          requestUser.notifications.push({
            user: user,  
            type: 1, 
            summary: "You have a new friend request.",
            status: "Pending..."
          });
          user.save(function(err){
            if(err) return next(err);
          });
          requestUser.save(function(){
            if(err) return next(err);
          });
          res.json("Request Sent!");
        }
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