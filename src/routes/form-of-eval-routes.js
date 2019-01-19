var models  = require('../models');
var express = require('express');
var router  = express.Router();

/**
 * Deletes a given form of evaluation from the DB.
 * @method DELETE the given form of evaluation for the professor.
 * @throws 'No form of evaluation found for given ids'
 * @throws 'Internal Server Error! Sorry, try again!' for an unknown error.
 */
router.delete('/formOfEvaluation/:formOfEvaluationId', function(req, res) {
    const formOfEvaluationId = req.params.formOfEvaluationId;

    models.FormOfEvaluation.destroy({
        where: {
            formOfEvaluationId: formOfEvaluationId,
        }
    }).then(function(rowDeleted){
        if(rowDeleted === 1) {
            res.status(200);
            res.send({
                formOfEvaluationId: formOfEvaluationId,
            });
            console.log('The form of evaluation has been successfully deleted.');
        }
        else {
            res.status(400);
            res.send('No form of evaluation found for given ids');
            console.log('The form of evaluation with id:' + formOfEvaluationId + ' does not exist.');
        }
    }, function(err){
        res.status(501);
        res.send('Internal Server Error! Sorry, try again!');
        console.log('An error has occurred: ' + err);
    });
});

/**
 * Updates a given form of evaluation.
 * @method PUT the given form of evaluation.
 * @throws 'Unable to update the given form of evaluation. Make sure the id is correct.' if the course does not exist.
 * @throws 'Internal Server Error! Sorry, try again!' for an unknown error.
 */
router.put('/formOfEvaluation/:id', function(req, res){
    const formOfEvaluationId = req.params.id;
    console.log(courseId);
    models.FormOfEvaluation.update(req.body, {where : {id: formOfEvaluationId}}).then(rowsUpdated => {
        if(rowsUpdated[0] === 1) {
            res.status(200);
            res.send('Form of evaluation successfully updated!');
            console.log('Successfully updated form of evaluation with id:' + formOfEvaluationId);
        }
        else {
            res.status(400);
            res.send('Unable to update the given form of evaluation. Make sure the id is correct.');
            console.log('Unable to update form of evaluation with id:' + formOfEvaluationId);
        }
    }, err => {
        res.status(501);
        res.send('Internal Server Error!Sorry, try again!');
        console.log('An error has occurred: ' + err);
    });
});

/**
 * Insert a new form of evaluation into the database.
 * @method POST the given form of evaluation.
 * @throws 'Internal Server Error! Sorry, try again!' for an unknown error.
 */
router.post('/formOfEvaluation/', function(req, res) {
    models.FormOfEvaluation.create(req.body).then(config => res.json(config), err => {
        res.status(501);
        res.send('Internal Server Error! Sorry, try again!');
        console.log('An error has occurred: ' + err);
    });
});

module.exports = router;