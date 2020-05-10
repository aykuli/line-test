const express = require('express');
const config = require('config');

const authRouter = require('./routes/auth.router')
const putProfileData = require('./routes/put-profile-data.router');

const PORT = config.get('port') || 5000;
const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});

app.use('/auth', authRouter);
app.use('/put-profile-data', putProfileData);
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send(`Server is running on http://localhost:${PORT}/`);
    return;
  }
  next();
});

module.exports = app;



