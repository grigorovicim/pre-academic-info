var models  = require('../models');
var express = require('express');
var router  = express.Router();

/**
 * Returns a list with all the years.
 * @method GET the list of years
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.get('/', function(_, res){
    models.YearOfStudy.findAll().then(YearOfStudies => res.json(YearOfStudies), err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });
});

module.exports = router;