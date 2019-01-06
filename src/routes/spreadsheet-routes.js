var models = require('../models');
var express = require('express');
var router = express.Router();

/**
 * Receive a student from the client and store it in the DB.
 * @method POST the student entity.
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.post('//spreadsheet', function (req, res) {

    //TODO: extract info from req.body(=file)
    //TODO: create students and courses lists and links between them

    console.log("Received file");

    // models.Student.Create(req.body).then(student => res.json(student), err => {
    //     res.status(501);
    //     res.send('Internal Server Error! Sorry, try again!');
    //     console.log('An error has occurred: ' + err);
    // });
});

module.exports = router;