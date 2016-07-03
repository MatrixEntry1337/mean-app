var express = require('express');
var router = express.Router();

//Modules
router.use(require('./userRouter'));
router.use(require('./discussionRouter'));
router.use(require('./eventRouter'));
router.use(require('./friendRouter'));
router.use(require('./noteRouter'));
router.use(require('./projectRouter'));
router.use(require('./educationRouter'));
router.use(require('./experienceRouter'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kyle\'s-Mean-Application' });
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

module.exports = router;

