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
const nodemailer = require('nodemailer');

var StudentRoutes  = require('./src/routes/student-routes');
var ProfessorRoutes  = require('./src/routes/professor-routes');
var CourseRoutes  = require('./src/routes/course-routes');
var UserRoutes = require('./src/routes/user-routes');
var ConfigRoutes = require('./src/routes/configuration-routes');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const path = require('path');
const port = process.env.PORT || 5000;
const dev = app.get('env') !== 'production';

app.use('/student', StudentRoutes);
app.use('/professor', ProfessorRoutes);
app.use('/course', CourseRoutes);
app.use('/user', UserRoutes);
app.use('/config', ConfigRoutes);

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

  axios.post('http://localhost:3000/user/do/auth', userData).then(function(response) {
    const user = response.data;

    if(user) {
      const userID = generateID(req.get('host'));
      console.log('Session ID:' + userID);
      user.session = userID;
      usersLoggedIn.push(user);
      res.send(user);
    }else {
      res.status(202);
      res.send('Invalid username or password provided.');
    }
  })
  .catch(function(error) {
    res.status(501);
    res.send('Internal server error.');
  });
});

function sendEmail(user, host) {
  const emailData = 
    'Hello!\n You are receiveing this message because you have registered on preAcademicInfo.\n' +
    'Please use the following link in order to verify your account: ' + host + user.verification_token + '\n' +
    'After activating you account you can use the following password to login: ' + user.password + '\n' +
    '\n\nKind regards,\nThe preAcademicInfo team';

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"preAcademicInfo" <' + account.user + '>',
        to: user.username,
        subject: 'preAcademicInfo email verification',
        text: emailData, 
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
}

app.post('/register', (req, res) => {
  //const firstName = req.body.name;
  //const lastName = req.body.last_name;
  const email = req.body.email;
  const password = randomString.generate({length : 12});
  
  // we will save the user with a speciffic user token
  // that will need to be confirmed
  const userData = {
    'username': email,
    'password': password,
    'role_id': 1,
  }

  axios.post('http://localhost:3000/user/', userData).then(function(response) {
    const host = 'http://' + req.get('host') + '/verify/';
    response.data.password = password;
    sendEmail(response.data, host);
    res.send(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
});

app.get('/verify/:token', (req, res) => {
  const token = req.params.token;

  axios.get('http://localhost:3000/user/verification/' + token).then(function(response){
    const users = response.data;
    if(users.length === 1) {
      const user = users[0];

      const userData = {
        'is_active': true,
        'verification_token': '',
      }

      axios.put('http://localhost:3000/user/' + user.id, userData).then(function(response) {
        res.send('The account has been verified!');
      }).catch(function(error) {
        res.status(501);
        res.send('Could not verify account.');
      });
    }
    else {
      res.status(501);
      res.send('Invalid verification key provided.');;
    }
  })
  .catch(function(error) {
    res.send('Could not verify account');
    console.log(error);
  });
});

app.get('student/course', (req, res) =>{
  const courseId = req.body.courseId;
  students = StudentRoutes.get('/student/course/' + courseId);
  res.send(students);
});

app.get('student/profile', (req, res) =>{
  const studentId = req.body.studentId;
  profiles = StudentRoutes.get('/student/profile/' + studentId);
  res.send(profiles);
});

app.get('professor/profile', (req, res) =>{
  const professorId = req.body.professorId;
  profiles = ProfessorRoutes.get('/professor/profile/' + professorId);
  res.send(profiles);
});

app.get('professor/course', (req, res) =>{
  const courseId = req.body.courseId;
  professors = ProfessorRoutes.get('/professor/course/' + courseId);
  res.send(professors);
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
  if(err) {
    throw err;
  }
  console.log("Server started");
});
