var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('express-jwt');

//Mongoose Models
var User = mongoose.model('User');
var Project = mongoose.model('Project');

//Authenticate
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

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

module.exports = router;