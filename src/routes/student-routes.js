var models  = require('../models');
var express = require('express');
var router  = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


/**
 * Returns a list with all the students.
 * @method GET the list of students
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.get('/', function(_, res){
  models.Student.findAll().then(students => res.json(students), err => {
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

/**
 * Returns the list of students that are part of a given group.
 * @method GET the students filtered by group number.
 * @throws 'Internal Server Error!Sorry, try again!'
 */
router.get('/group/:groupNumber', function(req, res){
  const groupNumber = req.params.groupNumber;

  models.Student.findAll({include: [{
    model: models.Group,
    where: {group_number : groupNumber},
  }]}).then(students => res.json(students), err => {
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});


/**
 * Returns the activities at seminar, lab and course.
 * @method GET the list of students with their activities at seminar, lab and course.
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.get('/catalog/:courseid/:studentstring/:week/:groupid', function(req, res){
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
router.post('/catalog/addactivity', function(req, res){
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



/**
 * Returns the list of students that are part of a given section.
 * @method GET the list of students filtered by section name.
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.get('/section/:name', function(req, res){
  const sectionName = req.params.name;

  models.Student.findAll({include: [{
    model: models.Section,
    where: {name : sectionName},
  }]}).then(students => res.json(students), err => {
    res.status(501);
    res.send('Internal Server Error!Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

/**
 * Returns the grades of a given student for a given course.
 * @method GET the list of grades
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.get('/grades/:studentId/:courseId', function(req, res){
  const studentId = req.params.studentId;
  const courseId = req.params.courseId;

  models.ExamResult.findAll({where: {student_id: studentId, course_id: courseId}})
    .then(results => res.json(results),err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    }
  );
});

/**
 * Receive a student from the client and store it in the DB.
 * @method POST the student entity.
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.post('/', function(req, res){
  models.Student.create(req.body).then(student => res.json(student), err => {
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

/**
 * Updates a given student entity.
 * @method PUT the given student entity.
 * @throws 'Unable to update the given student. Make sure the id is correct.' if the student does not exist.
 * @throws 'Internal Server Error! Sorry, try again!' for an unknown error.
 */
router.put('/:id', function(req, res){
  const studentId = req.params.id;
  
  models.Student.update(req.body, {where : {id: studentId}}).then(rowsUpdated => {
    if(rowsUpdated[0] === 1) {
      res.status(200);
      res.send('Student successfully updated!');
      console.log('Successfully updated student with id:' + studentId);
    }
    else {
      res.status(400);
      res.send('Unable to update the given student. Make sure the id is correct.');
      console.log('Unable to update student with id:' + studentId);
    }
  }, err => {
    res.status(501);
    res.send('Internal Server Error!Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

/**
 * Deletes a given student from the DB
 * @method DELETE the given student.
 * @throws 'A student with the given id was not found!' if a student with the given id does not exist.
 * @throws 'Internal Server Error! Sorry, try again!' for an unknown error.
 */
router.delete('/:id', function(req, res){
  const studentId = req.params.id;

  models.Student.destroy({
    where: {
      id: studentId 
    }
  }).then(function(rowDeleted){
    if(rowDeleted === 1) {
      res.status(200);
      res.send('Successfully deleted student!');
      console.log('The student with id:' + studentId + ' has been deleted.');
    }
    else {
      res.status(400);
      res.send('A student with the given id was not found!');
      console.log('The student with id:' + studentId + ' does not exist.');
    }
  }, function(err){
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

/*
Returns the list of students that are enrolled in a given course.
*/
router.get('/course/:courseId', function(req, res){
  const courseId = req.params.courseId;

  models.Student.findAll(
      {attributes: ['id','year_of_study'],
        include: [
            {
              attributes: [],
              model: models.StudentCourse,
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
  }).then(students => res.json(students), err => {
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

router.get('/not-enrolled/course/:courseId', function(req, res){
    const courseId = parseInt(req.params.courseId, 10);

    models.Student.findAll(
        {attributes: ['id','year_of_study'],
            include: [
                {
                    attributes: ['id', 'first_name', 'last_name', 'personal_email'],
                    model: models.Profile,
                    required: true,
                }],
            where: {id :
                    {
                      [Op.notIn] :
                          [Sequelize.literal('(SELECT student_id FROM "StudentCourses" WHERE "StudentCourses"."course_id" = '+ courseId + ')')]

                    }}
        }).then(students => res.json(students), err => {
        res.status(501);
        res.send('Internal Server Error! Sorry, try again!');
        console.log('An error has occurred: ' + err);
    });
});

/*
Returns the profile corresponding to a given student.
*/
router.get('/profile/:studentId', function(req, res){
  const studentId = req.params.studentId;

  models.Profile.findAll({
    include: [{
    model: models.Student,
    where:{id : studentId},
    required: true}]
    }).then(profiles => res.json(profiles), err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
  });
});

module.exports = router;