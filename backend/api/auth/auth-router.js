const bcrypt = require('bcryptjs')
const router = require('express').Router()
const User = require('../user/user-model')
const mid = require('./auth-middleware')

const delay = process.env.NODE_ENV === 'development' ? 500 : 0

router.post('/register',
  mid.validateCredentials,
  mid.uniqueUsername,
  async (req, res, next) => {
    try {
      const { username, password } = req.credentials
      await User.insert({
        username,
        password: bcrypt.hashSync(password, 8),
      })
      setTimeout(() => {
        res.status(201).json({ message: 'Welcome' })
      }, delay)
    } catch (error) {
      next(error)
    }
  })

router.post('/login',
  mid.validateCredentials,
  mid.usernameExists,
  async (req, res, next) => {
    try {
      const { password } = req.credentials
      const { user } = req
      if (bcrypt.compareSync(password, user.password)) {
        setTimeout(() => {
          res.json({
            message: 'Welcome',
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
