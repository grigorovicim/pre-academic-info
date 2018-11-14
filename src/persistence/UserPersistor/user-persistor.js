let promise = require('bluebird');
 const options = {
  // Initialization Options
  promiseLib: promise
};
let pgp = require('pg-promise')(options);
const connectionString = 'postgres://postgres:postgres@localhost:5432/precAcademicInfo';
const db = pgp(connectionString);
 // add query functions
 function getAllUsers(req, res, next) {
  db.any('select * from "User"')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
 function getUserById(req, res, next) {
  const userID = parseInt(req.params.id, 10);
  if (isNaN(userID)){
    res.status(500)
      .json({
        status: 'bad request',
        message: 'Please provide a valid id'
      });
  } else {
    db.one('select * from "User" where id = $1', userID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
  }
}


 module.exports = {
  getAllUsers: getAllUsers,
  getUserById: getUserById
 };