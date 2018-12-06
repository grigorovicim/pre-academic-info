var models  = require('../models');
var express = require('express');
var router  = express.Router();

/**
 * Returns a list with all the sections.
 * @method GET the list of sections
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.get('/', function(_, res){
    models.Section.findAll().then(sections => res.json(sections), err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });
});

module.exports = router;