const users = [
  {fullName: 'Andrada Maria Gae', scsEmail: 'gaie2345@scs.ubbcluj.ro', type:'user', password:'1234'},
  {fullName: 'Dragos Grigore', scsEmail: 'gdie2345@scs.ubbcluj.ro', type:'user', password:'1234'},
  {fullName: 'Miruna Radu', scsEmail: 'rmir2345@scs.ubbcluj.ro', type:'user', password:'1234'},
  {fullName: 'Diana Dragos', scsEmail: 'ddie2345@scs.ubbcluj.ro', type:'user', password:'1234'},
];

users.forEach(user => {
  user.session = null;
});

const usersLoggedIn = [];

const express = require('express');

const {createServer} = require('http');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsSHA = require("jssha");
var StudentRoutes  = require('./routes/student-routes');
var ProfessorRoutes  = require('./routes/professor-routes');
var CourseRoutes  = require('./routes/course-routes');
var SectionRoutes = require('./routes/section-routes');
var GroupRoutes = require('./routes/group-routes');
var YearRoutes = require('./routes/year-of-study-routes');
var StudentCourseRoutes = require('./routes/student-course-routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const path = require('path');
const port = process.env.PORT || 5000;
const dev = app.get('env') !== 'production';

app.use('/student', StudentRoutes);
app.use('/professor', ProfessorRoutes);
app.use('/course', CourseRoutes);
app.use('/section', SectionRoutes);
app.use('/group', GroupRoutes);
app.use('/yearofstudy', YearRoutes);
app.use('/studentcourse', StudentCourseRoutes);

app.get('/check-server', (req, res) => {
  res.send({ express: 'Hello From Express BACKEND!' });
});

function generateID (host) {
  const sec = Math.floor(Date.now() / 1000);
  const secret = "secret-blabla";

  const text = sec.toString() + secret.toString() + host.toString();
  const shaObj = new jsSHA("SHA-512", "TEXT");
  shaObj.update(text);
  const hash = shaObj.getHash("HEX");
  return hash;
}

function deleteUserLoggedIn(user) {
  for(let i=0; i<usersLoggedIn.length; i++) {
    if(usersLoggedIn[i].session === user.session) {
      usersLoggedIn.splice(i, 1);
    }
  }
}

function getUserDetails(sessionID) {
  for(let i=0; i<usersLoggedIn.length; i++) {
    if(usersLoggedIn[i].session === sessionID) {
      return usersLoggedIn[i];
    }
    return null;
  }
}

app.post('/session-id', (req, res) => {
  const sessionID = req.body.sessionID;
  const user = getUserDetails(sessionID);
  res.send(user);
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password; 
  if (users.find(user => user.scsEmail === email && user.password === password) === undefined) {
    console.log("Error login: Cannot find user");
  } else {
    console.log("Success.");
    const user = users.find(function(user, password) {
      if(user.scsEmail === email && user.password === password !== undefined) {
        return user;
      }
    });
    const userID = generateID(req.get('host'));
    console.log('Session ID:' + userID);
    user.session = userID;
    usersLoggedIn.push(user);
    res.send(user);
  }
});

app.post('/student', (req, res) => {
  const student = req.body.student;
  res.send(student);
});

app.get('student/course', (req, res) =>{
  const courseId = req.body.courseId;
  students = StudentRoutes.get('/student/course/' + courseId);
  res.send(students);
});

app.get('professor/course', (req, res) =>{
  const courseId = req.body.courseId;
  professors = ProfessorRoutes.get('/professor/course/' + courseId);
  res.send(professors);
});

app.get('section', (req, res) => {
  sections = SectionRoutes.get('/section');
  res.send(sections);
})

app.get('group', (req, res) => {
  groups = GroupRoutes.get('/group');
  res.send(groups);
})

app.get('yearofstudy', (req, res) => {
  years = YearRoutes.get('/yearofstudy');
  res.send(years);
})

app.get('course', (req, res) => {
  courses = CourseRoutes.get('/course');
  res.send(courses);
});

app.get('studentcourse', (req, res) => {
  studentCourses = StudentCourseRoutes.get('/studentcourse');
  res.send(studentCourses);
})

if (!dev) {
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('common'));
  app.use(express.static(path.resolve(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

if (dev) {
  app.use(morgan('dev'));
}

const server = createServer(app);
server.listen(port, err => {
  if(err) {
    throw err;
  }
  console.log("Server started");
});
