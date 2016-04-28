var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// /* Get test mongoose */
// var mongoose = require('mongoose');
// var Test = mongoose.model('Test');


// router.get('/tests', function(req, res, next) {
//     Test.find(function(err, tests){
//         if(err){ return next(err); }
//         res.json(test);
//     });
// });

// router.post('/tests', function(req, res, next){
//   var test = new Test(req.body);
  
//   test.save(function(err, post){
//     if(err){ return next(err); }
  
    
//     res.json(post);
//   });
// });

module.exports = router;
