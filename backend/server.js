const express = require('express')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')

const questionsRouter = require('./api/questions/questions-router')
const authRouter = require('./api/auth/auth-router')
const statsRouter = require('./api/stats/stats-router')
const quizzesRouter = require('./api/quizzes/quizzes-router') // =============== 👉 [Code-Along 13.1] - step 1.1

const { processToken, only } = require('./api/auth/auth-middleware')

const server = express()
server.use(express.json())
server.use(express.static(path.join(__dirname, '../dist')))
server.use(cors())
server.use(helmet())

server.use(processToken)
server.use('/api/questions', only(1), questionsRouter)
server.use('/api/auth', authRouter)
server.use('/api/stats', statsRouter)
server.use('/api/quizzes', quizzesRouter) // =============== 👉 [Code-Along 13.1] - step 1.2

// =============== 👉 [Code-Along 13.1] - step 1.3

// SPA
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})
// 404
server.use((req, res) => {
  res.status(404).json({
    message: `Endpoint [${req.method}] ${req.originalUrl} does not exist`,
  })
})
// ERR
server.use((err, req, res, next) => { // eslint-disable-line
  const { message, stack, status = 500 } = err
  const response = { message, status }
  if (process.env.NODE_ENV !== 'production' && stack) {
    response.stack = stack
  }
  res.status(err.status).json(response)
})

module.exports = server
