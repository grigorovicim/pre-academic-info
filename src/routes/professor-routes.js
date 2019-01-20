var models  = require('../models');
var express = require('express');
var router  = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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

/**
 * Receive a professor from the client and store it in the DB.
 * @method POST the professor entity.
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.post('/', function(req, res){
  models.Professor.create(req.body).then(prof => res.json(prof), err => {
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

router.get('/enrolled/course/:courseId', function(req, res){
  const courseId = req.params.courseId;

  models.Professor.findAll(
      {attributes: ['id'],
        include: [
            {
              attributes: [],
              model: models.ProfessorCourse,
              required: true,
              include : [{
                  model:models.Course,
                  attributes: ['id', 'name'],
                  required:true,
                  where: {id: courseId}}]
          },
            {
              attributes: ['id', 'first_name', 'last_name', 'personal_email'],
                model: models.Profile,
                required: true,
            }]
  }).then(professors => res.json(professors), err => {
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

router.get('/not-enrolled/course/:courseId', function(req, res){
  const courseId = parseInt(req.params.courseId, 10);

  models.Professor.findAll(
      {attributes: ['id'],
          include: [
              {
                  attributes: ['id', 'first_name', 'last_name', 'personal_email'],
                  model: models.Profile,
                  required: true,
              }],
          where: {id :
                  {
                    [Op.notIn] :
                        [Sequelize.literal('(SELECT professor_id FROM "ProfessorCourses" WHERE "ProfessorCourses"."course_id" = '+ courseId + ')')]

                  }}
      }).then(professors => res.json(professors), err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
  });
});

module.exports = router;