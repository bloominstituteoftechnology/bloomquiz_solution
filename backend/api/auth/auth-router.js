const bcrypt = require('bcryptjs')
const router = require('express').Router()
const User = require('../user/user-model')
const mid = require('./auth-middleware')

let env = process.env.NODE_ENV || 'development' // remember environment variables??
const delay = env === 'development' ? 500 : 0

router.post('/register',
  mid.validateCredentials, // =============== 👉 [Code-Along 13.2] - step 1.2
  mid.uniqueUsername,
  async (req, res, next) => { // =============== 👉 [Code-Along 13.2] - step 4
    try {
      const { username, password } = req.credentials
      await User.insert({
        username,
        password: bcrypt.hashSync(password, 8),
      })
      setTimeout(() => {
        res.status(201).json({ message: `Welcome, ${username}` })
      }, delay)
    } catch (error) {
      next(error)
    }
  })

router.post('/login',
  mid.validateCredentials, // =============== 👉 [Code-Along 13.2] - step 1.2
  mid.usernameExists,
  async (req, res, next) => { // =============== 👉 [Code-Along 13.2] - step 5
    try {
      const { password } = req.credentials
      const { user } = req
      if (bcrypt.compareSync(password, user.password)) {
        setTimeout(() => {
          res.json({
            message: `Welcome, ${user.username}`,
            token: mid.generateToken(user),
          })
        }, delay)
      } else {
        next({ status: 401, message: 'invalid credentials' })
      }
    } catch (error) {
      next(error)
    }
  })

router.get('/check', mid.isRegisteredUser)

module.exports = router
