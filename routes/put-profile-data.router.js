const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('config');

const readFile = require('../utils/read-file');
const savingTestingData = require("../utils/saving-test-results");
const router = Router()

const JWT_SECRET_KEY = config.get('jwt-secret-key')
const TEST_RESULTS_FILE = config.get('test-results-file')

router.put(
  '/',
  async (req, res) => {
    try {
      const { token, ...data } = req.body;

      const admin = await readFile('/tmp/user-with-password-hashed.json')

      jwt.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
          res.status(418).send({ message: 'Произошла какая-то ошибка.', error: err })
        }

        if (admin.id === decoded.userId) {
          // сохраним результаты в файле
          savingTestingData(data, TEST_RESULTS_FILE);

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