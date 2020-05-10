const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const config = require('config');

const readFile = require('../utils/read-file');

const router = Router()
const JWT_SECRET_KEY = config.get('jwt-secret-key')

router.post(
  '/',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
    check('password', 'Минимальная длина пароля  - 6 символов')
      .isLength({ min: 4 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Введите правильные email/пароль для входа.'
        })
      }

      const admin = await readFile('/tmp/user-with-password-hashed.json')

      const { email, password } = req.body
      const isAdminExist = admin.email === email

      if (!isAdminExist) {
        return res.status(400).json({ message: 'Пользователь не найден.' })
      }
      // check password
      const isMatch = await bcrypt.compare(password, admin.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль. Попробуйте еще.' })
      }

      const token = jwt.sign(
        {
          userId: admin.id
        },
        JWT_SECRET_KEY,
        {
          expiresIn: '1h' // token lives 1 hour
        });

      const prevTestData = await readFile('logs/test-results.json')
      res.status(200).json({ token, userId: admin.id, data: prevTestData })

    } catch (e) {
      res.status(500).json({ massage: 'Ошибка. Повторите попытку.' })
    }
  });

// it seems according to task we don't have to register user
// router.post(
//   '/register',
//   [
//     check('email', 'Email написан неправильно.'),
//     check('password', 'Минимальная длина пароля  - 6 символов')
//       .isLength({ min: 6 })
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req)

//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           errors: errors.array(),
//           message: 'Введите правильные email/пароль для регистрации.'
//         })
//       }

//       const { email, password } = req.body

//       const checkUserEmail = await User.findOne({ email })

//       if (checkUserEmail) {
//         res.status(400).json({ message: 'Пользователь с такойпочтой уже существует' })
//       }

//       const hashedpassword = await bcrypt.hash(password, 10)
//       const user = new User({ email, password: hashedpassword })

//       await User.save()

//       res.status(201).json({ message: `Пользователь c email ${email} создан.` })

//     } catch (e) {
//       res.status(500).json({ massage: 'Ошибка. Повторите попытку.' })
//     }
//   }
// )

module.exports = router