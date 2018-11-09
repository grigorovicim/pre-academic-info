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
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const path = require('path');
const port = process.env.PORT || 5000;
const dev = app.get('env') !== 'production';

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
    console.log("Error login: " + err);
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
