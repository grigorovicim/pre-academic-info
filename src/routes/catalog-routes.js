var models  = require('../models');
var express = require('express');
var router  = express.Router();
const Sequelize = require('sequelize');


/**
 * Returns the activities at seminar, lab and course.
 * @method GET the list of students with their activities at seminar, lab and course.
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.get('/:courseid/:studentstring/:week/:groupid', function(req, res){
    const searchString = '%' + req.params.studentstring + '%';
    const courseIdQuery = req.params.courseid;
    const weekparam = req.params.week;
    const groupidparam = req.params.groupid;
    console.log(searchString);
    console.log(courseIdQuery);
    const Op = Sequelize.Op;
  
    if (groupidparam === 0) {
      models.Student.findAll({include : [{
        model: models.Profile,
        required: true,
        where: { [Op.or]: [{first_name : {[Op.like] : searchString}}, {last_name : {[Op.like] : searchString}}]},
      },{
        model: models.StudentCourse,
        required: true,
        include : [{model:models.Course, required:true, where: {id: courseIdQuery}}]
      },{
        model: models.SeminarActivity,
        where: { week : weekparam },
      },{
        model: models.SeminarPresence,
        where: { week : weekparam },
      },{
        model: models.LabActivity,
        where: { week : weekparam },
      },{
        model: models.LabPresence,
        where: { week : weekparam },
      },{
        model: models.CourseActivity,
        where: { week : weekparam },
      },{
        model: models.CoursePresence,
        where: { week : weekparam },
      },{
        model: models.ExamWrittenResult,
      },{
        model: models.ExamPracticalResult,
      },{
        model: models.FinalGrade,
      },{
        model: models.LabPresence,
        attributes: { include: [[sequelize.fn('COUNT', sequelize.col('LabPresences')), 'labPresnces']] }
      },{
        model: models.SeminarPresence,
        attributes: { include: [[sequelize.fn('COUNT', sequelize.col('SeminarPresences')), 'seminarPresences']] }
      },{
        model: models.CoursePresence,
        attributes: { include: [[sequelize.fn('COUNT', sequelize.col('CoursePresences')), 'coursePresences']] }
      }
      ]}).then(students => res.json(students), err => {
        res.status(501);
        res.send('Internal Server Error! Sorry, try again!');
        console.log('An error has occurred: ' + err);
      });
    } else {
      models.Student.findAll({
        where : {group_id : groupidparam},
        include : [{
        model: models.Profile,
        required: true,
        where: { [Op.or]: [{first_name : {[Op.like] : searchString}}, {last_name : {[Op.like] : searchString}}]},
      },{
        model: models.StudentCourse,
        required: true,
        include : [{model:models.Course, required:true, where: {id: courseIdQuery}}]
      },{
        model: models.SeminarActivity,
        where: { week : weekparam },
      },{
        model: models.SeminarPresence,
        where: { week : weekparam },
      },{
        model: models.LabActivity,
        where: { week : weekparam },
      },{
        model: models.LabPresence,
        where: { week : weekparam },
      },{
        model: models.CourseActivity,
        where: { week : weekparam },
      },{
        model: models.CoursePresence,
        where: { week : weekparam },
      },{
        model: models.ExamWrittenResult,
      },{
        model: models.ExamPracticalResult,
      },{
        model: models.FinalGrade,
      }
      ]}).then(students => res.json(students), err => {
        res.status(501);
        res.send('Internal Server Error! Sorry, try again!');
        console.log('An error has occurred: ' + err);
      });
    }
  });
  
  
  /**
   * Updates the database with the activities given by the professor for a specific student.
   * @method POST grades get added for a student.
   * @throws 'Internal Server Error! Sorry, try again!' 
   */
  router.post('/addactivity', function(req, res){
    if (req.body.SeminarActivity) {
        models.SeminarPresence.findOrCreate(req.body.SeminarActivity, {
          where: { 
              student_id: req.body.SeminarActivity.student_id,
              course_id: req.body.SeminarActivity.course_id,
              week: req.body.SeminarActivity.week
          }}
          ).then(result => {
              var seminarActivity = result[0],
              created = result[1];
  
              if (!created) {
                  console.log('SeminarActivity already exists!');
              }
  
              console.log('Created SeminarActivity!');
              res.json(seminarActivity) = seminarActivity;
          }, err => {
          res.status(501);
          res.send('Internal Server Error! Sorry, try again!');
          console.log('An error has occurred: ' + err);
        });
      }
    if (req.body.SeminarPresence) {
        models.SeminarPresence.findOrCreate(req.body.SeminarPresence, {
          where: { 
              student_id: req.body.SeminarPresence.student_id,
              course_id: req.body.SeminarPresence.course_id,
              week: req.body.SeminarPresence.week
          }}
          ).then(result => {
              var seminarPresence = result[0],
              created = result[1];
  
              if (!created) {
                  console.log('SeminarPresence already exists!');
              }
  
              console.log('Created SeminarPresence!');
              res.json(seminarPresence) = seminarPresence;
          }, err => {
          res.status(501);
          res.send('Internal Server Error! Sorry, try again!');
          console.log('An error has occurred: ' + err);
        });
      }
    if (req.body.LabActivity) {
        models.LabActivity.findOrCreate(req.body.LabActivity, {
          where: { 
              student_id: req.body.LabActivity.student_id,
              course_id: req.body.LabActivity.course_id,
              week: req.body.LabActivity.week
          }}
          ).then(result => {
              var labActivity = result[0],
              created = result[1];
  
              if (!created) {
                  console.log('LabActivity already exists!');
              }
  
              console.log('Created LabActivity!');
              res.json(labActivity) = labActivity;
          }, err => {
          res.status(501);
          res.send('Internal Server Error! Sorry, try again!');
          console.log('An error has occurred: ' + err);
        });
      }
    if (req.body.LabPresence) {
        models.LabPresence.findOrCreate(req.body.LabPresence, {
          where: { 
              student_id: req.body.LabPresence.student_id,
              course_id: req.body.LabPresence.course_id,
              week: req.body.LabPresence.week
          }}
          ).then(result => {
              var labPresence = result[0],
              created = result[1];
  
              if (!created) {
                  console.log('LabPresence already exists!');
              }
  
              console.log('Created LabPresence!');
              res.json(labPresence) = labPresence;
          }, err => {
          res.status(501);
          res.send('Internal Server Error! Sorry, try again!');
          console.log('An error has occurred: ' + err);
        });
      }
    if (req.body.CourseActivity) {
      models.CourseActivity.findOrCreate(req.body.CourseActivity, {
        where: { 
            student_id: req.body.CourseActivity.student_id,
            course_id: req.body.CourseActivity.course_id,
            week: req.body.CourseActivity.week
        }}
        ).then(result => {
            var courseActivity = result[0],
            created = result[1];

            if (!created) {
                console.log('CourseActivity already exists!');
            }

            console.log('Created CourseActivity!');
            res.json(courseActivity) = courseActivity;
        }, err => {
        res.status(501);
        res.send('Internal Server Error! Sorry, try again!');
        console.log('An error has occurred: ' + err);
      });
    }
    if (req.body.CoursePresence) {
        models.CoursePresence.findOrCreate(req.body.CoursePresence, {
          where: { 
              student_id: req.body.CoursePresence.student_id,
              course_id: req.body.CoursePresence.course_id,
              week: req.body.CoursePresence.week
          }}
          ).then(result => {
              var coursePresence = result[0],
              created = result[1];
  
              if (!created) {
                  console.log('CoursePresence already exists!');
              }
  
              console.log('Created CoursePresence!');
              res.json(coursePresence) = coursePresence;
          }, err => {
          res.status(501);
          res.send('Internal Server Error! Sorry, try again!');
          console.log('An error has occurred: ' + err);
        });
      }
      if (req.body.ExamPracticalResult) {
        models.ExamPracticalResult.findOrCreate(req.body.ExamPracticalResult, {
          where: { 
              student_id: req.body.ExamPracticalResult.student_id,
              course_id: req.body.ExamPracticalResult.course_id
          }}
          ).then(result => {
              var examPracticalResult = result[0],
              created = result[1];
  
              if (!created) {
                  console.log('ExamPracticalResult already exists!');
              }
  
              console.log('Created ExamPracticalResult!');
              res.json(examPracticalResult) = examPracticalResult;
          }, err => {
          res.status(501);
          res.send('Internal Server Error! Sorry, try again!');
          console.log('An error has occurred: ' + err);
        });
      }
      if (req.body.ExamWrittenResult) {
        models.ExamWrittenResult.findOrCreate(req.body.ExamWrittenResult, {
          where: { 
              student_id: req.body.ExamWrittenResult.student_id,
              course_id: req.body.ExamWrittenResult.course_id
          }}
          ).then(result => {
              var examWrittenResult = result[0],
              created = result[1];
  
              if (!created) {
                  console.log('ExamWrittenResult already exists!');
              }
  
              console.log('Created ExamWrittenResult!');
              res.json(examWrittenResult) = examWrittenResult;
          }, err => {
          res.status(501);
          res.send('Internal Server Error! Sorry, try again!');
          console.log('An error has occurred: ' + err);
        });
      }
      if (req.body.FinalGrade) {
        models.FinalGrade.findOrCreate(req.body.FinalGrade, {
          where: { 
              student_id: req.body.FinalGrade.student_id,
              course_id: req.body.FinalGrade.course_id
          }}
          ).then(result => {
              var finalGrade = result[0],
              created = result[1];
  
              if (!created) {
                  console.log('FinalGrade already exists!');
              }
              console.log('Created FinalGrade!');
              res.json(finalGrade) = finalGrade;
          }, err => {
          res.status(501);
          res.send('Internal Server Error! Sorry, try again!');
          console.log('An error has occurred: ' + err);
        });
      }
  })

  module.exports = router;