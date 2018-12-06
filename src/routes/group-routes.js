var models  = require('../models');
var express = require('express');
var router  = express.Router();

/**
 * Returns a list with all the groups.
 * @method GET the list of groups
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.get('/', function(_, res){
    models.Group.findAll().then(groups => res.json(groups), err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });
});

module.exports = router;