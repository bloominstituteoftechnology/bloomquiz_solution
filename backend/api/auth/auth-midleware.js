const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || 'the secret'

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

module.exports = {
  restrict,
}
