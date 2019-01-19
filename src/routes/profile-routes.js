var models  = require('../models');
var express = require('express');
var router  = express.Router();

/**
 * Returns a list with all the profiles.
 * @method GET the list of profiles
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.get('/', function(_, res){
  models.Profile.findAll().then(profiles => res.json(profiles), err => {
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

/**
 * Receive a profile from the client and store it in the DB.
 * @method POST the profile entity.
 * @throws 'Internal Server Error! Sorry, try again!'
 */
router.post('/', function(req, res){
  models.Profile.create(req.body).then(profile => res.json(profile), err => {
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

/**
 * Updates a given profile entity.
 * @method PUT the given profile entity.
 * @throws 'Unable to update the given profile. Make sure the id is correct.' if the profile does not exist.
 * @throws 'Internal Server Error! Sorry, try again!' for an unknown error.
 */
router.put('/:id', function(req, res){
  const profileId = req.params.id;
  
  models.Profile.update(req.body, {where : {id: profileId}}).then(rowsUpdated => {
    if(rowsUpdated[0] === 1) {
      res.status(200);
      res.send('Profile successfully updated!');
      console.log('Successfully updated profile with id:' + profileId);
    }
    else {
      res.status(400);
      res.send('Unable to update the given profile. Make sure the id is correct.');
      console.log('Unable to update profile with id:' + profileId);
    }
  }, err => {
    res.status(501);
    res.send('Internal Server Error!Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

/**
 * Deletes a given profile from the DB
 * @method DELETE the given profile.
 * @throws 'A profile with the given id was not found!' if a profile with the given id does not exist.
 * @throws 'Internal Server Error! Sorry, try again!' for an unknown error.
 */
router.delete('/:id', function(req, res){
  const profileId = req.params.id;

  models.Profile.destroy({
    where: {
      id: profileId 
    }
  }).then(function(rowDeleted){
    if(rowDeleted === 1) {
      res.status(200);
      res.send('Successfully deleted profile!');
      console.log('The profile with id:' + profileId + ' has been deleted.');
    }
    else {
      res.status(400);
      res.send('A profile with the given id was not found!');
      console.log('The profile with id:' + profileId + ' does not exist.');
    }
  }, function(err){
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

router.get('/:userId', function(req, res) {
  const userId = req.params.userId;

  models.Profile.findOne({where : {user_id: userId}})
  .then(result => res.json(result),err => {
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});

router.put('/avatar/:userId', function(req, res){
  const userId = req.params.userId;
  models.Profile.update(req.body, {where: {user_id: userId}})
  .then(result => res.json(result), err => {
    res.status(501);
    res.send('Internal Server Error! Sorry, try again!');
    console.log('An error has occurred: ' + err);
  });
});


module.exports = router;