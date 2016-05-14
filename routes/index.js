var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kyle\'s-Mean-Application' });
});

//API for Comments and Post
var User = mongoose.model('User');
var UserComment = mongoose.model('UserComment');
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

//Param
router.param('user', function(req, res, next, id){
  var query = User.findById(id);
  
  query.exec(function(err, user){
    if(err){ return next(err); } 
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

//Get All users
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

///Retrieve User Info///
router.get('/overall/:user', function(req, res, next) {
  
  //retrieve all info for the overall page
  req.user.populate('notes events contacts discussions', function(err, user){
    if(err){ return next(err); }
    
    res.json(user);
  });
});

//Create new user
router.post('/new-user', function(req, res, next){
  var user = new User(req.body);
  
  user.save(function(err, user){
    if(err){ return next(err); }
    res.json(user);
  });
});


//Create new discussion
router.post('/new-discussion', function(req, res, next){
  var discussion = new Discussion(req.body);
  
  discussion.save(function(err, discussion){
    if(err){ return next(err); }
    res.json(discussion);
  });
});

router.post('/link', function(req, res, next){
  var _id = '57369801eb80896d362b9cb1';
  var query = User.findById(_id);
  
  query.exec(function(err, user){
    if(err){ return next(err); }
    user.firstName = 'Robert';
    user.save(function(err){
      if(err){ return next(err); }
      console.log('Successfully saved');
    });
    res.json(user);
  });
});

module.exports = router; 