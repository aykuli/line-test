const path = require('path');
const fsPromises = require('fs').promises;
const bcrypt = require('bcryptjs')

const generatingUserData = (fileIn, fileOut) => {
  const fileToRead = path.join(__dirname, fileIn);
  const fileToWrite = path.join(__dirname, fileOut);

  fsPromises
    .readFile(fileToRead, { encoding: 'utf-8' })
    .then(async res => {
      const user = JSON.parse(res);

      const hashedpassword = await bcrypt.hash(user.password, 10)

      fsPromises
        .writeFile(fileToWrite, JSON.stringify({ ...user, password: hashedpassword }))
        .then(() => console.info('success generating user data with hashed password'))
        .catch(e => {
          console.error('File writing error: ', e);
          process.exit(1);
        });

    })
    .catch(e => {
      console.error('File reading error: ', e);
      process.exit(1);
    });
}

generatingUserData('user.json', 'user-with-password-hashed.json')