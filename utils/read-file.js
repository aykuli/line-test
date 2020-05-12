const path = require('path');
const fsPromises = require('fs').promises;

const readFile = async (fileName) => {
  const relativePath = '../';
  const fileToRead = path.join(__dirname, relativePath, fileName);

  return fsPromises
    .readFile(fileToRead, { encoding: 'utf-8' })
    .then(res => res ? JSON.parse(res) : null)
    .catch(e => {
      console.error('File reading error: ', e);
      process.exit(1);
    });
}

module.exports = readFile;