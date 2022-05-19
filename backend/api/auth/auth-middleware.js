const jwt = require('jsonwebtoken')
const User = require('../user/user-model')
const secret = process.env.SECRET || 'the secret'

function generateToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    role_id: user.role_id,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, secret, options)
}

async function uniqueUsername(req, res, next) {
  const user = await User.getByUsername(req.body.username)
  if (user) return res.status(422).json({ message: 'username taken' })
  next()
}

async function usernameExists(req, res, next) {
  const user = await User.getByUsername(req.body.username)
  if (!user) return res.status(401).json({ message: 'invalid credentials' })
  req.user = user
  next()
}

function restrict(req, res, next) {
  const token = req.headers.authorization
  if (!token) return next({ status: 401, message: 'token required' })

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return next({ status: 401, message: 'token invalid' })
    req.token = decoded
    next()
  })
}

function processToken(req, res, next) {
  const token = req.headers.authorization
  if (!token) return next() // anon user

  jwt.verify(token, secret, (err, decoded) => {
    if (!err) req.token = decoded
    next()
  })
}

function isRegisteredUser(req, res) {
  if (req.token && req.token.role_id === 1) res.json({ user: true, admin: true, username: req.token.username })
  else if (req.token) res.json({ user: true, admin: false, username: req.token.username })
  else res.json({ user: false, admin: false, username: null })
}

module.exports = {
  restrict,
  uniqueUsername,
  usernameExists,
  generateToken,
  processToken,
  isRegisteredUser,
}
