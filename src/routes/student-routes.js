var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(_, res){
  models.Student.findAll().then(students => res.json(students), err => {
    res.status(501);
    res.send('Internal Server Error!Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

router.get('/group/:groupNumber', function(req, res){
  const groupNumber = req.params.groupNumber;

  models.Student.findAll({include: [{
    model: models.Group,
    where: {group_number : groupNumber},
  }]}).then(students => res.json(students), err => {
    res.status(501);
    res.send('Internal Server Error!Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

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

router.get('/grades/:studentId/:courseId', function(req, res){
  const studentId = req.params.studentId;
  const courseId = req.params.courseId;

  models.ExamResult.findAll({where: {student_id: studentId, course_id: courseId}})
    .then(results => res.json(results),err => {
      res.status(501);
      res.send('Internal Server Error!Sorry, try again!');
      console.log('An error has occurred: ' + err);
    }
  );
});

router.post('/', function(req, res){
  models.Student.Create(req.body).then(student => res.json(student), err => {
    res.status(501);
    res.send('Internal Server Error!Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

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
    res.send('Internal Server Error!Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

module.exports = router;