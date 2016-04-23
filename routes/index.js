var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Get test mongoose */
var mongoose = require('mongoose');
var Test = mongoose.model('Test');


router.get('/test', function(req, res, next) {
    Test.find(function(err, test){
         if(err){ return next(err); }
         res.json(test);
    });
});



module.exports = router;
