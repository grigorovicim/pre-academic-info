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
    let errors = [];
    let promises = [];

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

    // Get all courses in file
    let addedCourseNames = [];
    let row = 5;
    let column = 4;
    let cellAddress = {c: column, r: row};
    while (worksheet[XLSX.utils.encode_cell(cellAddress)] !== undefined) {
        let currentCell = worksheet[XLSX.utils.encode_cell(cellAddress)];
        let courseName = (currentCell ? currentCell.v : undefined);
        row++;
        cellAddress = {c: column, r: row};

        if (!addedCourseNames.includes(courseName)) {
            addedCourseNames.push(courseName)
        }
    }

    let newCourses = [];
    //TODO: create course if doesn't exists
    addedCourseNames.forEach(courseName => {
        promises.push(
            new Promise(function (resolve, reject) {
                models.Course.findAll({
                    where: {name: courseName}, raw: true
                }).then(result => {
                    let courses = result;
                    console.log("Courses with name: ", courses);

                    if (courses.length === 0) {
                        let course = {
                            "name": courseName,
                            "year_of_study": 1,
                            "is_active": true,
                            "createdAt": "2012-12-11T22:00:00.000Z",
                            "updatedAt": "2012-12-11T22:00:00.000Z",
                            "academic_programme_id": 1,
                            "section_id": 1,
                            "semester_id": 1,
                        };
                        models.Course.create(course).then(result => {
                            let newCourse = result.dataValues;
                            console.log("Added course: ", newCourse);
                            newCourses.push(newCourse);

                            resolve();
                        }, err => {
                            errors.push(err);
                            reject(err);
                        });
                    }
                }, err => {
                    errors.push(err);
                    reject(err);
                });
            }));
    });

    // Make sure all courses are added
    Promise.all(promises)
        .then(function () {
            console.log('Added all courses');

            // Continue with students
            row = 5;
            column = 1;
            cellAddress = {c: column, r: row};
            while (worksheet[XLSX.utils.encode_cell(cellAddress)] !== undefined) {
                let currentCell = worksheet[XLSX.utils.encode_cell(cellAddress)];
                let academicProgramme = (currentCell ? currentCell.v : undefined);
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
                let courseName = (currentCell ? currentCell.v : undefined);
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

                //TODO: add student if doesn't exist
                //TODO: add user with role, then profile, then student

                models.User.findAll({
                    where: {username: email}, raw: true
                }).then(function (result) {
                    let users = result;
                    console.log("Users with email address: ", users);

                    if (users.length === 0) {
                        //TODO: no such user so should be added
                        let user = {
                            "username": email,
                            "password": email,
                            "createdAt": "2012-12-11T22:00:00.000Z",
                            "updatedAt": "2012-12-11T22:00:00.000Z",
                            "is_active": true,
                            "role_id": 1
                        };

                        models.User.create(user).then(result => {
                            let newUser = result.dataValues;
                            console.log("Added new user: ", newUser);

                            //TODO: we have user, we need profile
                            let userId = newUser.id;
                            let profile = {
                                "user_id": userId,
                                "first_name": firstname,
                                "last_name": lastname,
                                "createdAt": "2012-12-11T22:00:00.000Z",
                                "updatedAt": "2012-12-11T22:00:00.000Z"
                            };

                            models.Profile.create(profile).then(profile => {
                                let newProfile = profile.dataValues;
                                console.log("Added new profile: ", newProfile);

                                //TODO: we have profile, now we need student
                                let student = {
                                    "profile_id": newProfile.id,
                                    "nr_matricol": nrMatricol,
                                    "academic_programme": 1,
                                    "section_id": 1,
                                    "group_id": 1,
                                    "semester_id": 1,
                                    "year_of_study_id": 1,
                                    "year_of_study": 1,
                                    "createdAt": "2012-12-11T22:00:00.000Z",
                                    "updatedAt": "2012-12-11T22:00:00.000Z",
                                };

                                models.Student.create(student).then(result => {
                                    let newStudent = result.dataValues;
                                    console.log("Added student: ", newStudent);

                                    let courseId;
                                    for(let course of newCourses){
                                        if(course.name === courseName) {
                                            courseId = course.id;
                                            break;
                                        }
                                    }

                                    let studentCourse = {
                                        "year": 1,
                                        "createdAt": "2012-12-11T22:00:00.000Z",
                                        "updatedAt": "2012-12-11T22:00:00.000Z",
                                        "student_id": newStudent.id,
                                        "course_id": courseId,
                                    };

                                    //TODO: create student-course
                                    models.StudentCourse.create(studentCourse).then(result => {
                                        let newStudentCourse = result.dataValues;
                                        console.log("Added studentCourse: ", newStudentCourse);
                                    }, err => {
                                        errors.push(err);
                                    });

                                }, err => {
                                    errors.push(err);
                                });
                            }, err => {
                                errors.push(err);
                            });
                        }, err => {
                        });
                    }
                });

                column = 1;
                row++;
                cellAddress = {c: column, r: row};
            }
        })
        .catch(console.error);

    res.send([req.file.originalname], "\nErrors:\n", errors);
});

module.exports = router;