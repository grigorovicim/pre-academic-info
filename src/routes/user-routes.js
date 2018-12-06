var models  = require('../models');
var express = require('express');
var router  = express.Router();

/**
 * Returns a list with all the users.
 * @method GET the list of users
 * @throws 'Internal Server Error! Sorry, try again!'
 */

router.get('/', function(_, res){
  models.User.findAll().then(users => res.json(users), err => {
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

/**
 * Returns the user that has the id specified as a parameter.
 * @method GET the user by id.
 * @throws 'Internal Server Error!Sorry, try again!'
 */

router.get('/:id', function(req, res){
  const id = req.params.id;

  models.User.findByPk(id).then(user => res.json(user), err => {
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

/**
 * Updates a given user entity.
 * @method PUT the given user entity.
 * @throws 'Unable to update the given user. Make sure the id is correct.' if the user does not exist.
 * @throws 'Internal Server Error! Sorry, try again!' for an unknown error.
 */

router.put('/:id', function(req, res){
  const userId = req.params.id;
  console.log(userId);
  models.User.update(req.body, {where : {id: userId}}).then(rowsUpdated => {
    if(rowsUpdated[0] === 1) {
      res.status(200);
      res.send('User successfully updated!');
      console.log('Successfully updated user with id:' + userId);
    }
    else {
      res.status(400);
      res.send('Unable to update the given user. Make sure the id is correct.');
      console.log('Unable to update user with id:' + userId);
    }
  }, err => {
    res.status(501);
    res.send('Internal Server Error!Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

  

module.exports = router;