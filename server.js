const users = [
  {fullName: 'Monica Grigorovici' , scsEmail: 'gmie2345@scs.ubbcluj.ro', type:'student', password:'1234'},
  {fullName: 'Andrada Maria Gae', scsEmail: 'gaie2345@scs.ubbcluj.ro', type:'student', password:'1234'},
  {fullName: 'Dragos Grigore', scsEmail: 'gdie2345@scs.ubbcluj.ro', type:'student', password:'1234'},
  {fullName: 'Miruna Radu', scsEmail: 'rmir2345@scs.ubbcluj.ro', type:'student', password:'1234'},
  {fullName: 'Diana Dragos', scsEmail: 'ddie2345@scs.ubbcluj.ro', type:'student', password:'1234'},
  {fullName: 'Radu Dragos', scsEmail: 'radudragos@cs.ubbcluj.ro', type:'professor', password:'1234'},
  {fullName: 'Radu Gaceanu', scsEmail: 'radugaceanu@cs.ubbcluj.ro', type:'professor', password:'1234'},
  {fullName: 'Dan Suciu', scsEmail: 'dansuciu@cs.ubbcluj.ro', type:'professor', password:'1234'},
  {fullName: 'root', scsEmail: 'root@root.com', type:'professor', password:'root'}
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

const randomString = require('randomstring');

var StudentRoutes  = require('./src/routes/student-routes');
var ProfessorRoutes  = require('./src/routes/professor-routes');
var CourseRoutes  = require('./src/routes/course-routes');
var UserRoutes = require('./src/routes/user-routes');
var ConfigRoutes = require('./src/routes/configuration-routes');
var RoleRoutes = require('./src/routes/role-routes');
var CatalogRoutes = require('./src/routes/catalog-routes');
var StudentCourseRoutes = require('./src/routes/student-course-routes');
const SpreadsheetRoutes = require('./src/routes/spreadsheet-routes');
const ProfileRoutes = require('./src/routes/profile-routes');


const app = express();
const emailUtil = require('./src/util/email');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '10mb'}));
const path = require('path');
const port = process.env.PORT || 5000;
const dev = app.get('env') !== 'production';

const client = require('./src/util/client')(port);

app.use('/student', StudentRoutes);
app.use('/professor', ProfessorRoutes);
app.use('/course', CourseRoutes);
app.use('/user', UserRoutes);
app.use('/config', ConfigRoutes);
app.use('/spreadsheet', SpreadsheetRoutes);
app.use('/profile', ProfileRoutes);
app.use('/role', RoleRoutes);
app.use('/catalog', CatalogRoutes);
app.use('/studentcourse', StudentCourseRoutes);
app.get('/check-server', (req, res) => {
    res.send({express: 'Hello From Express BACKEND!'});
});

function generateID(host) {
    const sec = Math.floor(Date.now() / 1000);
    const secret = "secret-blabla";

    const text = sec.toString() + secret.toString() + host.toString();
    const shaObj = new jsSHA("SHA-512", "TEXT");
    shaObj.update(text);
    const hash = shaObj.getHash("HEX");
    return hash;
}

function deleteUserLoggedIn(user) {
    for (let i = 0; i < usersLoggedIn.length; i++) {
        if (usersLoggedIn[i].session === user.session) {
            usersLoggedIn.splice(i, 1);
        }
    }
}

function getUserDetails(sessionID) {
    for (let i = 0; i < usersLoggedIn.length; i++) {
        if (usersLoggedIn[i].session === sessionID) {
            return usersLoggedIn[i];
        }
        return null;
    }
}

app.post('/details-of-course', (req, res) => {
  const courseId = req.body.courseId;
  const list = [];
  res.send(list)
})

app.post('/session-id', (req, res) => {
    const sessionID = req.body.sessionID;
    const user = getUserDetails(sessionID);

    client.get('/profile/' + user.id).then((resp) => {
      client.get('role/id/' + user.role_id).then((role) => {
        user.profile = resp.data;
        user.role = role.data.label;
        console.log(user);
      });
    }).catch((error) => {
      console.log(error);
    });

    res.send(user);
});


app.post('/logout', (req, res) => {
  //to do implement logout
  res.send("Success")
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userData = {
    'username': email,
    'password': password
  }

  client.post('/user/do/auth', userData).then(function(response) {
    const user = response.data;

    if(user) {
      const userID = generateID(req.get('host'));
      console.log('Session ID:' + userID);

      client.get('/profile/' + user.id).then((resp) => {
        client.get('role/id/' + user.role_id).then((role) => {
          user.profile = resp.data;
          user.session = userID;
          user.role = role.data.label;
          usersLoggedIn.push(user);
          res.send(user);
          console.log(user);
        });
      }).catch((error) => {
        console.log(error);
      });
    }else {
      console.log('Invalid login for user: ' + email);
      res.status(202);
      res.send('Invalid username or password provided.');
    }
  })
  .catch(function(error) {
    res.status(501);
    res.send('Internal server error.');
  });
});

app.post('/register', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const password = randomString.generate({length : 12});
  
  client.get('/role/Professor').then(function(response) {
    var role = response.data;
    if(role) {
      // we will save the user with a speciffic user token
      // that will need to be confirmed
      const userData = {
        'username': email,
        'password': password,
        'role_id': role.id,
      }

      client.post('/user/', userData).then(function(response) {
          // we also need to create the user profile
        const profileData = {
          'first_name' : firstName,
          'last_name' : lastName,
          'user_id': response.data.id,
        }

        client.post('/profile/', profileData).then(function(profile){
          const professorData = {
            'profile_id': profile.data.id,
          }

          client.post('/professor/', professorData).then(function(professor) {
            const host = 'http://' + req.get('host') + '/verify/';
            response.data.password = password;
            
            // professor was created, now we can send the email
            emailUtil.send(response.data, host);

            res.send(professor.data);
          });
        });
      })
      .catch(function(error) {
        console.log(error);
        res.status(501);
        res.send('Internal server error.');
      });
    }
    else {
      console.log('Could not find role: Professor');
      res.status(501);
      res.send('Internal server error.');
    }
  });
});

app.get('/verify/:token', (req, res) => {
  const token = req.params.token;

  client.get('/user/verification/' + token).then(function(response){
    const user = response.data;
    if(user) {
      
      const userData = {
        'is_active': true,
        'verification_token': '',
      }

      client.put('/user/' + user.id, userData).then(function(response) {
        res.sendFile('/htmlPages/succesRegister.html', {root: __dirname + '/public/'});
      }).catch(function(error) {
        res.status(501);
        res.sendFile('/htmlPages/errorRegister.html', {root: __dirname + '/public/'});
      });
    }
    else {
      res.status(501);
      res.sendFile('/htmlPages/invalidVerificationregister.html', {root: __dirname + '/public/'});
    }
  })
  .catch(function(error) {
    res.status(501);
    res.sendFile('/htmlPages/errorRegister.html', {root: __dirname + '/public/'});
    console.log(error);
  });
});

app.get('student/course', (req, res) => {
    const courseId = req.body.courseId;
    students = StudentRoutes.get('/student/course/' + courseId);
    res.send(students);
});

app.get('student/profile', (req, res) => {
    const studentId = req.body.studentId;
    profiles = StudentRoutes.get('/student/profile/' + studentId);
    res.send(profiles);
});

app.get('professor/profile', (req, res) => {
    const professorId = req.body.professorId;
    profiles = ProfessorRoutes.get('/professor/profile/' + professorId);
    res.send(profiles);
});

app.get('professor/course', (req, res) => {
    const courseId = req.body.courseId;
    professors = ProfessorRoutes.get('/professor/course/' + courseId);
    res.send(professors);
});

app.post('formOfEvaluation', (req, res) =>{
  const item = req.body.item;
  let something = FormOfEvaluationRoutes.post('/formOfEvaluation/');
  res.send(something);
});


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
    if (err) {
        throw err;
    }
    console.log("Server started");
});
