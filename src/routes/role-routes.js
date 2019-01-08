var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/:label', function(req, res) {
    const label = req.params.label;

    models.Role.findOne({where : {label: label}})
    .then(result => res.json(result),err => {
      res.status(501);
      res.send('Internal Server Error! Sorry, try again!');
      console.log('An error has occurred: ' + err);
    });
});

module.exports = router;