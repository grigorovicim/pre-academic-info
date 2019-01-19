var models  = require('../models');
var express = require('express');
var router  = express.Router();

/**
 * Returns a list with all the studentCourses.
 * @method GET the list of studentCourses
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.get('/', function(_, res){
    models.StudentCourse.findAll().then(studentCourses => res.json(studentCourses), err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });
});

/**
 * Receive a studentCourse from the client and store it in the DB.
 * @method POST the studentCourse relation entity.
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.post('/', function(req, res){
    models.StudentCourse.create(req.body).then(studentCourse => res.json(studentCourse), err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });
  });
  
module.exports = router;