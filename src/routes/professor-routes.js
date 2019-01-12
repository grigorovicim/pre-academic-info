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

router.get('/course/:courseId', function(req, res){
  const courseId = req.params.courseId;

  models.Professor.findAll({
    //where: {'$ProfessorCourses.professor_id$' : '$Professors.id$'},

    include: [{
    model: models.ProfessorCourse,
    required: true,
    include : [{model:models.Course, required:true, where: {id: courseId}}]
    }]
  }).then(professors => res.json(professors), err => {
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

/*
Returns the profile corresponding to a given professor.
*/
router.get('/profile/:professorId', function(req, res){
  const professorId = req.params.professorId;

  models.Profile.findAll({
    include: [{
    model: models.Professor,
    where:{id : professorId},
    required: true}]
    }).then(profiles => res.json(profiles), err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
  });
});

module.exports = router;