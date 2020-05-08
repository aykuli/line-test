const { Router } = require('express')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const config = require('config');

const router = Router()

const readUserData = require('../tmp/read-user-data');

router.get(
  '/',
  async (req, res) => {
    console.log('user get')
    try {
      const savedUser = await readUserData('user.json')
      res.status(200).send(savedUser)


    } catch (e) {
      res.status(500).json({ massage: 'Ошибка. Повторите попытку.' })
    }
  })

module.exports = router