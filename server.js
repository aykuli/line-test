const config = require('config');
const app = require('./app');

const PORT = config.get('port') || 5000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}.`);
    });

  } catch (e) {
    console.log('Server Error: ', e.message);
    process.exit(1);
  }
}

start();