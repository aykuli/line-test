const path = require('path');
const fsPromises = require('fs').promises;

const savingTestingData = (data, fileOut) => {
  const relativePath = '../logs/'
  const fileToWrite = path.join(__dirname, relativePath, fileOut);

  fsPromises
    .writeFile(fileToWrite, JSON.stringify(data))
    .then(() => console.info('Success writing data to file'))
    .catch(e => {
      console.error('File writing error: ', e);
      process.exit(1);
    });
}

module.exports = savingTestingData;