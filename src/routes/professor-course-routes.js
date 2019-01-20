var models  = require('../models');
var express = require('express');
var router  = express.Router();

/**
 * Returns a list with all the professorCourse.
 * @method GET the list of professorCourse
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.get('/', function(_, res){
    models.ProfessorCourse.findAll().then(professorCourse => res.json(professorCourse), err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });
});

/**
 * Receive a professorCourse from the client and store it in the DB.
 * @method POST the professorCourse relation entity.
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.post('/', function(req, res){
    models.ProfessorCourse.create(req.body).then(professorCourse => res.json(professorCourse), err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });
  });
  
module.exports = router;