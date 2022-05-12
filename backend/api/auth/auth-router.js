const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const User = require('../user/user-model')

const secret = process.env.SECRET || 'the secret'

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, secret, options)
}

async function uniqueUsername(req, res, next) {
  const { username } = req.body
  const user = await User.getByUsername(username)

  if (user) {
    res.status(400).json({ message: 'username taken' })
  } else {
    next()
  }
}

async function usernameExists(req, res, next) {
  const { username } = req.body
  const user = await User.getByUsername(username)

  if (!user) {
    res.status(400).json({ message: 'invalid credentials' })
  } else {
    req.user = user
    next()
  }
}

router.post('/register', uniqueUsername, async (req, res) => {
  try {
    const { username, password } = req.body
    const newUser = await User.insert({
      username,
      password: bcrypt.hashSync(password, 8),
    })
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/login', usernameExists, async (req, res) => {
  try {
    const { body: { password }, user } = req
    if (bcrypt.compareSync(password, user.password)) {
      res.json({ message: `welcome, ${user.username}`, token: generateToken(user) })
    } else {
      res.status(401).json({ message: 'invalid credentials' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
