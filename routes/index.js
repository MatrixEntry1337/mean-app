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

//Param
router.param('user', function(req, res, next, id){
  var query = User.findById(id);
  
  query.exec(function(err, user){
    if(err){ return res.send('An error occured'); } 
    if(!user){ return next(new Error('user can\'t be found')); }
    
    req.user = user;
    return next();
  });
});

router.param('discussion', function(req, res, next, id){
  var query = Discussion.findById(id);
  
  query.exec(function(err, discussion){
    if(err){ return next(err); }
    if(!discussion){ return next(new Error('can\'t find discussion')); }
    
    req.discussion = discussion;
    return next();
  });
});


router.param('project', function(req, res, next, id){
  var query = Project.findById(id);
  
  query.exec(function(err, project){
    if(err){ return next(err); }
    if(!project){ return next(new Error('can\'t find project')); }
    
    req.project = project;
    return next();
  });
});

router.param('socialcontact', function(req, res, next, id){
  var query = SocialContact.findById(id);
  
  query.exec(function(err, contact){
    if(err){ return next(err); }
    if(!contact){ return next(new Error('can\'t find contact')); }
    
    req.contact = contact;
    return next();
  })
})

router.param('experience', function(req, res, next, id){
  var query = Experience.findById(id);
  
  query.exec(function(err, experience){
    if(err){ return next(err); }
    if(!experience) { return next(new Error('can\'t find experience')); }
    
    req.experience = experience;
    return next();
  });
});

router.param('note', function(req, res, next, id){
  var query = Note.findById(id);
  
  query.exec(function(err, note){
    if(err){ return next(err); }
    if(!note) { return next(new Error('can\'t find note')); }
    
    req.note = note;
    return next();
  });
});

///////Get All users/////////
router.get('/users', function(req, res, next) {
   User.find(function(err, users){
    if(err){ return next(err); }

    res.json(users);
  });
});

//Get all discussions
router.get('/discussions', function(req, res, next){
  Discussion.find(function(err, discussions){
    if(err){ return next(err); }
    res.json(discussions);
  });
});

//Get all contacts
router.get('/contacts', function(req, res, next){
  Contact.find(function(err, contacts){
    if(err){ return next(err); }
    res.json(contacts);
  });
});

//Get all comments
router.get('/comments', function(req, res, next){
  UserComment.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});

///Retrieve User Info///
router.get('/overall/:user', function(req, res, next) {
  
//retrieve all info for the overall page
req.user.populate('notes events contacts discussions', function(err, user){
    if(err){ return next(err); }
    
    res.json(req.user);
  });
});

//Update user password
router.put('/overall/:user/updatePassword', function(req, res, next){
  req.user.update(req.body, function(err, user){
    if(err){ return next(err); }
    res.json(user);
  });
});

//User login
router.post('/login', function(req, res, next){
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

///////////// User Creation //////////////

//Creates a new user and it's necessary collections
router.post('/register', function(req, res, next){
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

//Create new discussion
router.post('/overall/:user/newdiscussion', function(req, res, next){
  var discussion = new Discussion(req.body);
  discussion.user = req.user;
  
  discussion.save(function(err, discussion){
    if(err){ return next(err); }
    req.user.discussions.push(discussion);
    res.json(discussion);
  });
});

//Create a new project
router.post('/overall/:user/newproject', function(req, res, next){
  var project = new Project(req.body);
  project.user = req.user;
  
  project.save(function(err, project){
    if(err){ return next(err); }
    req.user.projects.push(project);
    req.json(project);
  });
});

//Create a new note
router.post('/overall/:user/newnote', function(req, res, next){
  var note = new Note(req.body);
  note.user = req.user;
  
  note.save(function(err, note){
    if(err){ return next(err); }
    req.user.notes.push(note);
    res.json(note);
  });
});

//Create a new education
router.post('/overall/:user/neweducation', function(req, res, next){
  var education = new Education(req.body);
  education.user = req.user;
  
  education.save(function(err, education){
    if(err){ return next(err); }
    req.user.education.push(education);
    res.json(education);
  });
});

//Create a new experience
router.post('/overall/:user/newexperience', function(req, res, next){
  var experience = new Experience(req.body);
  experience.user = req.user;
  
  experience.save(function(err, experience){
    if(err){ return next(err); }
    req.user.experiences.push(experience);
    res.json(experience);
  });
});

//Create a new event
router.post('/overall/:user/newevent', function(req, res, next){
  var event = new Event(req.body);
  event.user = req.user;
  
  event.save(function(err, event){
    if(err){ return next(err); }
    req.user.events.push(event);
    res.json(event);
  });
});

//Create a new social contact
router.post('/overall/:user/newsocialcontact', function(req, res, next){
  var socialcontact = new SocialContact(req.body);
  socialcontact.user = req.user;
  
  socialcontact.save(function(err, socialcontact){
    if(err){ return next(err); }
    req.user.socialcontacts.push(socialcontact);
    res.json(socialcontact);
  });
});

//////////// User Removal ///////////
router.post('/overall/:user/deletediscussion', function(req, res, next){
  req.user.discussions.pull(req.body);
});


/////////// User to USer Activity ////////////

//Send comment to another user
router.post('/overall/:user/sendcomment', function(req, res, next){
  var user = User.findOne(req.body.email, function(err){
    if(err){ return next(err); }
  });
  
  UserComment.update(user, {$push: {'comments': { text: req.body.text, user: user._id }}}, { multi: false }, 
  function(err, comment){
    if(err){ return next(err); }
    res.json(comment);
  });
});
  

module.exports = router; 