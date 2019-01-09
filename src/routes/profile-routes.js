var models  = require('../models');
var express = require('express');
var router  = express.Router();

/**
 * Returns a list with all the profiles.
 * @method GET the list of profiles
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.get('/', function(_, res){
    models.Profile.findAll().then(profiles => res.json(profiles), err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });
});

module.exports = router;
