var express = require('express');
var router = express.Router();
const app = express();
var usersApi = require('../persistence/UserPersistor/user-persistor.js');
 
router.get('/getById/:id',usersApi.getUserById);
router.get('/getAll',usersApi.getAllUsers);
 module.exports = router;