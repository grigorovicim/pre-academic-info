var models  = require('../models');
var express = require('express');
var router  = express.Router();

/**
 * Deletes a given student coourse configuration from the DB.
 * @method DELETE the given course configuration.
 * @throws 'No course configuration found for given ids'
 * @throws 'Internal Server Error! Sorry, try again!' for an unknown error.
 */
router.delete('/student/:student_id/:course_id', function(req, res) {
    const studentId = req.params.student_id;
    const courseId = req.params.course_id;
  
    models.StudentCourse.destroy({
      where: {
        student_id: studentId,
        course_id: courseId
      }
    }).then(function(rowDeleted){
      if(rowDeleted === 1) {
        res.status(200);
        res.send({
            student_id: studentId,
            course_id: courseId
        });
        //res.send('Successfully deleted course configuration for student!');
        console.log('The course configuration for student has been successfully deleted.');
      }
      else {
        res.status(400);
        res.send('No course configuration found for given ids');
        console.log('The course config with student_id:' + studentId + ' and course_id:' + courseId + ' does not exist.');
      }
    }, function(err){
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });
});

/**
 * Deletes a given professor coourse configuration from the DB.
 * @method DELETE the given course configuration for the professor.
 * @throws 'No course configuration found for given ids'
 * @throws 'Internal Server Error! Sorry, try again!' for an unknown error.
 */
router.delete('/professor/:professor_id/:course_id', function(req, res) {
    const professorId = req.params.professor_id;
    const courseId = req.params.course_id;

    models.ProfessorCourse.destroy({
      where: {
        professor_id: professorId,
        course_id: courseId
      }
    }).then(function(rowDeleted){
      if(rowDeleted === 1) {
        res.status(200);
        res.send({
            professor_id: professorId,
            course_id: courseId
        });
        console.log('The course configuration for professor has been successfully deleted.');
      }
      else {
        res.status(400);
        res.send('No course configuration found for given ids');
        console.log('The course config with prof_id:' + professorId + ' and course_id:' + courseId + ' does not exist.');
      }
    }, function(err){
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });
});

/**
 * Insert a new professor course configuration into the database.
 * @method POST the given professor course configuration.
 * @throws 'Internal Server Error! Sorry, try again!' for an unknown error.
 */
router.post('/professor/', function(req, res) {
    models.ProfessorCourse.create(req.body).then(config => res.json(config), err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });
});

/**
 * Insert a new student course configuration into the database.
 * @method POST the given student course configuration.
 * @throws 'Internal Server Error! Sorry, try again!' for an unknown error.
 */
router.post('/student/', function(req, res) {
    models.StudentCourse.create(req.body).then(config => res.json(config), err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });
});

module.exports = router;