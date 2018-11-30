var models  = require('../models');
var express = require('express');
var router  = express.Router();

/*
Return the list of all the professors.
*/

router.get('/', function(_, res){
  models.Professor.findAll().then(professors => res.json(professors), err => {
    res.status(501);
    res.send('Internal Server Error!Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

/*
Returns the list of all the professors that teach a particular course.
*/

router.get('/professors/:courseId', function(req, res){
  const courseId = req.params.courseId;

  models.Professor.findAll({include: [{
    model: models.Course,
    where: {course_id : courseId},
  }]}).then(professors => res.json(professors), err => {
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

module.exports = router;