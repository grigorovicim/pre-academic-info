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
    let profEmail = req.headers.email;
    console.log("Request: ", profEmail);

    let errors = [];

    // Test worksheet
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


    // First, we need to get the IDs of data needed to add new student or course
    // like academic programme, section, semester, group, year of study
    // Example: licenta - 1
    // Example: 933 - 3
    let newCourses = [];
    let coursePromises = [];
    let dbInfoPromises = [];
    let addedCourseNames = [];
    let coursesWithInfo = new Map();
    let academicProgrammes = new Map();
    let sections = new Map();
    let semesters = new Map();
    let groups = new Map();
    let yearsOfStudy = new Map();
    let row = 5;
    let column = 1;
    let cellAddress = {c: column, r: row};
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

        cellAddress = {c: 10, r: row};
        currentCell = worksheet[XLSX.utils.encode_cell(cellAddress)];
        let group = (currentCell ? currentCell.v : undefined);

        column = 1;
        row++;
        cellAddress = {c: column, r: row};

        // Also keep track of all new courses and then add them without duplicates
        // no other way of doing this because of synchronisation issues
        if (!addedCourseNames.includes(courseName)) {
            addedCourseNames.push(courseName)
        }

        let yearOfStudy = "0";
        if (semester === "I" || semester === "II") {
            yearOfStudy = "1";
        }
        else if (semester === "III" || semester === "IV") {
            yearOfStudy = "2";
        }
        else if (semester === "V" || semester === "VI") {
            yearOfStudy = "3";
        }

        // Need to remember which course had which properties
        let courseMap = new Map();
        courseMap.set("yearOfStudy", yearOfStudy);
        courseMap.set("academicProgramme", academicProgramme);
        courseMap.set("section", section);
        courseMap.set("semester", semester);
        coursesWithInfo.set(courseName, courseMap);

        // Get all necessary IDs for adding a course or a student
        // and put them in the corresponding maps
        if (!(academicProgramme in academicProgrammes)) {
            dbInfoPromises.push(new Promise(function (resolve, reject) {
                models.AcademicProgramme.findAll({
                    where: {label: academicProgramme}, raw: true
                }).then(result => {
                    try {
                        let academicProgrammeId = result[0].id;
                        academicProgrammes.set(academicProgramme, academicProgrammeId);
                        resolve();
                    } catch (err) {
                        console.log("There is no such academic programme");
                        reject();
                    }
                });
            }));
        }
        if (!(section in sections)) {
            dbInfoPromises.push(new Promise(function (resolve, reject) {
                models.Section.findAll({
                    where: {name: section}, raw: true
                }).then(result => {
                    try {
                        let sectionId = result[0].id;
                        sections.set(section, sectionId);
                        resolve();
                    } catch (err) {
                        console.log("There is no such section");
                        reject();
                    }
                });
            }));
        }
        if (!(semester in semesters)) {
            dbInfoPromises.push(new Promise(function (resolve, reject) {
                models.Semester.findAll({
                    where: {label: semester}, raw: true
                }).then(result => {
                    try {
                        let semesterId = result[0].id;
                        semesters.set(semester, semesterId);
                        resolve();
                    } catch (err) {
                        console.log("There is no such semester");
                        reject();
                    }
                });
            }));
        }
        if (!(group in groups)) {
            dbInfoPromises.push(new Promise(function (resolve, reject) {
                models.Group.findAll({
                    where: {group_number: parseInt(group, 10)}, raw: true
                }).then(result => {
                    try {
                        let groupId = result[0].id;
                        groups.set(group, groupId);
                        resolve();
                    } catch (err) {
                        console.log("There is no such group");
                        reject();
                    }
                });
            }));
        }
        if (!(yearOfStudy in yearsOfStudy)) {
            dbInfoPromises.push(new Promise(function (resolve, reject) {
                models.YearOfStudy.findAll({
                    where: {label: yearOfStudy}, raw: true
                }).then(result => {
                    try {
                        let yearOfStudyId = result[0].id;
                        yearsOfStudy.set(yearOfStudy, yearOfStudyId);
                        resolve();
                    } catch (err) {
                        console.log("There is no year of study");
                        reject();
                    }
                });
            }));
        }
    }

    // Wait for all info to be loaded and IDs to be retrieved from db
    Promise.all(dbInfoPromises)
        .then(function () {
            // See map with info about all new courses
            console.log("Courses with info: ", coursesWithInfo);

            // Then add each new course
            addedCourseNames.forEach(courseName => {
                coursePromises.push(
                    new Promise(function (resolve, reject) {
                        models.Course.findAll({
                            where: {name: courseName}, raw: true
                        }).then(result => {
                            let courses = result;
                            console.log("Courses with name: ", courses);

                            let courseMap = coursesWithInfo.get(courseName);
                            if (courses.length === 0) {
                                let course = {
                                    "name": courseName,
                                    "year_of_study": parseInt(courseMap.get("yearOfStudy"), 10),
                                    "is_active": true,
                                    "createdAt": Date.now(),
                                    "updatedAt": Date.now(),
                                    "academic_programme_id": academicProgrammes.get(courseMap.get("academicProgramme")),
                                    "section_id": sections.get(courseMap.get("section")),
                                    "semester_id": semesters.get(courseMap.get("semester")),
                                };
                                models.Course.create(course).then(result => {
                                    let newCourse = result.dataValues;
                                    console.log("Added course: ", newCourse);
                                    newCourses.push(newCourse);

                                    //TODO: create professor-course
                                    models.Professor.findAll({
                                        include: [{
                                            model: models.Profile,
                                            required: true,
                                            include: [{
                                                model: models.User,
                                                required: true,
                                                where: {
                                                    username: profEmail
                                                }
                                            }]
                                        }]
                                    }).then(function(response){
                                        console.log(response);
                                        let profId = response[0].dataValues.id;
                                        let professorCourse = {
                                            "year": parseInt(courseMap.get("yearOfStudy"), 10),
                                            "createdAt": Date.now(),
                                            "updatedAt": Date.now(),
                                            "isTeachingSeminar": false,
                                            "isTeachingLab": false,
                                            "isTeachingCourse": true,
                                            "professor_id": profId,
                                            "course_id": newCourse.id,
                                        };

                                        models.ProfessorCourse.create(professorCourse).then(result =>{
                                            console.log("Added professor course: ", result.dataValues);
                                            resolve();
                                            }
                                        );
                                    });
                                }, err => {
                                    errors.push(err);
                                    reject(err);
                                });
                            } else {
                                resolve();
                            }
                        }, err => {
                            errors.push(err);
                            reject(err);
                        });
                    }));
            });

            // Wait for all courses to be added
            Promise.all(coursePromises)
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

                        let yearOfStudy = "0";
                        if (semester === "I" || semester === "II") {
                            yearOfStudy = "1";
                        }
                        else if (semester === "III" || semester === "IV") {
                            yearOfStudy = "2";
                        }
                        else if (semester === "V" || semester === "VI") {
                            yearOfStudy = "3";
                        }

                        // Add student if it doesn't exist
                        // So first create user, then profile, then student

                        models.User.findAll({
                            where: {username: email}, raw: true
                        }).then(function (result) {
                            let users = result;
                            console.log("Users with email address: ", users);

                            let studentLabel = "Student";
                            models.Role.findOne({where: {label: studentLabel}})
                                .then(result => {
                                    let roleId = result.dataValues.id;
                                    console.log("Role ID: ", roleId);

                                    if (users.length === 0) {
                                        //No such user, so should be added
                                        let user = {
                                            "username": email,
                                            "password": email,
                                            "createdAt": Date.now(),
                                            "updatedAt": Date.now(),
                                            "is_active": false,
                                            "role_id": roleId,
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
                                                "createdAt": Date.now(),
                                                "updatedAt": Date.now()
                                            };

                                            models.Profile.create(profile).then(profile => {
                                                let newProfile = profile.dataValues;
                                                console.log("Added new profile: ", newProfile);

                                                //TODO: we have profile, now we need student
                                                let student = {
                                                    "profile_id": newProfile.id,
                                                    "nr_matricol": nrMatricol,
                                                    "academic_programme": academicProgrammes.get(academicProgramme),
                                                    "section_id": sections.get(section),
                                                    "group_id": groups.get(group),
                                                    "semester_id": semesters.get(semester),
                                                    "year_of_study_id": yearsOfStudy.get(yearOfStudy),
                                                    "createdAt": Date.now(),
                                                    "updatedAt": Date.now(),
                                                };

                                                models.Student.create(student).then(result => {
                                                    let newStudent = result.dataValues;
                                                    console.log("Added student: ", newStudent);

                                                    let courseId;
                                                    for (let course of newCourses) {
                                                        if (course.name === courseName) {
                                                            courseId = course.id;
                                                            break;
                                                        }
                                                    }
                                                    let coursePromise = [];
                                                    coursePromise.push(function (resolve, reject) {
                                                        if (courseId === undefined) {
                                                            models.Course.findOne({where: {name: courseName}}).then(course => {
                                                                courseId = course.dataValues.id;
                                                                resolve();
                                                            });
                                                        } else {
                                                            resolve();
                                                        }
                                                    });

                                                    Promise.all(coursePromise).then(() => {
                                                        let studentCourse = {
                                                            "year": parseInt(yearOfStudy, 10),
                                                            "createdAt": Date.now(),
                                                            "updatedAt": Date.now(),
                                                            "student_id": newStudent.id,
                                                            "course_id": courseId,
                                                        };

                                                        // Create student-course
                                                        models.StudentCourse.create(studentCourse).then(result => {
                                                            let newStudentCourse = result.dataValues;
                                                            console.log("Added studentCourse: ", newStudentCourse);
                                                        }, err => {
                                                            errors.push(err);
                                                        });
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
                        }, err => {
                            errors.push(err);
                        });

                        column = 1;
                        row++;
                        cellAddress = {c: column, r: row};
                    }
                })
                .catch(console.error);

            res.send([req.file.originalname], "\nErrors:\n", errors);
        });
})
;

module.exports = router;