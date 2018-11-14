let promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise
};
let pgp = require('pg-promise')(options);
const connectionString = 'postgres://postgres:postgres@localhost:5432/preacademicinfo';
const db = pgp(connectionString);

// add query functions
/**
 * Lists all the details of all the courses
 * @method GET all courses
 */ 
function getAllCourses(req, res, next) {
  db.any('select * from "Course"')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved courses'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

/**
 * List a single course 
 * @method GET course by id
 * @param id int, id of the course
 * throws: 400 bad request
 */ 
function getSingleCourse(req, res, next) {
  const courseID = parseInt(req.params.id, 10);
  if (isNaN(courseID)){
    res.status(400)
      .json({
        status: 'bad request',
        message: 'Please provide a valid id'
      });
  } else {
    db.one('select * from "Course" where id = $1', courseID)
    .then(function (data) {
    
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one course'
        });
    })
    .catch(function (err) {
      res.status(404)
        .json({
          status: 'not found',
          message: 'No course was found'
        });
    });
  }
}

/**
 * Update a course 
 * @method PUT changes the details of a course
 * @param: nothing, but body needs to contain 
 * @throws: returns 400 bad request in case id is not valid, 404 if not found
 */ 
function updateCourse(req, res, next) {
  const id = parseInt(req.params.id, 10);
  var str = 'update "Course" set ';
  let end = ' where id = $1';
  if (isNaN(id)){
    res.status(400)
      .json({
        status: 'bad request',
        message: 'Id must be provided'
      });
  }else
  for (e in req.body){
    if (["description", "name", "description", "credits", "academic_programme", "section_id", "year_of_study", "semester_id", "form_of_evaluation", "is_active", "owner_id"].indexOf(e) < 0) 
    {
      res.status(400)
      .json({
        status: 'bad request',
        message: 'Unknown field in body'
      });
    }
    else 
    {
      if (["credits", "academic_programme", "section_id", "year_of_study", "semester_id", "form_of_evaluation", "owner_id", "is_active"].indexOf(e) >= 0) {
       //no quotes needed
        str+=e+ " = "+req.body[e]+ ", ";
      }
      else {
        //what's left: string
        str+=e+ " = "+"\'"+req.body[e]+"\'"+ ", ";
      }
    }  
  }

  str = str.substring(0, str.length-2); //remove ", "
  str+= end;

  db.result(str, [id])
  .then(result=> {

    if (result.rowCount > 0)
    res.status(200)
      .json({
        status: 'success',
        data: result.rowCount,
        message: 'Update operation successful (changed '+result.rowCount+" rows)"
      });
    else
    res.status(404)
    .json({
      status: 'not found',
      data: result.rowCount,
      message: "Course could not be found. No changes performed"
    });
  })
  .catch(function (err) {
    return next(err);
  }); 
}

//NOT TESTED, but maybe helpful (for future development):

function removeCourse(req, res, next) {
  var ID = parseInt(req.params.id);
  db.result('delete from "Course" where id = $1', ID)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} courses`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createCourse(req, res, next) {
  req.body.credits = parseInt(req.body.credits, 10);
  req.body.section_id = parseInt(req.body.section_id, 10);
  req.body.academic_programme = parseInt(req.body.academic_programme, 10);
  req.body.year_of_study = parseInt(req.body.year_of_study, 10);
  req.body.semester_id = parseInt(req.body.semester_id, 10);
  req.body.form_of_evaluation = parseInt(req.body.form_of_evaluation, 10);
  req.body.owner_id = parseInt(req.body.owner_id, 10);
  db.none('insert into "Course" (name, description, credits, academic_programme, section_id, year_of_study, semester_id, form_of_evaluation, is_active, owner_id)',
  'values(\'${name}\', \'${description}\', ${credits}, ${academic_programme}, {section_id}, {year_of_study}, {semester_id}, {form_of_evaluation}, {is_active}, {owner_id})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one course'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllCourses: getAllCourses,
  getSingleCourse: getSingleCourse,
  updateCourse: updateCourse,
  createCourse: createCourse,
  removeCourse: removeCourse

};