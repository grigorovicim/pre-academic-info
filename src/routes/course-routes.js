var express = require('express');
var router = express.Router();
const app = express();
var coursesApi = require('../persistence/CoursePersistor/course-persistor.js');
 
router.get('/getById/:id',coursesApi.getSingleCourse);
router.get('/getAll',coursesApi.getAllCourses);
router.put('/update', coursesApi.updateCourse);
router.post('/create',coursesApi.createCourse);
router.delete('/remove', coursesApi.removeCourse);

module.exports = router;
