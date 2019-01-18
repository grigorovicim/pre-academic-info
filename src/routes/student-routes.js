var models  = require('../models');
var express = require('express');
var router  = express.Router();

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
 * Returns the activities at seminar/lab/course.
 * @method GET the list of students with their activities at seminar/lab/course.
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.get('/catalog/:type/:id', function(req,res){
  const typeOfHour = req.params.type;
  const courseId = req.params.id;

  if (typeOfHour == 'seminar') {
    models.SeminarActivity.findAll({
      where: {
        course_id: courseId
      }
    }).then((seminarActivities => res.json(seminarActivities), 
      models.SeminarPresence.findAll({
        where: {
          course_id: courseId
        }
      }).then(seminarPresences => res.json(seminarPresences), err => {
        res.status(501);
        res.send('Internal Server Error!Sorry, try again!');
        console.log('An error has occurred: ' + err);
      })), err => {
        res.status(501);
        res.send('Internal Server Error!Sorry, try again!');
        console.log('An error has occurred: ' + err);
      })
    } else if (typeOfHour == 'lab') {
      models.LabActivity.findAll({
        where: {
          course_id: courseId
        }
      }).then((labActivities => res.json(labActivities), 
        models.LabPresence.findAll({
          where: {
            course_id: courseId
          }
        }).then(labPresences => res.json(labPresences), err => {
          res.status(501);
          res.send('Internal Server Error!Sorry, try again!');
          console.log('An error has occurred: ' + err);
        })), err => {
          res.status(501);
          res.send('Internal Server Error!Sorry, try again!');
          console.log('An error has occurred: ' + err);
        })
    } else if (typeOfHour == 'course') {
      models.CourseActivity.findAll({
        where: {
          course_id: courseId
        }
      }).then((labActivities => res.json(courseActivities), 
        models.LabPresence.findAll({
          where: {
            course_id: courseId
          }
        }).then(labPresences => res.json(labPresences), err => {
          res.status(501);
          res.send('Internal Server Error!Sorry, try again!');
          console.log('An error has occurred: ' + err);
        })), err => {
          res.status(501);
          res.send('Internal Server Error!Sorry, try again!');
          console.log('An error has occurred: ' + err);
        })
    }
});



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

  models.Student.findAll({
    include: [{
    model: models.StudentCourse,
    required: true,
    include : [{model:models.Course, required:true, where: {id: courseId}}]
    }]
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