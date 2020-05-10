const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('config');

const readUserData = require('../tmp/read-user-data');
const savingTestingData = require("../utils/saving-test-results");
const router = Router()

const JWT_SECRET_KEY = config.get('jwt-secret-key')
const TEST_RESULTS_FILE = config.get('test-results-file')

router.put('/', async (req, res) => {
  try {
    const { token, ...data } = req.body;
    console.log('token: ', token)
    console.log('data: ', data)

    const admin = await readUserData('user-with-password-hashed.json')
    console.log('admin: ', admin)

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(418).send({ message: 'Произошла какая-то ошибка.', error: err })
      }
      console.log('decoded: ', decoded)
      if (admin.id === decoded.userId) {
        // сохраним результаты в файле
        savingTestingData(data, TEST_RESULTS_FILE);
        console.log('data: ', data)

        res.status(200).json({ message: 'Данные тестирования сохранены.' });
      } else {
        res.status(200).json({ message: 'Данные не сохранены. Нет такого пользователя или время токена вышло.' })
      }
    });
  } catch (e) {
    res.status(500).json({ massage: 'Ошибка. Повторите попытку.' })
  }
})

module.exports = router