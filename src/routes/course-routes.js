var models  = require('../models');
var express = require('express');
var router  = express.Router();

/**
 * Returns a list with all the courses.
 * @method GET the list of courses
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.get('/', function(_, res){
    models.Course.findAll().then(courses => res.json(courses), err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });
});

/**
 * Returns the course that has the id specified as a parameter.
 * @method GET the course by id.
 * @throws 'Internal Server Error!Sorry, try again!'
 */
router.get('/:id', function(req, res){
  const id = req.params.id;

  models.Course.findByPk(id).then(course => res.json(course), err => {
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

/**
 * Updates a given course entity.
 * @method PUT the given course entity.
 * @throws 'Unable to update the given course. Make sure the id is correct.' if the course does not exist.
 * @throws 'Internal Server Error! Sorry, try again!' for an unknown error.
 */
router.put('/:id', function(req, res){
  const courseId = req.params.id;
  console.log(courseId);
  models.Course.update(req.body, {where : {id: courseId}}).then(rowsUpdated => {
    if(rowsUpdated[0] === 1) {
      res.status(200);
      res.send('Course successfully updated!');
      console.log('Successfully updated course with id:' + courseId);
    }
    else {
      res.status(400);
      res.send('Unable to update the given course. Make sure the id is correct.');
      console.log('Unable to update course with id:' + courseId);
    }
  }, err => {
    res.status(501);
    res.send('Internal Server Error!Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

  

module.exports = router;