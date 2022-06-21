const jwt = require('jsonwebtoken')
const User = require('../user/user-model')
const secret = process.env.SECRET || 'the secret'
const yup = require('yup') // =============== 👉 [Code-Along 13.2] - step 2

const credentialsSchema = yup.object().shape({
  username: yup.string()
    .typeError('username must be a string').trim()
    .required('username is mandatory')
    .min(3, 'username must be at least 3 chars')
    .max(100, 'username must be at most 100 chars'),
  password: yup.string()
    .typeError('password must be a string')
    .required('password is mandatory')
    .min(4, 'password must be at least 4 chars')
    .max(100, 'password must be at most 100 chars'),
})
// used in login endpoint
function generateToken(user) { // =============== 👉 [Code-Along 15.1] - step 1
  const payload = {
    sub: user.user_id,
    username: user.username,
    role_id: user.role_id,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, secret, options)
}
// used before the routers, in server.js
function processToken(req, res, next) { // =============== 👉 [Code-Along 15.1] - steps 2 and 5
  const token = req.headers.authorization
  if (!token) return next() // anon user

  jwt.verify(token, secret, (err, decoded) => {
    if (!err) req.token = decoded
    next()
  })
}
// used with the stats router, in server.js
function restrict(req, res, next) { // =============== 👉 [Code-Along 15.1] - step 3
  const token = req.headers.authorization
  if (!token) return next({ status: 401, message: 'token required' })

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return next({ status: 401, message: 'token invalid' })
    req.token = decoded
    next()
  })
}
// used with the questions router, in server.js
function only(role_id) { // =============== 👉 [Code-Along 15.1] - step 4
  return function (req, res, next) {
    if (req?.token?.role_id !== role_id) {
      return next({ status: 403, message: 'You lack privileges' })
    }
    next()
  }
}

async function uniqueUsername(req, res, next) {
  const user = await User.getByUsername(req.body.username)
  if (user) return next({ status: 422, message: 'username taken' })
  next()
}

async function usernameExists(req, res, next) {
  const user = await User.getByUsername(req.body.username)
  if (!user) return next({ status: 401, message: 'invalid credentials' })
  req.user = user
  next()
}

function isRegisteredUser(req, res) {
  if (req.token && req.token.role_id === 1)
    res.json({ is_user: true, is_admin: true })
  else if (req.token)
    res.json({ is_user: true, is_admin: false })
  else
    res.json({ is_user: false, is_admin: false })
}

// =============== 👉 [Code-Along 13.2] - step 1.1
// =============== 👉 [Code-Along 13.2] - step 3
async function validateCredentials(req, res, next) {
  try {
    const cast = await credentialsSchema.validate(req.body, { stripUnknown: true })
    req.credentials = cast
    next()
  } catch (err) {
    next({ status: 422, message: err.message })
  }
}

module.exports = {
  restrict,
  uniqueUsername,
  usernameExists,
  generateToken,
  processToken,
  isRegisteredUser,
  only,
  validateCredentials,
}
