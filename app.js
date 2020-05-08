const express = require('express');
const swaggerUI = require('swagger-ui-express');
const config = require('config');
const YAML = require('yamljs');
const path = require('path')

const authRouter = require('./routes/auth.router')
const userRouter = require('./routes/user.router')

const PORT = config.get('port') || 5000;
const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, './doc/api.yaml'));

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));



app.use('/', authRouter)
app.use('/user', userRouter)
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send(`Server is running on http://localhost:${PORT}/`);
    return;
  }
  next();
});

module.exports = app;



