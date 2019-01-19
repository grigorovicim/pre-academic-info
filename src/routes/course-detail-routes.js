var models  = require('../models');
var express = require('express');
var router  = express.Router();
const Sequelize = require('sequelize');
/**
 * Returns a list with all the courses.
 * @method GET the list of courses
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