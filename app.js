const express = require('express');
const config = require('config');
const mongoose = require('mongoose')

const authRouter = require('./routes/auth.router')

const app = express();

app.use('/api/auth', authRouter)

const PORT = config.get('port') || 5000;
const MONGO_CONNECTION_STRING = config.get('mongo-connection-string') || '';

const start = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}.`);
    });

  } catch (e) {
    console.log('Server Error: ', e.message);
    process.exit(1);
  }
}

start()


