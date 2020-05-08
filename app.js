const express = require('express');
const config = require('config');
const mongoose = require('mongoose')

const authRouter = require('./routes/auth.router')

const app = express();

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/', authRouter)




