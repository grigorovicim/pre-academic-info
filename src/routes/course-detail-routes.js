var models  = require('../models');
var express = require('express');
var router  = express.Router();
const Sequelize = require('sequelize');
/**
 * Returns a course configuration.
 * @method GET the list course configuration
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.get('/:id', function(_, res){
    models.CourseConfiguration.findOne(
        { include: [
            {
                model: models.Course,
                where: Sequelize.where(
                    Sequelize.col('Course.courseconfiguration_id'),
                    Sequelize.col('CourseConfiguration.id')
                ),
                duplicating: false,
            },
            {
                model: models.CourseTestPercentage,
                 where: Sequelize.where(
                 Sequelize.col('CourseConfiguration.id'),
                 Sequelize.col('CourseTestPercentages.courseconfiguration_id')
                 ),
                 duplicating: false,
            },
            {
                model: models.SeminarTestPercentage,
                where: Sequelize.where(
                Sequelize.col('CourseConfiguration.id'),
                Sequelize.col('SeminarTestPercentages.courseconfiguration_id')
                ),
                duplicating: false,
            },
            {
                model: models.LabTestPercentage,
                where: Sequelize.where(
                Sequelize.col('CourseConfiguration.id'),
                Sequelize.col('LabTestPercentages.courseconfiguration_id')
                ),
                duplicating:false,
            },
        ],
    }).then(cfs => res.json(cfs), err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });
});

module.exports = router;

/**
 * Updates an existing course configuration entity.
 * @method PUT the given course configuration.
 * @throws 'Unable to update the given course configuration' for an SQL error
 * @throws 'Internal Server Error! Sorry, try again!' for an unknown error.
 */
router.put('/', function(req, res){

    const labTestsPercentages = req.body.labTestsPercentages;
    const seminarTestsPercentages = req.body.seminarTestsPercentages;
    const courseTestsPercentages = req.body.courseTestsPercentages;

    const newCourseConfig = req.body.courseConfig;
    const courseConfigurationId = newCourseConfig.courseConfigurationId;
    console.log("The course configuration id is " + courseConfigurationId);

    //update the course configuration
    models.CourseConfiguration.update(newCourseConfig, {where : {id: courseConfigurationId}}).then(rowsUpdated => {
        console.log("I have the id " + courseConfigurationId);
      if(rowsUpdated[0] === 1) {
        res.status(200);
        res.send('Course configuration successfully updated!');
        console.log('Successfully updated course configuration with id:' + courseConfigurationId);
      }
      else {
        res.status(400);
        res.send('Unable to update the given course configuration');
      }
    }, err => {
      res.status(501);
      res.send('Internal Server Error!Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });

    //delete the labTestPercentages, seminarTestPercentages and courseTestPercentages corresponding to the courseConfiguration
    models.LabTestPercentage.destroy({where: {courseconfiguration_id: courseConfigurationId}});
    models.SeminarTestPercentage.destroy({where: {courseconfiguration_id: courseConfigurationId}});
    models.CourseTestPercentage.destroy({where: {courseconfiguration_id: courseConfigurationId}});


    //add the new labTestPercentages, seminarTestsPercentages and courseTestPercentages
    Object.keys(labTestsPercentages).map(function(key){
        var test = labTestsPercentages[key];
        var tWeek = test.week;
        var tPercentage = test.percentage;

        models.LabTestPercentage.create({percentage: tPercentage, week: tWeek, courseconfiguration_id: courseConfigurationId});
    });

    Object.keys(seminarTestsPercentages).map(function(key){
        var test = seminarTestsPercentages[key];
        var tWeek = test.week;
        var tPercentage = test.percentage;

        models.SeminarTestPercentage.create({percentage: tPercentage, week: tWeek, courseconfiguration_id: courseConfigurationId});
    });

    Object.keys(courseTestsPercentages).map(function(key){
        var test = courseTestsPercentages[key];
        var tWeek = test.week;
        var tPercentage = test.percentage;

        models.CourseTestPercentage.create({percentage: tPercentage, week: tWeek, courseconfiguration_id: courseConfigurationId});
    });

  });

  /**
 * Adds a course configuration
 * @method POST a course configuration
 * @throws 'Unable to add the course configuration' for an SQL error
 * @throws 'Internal Server Error! Sorry, try again!' for an unknown error.
 */
router.post('/', function(req, res){

    const labTestsPercentages = req.body.labTestsPercentages;
    const seminarTestsPercentages = req.body.seminarTestsPercentages;
    const courseTestsPercentages = req.body.courseTestsPercentages;

    var courseConfigurationId = "";

    //update the course configuration
    models.CourseConfiguration.create(req.body.courseConfig).then(result => {
        console.log("The result is" + result);
        if(result != null) {
        res.status(200);
        console.log('Successfully added course configuration');
        //get the id of the newly added courseConfiguration
        courseConfigurationId = result.id;

            //add the labTestPercentages, seminarTestsPercentages and courseTestPercentages
        Object.keys(labTestsPercentages).map(function(key){
            var test = labTestsPercentages[key];
            var tWeek = test.week;
            var tPercentage = test.percentage;

            models.LabTestPercentage.create({percentage: tPercentage, week: tWeek, courseconfiguration_id: courseConfigurationId});
        });

        Object.keys(seminarTestsPercentages).map(function(key){
            var test = seminarTestsPercentages[key];
            var tWeek = test.week;
            var tPercentage = test.percentage;

            models.SeminarTestPercentage.create({percentage: tPercentage, week: tWeek, courseconfiguration_id: courseConfigurationId});
        });

        Object.keys(courseTestsPercentages).map(function(key){
            var test = courseTestsPercentages[key];
            var tWeek = test.week;
            var tPercentage = test.percentage;

            models.CourseTestPercentage.create({percentage: tPercentage, week: tWeek, courseconfiguration_id: courseConfigurationId});
        });
        res.send('Course configuration successfully added!');

      }
      else {
        res.status(400);
        res.send('Unable to add the course configuration.');
      }
    }, err => {   
      res.status(501);
      res.send('Internal Server Error!Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });

  });


  module.exports = router;
  
