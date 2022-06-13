const jwt = require('jsonwebtoken')
const User = require('../user/user-model')
const secret = process.env.SECRET || 'the secret'

function generateToken(user) {
  const payload = {
    user_id: user.user_id,
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

function only(role_id) {
  return function (req, res, next) {
    if (req?.token?.role_id !== role_id) {
      return next({ status: 403, message: 'You lack privileges' })
    }
    next()
  }
}

function isRegisteredUser(req, res) {
  if (req.token && req.token.role_id === 1)
    res.json({ is_user: true, is_admin: true })
  else if (req.token)
    res.json({ is_user: true, is_admin: false })
  else
    res.json({ is_user: false, is_admin: false })
}

module.exports = {
  restrict,
  uniqueUsername,
  usernameExists,
  generateToken,
  processToken,
  isRegisteredUser,
  only,
}
