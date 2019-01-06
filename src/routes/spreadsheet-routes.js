var models = require('../models');
var express = require('express');
var router = express.Router();
var multer = require("multer");
var upload = multer({dest: "./files/"});

/**
 * Receive a student from the client and store it in the DB.
 * @method POST the student entity.
 * @throws 'Internal Server Error! Sorry, try again!'
 */

router.post('/', upload.single("file"), function (req, res) {
    let students = [];
    let disciplines = [];

    console.log("Received file");
    let file = req.file;
    console.log(file.originalname);

    XLSX = require('xlsx');
    let workbook = XLSX.readFile(file.path);

    let firstSheetName = workbook.SheetNames[0];
    let addressOfCell = 'B1';

    /* Get worksheet */
    let worksheet = workbook.Sheets[firstSheetName];

    /* Find desired cell */
    let desiredCell = worksheet[addressOfCell];

    /* Get the value */
    let desiredValue = (desiredCell ? desiredCell.v : undefined);

    console.log(desiredValue);

    let row = 5;
    let column = 1;
    let cellAddress = {c: column, r: row};
    while (worksheet[XLSX.utils.encode_cell(cellAddress)] !== undefined) {
        let currentCell = worksheet[XLSX.utils.encode_cell(cellAddress)];
        let formOfStudy = (currentCell ? currentCell.v : undefined);
        column++;

        cellAddress = {c: column, r: row};
        currentCell = worksheet[XLSX.utils.encode_cell(cellAddress)];
        let generationYear = (currentCell ? currentCell.v : undefined);
        column++;

        cellAddress = {c: column, r: row};
        currentCell = worksheet[XLSX.utils.encode_cell(cellAddress)];
        let section = (currentCell ? currentCell.v : undefined);
        column++;

        cellAddress = {c: column, r: row};
        currentCell = worksheet[XLSX.utils.encode_cell(cellAddress)];
        let discipline = (currentCell ? currentCell.v : undefined);
        column++;

        cellAddress = {c: column, r: row};
        currentCell = worksheet[XLSX.utils.encode_cell(cellAddress)];
        let semester = (currentCell ? currentCell.v : undefined);
        column++;

        cellAddress = {c: column, r: row};
        currentCell = worksheet[XLSX.utils.encode_cell(cellAddress)];
        let nrMatricol = (currentCell ? currentCell.v : undefined);
        column++;

        cellAddress = {c: column, r: row};
        currentCell = worksheet[XLSX.utils.encode_cell(cellAddress)];
        let lastname = (currentCell ? currentCell.v : undefined);
        column++;

        cellAddress = {c: column, r: row};
        currentCell = worksheet[XLSX.utils.encode_cell(cellAddress)];
        let firstname = (currentCell ? currentCell.v : undefined);
        column++;

        cellAddress = {c: column, r: row};
        currentCell = worksheet[XLSX.utils.encode_cell(cellAddress)];
        let email = (currentCell ? currentCell.v : undefined);
        column++;

        cellAddress = {c: column, r: row};
        currentCell = worksheet[XLSX.utils.encode_cell(cellAddress)];
        let group = (currentCell ? currentCell.v : undefined);

        console.log(email);

        //TODO: modify everything from here

        //TODO: add student if doesn't exist

        let profile = {
            "id": 5,
            "year_of_study": 1,
            "createdAt": "2012-12-11T22:00:00.000Z",
            "updatedAt": "2012-12-11T22:00:00.000Z",
            "group_id": 1,
            "section_id": 2
        };

        models.Profile.create(req.body).then(profile => res.json(profile), err => {
            res.status(501);
            res.send('Internal Server Error! Sorry, try again!');
            console.log('An error has occurred: ' + err);
        });

        let student = {
            "id": 5,
            "year_of_study": 1,
            "createdAt": "2012-12-11T22:00:00.000Z",
            "updatedAt": "2012-12-11T22:00:00.000Z",
            "group_id": 1,
            "section_id": 2
        };

        models.Student.create(req.body).then(student => res.json(student), err => {
            res.status(501);
            res.send('Internal Server Error! Sorry, try again!');
            console.log('An error has occurred: ' + err);
        });

        //TODO: create discipline if doesn't exists
        //TODO: create student-course

        //TODO: to here

        column = 1;
        row++;
        cellAddress = {c: column, r: row};
    }

    res.send([req.file.originalname]);
});

module.exports = router;