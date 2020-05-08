const { Router } = require('express')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const router = Router()

router.post(
  '/register',
  [
    check('email', 'Email написан неправильно.'),
    check('passwrd', 'Минимальная длина пароля  - 6 символов')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Введите правильные email/пароль для регистрации.'
        })
      }

      const { email, passwrd } = req.body

      const checkUserEmail = await User.findOne({ email })

      if (checkUserEmail) {
        res.status(400).json({ message: 'Пользователь с такойпочтой уже существует' })
      }

      const hashedPasswrd = await bcrypt.hash(passwrd, 10)
      const user = new User({ email, password: hashedPasswrd })

      await User.save()

      res.status(201).json({ message: `Пользователь c email ${email} создан.` })

    } catch (e) {
      res.status(500).json({ massage: 'Ошибка. Повторите попытку.' })
    }
  }
)

router.post('/login', async (req, res) => {

})

module.exports = router