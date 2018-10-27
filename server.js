const express = require('express');

const {createServer} = require('http');
const compression = require('compression');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 5000;
const dev = app.get('env') !== 'production';

app.get('/check-server', (req, res) => {
  res.send({ express: 'Hello From Express BACKEND!' });
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
