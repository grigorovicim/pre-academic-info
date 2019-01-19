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
    if (req.body.SeminarActivity){
      models.SeminarActivity.create(req.body.SeminarActivity).then(seminarActivity => res.json(seminarActivity), err => {
        res.status(501);
        res.send('Internal Server Error! Sorry, try again!');
        console.log('An error has occurred: ' + err);
      });
    }
    if (req.body.SeminarPresence){
      models.SeminarPresence.create(req.body.SeminarPresence).then(seminarPresence => res.json(seminarPresence), err => {
        res.status(501);
        res.send('Internal Server Error! Sorry, try again!');
        console.log('An error has occurred: ' + err);
      });
    }
    if (req.body.LabActivity){
      models.LabActivity.create(req.body.LabActivity).then(labActivity => res.json(labActivity), err => {
        res.status(501);
        res.send('Internal Server Error! Sorry, try again!');
        console.log('An error has occurred: ' + err);
      });
    }
    if (req.body.LabPresence){
      models.LabPresence.create(req.body.LabPresence).then(labPresence => res.json(labPresence), err => {
        res.status(501);
        res.send('Internal Server Error! Sorry, try again!');
        console.log('An error has occurred: ' + err);
      });
    }
    if (req.body.CourseActivity) {
      models.CourseActivity.create(req.body.CourseActivity).then(courseActivity => res.json(courseActivity), err => {
        res.status(501);
        res.send('Internal Server Error! Sorry, try again!');
        console.log('An error has occurred: ' + err);
      });
    }
    if (req.body.CoursePresence) {
      models.CoursePresence.create(req.body.CoursePresence).then(coursePresence => res.json(coursePresence), err => {
        res.status(501);
        res.send('Internal Server Error! Sorry, try again!');
        console.log('An error has occurred: ' + err);
      });
    }
    if (req.body.ExamPracticalResult){
      models.ExamPracticalResult.create(req.body.ExamPracticalResult).then(examPracticalResult => res.json(examPracticalResult), err => {
        res.status(501);
        res.send('Internal Server Error! Sorry, try again!');
        console.log('An error has occurred: ' + err);
      });
    }
    if (req.body.ExamWrittenResult){
      models.ExamWrittenResult.create(req.body.ExamWrittenResult).then(examWrittenResult => res.json(examWrittenResult), err => {
        res.status(501);
        res.send('Internal Server Error! Sorry, try again!');
        console.log('An error has occurred: ' + err);
      });
    }
    if (req.body.FinalGrade){
      models.FinalGrade.create(req.body.FinalGrade).then(finalGrade => res.json(finalGrade), err => {
        res.status(501);
        res.send('Internal Server Error! Sorry, try again!');
        console.log('An error has occurred: ' + err);
      });
    }
  })

  module.exports = router;