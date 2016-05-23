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
var Contact = mongoose.model('Contact');
var SocialContact = mongoose.model('SocialContact');
var Discussion = mongoose.model('Discussion');
var DiscussionComment = mongoose.model('DiscussionComment');
var Project = mongoose.model('Project');
var ProjectComment = mongoose.model('ProjectComment');
var Education = mongoose.model('Education');
var Experience = mongoose.model('Experience');
var Skill = mongoose.model('Skill');
var Note = mongoose.model('Note');
var Event = mongoose.model('Event');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

///////////////////////////////// User /////////////////////////////////////////
// User param
router.param('user', function(req, res, next, id){
  var query = User.findById(id);
  
  query.exec(function(err, user){
    if(err){ return res.send('An error occured'); } 
    if(!user){ return next(new Error('user can\'t be found')); }
    
    req.user = user;
    return next();
  });
});

// Get all users
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
  
  var contact = new Contact();
  contact.save(function(err){
    if(err){ return next(err); }
  });
  
  var comment = new UserComment();
  comment.save(function(err){
    if(err){ return next(err); }
  });
  
  var user = new User();
  
  user.username = req.body.username;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  
  user.save(function(err){
    if(err){ return next(err); }
    return res.json({token: user.generateJWT()});
  });
  
  contact.user = user;
  comment.user = user;
  
  user.contacts = contact;
  user.comments = comment;
  
  
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

///Retrieve User Info - notes, events, discussions ///
router.get('/retrieve/user/notes-events-discussions', auth, function(req, res, next) {

  var user = User.findOne({username: req.payload.username});

  user.exec(function(err, user){
    if(err){ return next(err); }
    if(!user){ console.log('Something went wrong!'); }
    
    user.populate('notes events discussions', function(err, user){
      if(err){ return next(err); }
      res.json(user);
    });
  });
});

//Retrieve contacts
router.get('/retrieve/user/contacts', auth, function(req, res, next){
  
  var user = User.findOne({username : req.payload.username});
  
  user.exec(function(err, user){
    if(err){ return next(err); }
    if(!user){ console.log('Something went wrong!'); }
    
    Contact.findOne({user: user._id}, function(err, contact){
      if(err){ return next(err); }
      if(!contact){ console.log('Something went wrong!'); }
      else{
        contact.populate('contacts', function(err, contact){
          if(err){ return next(err); }
          res.json(contact);
        });
      }
    });
  });
});


//Update user password
router.put('update/:user/password', function(req, res, next){
  req.user.update(req.body, function(err, user){
    if(err){ return next(err); }
    res.json(user);
  });
});


///////////////////////////////// Discussion ///////////////////////////////////
// Discussion param
router.param('discussion', function(req, res, next, id){
  var query = Discussion.findById(id);
  
  query.exec(function(err, discussion){
    if(err){ return next(err); }
    if(!discussion){ return next(new Error('can\'t find discussion')); }
    
    req.discussion = discussion;
    return next();
  });
});

//Get all discussions
router.get('/all/discussions', function(req, res, next){
  Discussion.find(function(err, discussions){
    if(err){ return next(err); }
    res.json(discussions);
  });
});

//Create new discussion
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
// Project param
router.param('project', function(req, res, next, id){
  var query = Project.findById(id);
  
  query.exec(function(err, project){
    if(err){ return next(err); }
    if(!project){ return next(new Error('can\'t find project')); }
    
    req.project = project;
    return next();
  });
});

//Create a new project
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
router.post('/create/:user/event', function(req, res, next){
  var event = new Event(req.body);
  event.user = req.user;
  
  event.save(function(err, event){
    if(err){ return next(err); }
    req.user.events.push(event);
    res.json(event);
  });
});

////////////////////////////// Social Contact //////////////////////////////////
// Social Contact param
router.param('socialcontact', function(req, res, next, id){
  var query = SocialContact.findById(id);
  
  query.exec(function(err, contact){
    if(err){ return next(err); }
    if(!contact){ return next(new Error('can\'t find contact')); }
    
    req.contact = contact;
    return next();
  });
});


///////////////////////////////// Experience ///////////////////////////////////
// Experience param
router.param('experience', function(req, res, next, id){
  var query = Experience.findById(id);
  
  query.exec(function(err, experience){
    if(err){ return next(err); }
    if(!experience) { return next(new Error('can\'t find experience')); }
    
    req.experience = experience;
    return next();
  });
});

//Create a new experience
router.post('/create/:user/experience', function(req, res, next){
  var experience = new Experience(req.body);
  experience.user = req.user;
  
  experience.save(function(err, experience){
    if(err){ return next(err); }
    req.user.experiences.push(experience);
    res.json(experience);
  });
});


/////////////////////////////// Education /////////////////////////////////////

//Create a new education
router.post('/create/:user/education', function(req, res, next){
  var education = new Education(req.body);
  education.user = req.user;
  
  education.save(function(err, education){
    if(err){ return next(err); }
    req.user.education.push(education);
    res.json(education);
  });
});

////////////////////////////////// Notes ///////////////////////////////////////
// Note param
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

//Remove the top note from user
router.put('/pop/:user/note', function(req, res, next){
    req.user.notes.pop();
  req.user.save(function(err){
    if(err){ return next(err); }
    res.json(req.user);
  });
});

//Get all notes
router.get('/notes', function(req, res, next){
  Note.find(function(err, notes){
    if(err){ return next(err); }
    res.json(notes);
  });
});


/////////////////////////////////// Contact ///////////////////////////////////
//Create a new social contact
router.post('/create/:user/socialcontact', function(req, res, next){
  var socialcontact = new SocialContact(req.body);
  socialcontact.user = req.user;
  
  socialcontact.save(function(err, socialcontact){
    if(err){ return next(err); }
    req.user.socialcontacts.push(socialcontact);
    res.json(socialcontact);
  });
});

router.param('contact', function(req, res, next, id){
  var query = Contact.findById(id);
  
  query.exec(function(err, contact){
    if(err){ return res.send('An error occured'); } 
    if(!contact){ return next(new Error('user can\'t be found')); }
    
    req.contact = contact;
    return next();
  });
});

//Get all contacts
router.get('/all/contacts', function(req, res, next){
  Contact.find(function(err, contacts){
    if(err){ return next(err); }
    res.json(contacts);
  });
});

//Add a contact
router.post('/create/:user/contact', function(req, res, next){
  var query = Contact.findOne(req.user.contacts);
  var addUser;
  
  User.findById(req.body.user, function(err, user){
    if(err){ return next(err); }
    console.log(user);
    addUser = user;
  });
  
  query.exec(function(err, contact){
    if(err){ return next(err); }
    contact.contacts.push(addUser);
    contact.save(function(err){
      if(err){ return next(err); }
    });
    contact.populate('contacts', function(err){
      if(err){ return next(err); }
    });
    res.json(contact);
  });
  
});

//Remove the top contact from user
router.put('/pop/:contact/user', function(req, res, next){
    req.contact.contacts.pop();
  req.contact.save(function(err){
    if(err){ return next(err); }
    res.json(req.contact);
  });
});

/////////////////////////////////// Comment ////////////////////////////////////
//Get all comments
router.get('/all/comments', function(req, res, next){
  UserComment.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});

//Send comment to another user
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