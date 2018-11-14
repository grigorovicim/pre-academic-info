var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(_, res){
  models.Professor.findAll().then(professors => res.json(professors), err => {
    res.status(501);
    res.send('Internal Server Error!Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

module.exports = router;