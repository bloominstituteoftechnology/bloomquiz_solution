const jwt = require('jsonwebtoken')
const User = require('../user/user-model')
const secret = process.env.SECRET || 'the secret'

function generateToken(user) {
  const payload = {
    subject: user.user_id,
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

function restrict(req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    next({ status: 401, message: 'token required' })
    return
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      next({ status: 401, message: 'token invalid' })
    } else {
      req.token = decoded
      next()
    }
  })
}

function processToken(req, res, next) {
  const token = req.headers.authorization
  if (!token) return next()

  jwt.verify(token, secret, (err, decoded) => {
    if (!err) req.token = decoded
    next()
  })
}

module.exports = {
  restrict,
  uniqueUsername,
  usernameExists,
  generateToken,
  processToken,
}
